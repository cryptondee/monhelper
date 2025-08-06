# Battle Helper

> Strategic battle analysis and move recommendations for monster-battling games

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## 🎯 Overview

Battle Helper is an interactive web application that provides comprehensive battle analysis for https://moncha.in games. It calculates optimal move recommendations, suggests strategic switches, and analyzes type effectiveness to give players a competitive edge.

### ✨ Key Features

- 🔍 **Opponent Inspector** - Analyze enemy stats, types, and movesets
- 👥 **Team Builder** - Create and manage your battle team
- ⚡ **Move Recommender** - AI-powered move suggestions with damage calculations
- 🔄 **Switch Advisor** - Smart switching recommendations for better matchups  
- 🔎 **Advanced Search** - Filter by name, type, or move class
- 💾 **Auto-Save** - Persistent team and preference storage

### 🎮 Battle Calculations

- **STAB Bonus** - Same Type Attack Bonus (×1.5 multiplier)
- **Type Effectiveness** - Full type chart with multipliers (×0 to ×5)
- **Priority System** - Move speed calculations and tie-breaking
- **Accuracy Factor** - Expected damage includes accuracy rates
- **Strategic Analysis** - Suggests optimal switches when current mon is ineffective

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/cryptondee/monhelper.git
cd monhelper

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to use the application.

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 📊 Data Structure

The application uses three core datasets:

### Mons (Monster Data)
```json
{
  "Id": 0,
  "Name": "Ghouliath",
  "HP": 303,
  "Attack": 157,
  "Defense": 202,
  "SpecialAttack": 151,
  "SpecialDefense": 202,
  "Speed": 181,
  "Type1": "Yang",
  "Type2": "Fire",
  "BST": 1196,
  "Flavor": "Often found in dark places like caves and OTC trading desks."
}
```

### Moves (Attack Data)
```json
{
  "Name": "Infernal Flame",
  "Mon": "Ghouliath",
  "Power": 120,
  "Stamina": 3,
  "Accuracy": 85,
  "Priority": 0,
  "Type": "Fire",
  "Class": "Special",
  "Description": "Deals damage, 30% chance of inflicting Burn."
}
```

### Types (Effectiveness Chart)
```json
{
  "Attacker": "Fire",
  "Defender": "Ice",
  "Multiplier": 2
}
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks with localStorage persistence
- **Type Safety**: Full TypeScript coverage
- **Component Library**: Radix UI primitives for accessibility

## 📁 Project Structure

```
src/
├── assets/data/          # JSON data files (mons, moves, types)
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── OpponentInspector.tsx
│   ├── TeamSelector.tsx
│   ├── MoveRecommender.tsx
│   ├── SwitchSuggestion.tsx
│   └── SearchFilter.tsx
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and business logic
│   ├── battle-calculator.ts
│   ├── types.ts
│   └── utils.ts
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 🎯 Usage Guide

### 1. Select Opponent
Choose an opponent from the dropdown to view their stats, types, and available moves.

### 2. Build Your Team
- Add mons to your team using the team selector
- Set one mon as active for battle calculations
- Remove mons by clicking the X button

### 3. Get Move Recommendations
The app automatically calculates the best moves for your active mon against the selected opponent, considering:
- Base move power and accuracy
- STAB bonuses for matching types
- Type effectiveness multipliers
- Move priority for speed calculations

### 4. Consider Switch Suggestions
When your active mon has a poor matchup (< 50% effective damage), the app suggests better alternatives from your team.

### 5. Use Search and Filters
Filter mons and moves by:
- Name search
- Type filtering (Yin, Yang, Fire, etc.)
- Move class (Physical, Special, Self, Other)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use existing UI components from shadcn/ui
- Ensure accessibility (WCAG AA compliance)
- Add JSDoc comments for complex functions
- Test in multiple browsers

## 📋 Roadmap

- [ ] Advanced filtering (stat ranges, BST)
- [ ] Team export/import functionality
- [ ] Battle simulation mode
- [ ] Move effectiveness heatmaps
- [ ] Dark mode toggle
- [ ] Mobile app version

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Game data provided by https://github.com/sudo-owen/chomp/tree/main
- UI components powered by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

## 📞 Support

- 🐛 [Report Bug](https://github.com/cryptondee/monhelper/issues)
- 💡 [Request Feature](https://github.com/cryptondee/monhelper/issues)
- 📧 [Contact Developer](mailto:your.email@example.com) 

---

<p align="center">
  Made with ❤️ by cryptondee for the moncha.in community
</p>