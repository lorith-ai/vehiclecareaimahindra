import { Vehicle } from '../types';

export interface VehicleSensorData {
  engineTemp: number;
  brakeWear: number;
  battery: number;
  oilPressure: number;
  odometer: number;
}

export interface SimulationAlert {
  id: string;
  vehicleId: string;
  type: 'critical' | 'warning';
  component: string;
  message: string;
  timestamp: string;
}

export interface SimulationState {
  vehicles: Vehicle[];
  alerts: SimulationAlert[];
  isRunning: boolean;
  speed: number; // 1x, 2x, 5x, 10x
  lastUpdate: number;
}

export class VehicleSimulationEngine {
  private vehicles: Vehicle[];
  private baseVehicles: Vehicle[];
  private alerts: SimulationAlert[] = [];
  private updateInterval: NodeJS.Timeout | null = null;
  private isRunning = false;
  private speed = 1; // 1x normal speed
  private lastUpdate = Date.now();
  private onUpdateCallback: ((state: SimulationState) => void) | null = null;
  private alertIdCounter = 0;

  // Component wear rates (per update cycle)
  private readonly WEAR_RATES = {
    brakeWear: 0.1, // 0.1% per cycle
    oilPressure: 0.05, // 0.05 PSI decrease per cycle
    battery: 0.001, // 0.001V decrease per cycle
  };

  // Normal operating ranges
  private readonly RANGES = {
    engineTemp: { min: 85, max: 95, critical: 100 },
    brakeWear: { min: 0, max: 100, critical: 80 },
    oilPressure: { min: 35, max: 50, critical: 30 },
    battery: { min: 12.0, max: 12.8, critical: 12.2 },
  };

  constructor(initialVehicles: Vehicle[]) {
    this.baseVehicles = JSON.parse(JSON.stringify(initialVehicles)); // Deep clone
    this.vehicles = JSON.parse(JSON.stringify(initialVehicles));
    
    // Initialize odometer for each vehicle (not in original type, but we'll track it)
    this.vehicles.forEach((v) => {
      (v as any).odometer = Math.floor(Math.random() * 50000) + 10000;
    });
  }

  start(onUpdate: (state: SimulationState) => void) {
    this.onUpdateCallback = onUpdate;
    this.isRunning = true;
    this.lastUpdate = Date.now();
    
    // Base interval: 2-5 seconds, adjusted by speed
    const baseInterval = 3000; // 3 seconds average
    const interval = baseInterval / this.speed;

    this.updateInterval = setInterval(() => {
      this.updateVehicles();
    }, interval);
  }

  stop() {
    this.isRunning = false;
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  setSpeed(speed: number) {
    this.speed = speed;
    if (this.isRunning) {
      // Restart with new interval
      this.stop();
      this.start(this.onUpdateCallback!);
    }
  }

  reset() {
    this.stop();
    this.vehicles = JSON.parse(JSON.stringify(this.baseVehicles));
    this.alerts = [];
    this.alertIdCounter = 0;
    
    // Reinitialize odometers
    this.vehicles.forEach((v) => {
      (v as any).odometer = Math.floor(Math.random() * 50000) + 10000;
    });

    if (this.onUpdateCallback) {
      this.onUpdateCallback(this.getState());
    }
  }

  injectFailure(vehicleId: string, component: 'brake' | 'engine' | 'battery' | 'oil') {
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    switch (component) {
      case 'brake':
        vehicle.sensors.brakeWear = 95;
        this.addAlert(vehicleId, 'critical', 'Brake Pads', 'Brake pads critically worn - immediate service required');
        break;
      case 'engine':
        vehicle.sensors.engineTemp = 105;
        this.addAlert(vehicleId, 'critical', 'Engine', 'Engine temperature critically high - overheating detected');
        break;
      case 'battery':
        vehicle.sensors.battery = 11.5;
        this.addAlert(vehicleId, 'critical', 'Battery', 'Battery voltage critically low - replacement needed');
        break;
      case 'oil':
        vehicle.sensors.oilPressure = 25;
        this.addAlert(vehicleId, 'critical', 'Oil Pressure', 'Oil pressure critically low - check immediately');
        break;
    }

    this.updateVehicleHealth(vehicle);
    if (this.onUpdateCallback) {
      this.onUpdateCallback(this.getState());
    }
  }

  private updateVehicles() {
    this.vehicles.forEach((vehicle) => {
      this.updateVehicleSensors(vehicle);
      this.updateVehicleHealth(vehicle);
      this.checkThresholds(vehicle);
    });

    // Simulate "driving" - increment odometer
    this.vehicles.forEach((vehicle) => {
      const distance = (Math.random() * 2 + 0.5) * this.speed; // 0.5-2.5 km per update
      (vehicle as any).odometer = ((vehicle as any).odometer || 0) + distance;
    });

    this.lastUpdate = Date.now();
    
    if (this.onUpdateCallback) {
      this.onUpdateCallback(this.getState());
    }
  }

  private updateVehicleSensors(vehicle: Vehicle) {
    const sensors = vehicle.sensors;

    // Engine Temperature: Normal variation with occasional spikes
    const tempVariation = (Math.random() - 0.5) * 3; // ±1.5°C variation
    sensors.engineTemp = Math.max(
      this.RANGES.engineTemp.min,
      Math.min(this.RANGES.engineTemp.max, sensors.engineTemp + tempVariation)
    );

    // Random anomaly: 2% chance of sudden temp spike
    if (Math.random() < 0.02) {
      sensors.engineTemp = Math.min(110, sensors.engineTemp + Math.random() * 15 + 5);
    }

    // Brake Wear: Gradually increases
    sensors.brakeWear = Math.min(100, sensors.brakeWear + this.WEAR_RATES.brakeWear * this.speed);
    
    // Random anomaly: 1% chance of sudden wear increase
    if (Math.random() < 0.01) {
      sensors.brakeWear = Math.min(100, sensors.brakeWear + Math.random() * 10 + 5);
    }

    // Oil Pressure: Gradually decreases, with normal variation
    const pressureVariation = (Math.random() - 0.5) * 2; // ±1 PSI variation
    sensors.oilPressure = Math.max(
      this.RANGES.oilPressure.critical - 5,
      Math.min(this.RANGES.oilPressure.max, sensors.oilPressure - this.WEAR_RATES.oilPressure * this.speed + pressureVariation)
    );

    // Random anomaly: 1.5% chance of pressure drop
    if (Math.random() < 0.015) {
      sensors.oilPressure = Math.max(20, sensors.oilPressure - Math.random() * 10 - 5);
    }

    // Battery: Gradually decreases
    sensors.battery = Math.max(
      this.RANGES.battery.critical - 0.5,
      Math.min(this.RANGES.battery.max, sensors.battery - this.WEAR_RATES.battery * this.speed)
    );

    // Random anomaly: 1% chance of voltage drop
    if (Math.random() < 0.01) {
      sensors.battery = Math.max(11.0, sensors.battery - Math.random() * 0.5 - 0.2);
    }
  }

  private updateVehicleHealth(vehicle: Vehicle) {
    const { engineTemp, brakeWear, battery, oilPressure } = vehicle.sensors;
    
    // Calculate health score (0-100)
    let healthScore = 100;

    // Engine temp penalty
    if (engineTemp > this.RANGES.engineTemp.critical) {
      healthScore -= 30;
    } else if (engineTemp > this.RANGES.engineTemp.max) {
      healthScore -= 15;
    }

    // Brake wear penalty
    if (brakeWear > this.RANGES.brakeWear.critical) {
      healthScore -= 25;
    } else if (brakeWear > 60) {
      healthScore -= 10;
    }

    // Oil pressure penalty
    if (oilPressure < this.RANGES.oilPressure.critical) {
      healthScore -= 20;
    } else if (oilPressure < 35) {
      healthScore -= 10;
    }

    // Battery penalty
    if (battery < this.RANGES.battery.critical) {
      healthScore -= 15;
    } else if (battery < 12.3) {
      healthScore -= 5;
    }

    vehicle.healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));

