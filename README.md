# MRZ Generator

> A powerful, client-side React application for generating and validating Machine Readable Zones (MRZ) for Passports, Visas, and ID Cards.

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

- **Comprehensive Document Support**: 
  - **Passports**: ICAO 9303 TD3 standard (2 lines, 44 chars).
  - **ID Cards**: TD1 (3 lines, 30 chars) and TD2 (2 lines, 36 chars).
  - **Visas**: MRV-A (2 lines, 44 chars) and MRV-B (2 lines, 36 chars).
- **Smart Validation**: Automatic check digit calculation (Modulo 10) for all fields.
- **Smart Inputs**: Searchable country dropdowns with alias support (e.g., search "America" for "USA").
- **Live Preview**: Visual representation of the MRZ code as you type.
- **Privacy First**: All processing happens entirely in your browser. **No data is sent to any server.**

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