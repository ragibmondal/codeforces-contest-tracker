# Codeforces Contest Tracker

A modern, feature-rich web application for tracking Codeforces programming contests. Built with React, TypeScript, and Tailwind CSS, providing real-time contest information and participant standings.

## ⚡ Key Features

* **Contest Management**
  * Real-time list of all Codeforces contests
  * Advanced filtering system (upcoming, ongoing, past)
  * Smart search functionality for contest names

* **Standings Visualization**
  * Detailed contest standings
  * Participant search capabilities
  * Performance metrics tracking

* **User Experience**
  * Responsive design for all devices
  * Dark/Light theme toggle
  * Intuitive navigation

## 🚀 Getting Started

### System Requirements

```
Node.js >= v14.0.0
npm >= v6.0.0 or yarn >= v1.22.0
```

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/ragibmondal/codeforces-contest-tracker.git
cd codeforces-contest-tracker
```

2. Install dependencies
```bash
npm install # or yarn install
```

3. Configure API credentials
```typescript
// src/utils/api.ts

export const API_CONFIG = {
    KEY: 'your_codeforces_api_key',
    SECRET: 'your_codeforces_api_secret',
    BASE_URL: 'https://codeforces.com/api'
};
```

## 💻 Development

### Launch Development Server
```bash
npm run dev # or yarn dev
```
Navigate to `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build # or yarn build
```
Production files will be generated in the `dist` directory.

### Code Quality
```bash
npm run lint # or yarn lint
```

## 📁 Project Architecture

```
src/
├── components/        # Reusable React components
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and helpers
├── App.tsx          # Main application component
└── main.tsx         # Application entry point

public/
├── assets/          # Static assets
└── index.html       # HTML template
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ Ragib Hasan
</div>