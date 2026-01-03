# Wanderix 🌍

> **Wander beyond maps** - A modern, AI-ready travel platform for discovering offbeat locations and smart trip planning.

![Wanderix](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)

## ✨ Features

### 🔐 Authentication
- **Google OAuth** integration via Firebase
- Secure session management
- Protected routes for authenticated users
- Seamless logout functionality

### 🎯 Personalized Onboarding
- Travel style preferences (Adventure, Calm, Luxury, Backpacking)
- Budget range selection
- Destination preferences (Mountains, Beaches, Cities, Hidden places)
- Travel frequency tracking

### 🗺️ Smart Destination Discovery
- Curated offbeat locations
- Filter by mood, budget, and difficulty
- Advanced search functionality
- Personalized recommendations

### 📅 Trip Planner
- Day-wise itinerary builder
- Budget estimator
- Pre-travel checklist
- Save and share trips

### 🎨 Premium UI/UX
- Cinematic dark + earthy theme
- Glassmorphism effects
- Parallax scrolling
- Smooth page transitions with Framer Motion
- Grain texture overlay
- Mobile-first responsive design

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: React Context API
- **Authentication**: Firebase Auth

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Admin SDK
- **API**: RESTful architecture

### Deployment
- **Frontend**: Vercel
- **Backend**: Render

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn
- Firebase account

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Google Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Google provider
3. Enable **Firestore Database**:
   - Go to Firestore Database
   - Create database in production mode
4. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Copy the Firebase config object

### Installation

#### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Add your Firebase credentials to .env
# VITE_FIREBASE_API_KEY=your_api_key
# VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... etc
```

#### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Add your configuration to .env
# PORT=5000
# FIREBASE_PROJECT_ID=your_project_id
# ... etc
```

### Running Locally

#### Start Backend Server
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## 📁 Project Structure

```
Wanderix/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── config/          # Configuration files
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── public/              # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── config/          # Configuration
│   │   └── server.ts        # Express server
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

## 🎨 Design System

### Color Palette
- **Background**: Deep charcoal with warm undertones
- **Primary**: Warm amber/gold
- **Secondary**: Earthy terracotta
- **Accent**: Sage green
- **Glass**: Frosted white with low opacity

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Effects
- Glassmorphism cards with backdrop blur
- Subtle grain texture overlay
- Smooth transitions (300ms ease)
- Parallax scrolling on hero sections

## 🔒 Security

- Environment variables for sensitive data
- Firebase security rules for Firestore
- JWT token verification on backend
- CORS configuration
- Input validation and sanitization

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel via CLI or GitHub integration
```

### Backend (Render)
```bash
cd backend
npm run build
# Deploy to Render via GitHub integration
```

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to open an issue.

## 📄 License

MIT License - feel free to use this project for learning purposes.

## 🙏 Acknowledgments

- Firebase for authentication and database
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- The travel community for inspiration

---

**Built with ❤️ for wanderers and explorers**
