const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

const app = express();
app.use(cors());

// ========== MONGODB CONNECTION ==========
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/cosmonet";

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn('⚠️ MONGODB_URI is not set! Using localhost fallback (This will fail on Vercel).');
    }
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
    throw err;
  }
};

if (require.main === module) {
  connectDB();
}
  
// ========== MONGODB SCHEMAS ==========
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const scientistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  field: String,
  bio: String,
  image: String,
  achievements: [String],
  createdAt: { type: Date, default: Date.now },
});

const missionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: String,
  description: String,
  agency: String,
  year: String,
  details: String,
  objectives: [String],
  createdAt: { type: Date, default: Date.now },
});

const planetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  textureUrl: String,
  diameter: String,
  temp: String,
  detailInfo: String,
  createdAt: { type: Date, default: Date.now },
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

// Create Models
const User = mongoose.model("User", userSchema);
const Scientist = mongoose.model("Scientist", scientistSchema);
const Mission = mongoose.model("Mission", missionSchema);
const Planet = mongoose.model("Planet", planetSchema);
const Contact = mongoose.model("Contact", contactSchema);

// ========== GRAPHQL SCHEMA ==========
const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    createdAt: String
  }

  type Scientist {
    id: ID!
    name: String!
    field: String
    bio: String
    image: String
    achievements: [String]
    createdAt: String
  }

  type Mission {
    id: ID!
    name: String!
    status: String
    description: String
    agency: String
    year: String
    details: String
    objectives: [String]
    createdAt: String
  }

  type Planet {
    id: ID!
    name: String!
    textureUrl: String
    diameter: String
    temp: String
    detailInfo: String
    createdAt: String
  }

  type Query {
    getAllUsers: [User]
    getUserByEmail(email: String!): User
    getAllScientists: [Scientist]
    getScientistById(id: ID!): Scientist
    getAllMissions: [Mission]
    getMissionById(id: ID!): Mission
    getAllPlanets: [Planet]
    getPlanetByName(name: String!): Planet
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createUser(email: String!, password: String!, name: String): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): Boolean

    createScientist(
      name: String!
      field: String
      bio: String
      image: String
      achievements: [String]
    ): Scientist
    updateScientist(
      id: ID!
      name: String
      field: String
      bio: String
    ): Scientist
    deleteScientist(id: ID!): Boolean

    createMission(
      name: String!
      status: String
      description: String
      agency: String
      year: String
      details: String
      objectives: [String]
    ): Mission
    updateMission(
      id: ID!
      name: String
      status: String
      description: String
    ): Mission
    deleteMission(id: ID!): Boolean

    createPlanet(
      name: String!
      textureUrl: String
      diameter: String
      temp: String
      detailInfo: String
    ): Planet
    updatePlanet(id: ID!, name: String, diameter: String, temp: String): Planet
    deletePlanet(id: ID!): Boolean
  }
`;

// ========== GRAPHQL RESOLVERS ==========
const resolvers = {
  Query: {
    getAllUsers: async () => await User.find(),
    getUserByEmail: async (_, { email }) => await User.findOne({ email }),
    getAllScientists: async () => await Scientist.find(),
    getScientistById: async (_, { id }) => await Scientist.findById(id),
    getAllMissions: async () => await Mission.find(),
    getMissionById: async (_, { id }) => await Mission.findById(id),
    getAllPlanets: async () => await Planet.find(),
    getPlanetByName: async (_, { name }) => await Planet.findOne({ name }),
  },

  Mutation: {
    signup: async (_, { email, password, name }) => {
      console.log('📝 Signup attempt for:', email, 'with name:', name);
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('❌ User already exists:', email);
        throw new Error("User already exists with this email");
      }

      // Hash password
      console.log('🔐 Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('✅ Password hashed');

      // Create new user
      const user = new User({ 
        email, 
        password: hashedPassword, 
        name 
      });
      await user.save();
      console.log('✅ User saved to database:', user.email);

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log('✅ Signup successful for:', email);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      console.log('🔐 Login attempt for:', email);
      
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        console.log('❌ User not found:', email);
        throw new Error("Invalid email or password");
      }
      
      console.log('✅ User found:', user.email);
      console.log('🔑 Checking password...');

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log('🔑 Password valid:', isValidPassword);
      
      if (!isValidPassword) {
        console.log('❌ Invalid password for:', email);
        throw new Error("Invalid email or password");
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log('✅ Login successful for:', email);
      return { token, user };
    },

    createUser: async (_, { email, password, name }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, name });
      await user.save();
      return user;
    },
    updateUser: async (_, { id, name, email }) => {
      const user = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true }
      );
      return user;
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return true;
    },

    createScientist: async (_, { name, field, bio, image, achievements }) => {
      const scientist = new Scientist({
        name,
        field,
        bio,
        image,
        achievements,
      });
      await scientist.save();
      return scientist;
    },
    updateScientist: async (_, { id, name, field, bio }) => {
      const scientist = await Scientist.findByIdAndUpdate(
        id,
        { name, field, bio },
        { new: true }
      );
      return scientist;
    },
    deleteScientist: async (_, { id }) => {
      await Scientist.findByIdAndDelete(id);
      return true;
    },

    createMission: async (
      _,
      { name, status, description, agency, year, details, objectives }
    ) => {
      const mission = new Mission({
        name,
        status,
        description,
        agency,
        year,
        details,
        objectives,
      });
      await mission.save();
      return mission;
    },
    updateMission: async (_, { id, name, status, description }) => {
      const mission = await Mission.findByIdAndUpdate(
        id,
        { name, status, description },
        { new: true }
      );
      return mission;
    },
    deleteMission: async (_, { id }) => {
      await Mission.findByIdAndDelete(id);
      return true;
    },

    createPlanet: async (
      _,
      { name, textureUrl, diameter, temp, detailInfo }
    ) => {
      const planet = new Planet({
        name,
        textureUrl,
        diameter,
        temp,
        detailInfo,
      });
      await planet.save();
      return planet;
    },
    updatePlanet: async (_, { id, name, diameter, temp }) => {
      const planet = await Planet.findByIdAndUpdate(
        id,
        { name, diameter, temp },
        { new: true }
      );
      return planet;
    },
    deletePlanet: async (_, { id }) => {
      await Planet.findByIdAndDelete(id);
      return true;
    },
  },
};

// ========== APOLLO SERVER SETUP ==========
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({}),
  formatError: (error) => {
    console.error('❌ GraphQL Error:', error.message);
    console.error('📍 Path:', error.path);
    console.error('🔍 Original Error:', error.originalError);
    return error;
  },
});

let serverStarted = false;

async function startApolloServer() {
  if (!serverStarted) {
    await server.start();
    server.applyMiddleware({ app });
    serverStarted = true;
  }
}

// Add express.json() AFTER Apollo middleware
app.use(express.json());

// Contact form endpoint (NO EMAIL REQUIRED)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log('📩 Received contact form submission:', { name, email, subject });

    // Save to MongoDB
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    await contact.save();
    console.log('✅ Message saved to MongoDB with ID:', contact._id);

    res.json({ 
      success: true, 
      message: 'Message received! We will contact you soon.' 
    });
  } catch (error) {
    console.error('❌ Contact form error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save message: ' + error.message 
    });
  }
});

// Get all contact messages (for admin to view)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark message as read
app.patch('/api/contact/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// If run directly (local development)
if (require.main === module) {
  startApolloServer().then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📊 GraphQL Playground at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

// Export for serverless environments (Vercel)
module.exports = { app, startApolloServer, connectDB };
