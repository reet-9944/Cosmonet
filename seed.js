const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cosmonet";

// Schemas
const planetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  textureUrl: String,
  diameter: String,
  temp: String,
  detailInfo: String,
});

const scientistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  field: String,
  bio: String,
  image: String,
  achievements: [String],
});

const missionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: String,
  description: String,
  agency: String,
  year: String,
  details: String,
  objectives: [String],
});

const Planet = mongoose.model('Planet', planetSchema);
const Scientist = mongoose.model('Scientist', scientistSchema);
const Mission = mongoose.model('Mission', missionSchema);

// Seed Data
const planets = [
  { name: "Mercury", textureUrl: 'https://tse4.mm.bing.net/th/id/OIP.m3w_E0fDCXaMH7wJTYX4NQHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', diameter: "4,880 km", temp: "430°C / -180°C", detailInfo: "Smallest planet in our solar system." },
  { name: "Venus", textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Cylindrical_Map_of_Venus.jpg', diameter: "12,104 km", temp: "462°C", detailInfo: "Hot and cloudy with a thick atmosphere." },
  { name: "Earth", textureUrl: 'https://th.bing.com/th/id/R.9a5157fba87c60fa38e6ae3a4daa111b?rik=HsJ471UsIGJJSA&riu=http%3a%2f%2feoimages.gsfc.nasa.gov%2fimages%2fimagerecords%2f79000%2f79765%2fdnb_land_ocean_ice.2012.3600x1800.jpg&ehk=0tDHrlMn0XvT4cjKr90cnzDpaY2DttmXRvfE17a3B%2f8%3d&risl=&pid=ImgRaw&r=0', diameter: "12,742 km", temp: "15°C", detailInfo: "Our home planet with life." },
  { name: "Mars", textureUrl: 'https://tse2.mm.bing.net/th/id/OIP.Jjl6f_9tEx67dioA1vNb9AHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', diameter: "6,779 km", temp: "-63°C", detailInfo: "The Red Planet with potential for life." },
  { name: "Jupiter", textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg', diameter: "139,820 km", temp: "-145°C", detailInfo: "Largest gas giant in our solar system." },
  { name: "Saturn", textureUrl: 'https://tse4.mm.bing.net/th/id/OIP.BSSL0H1Gqab_JCCLC_E-6gHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', diameter: "116,460 km", temp: "-178°C", detailInfo: "Famous for its beautiful ring system." },
  { name: "Uranus", textureUrl: 'https://tse3.mm.bing.net/th/id/OIP.DPKRTvAMzBHfrNSiixfR8QHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', diameter: "50,724 km", temp: "-224°C", detailInfo: "Ice giant tilted on its side." },
  { name: "Neptune", textureUrl: 'https://tse2.mm.bing.net/th/id/OIP.Mb8o1tZm3IOFmk-4kMPBSQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', diameter: "49,244 km", temp: "-214°C", detailInfo: "Windy blue ice giant." },
  { name: "Pluto", textureUrl: 'https://tse2.mm.bing.net/th/id/OIP.66RNO_4-XKcyktl85gzdEgHaDs?rs=1&pid=ImgDetMain&o=7&rm=3', diameter: "2,377 km", temp: "-229°C", detailInfo: "Dwarf planet in the Kuiper Belt." }
];

const scientists = [
  { name: "Albert Einstein", field: "Theoretical Physics", image: "🧠", bio: "Developed the theory of relativity and revolutionized our understanding of space and time.", achievements: ["E=mc²", "Photoelectric Effect", "General Relativity"] },
  { name: "Marie Curie", field: "Radioactivity", image: "⚗️", bio: "Pioneer in research on radioactivity and first woman to win a Nobel Prize.", achievements: ["Nobel Prize in Physics", "Nobel Prize in Chemistry", "Discovered Radium"] },
  { name: "Carl Sagan", field: "Astronomy", image: "🔭", bio: "Popularized science and explored the cosmos through Cosmos TV series.", achievements: ["Cosmos TV Series", "Pale Blue Dot", "Pioneer Plaque"] },
  { name: "Stephen Hawking", field: "Cosmology", image: "🌌", bio: "Theoretical physicist known for work on black holes and quantum mechanics.", achievements: ["Hawking Radiation", "A Brief History of Time", "Black Hole Theory"] }
];

const missions = [
  { name: "Apollo 11", status: "Success", description: "First humans on Moon", agency: "NASA", year: "1969", details: "Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins orbited above.", objectives: ["Land on Moon", "Return safely", "Collect samples"] },
  { name: "Voyager 1", status: "Active", description: "Interstellar space probe", agency: "NASA", year: "1977", details: "Currently the farthest human-made object from Earth, exploring interstellar space.", objectives: ["Study outer planets", "Enter interstellar space", "Send data back"] },
  { name: "Mars Rover Perseverance", status: "Active", description: "Search for ancient life on Mars", agency: "NASA", year: "2021", details: "Exploring Jezero Crater and collecting samples for future return to Earth.", objectives: ["Search for biosignatures", "Collect samples", "Test oxygen production"] }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Planet.deleteMany({});
    await Scientist.deleteMany({});
    await Mission.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert new data
    await Planet.insertMany(planets);
    await Scientist.insertMany(scientists);
    await Mission.insertMany(missions);
    
    console.log('✅ Database seeded successfully!');
    console.log(`   - ${planets.length} planets`);
    console.log(`   - ${scientists.length} scientists`);
    console.log(`   - ${missions.length} missions`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
