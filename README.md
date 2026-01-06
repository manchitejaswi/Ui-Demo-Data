# Ui-Demo-Data

This repository contains vulnerability data and a comprehensive Security Vulnerability Dashboard application.

## Contents

### 1. Vulnerability Data
- **ui_demo.json** (370+ MB): Large JSON file containing vulnerability data from multiple groups, repositories, and images

### 2. Security Vulnerability Dashboard
A full-featured React + TypeScript application for analyzing and visualizing security vulnerabilities.

**Location**: `/security-dashboard`

**Key Features**:
- 📊 Interactive data visualizations (severity, risk factors, trends)
- 🔍 Real-time search and filtering
- ⚡ Performance-optimized for large datasets (virtualization, lazy loading)
- 🔥 Critical vulnerability highlighting
- 📥 Export to JSON/CSV
- 🤝 Side-by-side vulnerability comparison
- 🤖 AI vs Manual analysis insights

## Quick Start

### Access the Dashboard

```bash
# Clone the repository
git clone https://github.com/manchitejaswi/Ui-Demo-Data.git
cd Ui-Demo-Data

# Checkout the dashboard branch
git checkout vulnerability-dashboard  # or copilot/create-security-vulnerability-dashboard

# Navigate to the dashboard
cd security-dashboard

# Install dependencies
npm install

# Run the application
npm run dev
```

The dashboard will be available at `http://localhost:5173`

## Documentation

- **[security-dashboard/README.md](security-dashboard/README.md)**: Complete dashboard documentation
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)**: Detailed implementation summary
- **[PUSH_INSTRUCTIONS.md](PUSH_INSTRUCTIONS.md)**: Deployment instructions

## Technology Stack

- React 18.3 + TypeScript
- Vite (build tool)
- Recharts (visualization)
- React Window (virtualization)
- Context API (state management)

## Features Implemented

✅ Efficient large file loading (370+ MB JSON)  
✅ Automatic kaiStatus filtering  
✅ Interactive charts and visualizations  
✅ Advanced search with autocomplete  
✅ Multi-criteria filtering  
✅ Vulnerability comparison  
✅ Data export (JSON/CSV)  
✅ Performance optimizations  
✅ Comprehensive documentation  

## Project Structure

```
Ui-Demo-Data/
├── ui_demo.json               # Vulnerability data (370MB)
├── security-dashboard/        # React + TypeScript application
│   ├── public/
│   │   └── ui_demo.json      # Data copy for web access
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # State management
│   │   ├── hooks/            # Custom hooks
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utilities
│   ├── package.json
│   └── README.md             # Detailed documentation
├── PROJECT_SUMMARY.md         # Implementation details
└── PUSH_INSTRUCTIONS.md       # Deployment guide
```

## License

This project is maintained by manchitejaswi.