    // Update status based on health score
    if (vehicle.healthScore < 50) {
      vehicle.status = 'critical';
    } else if (vehicle.healthScore < 70) {
      vehicle.status = 'warning';
    } else {
      vehicle.status = 'healthy';
    }
  }

  private checkThresholds(vehicle: Vehicle) {
    const { engineTemp, brakeWear, battery, oilPressure } = vehicle.sensors;

    // Check engine temperature
    if (engineTemp > this.RANGES.engineTemp.critical) {
      this.addAlert(vehicle.id, 'critical', 'Engine', `Engine temperature critically high: ${engineTemp.toFixed(1)}°C`);
    } else if (engineTemp > this.RANGES.engineTemp.max && Math.random() < 0.3) {
      this.addAlert(vehicle.id, 'warning', 'Engine', `Engine temperature elevated: ${engineTemp.toFixed(1)}°C`);
    }

    // Check brake wear
    if (brakeWear > this.RANGES.brakeWear.critical) {
      this.addAlert(vehicle.id, 'critical', 'Brake Pads', `Brake pads critically worn: ${brakeWear.toFixed(1)}%`);
    } else if (brakeWear > 70 && Math.random() < 0.2) {
      this.addAlert(vehicle.id, 'warning', 'Brake Pads', `Brake pads wearing: ${brakeWear.toFixed(1)}%`);
    }

    // Check oil pressure
    if (oilPressure < this.RANGES.oilPressure.critical) {
      this.addAlert(vehicle.id, 'critical', 'Oil Pressure', `Oil pressure critically low: ${oilPressure.toFixed(1)} PSI`);
    } else if (oilPressure < 35 && Math.random() < 0.25) {
      this.addAlert(vehicle.id, 'warning', 'Oil Pressure', `Oil pressure low: ${oilPressure.toFixed(1)} PSI`);
    }

    // Check battery
    if (battery < this.RANGES.battery.critical) {
      this.addAlert(vehicle.id, 'critical', 'Battery', `Battery voltage critically low: ${battery.toFixed(2)}V`);
    } else if (battery < 12.3 && Math.random() < 0.2) {
      this.addAlert(vehicle.id, 'warning', 'Battery', `Battery voltage low: ${battery.toFixed(2)}V`);
    }
  }

  private addAlert(vehicleId: string, type: 'critical' | 'warning', component: string, message: string) {
    // Avoid duplicate alerts for the same issue
    const recentAlert = this.alerts.find(
      (a) => a.vehicleId === vehicleId && a.component === component && 
      Date.now() - new Date(a.timestamp).getTime() < 30000 // 30 seconds
    );

    if (recentAlert) return;

    const alert: SimulationAlert = {
      id: `ALERT-${++this.alertIdCounter}`,
      vehicleId,
      type,
      component,
      message,
      timestamp: new Date().toISOString(),
    };

    this.alerts.unshift(alert);
    
    // Keep only last 50 alerts
    if (this.alerts.length > 50) {
      this.alerts = this.alerts.slice(0, 50);
    }
  }

  getState(): SimulationState {
    return {
      vehicles: [...this.vehicles],
      alerts: [...this.alerts],
      isRunning: this.isRunning,
      speed: this.speed,
      lastUpdate: this.lastUpdate,
    };
  }

  getVehicles(): Vehicle[] {
    return [...this.vehicles];
  }

  getAlerts(): SimulationAlert[] {
    return [...this.alerts];
  }
}
