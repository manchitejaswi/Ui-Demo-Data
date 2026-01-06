# 🔒 Security Vulnerability Dashboard

A comprehensive React + TypeScript application for analyzing and visualizing security vulnerabilities with AI-powered insights.

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [Data Flow](#data-flow)
- [Component Structure](#component-structure)
- [Performance Optimizations](#performance-optimizations)
- [Usage Guide](#usage-guide)

## ✨ Features

### Data Loading and Processing
- **Efficient large file handling**: Loads and processes the ui_demo.json file (370+ MB)
- **Data transformation**: Converts nested vulnerability data into a flat, searchable structure
- **Smart filtering**: Automatically filters out vulnerabilities with kaiStatus "invalid - norisk" and "ai-invalid-norisk"
- **Performance optimization**: Uses virtualization for rendering thousands of vulnerabilities

### Interactive Visualizations
- **Severity Distribution Chart**: Bar chart showing vulnerability counts by severity level
- **Risk Factors Chart**: Horizontal bar chart displaying top 10 risk factors
- **Trend Analysis**: Line chart showing vulnerability trends over the last 12 months
- **Real-time updates**: All charts update dynamically based on applied filters

### Advanced Search & Filtering
- **Real-time search**: Search across CVE IDs, descriptions, and package names
- **Autocomplete suggestions**: Get CVE suggestions as you type
- **Multi-criteria filtering**: Filter by severity, date range, and more
- **Debounced input**: Optimized search performance with 300ms debounce

### Comparison Feature
- **Side-by-side comparison**: Compare multiple vulnerabilities
- **Detailed property comparison**: View severity, CVSS, packages, statuses, and descriptions
- **AI vs Manual Analysis**: Highlight differences between AI-analyzed and manually reviewed vulnerabilities

### Export Functionality
- **JSON Export**: Export filtered data in JSON format
- **CSV Export**: Export to CSV for spreadsheet analysis
- **Date-stamped files**: Automatic filename generation with timestamps

### Critical Vulnerability Highlighting
- **Visual indicators**: 🔥 icon for critical and high-severity vulnerabilities (CVSS >= 8.0)
- **Special styling**: Distinct visual treatment for critical items
- **Count display**: Shows number of critical vulnerabilities in filtered results

### AI Analysis Integration
- **AI vs Manual**: Dashboard statistics show the ratio of AI-analyzed vs manually reviewed vulnerabilities
- **kaiStatus display**: Shows AI analysis status for each vulnerability
- **Relationship highlighting**: Clear indication of AI involvement in security analysis

## 🏗️ Architecture

### Technology Stack
- **React 18.3**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Recharts**: Data visualization library
- **React Window**: Virtualization for large lists
- **Context API**: Global state management

### Project Structure
```
src/
├── components/
│   ├── Charts/
│   │   ├── SeverityChart.tsx      # Severity distribution visualization
│   │   ├── RiskFactorsChart.tsx   # Risk factors frequency chart
│   │   └── TrendChart.tsx         # Time-based trend analysis
│   ├── Comparison/
│   │   ├── Comparison.tsx         # Vulnerability comparison component
│   │   └── Comparison.css
│   ├── Dashboard/
│   │   ├── Dashboard.tsx          # Main dashboard orchestrator
│   │   ├── Dashboard.css
│   │   ├── Statistics.tsx         # Statistics cards display
│   │   ├── Statistics.css
│   │   ├── VulnerabilityList.tsx  # Virtualized list component
│   │   └── VulnerabilityList.css
│   ├── Export/
│   │   ├── Export.tsx             # Export functionality
│   │   └── Export.css
│   └── Search/
│       ├── SearchFilter.tsx       # Search and filter interface
│       └── SearchFilter.css
├── context/
│   └── VulnerabilityContext.tsx   # Global state management
├── hooks/
│   └── useDebounce.ts             # Debounce hook for search
├── types/
│   └── vulnerability.ts           # TypeScript type definitions
├── utils/
│   └── dataUtils.ts               # Data processing utilities
├── App.tsx                        # Root application component
├── App.css
├── index.css                      # Global styles
└── main.tsx                       # Application entry point
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/manchitejaswi/Ui-Demo-Data.git
   cd Ui-Demo-Data
   git checkout vulnerability-dashboard
   ```

2. **Navigate to the project directory**:
   ```bash
   cd security-dashboard
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Verify data file**: Ensure `ui_demo.json` is in the `public/` directory
   ```bash
   ls -lh public/ui_demo.json
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open in browser**: Navigate to `http://localhost:5173` (or the port shown in terminal)

### Building for Production

```bash
npm run build
npm run preview
```

## 📊 Data Flow

```
ui_demo.json (Public)
    ↓
loadVulnerabilityData() [utils/dataUtils.ts]
    ↓
VulnerabilityContext [context/VulnerabilityContext.tsx]
    ↓ (process & filter)
processVulnerabilityData() & filterVulnerabilities()
    ↓
Dashboard Components
    ├── Statistics
    ├── Charts (SeverityChart, RiskFactorsChart, TrendChart)
    ├── VulnerabilityList (virtualized)
    ├── SearchFilter
    ├── Export
    └── Comparison
```

### Data Processing Pipeline

1. **Load**: Fetch JSON data from public directory
2. **Process**: Transform nested structure into flat array with context
3. **Filter**: Apply kaiStatus exclusions and user-defined filters
4. **Sort**: Order by severity, CVSS, date, or CVE
5. **Render**: Display in virtualized list and visualizations

## 🧩 Component Structure

### Context Layer
- **VulnerabilityContext**: Manages global state including:
  - Raw and processed vulnerability data
  - Active filters
  - Sort preferences
  - Selected vulnerabilities for comparison
  - Loading and error states

### Dashboard Components

#### Statistics
- Displays aggregate metrics
- Shows severity distribution counts
- Calculates AI vs Manual analysis ratio
- Provides CVSS averages

#### Charts
- **SeverityChart**: Uses Recharts BarChart
- **RiskFactorsChart**: Horizontal bar chart with tooltip
- **TrendChart**: Multi-line chart for trends
- All charts are lazy-loaded for performance

#### VulnerabilityList
- Uses react-window for virtualization
- Renders only visible items
- Supports selection for comparison
- Highlights critical vulnerabilities

#### SearchFilter
- Debounced search input
- Real-time CVE suggestions
- Multiple filter criteria
- Reset functionality

#### Export
- JSON and CSV export formats
- Client-side file generation
- Automatic downloads with timestamps

#### Comparison
- Side-by-side vulnerability comparison
- Displays key properties in table format
- Highlights AI analysis status
- Supports clearing selection

## ⚡ Performance Optimizations

### Code Splitting
- Lazy loading of chart components using React.lazy()
- Reduces initial bundle size
- Improves Time to Interactive (TTI)

### Virtualization
- React Window for list rendering
- Only renders visible items (~10-15 at a time)
- Handles 100,000+ vulnerabilities efficiently

### Memoization
- useMemo for expensive calculations
- Prevents unnecessary re-computations
- Statistics and chart data are memoized

### Debouncing
- 300ms debounce on search input
- Reduces filter operations
- Improves search performance

### Data Processing
- Single-pass filtering
- Efficient sorting algorithms
- Minimal object transformations

## 📖 Usage Guide

### Basic Usage

1. **View Dashboard**: On load, see all vulnerabilities (excluding filtered kaiStatus values)

2. **Apply Filters**:
   - Click severity checkboxes to filter by severity
   - Enter search terms to find specific CVEs or packages
   - Set date ranges to filter by publication date

3. **Sort Data**:
   - Use the sort dropdown to change sort criteria
   - Toggle ascending/descending with the order button

4. **Compare Vulnerabilities**:
   - Click on vulnerabilities in the list to select them
   - View comparison table showing side-by-side details
   - Clear selection when done

5. **Export Data**:
   - Click "Export as JSON" or "Export as CSV"
   - Files download automatically with filtered data

### Advanced Features

- **Critical Highlights**: Look for 🔥 icons indicating critical vulnerabilities
- **AI Insights**: Review "AI vs Manual Analysis" in statistics
- **Trend Analysis**: Use the trend chart to identify vulnerability patterns over time
- **Risk Factors**: Identify common risk factors across vulnerabilities

## 📝 Code Comments

All major functions and components include JSDoc-style comments explaining:
- Purpose and functionality
- Parameters and return types
- Usage examples where applicable

## 🤝 Contributing

This project follows React and TypeScript best practices:
- Functional components with hooks
- TypeScript for type safety
- Modular component architecture
- CSS modules for styling
- Performance-first approach

## 📄 License

This project is part of the Ui-Demo-Data repository.

