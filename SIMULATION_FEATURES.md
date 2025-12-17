# Real-Time Vehicle Monitoring Simulation

## Overview
A comprehensive real-time vehicle monitoring simulation system has been added to the dashboard. The simulation provides realistic sensor data updates, anomaly detection, and visual feedback for demonstration purposes.

## Features Implemented

### 1. VehicleSimulationEngine (`src/lib/simulators/vehicleSimulationEngine.ts`)
- **Realistic Sensor Simulation:**
  - Engine Temperature: 85-95°C (normal), alerts if >100°C
  - Brake Pad Wear: 0-100% (alerts at >80%)
  - Oil Pressure: 35-50 PSI (alerts if <30 PSI)
  - Battery Voltage: 12.0-12.8V (alerts if <12.2V)
  - Odometer: Increments based on simulated driving

- **Gradual Component Wear:**
  - Brake pads increase by 0.1% per cycle
  - Oil pressure decreases by 0.05 PSI per cycle
  - Battery voltage decreases by 0.001V per cycle

- **Random Anomalies:**
  - 2% chance of engine temperature spike
  - 1% chance of sudden brake wear increase
  - 1.5% chance of oil pressure drop
  - 1% chance of battery voltage drop

- **Health Score Calculation:**
  - Automatically calculated based on sensor readings
  - Updates vehicle status (healthy/warning/critical)
  - Penalties applied for out-of-range sensors

### 2. Simulation Context (`src/contexts/SimulationContext.tsx`)
- **State Management:**
  - React Context for global simulation state
  - Provides vehicles, alerts, and control functions
  - Handles toast notifications for critical alerts

- **Control Functions:**
  - `start()` - Start simulation
  - `stop()` - Pause simulation
  - `reset()` - Reset all vehicles to initial state
  - `setSpeed(speed)` - Change simulation speed (1x, 2x, 5x, 10x)
  - `injectFailure(vehicleId, component)` - Force a component failure for demo

### 3. Header Controls (`src/components/layout/Header.tsx`)
- **Play/Pause Button:** Start or stop the simulation
- **Speed Control:** Dropdown to select 1x, 2x, 5x, or 10x speed
- **Reset Button:** Reset all vehicles to initial state
- **Inject Failure:** Dropdown menu to force failures:
  - Brake Failure
  - Engine Overheat
  - Battery Failure
  - Oil Pressure Drop
- **Status Indicator:** Pulsing green dot when simulation is running

### 4. Dashboard Integration (`src/pages/Dashboard.tsx`)
- **Real-Time Metrics:**
  - Active Vehicles count (from simulation)
  - Active Alerts (critical + warning)
  - Average Health Score (calculated from all vehicles)
  - Simulation Status indicator

- **Live Status Badge:** Shows "Live" indicator when simulation is running
- **Dynamic Updates:** All metrics update in real-time as simulation runs

### 5. FleetMonitor Integration (`src/pages/FleetMonitor.tsx`)
- **Real-Time Vehicle Cards:**
  - All 10 simulated vehicles displayed
  - Sensor values update smoothly with animations
  - Health scores update in real-time
  - Status badges change based on health

- **Visual Feedback:**
  - Pulsing indicator on cards when simulation is running
  - Smooth number transitions for sensor values
  - Color-coded sensor readings (red for critical, yellow for warning)
  - Animated health score updates

- **Search & Filter:** Works with real-time vehicle data

## Usage

### Starting the Simulation
1. Click the **Play** button in the header
2. Simulation starts at 1x speed (updates every ~3 seconds)
3. Green pulsing indicator shows simulation is active

### Controlling Speed
1. Click the speed dropdown (shows current speed, e.g., "1x")
2. Select desired speed: 1x, 2x, 5x, or 10x
3. Updates occur faster at higher speeds

### Injecting Failures (Demo Mode)
1. Click "Inject" button in header
2. Select a vehicle from the dropdown
3. Choose failure type:
   - **Brake Failure:** Sets brake wear to 95%
   - **Engine Overheat:** Sets engine temp to 105°C
   - **Battery Failure:** Sets battery to 11.5V
   - **Oil Pressure Drop:** Sets oil pressure to 25 PSI

### Resetting Simulation
1. Click the **Reset** button (circular arrow icon)
2. All vehicles return to initial state
3. All alerts are cleared
4. Odometer values reset

## Technical Details

### Performance Optimizations
- Uses React Context for efficient state sharing
- Memoized calculations to prevent unnecessary re-renders
- Smooth animations using Framer Motion
- Key-based updates for efficient React reconciliation

### Deterministic Behavior
- Simulation is deterministic and controllable
- Same initial state produces same progression
- Failures can be injected at specific times for demos
- Speed control allows fast-forwarding through scenarios

### Alert System
- Critical alerts trigger toast notifications
- Alerts are deduplicated (no duplicate alerts within 30 seconds)
- Alert history maintained (last 50 alerts)
- Visual indicators on affected vehicles

## File Structure

```
src/
├── lib/
│   └── simulators/
│       └── vehicleSimulationEngine.ts    # Core simulation engine
├── contexts/
│   └── SimulationContext.tsx             # React Context provider
├── components/
│   └── layout/
│       └── Header.tsx                    # Simulation controls
└── pages/
    ├── Dashboard.tsx                    # Real-time metrics
    └── FleetMonitor.tsx                 # Real-time vehicle cards
```

## Demo Scenarios

### Scenario 1: Normal Operation
1. Start simulation at 1x speed
2. Watch vehicles gradually age
3. Observe health scores decrease over time
4. See occasional warning alerts

### Scenario 2: Critical Failure
1. Start simulation
2. Wait for a vehicle to show warning status
3. Inject brake failure on that vehicle
4. Observe immediate critical alert toast
5. See health score drop to critical

### Scenario 3: Fast Forward
1. Start simulation at 10x speed
2. Watch rapid sensor changes
3. Multiple alerts appear quickly
4. Useful for demonstrating system response

### Scenario 4: Reset and Repeat
1. Run simulation until multiple alerts
2. Reset simulation
3. All vehicles return to healthy state
4. Perfect for repeating demos

## Future Enhancements

Potential additions:
- Historical data tracking
- Export simulation logs
- Custom vehicle profiles
- More sensor types
- Integration with prediction system
- Workflow triggers based on alerts
