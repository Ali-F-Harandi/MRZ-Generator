# MRZ Generator

> A powerful, client-side React application for generating and validating Machine Readable Zones (MRZ) for Passports, Visas, and ID Cards.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Features (Planned)

- **Multiple Document Support**: 
  - Passport (TD3)
  - ID Cards (TD1, TD2)
  - Visas (MRV-A, MRV-B)
- **Smart Validation**: Automatic check digit calculation (Modulo 10).
- **Live Preview**: Visual representation of the MRZ code as you type.
- **Privacy First**: All processing happens in your browser. No data is sent to any server.

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mrz-generator.git
   cd mrz-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🚢 Deployment

**Option 1: Automatic (GitHub Actions)**
Pushing to the `main` branch automatically triggers the build and deploy workflow to GitHub Pages.

**Option 2: Manual (Windows)**
Run the provided script to commit and push changes:
```cmd
rename deploy.txt deploy.bat
deploy.bat
```

## 🤝 Contributing

See [DEVELOPER_NOTES.md](./DEVELOPER_NOTES.md) for architectural details and coding standards.

## 📄 License

MIT License - see LICENSE file for details.