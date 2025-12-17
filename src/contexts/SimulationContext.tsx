import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Vehicle } from '@/lib/types';
import { VehicleSimulationEngine, SimulationState, SimulationAlert } from '@/lib/simulators/vehicleSimulationEngine';
import { vehicles as initialVehicles } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

interface SimulationContextType {
  state: SimulationState;
  start: () => void;
  stop: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  injectFailure: (vehicleId: string, component: 'brake' | 'engine' | 'battery' | 'oil') => void;
  getVehicles: () => Vehicle[];
  getAlerts: () => SimulationAlert[];
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SimulationState>({
    vehicles: initialVehicles.slice(0, 10), // Use first 10 vehicles
    alerts: [],
    isRunning: false,
    speed: 1,
    lastUpdate: Date.now(),
  });

  const engineRef = useRef<VehicleSimulationEngine | null>(null);
  const { toast } = useToast();
  const previousAlertsRef = useRef<Set<string>>(new Set());

  // Initialize engine
  useEffect(() => {
    const engine = new VehicleSimulationEngine(initialVehicles.slice(0, 10));
    engineRef.current = engine;
    setState(engine.getState());

    // Stop on unmount
    return () => {
      engine.stop();
    };
  }, []);

  const start = useCallback(() => {
    if (engineRef.current && !state.isRunning) {
      engineRef.current.start((newState) => {
        setState(newState);

        // Check for new critical alerts and show toast
        const currentAlertIds = new Set(newState.alerts.map((a) => a.id));
        const newAlerts = newState.alerts.filter(
          (alert) => !previousAlertsRef.current.has(alert.id) && alert.type === 'critical'
        );

        newAlerts.forEach((alert) => {
          const vehicle = newState.vehicles.find((v) => v.id === alert.vehicleId);
          toast({
            title: '🚨 Critical Alert',
            description: `${vehicle?.id || alert.vehicleId}: ${alert.message}`,
            variant: 'destructive',
            duration: 5000,
          });
        });

        previousAlertsRef.current = currentAlertIds;
      });
    }
  }, [state.isRunning, toast]);

  const stop = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.stop();
      setState((prev) => ({ ...prev, isRunning: false }));
    }
  }, []);

  const reset = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.reset();
      previousAlertsRef.current.clear();
      toast({
        title: 'Simulation Reset',
        description: 'All vehicles reset to initial state',
      });
    }
  }, [toast]);

  const setSpeed = useCallback((speed: number) => {
    if (engineRef.current) {
      engineRef.current.setSpeed(speed);
      setState((prev) => ({ ...prev, speed }));
    }
  }, []);

  const injectFailure = useCallback((vehicleId: string, component: 'brake' | 'engine' | 'battery' | 'oil') => {
    if (engineRef.current) {
      engineRef.current.injectFailure(vehicleId, component);
      const vehicle = state.vehicles.find((v) => v.id === vehicleId);
      toast({
        title: 'Failure Injected',
        description: `${vehicle?.id || vehicleId}: ${component} failure simulated`,
        variant: 'default',
      });
    }
  }, [state.vehicles, toast]);

  const getVehicles = useCallback(() => {
    return engineRef.current?.getVehicles() || state.vehicles;
  }, [state.vehicles]);

  const getAlerts = useCallback(() => {
    return engineRef.current?.getAlerts() || state.alerts;
  }, [state.alerts]);

  return (
    <SimulationContext.Provider
      value={{
        state,
        start,
        stop,
        reset,
        setSpeed,
        injectFailure,
        getVehicles,
        getAlerts,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
