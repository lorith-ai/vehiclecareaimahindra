export interface Vehicle {
  id: string;
  model: string;
  year: number;
  owner: string;
  city: string;
  healthScore: number;
  lastService: string;
  status: 'healthy' | 'warning' | 'critical';
  sensors: {
    engineTemp: number;
    brakeWear: number;
    battery: number;
    oilPressure: number;
  };
}

export interface Prediction {
  id: string;
  vehicleId: string;
  component: string;
  probability: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'new' | 'in_progress' | 'scheduled' | 'resolved';
  timeToFailure: string;
  recommendedAction: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  vehicleId: string;
  ownerName: string;
  serviceCenter: string;
  serviceType: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export interface AgentActivity {
  id: string;
  agentType: 'master' | 'data_analysis' | 'diagnosis' | 'engagement' | 'scheduling' | 'feedback' | 'ueba';
  action: string;
  details: string;
  timestamp: string;
  status: 'success' | 'processing' | 'error';
}

export interface Agent {
  id: string;
  name: string;
  type: 'master' | 'data_analysis' | 'diagnosis' | 'engagement' | 'scheduling' | 'feedback' | 'ueba';
  status: 'active' | 'processing' | 'idle' | 'calling';
  lastAction: string;
  lastActionTime: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'detection' | 'prediction' | 'contact' | 'appointment' | 'alert' | 'insight';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}
