# 🚀 Space Rovers - Cosmic Exploration Platform

A full-stack space exploration web application with **MongoDB integration**, GraphQL API, and stunning 3D visualizations.

## 🎯 Tech Stack

- **Frontend**: React + Vite + Three.js
- **Backend**: Node.js + Express + GraphQL
- **Database**: MongoDB + Mongoose
- **3D Graphics**: Three.js
- **Animations**: GSAP, React Spring

## 📦 Features

✅ MongoDB database integration
✅ GraphQL API for data management
✅ 3D solar system visualization
✅ Interactive planet exploration
✅ Scientist profiles
✅ Space mission tracking
✅ AI chatbot assistant
✅ Full CRUD operations

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running on your system

### 3. Seed Database
```bash
npm run seed
```

### 4. Start Backend Server
```bash
npm run server
```
Server runs at: `http://localhost:4000`

### 5. Start Frontend (New Terminal)
```bash
npm run dev
```
App opens at: `http://localhost:5175`

## 🎓 MongoDB Integration Demo

### Test Database Connection
```bash
node test-connection.js
```

### Run Full Demo
```bash
node demo-mongodb.js
```

### Test GraphQL API
Visit: `http://localhost:4000/graphql`

Run this query:
```graphql
query {
  getAllPlanets {
    name
    diameter
    temp
  }
}
```

## 📚 Documentation

- **DEMO_FOR_TEACHER.md** - Complete demo guide for presentations
- **MONGODB_SETUP.md** - MongoDB integration details
- **SIMPLE_EXPLANATION.md** - How data flows from MongoDB to UI
- **VISUAL_GUIDE.md** - Visual diagrams and explanations

## 🎬 For Teachers/Reviewers

See **DEMO_FOR_TEACHER.md** for:
- Complete project overview
- Live demo steps
- MongoDB proof of integration
- CRUD operation examples
- Architecture explanation

## 📝 Available Scripts

- `npm run server` - Start backend GraphQL server
- `npm run dev` - Start frontend development server
- `npm run seed` - Populate MongoDB with sample data
- `npm run build` - Build for production

## 🗄️ Database Schema

### Planets
- name, diameter, temperature, texture URL, details

### Scientists
- name, field, bio, image, achievements

### Missions
- name, status, description, agency, year, objectives

### Users
- email, password, name

## 🌟 Key Features Demonstrated

1. **MongoDB Integration** - NoSQL database with Mongoose ODM
2. **GraphQL API** - Modern API with queries and mutations
3. **Full-Stack Architecture** - React frontend + Node.js backend
4. **3D Visualization** - Three.js for solar system rendering
5. **Real-time Data** - Live updates from database
6. **CRUD Operations** - Complete data management

## 🎯 Project Structure

```
space_rovers/
├── src/                    # React frontend
│   ├── App.jsx            # Main application
│   ├── main.jsx           # Entry point
│   └── index.css          # Styles
├── models/                 # Mongoose schemas
├── server.cjs             # GraphQL server
├── seed.js                # Database seeding
├── .env                   # Environment variables
└── package.json           # Dependencies
```

## 🔧 Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/cosmonet
PORT=4000
NODE_ENV=development
```

## 🎉 Success Indicators

✅ Backend shows: "✅ MongoDB Connected"
✅ GraphQL playground accessible at port 4000
✅ Frontend loads without errors
✅ Data displays from MongoDB
✅ CRUD operations work in GraphQL

## 📞 Support

For issues or questions, check:
- SIMPLE_EXPLANATION.md - Understanding data flow
- MONGODB_SETUP.md - Setup troubleshooting
- DEMO_FOR_TEACHER.md - Complete guide

---

**Built with ❤️ for space exploration and learning**
