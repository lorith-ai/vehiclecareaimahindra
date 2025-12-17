# 🚗 Intelligent Vehicle Care AI
## Predictive Maintenance Dashboard for Automotive OEMs

<div align="center">

**Built for EY Techathon 6.0**

*Revolutionizing vehicle maintenance through AI-powered predictive analytics and real-time monitoring*

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Real-Time Simulation](#-real-time-simulation)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Demo Scenarios](#-demo-scenarios)
- [Future Enhancements](#-future-enhancements)

---

## 🎯 Overview

**Intelligent Vehicle Care AI** is a cutting-edge predictive maintenance dashboard designed for automotive Original Equipment Manufacturers (OEMs). The platform leverages artificial intelligence and real-time data analytics to monitor vehicle health, predict component failures before they occur, and orchestrate automated maintenance workflows.

### The Problem

Traditional vehicle maintenance relies on scheduled service intervals or reactive repairs after failures occur. This approach leads to:
- ❌ Unexpected breakdowns and downtime
- ❌ Higher maintenance costs
- ❌ Poor customer experience
- ❌ Inefficient resource allocation

### Our Solution

An intelligent, AI-driven system that:
- ✅ **Predicts failures** before they happen using ML models
- ✅ **Monitors vehicles in real-time** with live sensor data
- ✅ **Automates workflows** through AI agent orchestration
- ✅ **Optimizes scheduling** based on predictive insights
- ✅ **Enhances security** with UEBA (User and Entity Behavior Analytics)

---

## ✨ Key Features

### 🎛️ **Real-Time Vehicle Monitoring**
- Live sensor data updates (engine temperature, brake wear, battery voltage, oil pressure)
- Health score calculation and status tracking
- Visual indicators for critical, warning, and healthy states
- Smooth animations and transitions for data updates

### 🤖 **AI Agent Orchestration**
- **Master Agent**: Coordinates workflow execution
- **Data Analysis Agent**: Processes sensor telemetry
- **Diagnosis Agent**: Generates failure predictions
- **Engagement Agent**: Handles customer communication
- **Scheduling Agent**: Manages appointment bookings
- **Feedback Agent**: Collects post-service feedback
- **UEBA Security Agent**: Monitors behavioral anomalies

### 📊 **Predictive Analytics**
- ML-powered failure probability calculations
- Component-specific prediction models
- Time-to-failure estimates
- Priority-based alerting system
- Historical trend analysis

### 📅 **Appointment Management**
- Automated appointment scheduling
- Service center integration
- Calendar view and list view
- Status tracking (confirmed, pending, completed, cancelled)

### 📈 **Business Intelligence**
- KPI dashboards with real-time metrics
- Component failure distribution charts
- Accuracy trend analysis
- Service center utilization metrics
- Customer satisfaction tracking

### 🔒 **Security & Compliance**
- UEBA (User and Entity Behavior Analytics) monitoring
- Anomaly detection and threat scoring
- Behavioral pattern analysis
- Security alert system

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3** - Modern UI library with hooks and context
- **TypeScript 5.8** - Type-safe development
- **Vite 5.4** - Lightning-fast build tool and dev server

### UI & Styling
- **shadcn/ui** - Beautiful, accessible component library
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library

### Data Visualization
- **Recharts** - Composable charting library
- **Custom Charts** - Tailored visualizations for vehicle data

### State Management
- **React Context API** - Global state for simulation
- **React Query (TanStack Query)** - Server state management (ready for API integration)
- **React Hooks** - Local component state

### Routing
- **React Router DOM 6.3** - Client-side routing

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🏗️ Architecture

### Component Architecture

```
src/
├── pages/                    # Main application pages
│   ├── Dashboard.tsx        # Overview with metrics and charts
│   ├── FleetMonitor.tsx     # Real-time vehicle monitoring
│   ├── Predictions.tsx      # Failure predictions management
│   ├── Appointments.tsx     # Service appointment scheduling
│   ├── AgentActivity.tsx    # AI agent activity feed
│   ├── Analytics.tsx        # Business intelligence dashboards
│   └── Settings.tsx         # System configuration
│
├── components/
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── MetricCard.tsx
│   │   ├── RecentPredictions.tsx
│   │   ├── AgentStatus.tsx
│   │   ├── ActivityTimeline.tsx
│   │   └── Charts.tsx
│   ├── layout/              # Layout components
│   │   ├── MainLayout.tsx
│   │   ├── Header.tsx       # Includes simulation controls
│   │   └── AppSidebar.tsx
│   └── ui/                  # Reusable UI components (40+)
│
├── contexts/
│   └── SimulationContext.tsx  # Real-time simulation state
│
├── lib/
│   ├── simulators/
│   │   └── vehicleSimulationEngine.ts  # Core simulation logic
│   ├── mockData.ts          # Initial vehicle and agent data
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Utility functions
│
└── hooks/                   # Custom React hooks
```

### Data Flow

```
VehicleSimulationEngine
    ↓ (updates every 2-5 seconds)
SimulationContext (React Context)
    ↓ (provides state)
Components (Dashboard, FleetMonitor, etc.)
    ↓ (displays data)
UI Updates (with animations)
```

---

## 🎮 Real-Time Simulation

The dashboard includes a sophisticated **VehicleSimulationEngine** that simulates realistic vehicle behavior for demonstrations and testing.

### Simulation Features

#### **Sensor Data Simulation**
- **Engine Temperature**: 85-95°C (normal), alerts if >100°C
- **Brake Pad Wear**: 0-100% (alerts at >80%)
- **Oil Pressure**: 35-50 PSI (alerts if <30 PSI)
- **Battery Voltage**: 12.0-12.8V (alerts if <12.2V)
- **Odometer**: Increments based on simulated driving

#### **Realistic Behavior**
- Gradual component wear over time
- Random anomalies (temperature spikes, pressure drops)
- Health score calculation based on sensor readings
- Automatic status updates (healthy → warning → critical)

#### **Simulation Controls**
- **Play/Pause**: Start or stop the simulation
- **Speed Control**: 1x, 2x, 5x, or 10x speed
- **Reset**: Return all vehicles to initial state
- **Inject Failure**: Force component failures for demos

#### **Visual Feedback**
- Pulsing indicators when simulation is running
- Smooth number transitions for sensor values
- Color-coded readings (red = critical, yellow = warning)
- Toast notifications for critical alerts
- Animated health score updates

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lorith-ai/vehiclecareaimahindra.git
   cd vehiclecareaimahindra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:8080
   ```

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Development build
npm run build:dev
```

---

## 📁 Project Structure

```
vehiclecareaimahindra/
├── public/
│   ├── favicon.png          # Application favicon
│   ├── robots.txt          # SEO robots file
│   └── placeholder.svg     # Placeholder images
│
├── src/
│   ├── components/         # React components
│   ├── contexts/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and simulators
│   ├── pages/             # Page components
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
│
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

---

## 📖 Usage Guide

### Starting the Simulation

1. Click the **Play** button (▶️) in the header
2. The simulation starts at 1x speed (updates every ~3 seconds)
3. A green pulsing indicator shows the simulation is active

### Controlling Simulation Speed

1. Click the speed dropdown (shows current speed, e.g., "1x")
2. Select desired speed: **1x**, **2x**, **5x**, or **10x**
3. Updates occur faster at higher speeds

### Injecting Failures (Demo Mode)

1. Click the **"Inject"** button in the header
2. Select a vehicle from the dropdown
3. Choose failure type:
   - **Brake Failure**: Sets brake wear to 95%
   - **Engine Overheat**: Sets engine temp to 105°C
   - **Battery Failure**: Sets battery to 11.5V
   - **Oil Pressure Drop**: Sets oil pressure to 25 PSI

### Resetting Simulation

1. Click the **Reset** button (🔄) in the header
2. All vehicles return to initial state
3. All alerts are cleared

### Navigating the Dashboard

- **Dashboard**: Overview with metrics, predictions, and charts
- **Fleet Monitor**: Real-time vehicle cards with sensor data
- **Predictions**: Detailed failure predictions table
- **Appointments**: Service appointment calendar and list
- **Agent Activity**: AI agent activity feed
- **Analytics**: Business intelligence dashboards
- **Settings**: System configuration

---

## 🎬 Demo Scenarios

### Scenario 1: Normal Operation
1. Start simulation at 1x speed
2. Watch vehicles gradually age over time
3. Observe health scores decrease naturally
4. See occasional warning alerts appear

### Scenario 2: Critical Failure
1. Start simulation
2. Wait for a vehicle to show warning status
3. Inject brake failure on that vehicle
4. Observe immediate critical alert toast notification
5. See health score drop to critical status

### Scenario 3: Fast Forward
1. Start simulation at 10x speed
2. Watch rapid sensor changes
3. Multiple alerts appear quickly
4. Perfect for demonstrating system response speed

### Scenario 4: Reset and Repeat
1. Run simulation until multiple alerts appear
2. Click reset button
3. All vehicles return to healthy state
4. Ideal for repeating demos

---

## 🔮 Future Enhancements

### Phase 1: Data Integration
- [ ] CSV data import/export functionality
- [ ] Real API integration
- [ ] WebSocket connections for live data
- [ ] Historical data storage

### Phase 2: ML Integration
- [ ] Real ML model integration
- [ ] Model training interface
- [ ] Prediction accuracy tracking
- [ ] A/B testing for models

### Phase 3: Advanced Features
- [ ] Voice agent interaction demo
- [ ] Enhanced UEBA analytics
- [ ] Workflow visualization
- [ ] Mobile app support

### Phase 4: Enterprise Features
- [ ] Multi-tenant support
- [ ] Role-based access control
- [ ] Audit logging
- [ ] Advanced reporting

---

## 🎨 Design Philosophy

This dashboard is built with **user experience** and **demonstration** in mind:

- **Real-time Updates**: Smooth animations and transitions make data changes feel natural
- **Visual Feedback**: Color-coded indicators and pulsing animations draw attention to important information
- **Deterministic Simulation**: Controllable scenarios perfect for presentations and demos
- **Modern UI**: Clean, professional design using shadcn/ui components
- **Accessibility**: Built on Radix UI primitives for screen reader support

---

## 🤝 Contributing

This project was built for **EY Techathon 6.0**. Contributions and feedback are welcome!

### Key Contributors
- Built with ❤️ for the automotive industry
- Designed for OEMs and fleet managers
- Powered by AI and predictive analytics

---

## 📄 License

This project is part of the EY Techathon 6.0 competition.

---

## 🙏 Acknowledgments

- **EY Techathon 6.0** for the opportunity
- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible primitives
- **Vite** team for the amazing build tool
- **React** team for the incredible framework

---

<div align="center">

**Made with ❤️ for EY Techathon 6.0**

*Intelligent Vehicle Care AI - Predicting the future, one vehicle at a time*

</div>
