import { Vehicle, Prediction, Appointment, Agent, AgentActivity, TimelineEvent } from './types';

export const vehicles: Vehicle[] = [
  { id: 'MH-02-AB-1234', model: 'Tata Nexon EV', year: 2023, owner: 'Rahul Sharma', city: 'Mumbai', healthScore: 72, lastService: '2024-01-15', status: 'warning', sensors: { engineTemp: 85, brakeWear: 28, battery: 12.4, oilPressure: 45 } },
  { id: 'KA-01-XY-5678', model: 'Mahindra XUV700', year: 2022, owner: 'Priya Patel', city: 'Bangalore', healthScore: 88, lastService: '2024-02-20', status: 'healthy', sensors: { engineTemp: 82, brakeWear: 65, battery: 12.6, oilPressure: 48 } },
  { id: 'DL-03-PQ-9012', model: 'Hyundai Creta', year: 2023, owner: 'Amit Kumar', city: 'Delhi', healthScore: 65, lastService: '2024-01-08', status: 'warning', sensors: { engineTemp: 88, brakeWear: 35, battery: 11.9, oilPressure: 42 } },
  { id: 'TN-10-RS-3456', model: 'Kia Seltos', year: 2022, owner: 'Deepa Nair', city: 'Chennai', healthScore: 91, lastService: '2024-03-01', status: 'healthy', sensors: { engineTemp: 80, brakeWear: 72, battery: 12.7, oilPressure: 50 } },
  { id: 'GJ-05-CD-7890', model: 'Maruti Brezza', year: 2023, owner: 'Vikram Singh', city: 'Ahmedabad', healthScore: 78, lastService: '2024-02-10', status: 'healthy', sensors: { engineTemp: 83, brakeWear: 58, battery: 12.3, oilPressure: 46 } },
  { id: 'MH-14-EF-2345', model: 'Tata Harrier', year: 2022, owner: 'Sneha Reddy', city: 'Pune', healthScore: 45, lastService: '2023-12-20', status: 'critical', sensors: { engineTemp: 92, brakeWear: 15, battery: 11.5, oilPressure: 38 } },
  { id: 'KA-03-GH-6789', model: 'Toyota Fortuner', year: 2021, owner: 'Karan Mehta', city: 'Bangalore', healthScore: 95, lastService: '2024-03-10', status: 'healthy', sensors: { engineTemp: 78, brakeWear: 82, battery: 12.8, oilPressure: 52 } },
  { id: 'UP-32-IJ-1234', model: 'Hyundai Venue', year: 2023, owner: 'Anjali Gupta', city: 'Lucknow', healthScore: 82, lastService: '2024-02-28', status: 'healthy', sensors: { engineTemp: 81, brakeWear: 68, battery: 12.5, oilPressure: 47 } },
  { id: 'RJ-14-KL-5678', model: 'MG Hector', year: 2022, owner: 'Raj Malhotra', city: 'Jaipur', healthScore: 58, lastService: '2024-01-25', status: 'warning', sensors: { engineTemp: 89, brakeWear: 42, battery: 12.0, oilPressure: 40 } },
  { id: 'TG-02-MN-9012', model: 'Skoda Kushaq', year: 2023, owner: 'Meera Rao', city: 'Hyderabad', healthScore: 85, lastService: '2024-03-05', status: 'healthy', sensors: { engineTemp: 79, brakeWear: 75, battery: 12.6, oilPressure: 49 } },
  { id: 'WB-06-OP-3456', model: 'Honda City', year: 2022, owner: 'Arun Das', city: 'Kolkata', healthScore: 76, lastService: '2024-02-15', status: 'healthy', sensors: { engineTemp: 84, brakeWear: 55, battery: 12.4, oilPressure: 44 } },
  { id: 'MP-09-QR-7890', model: 'Jeep Compass', year: 2021, owner: 'Neha Verma', city: 'Indore', healthScore: 68, lastService: '2024-01-30', status: 'warning', sensors: { engineTemp: 87, brakeWear: 38, battery: 12.1, oilPressure: 43 } },
];

export const predictions: Prediction[] = [
  { id: 'P001', vehicleId: 'MH-02-AB-1234', component: 'Brake Pads', probability: 92, priority: 'critical', status: 'new', timeToFailure: '3-5 days', recommendedAction: 'Immediate service required', createdAt: '2024-03-15T10:23:00' },
  { id: 'P002', vehicleId: 'KA-01-XY-5678', component: 'Oil Filter', probability: 78, priority: 'high', status: 'in_progress', timeToFailure: '7-10 days', recommendedAction: 'Schedule service this week', createdAt: '2024-03-15T09:45:00' },
  { id: 'P003', vehicleId: 'DL-03-PQ-9012', component: 'Battery', probability: 85, priority: 'high', status: 'scheduled', timeToFailure: '5-7 days', recommendedAction: 'Replace battery', createdAt: '2024-03-15T08:30:00' },
  { id: 'P004', vehicleId: 'TN-10-RS-3456', component: 'Transmission', probability: 65, priority: 'medium', status: 'new', timeToFailure: '14-21 days', recommendedAction: 'Monitor closely', createdAt: '2024-03-15T11:00:00' },
  { id: 'P005', vehicleId: 'GJ-05-CD-7890', component: 'Tire Wear', probability: 58, priority: 'medium', status: 'new', timeToFailure: '21-30 days', recommendedAction: 'Plan tire rotation', createdAt: '2024-03-15T07:15:00' },
  { id: 'P006', vehicleId: 'MH-14-EF-2345', component: 'Engine Cooling', probability: 95, priority: 'critical', status: 'in_progress', timeToFailure: '1-2 days', recommendedAction: 'Emergency service needed', createdAt: '2024-03-15T06:00:00' },
  { id: 'P007', vehicleId: 'KA-03-GH-6789', component: 'Air Filter', probability: 45, priority: 'low', status: 'new', timeToFailure: '30+ days', recommendedAction: 'Regular maintenance', createdAt: '2024-03-14T16:30:00' },
  { id: 'P008', vehicleId: 'UP-32-IJ-1234', component: 'Spark Plugs', probability: 72, priority: 'high', status: 'new', timeToFailure: '10-14 days', recommendedAction: 'Schedule replacement', createdAt: '2024-03-14T14:20:00' },
  { id: 'P009', vehicleId: 'RJ-14-KL-5678', component: 'Suspension', probability: 68, priority: 'medium', status: 'scheduled', timeToFailure: '14-21 days', recommendedAction: 'Inspection required', createdAt: '2024-03-14T12:45:00' },
  { id: 'P010', vehicleId: 'TG-02-MN-9012', component: 'Clutch', probability: 55, priority: 'medium', status: 'new', timeToFailure: '21-30 days', recommendedAction: 'Monitor driving patterns', createdAt: '2024-03-14T10:30:00' },
  { id: 'P011', vehicleId: 'WB-06-OP-3456', component: 'Alternator', probability: 81, priority: 'high', status: 'new', timeToFailure: '7-10 days', recommendedAction: 'Schedule diagnostic', createdAt: '2024-03-14T09:00:00' },
  { id: 'P012', vehicleId: 'MP-09-QR-7890', component: 'Fuel Injector', probability: 62, priority: 'medium', status: 'new', timeToFailure: '14-21 days', recommendedAction: 'Fuel system check', createdAt: '2024-03-13T15:30:00' },
  { id: 'P013', vehicleId: 'MH-02-AB-1234', component: 'Wheel Bearing', probability: 48, priority: 'low', status: 'resolved', timeToFailure: '30+ days', recommendedAction: 'Next service', createdAt: '2024-03-13T11:00:00' },
  { id: 'P014', vehicleId: 'KA-01-XY-5678', component: 'Power Steering', probability: 73, priority: 'high', status: 'new', timeToFailure: '10-14 days', recommendedAction: 'Fluid check required', createdAt: '2024-03-13T08:45:00' },
  { id: 'P015', vehicleId: 'DL-03-PQ-9012', component: 'AC Compressor', probability: 52, priority: 'medium', status: 'new', timeToFailure: '21-30 days', recommendedAction: 'AC system inspection', createdAt: '2024-03-12T14:20:00' },
  { id: 'P016', vehicleId: 'TN-10-RS-3456', component: 'Exhaust System', probability: 38, priority: 'low', status: 'new', timeToFailure: '30+ days', recommendedAction: 'Visual inspection', createdAt: '2024-03-12T10:00:00' },
  { id: 'P017', vehicleId: 'GJ-05-CD-7890', component: 'Brake Fluid', probability: 67, priority: 'medium', status: 'scheduled', timeToFailure: '14-21 days', recommendedAction: 'Fluid replacement', createdAt: '2024-03-11T16:30:00' },
  { id: 'P018', vehicleId: 'MH-14-EF-2345', component: 'Timing Belt', probability: 88, priority: 'critical', status: 'in_progress', timeToFailure: '3-5 days', recommendedAction: 'Urgent replacement', createdAt: '2024-03-11T09:15:00' },
];

export const appointments: Appointment[] = [
  { id: 'A001', vehicleId: 'MH-02-AB-1234', ownerName: 'Rahul Sharma', serviceCenter: 'Tata Motors Andheri', serviceType: 'Brake Service', date: '2024-03-16', time: '10:00', status: 'confirmed' },
  { id: 'A002', vehicleId: 'KA-01-XY-5678', ownerName: 'Priya Patel', serviceCenter: 'Mahindra Whitefield', serviceType: 'Oil Change', date: '2024-03-16', time: '14:00', status: 'pending' },
  { id: 'A003', vehicleId: 'DL-03-PQ-9012', ownerName: 'Amit Kumar', serviceCenter: 'Hyundai Connaught Place', serviceType: 'Battery Replacement', date: '2024-03-17', time: '09:00', status: 'confirmed' },
  { id: 'A004', vehicleId: 'MH-14-EF-2345', ownerName: 'Sneha Reddy', serviceCenter: 'Tata Motors Hinjewadi', serviceType: 'Engine Diagnostic', date: '2024-03-16', time: '11:30', status: 'confirmed' },
  { id: 'A005', vehicleId: 'RJ-14-KL-5678', ownerName: 'Raj Malhotra', serviceCenter: 'MG Vaishali Nagar', serviceType: 'Suspension Check', date: '2024-03-18', time: '15:00', status: 'pending' },
  { id: 'A006', vehicleId: 'GJ-05-CD-7890', ownerName: 'Vikram Singh', serviceCenter: 'Maruti Arena SG Highway', serviceType: 'Tire Rotation', date: '2024-03-19', time: '10:30', status: 'confirmed' },
  { id: 'A007', vehicleId: 'UP-32-IJ-1234', ownerName: 'Anjali Gupta', serviceCenter: 'Hyundai Gomti Nagar', serviceType: 'Spark Plug Replace', date: '2024-03-20', time: '09:00', status: 'pending' },
  { id: 'A008', vehicleId: 'WB-06-OP-3456', ownerName: 'Arun Das', serviceCenter: 'Honda Salt Lake', serviceType: 'Alternator Check', date: '2024-03-17', time: '12:00', status: 'confirmed' },
  { id: 'A009', vehicleId: 'TG-02-MN-9012', ownerName: 'Meera Rao', serviceCenter: 'Skoda Hitech City', serviceType: 'Regular Service', date: '2024-03-21', time: '14:30', status: 'pending' },
  { id: 'A010', vehicleId: 'KA-03-GH-6789', ownerName: 'Karan Mehta', serviceCenter: 'Toyota Koramangala', serviceType: 'General Checkup', date: '2024-03-22', time: '11:00', status: 'confirmed' },
  { id: 'A011', vehicleId: 'TN-10-RS-3456', ownerName: 'Deepa Nair', serviceCenter: 'Kia Anna Nagar', serviceType: 'AC Service', date: '2024-03-18', time: '10:00', status: 'confirmed' },
  { id: 'A012', vehicleId: 'MP-09-QR-7890', ownerName: 'Neha Verma', serviceCenter: 'Jeep Vijay Nagar', serviceType: 'Fuel System', date: '2024-03-19', time: '09:30', status: 'pending' },
  { id: 'A013', vehicleId: 'MH-02-AB-1234', ownerName: 'Rahul Sharma', serviceCenter: 'Tata Motors Andheri', serviceType: 'Completed Service', date: '2024-03-10', time: '10:00', status: 'completed' },
  { id: 'A014', vehicleId: 'DL-03-PQ-9012', ownerName: 'Amit Kumar', serviceCenter: 'Hyundai Connaught Place', serviceType: 'Oil Change', date: '2024-03-08', time: '14:00', status: 'completed' },
  { id: 'A015', vehicleId: 'KA-01-XY-5678', ownerName: 'Priya Patel', serviceCenter: 'Mahindra Whitefield', serviceType: 'Cancelled Appointment', date: '2024-03-12', time: '11:00', status: 'cancelled' },
];

export const agents: Agent[] = [
  { id: 'AG001', name: 'Master Agent', type: 'master', status: 'active', lastAction: 'Coordinating workflow', lastActionTime: '2 min ago' },
  { id: 'AG002', name: 'Data Analysis Agent', type: 'data_analysis', status: 'processing', lastAction: 'Analyzing vehicle MH-02-AB-1234', lastActionTime: 'Just now' },
  { id: 'AG003', name: 'Diagnosis Agent', type: 'diagnosis', status: 'idle', lastAction: 'Generated prediction P001', lastActionTime: '5 min ago' },
  { id: 'AG004', name: 'Engagement Agent', type: 'engagement', status: 'calling', lastAction: 'Contacting customer #3456', lastActionTime: '1 min ago' },
  { id: 'AG005', name: 'Scheduling Agent', type: 'scheduling', status: 'active', lastAction: 'Booking appointment A001', lastActionTime: '3 min ago' },
  { id: 'AG006', name: 'Feedback Agent', type: 'feedback', status: 'idle', lastAction: 'Survey sent to customer', lastActionTime: '15 min ago' },
  { id: 'AG007', name: 'UEBA Security Agent', type: 'ueba', status: 'active', lastAction: 'Monitoring behavioral patterns', lastActionTime: 'Continuous' },
];

export const agentActivities: AgentActivity[] = [
  { id: 'ACT001', agentType: 'data_analysis', action: 'Sensor data received', details: 'Vehicle MH-02-AB-1234 telemetry processed', timestamp: '2024-03-15T10:23:45', status: 'success' },
  { id: 'ACT002', agentType: 'diagnosis', action: 'Prediction generated', details: 'Brake failure probability: 92%', timestamp: '2024-03-15T10:28:12', status: 'success' },
  { id: 'ACT003', agentType: 'master', action: 'Workflow initiated', details: 'Critical alert triggered for P001', timestamp: '2024-03-15T10:28:30', status: 'success' },
  { id: 'ACT004', agentType: 'engagement', action: 'Customer contacted', details: 'Voice AI call to Rahul Sharma', timestamp: '2024-03-15T10:35:00', status: 'success' },
  { id: 'ACT005', agentType: 'scheduling', action: 'Appointment created', details: 'A001 scheduled for March 16, 10:00 AM', timestamp: '2024-03-15T10:42:15', status: 'success' },
  { id: 'ACT006', agentType: 'ueba', action: 'Security scan', details: 'Normal activity pattern confirmed', timestamp: '2024-03-15T11:15:00', status: 'success' },
  { id: 'ACT007', agentType: 'feedback', action: 'Survey dispatched', details: 'Post-service feedback to customer #2890', timestamp: '2024-03-15T11:30:22', status: 'success' },
  { id: 'ACT008', agentType: 'data_analysis', action: 'Batch analysis', details: '47 vehicles processed in batch', timestamp: '2024-03-15T11:45:00', status: 'success' },
  { id: 'ACT009', agentType: 'diagnosis', action: 'Pattern detected', details: 'Supplier A brake pads anomaly', timestamp: '2024-03-15T12:00:00', status: 'success' },
  { id: 'ACT010', agentType: 'master', action: 'Report generated', details: 'Manufacturing insight RCA/CAPA', timestamp: '2024-03-15T12:15:30', status: 'success' },
];

export const timelineEvents: TimelineEvent[] = [
  { id: 'TL001', time: '10:23', title: 'Brake failure detected', description: 'Vehicle MH-02-AB-1234 sensors indicate critical brake wear', type: 'detection' },
  { id: 'TL002', time: '10:28', title: 'Prediction generated', description: '92% confidence - immediate action required', type: 'prediction' },
  { id: 'TL003', time: '10:35', title: 'Customer contacted', description: 'Voice AI initiated call to Rahul Sharma', type: 'contact' },
  { id: 'TL004', time: '10:42', title: 'Appointment scheduled', description: 'Tomorrow 10:00 AM at Tata Motors Andheri', type: 'appointment' },
  { id: 'TL005', time: '11:15', title: 'UEBA Alert', description: 'Normal activity pattern - no anomalies detected', type: 'alert' },
  { id: 'TL006', time: '11:30', title: 'Manufacturing insight', description: 'Pattern identified in Supplier A brake pads', type: 'insight' },
];

export const componentPredictions = [
  { name: 'Brake System', value: 12, fill: 'hsl(var(--chart-1))' },
  { name: 'Engine', value: 8, fill: 'hsl(var(--chart-2))' },
  { name: 'Battery', value: 5, fill: 'hsl(var(--chart-3))' },
  { name: 'Transmission', value: 3, fill: 'hsl(var(--chart-4))' },
  { name: 'Suspension', value: 2, fill: 'hsl(var(--chart-5))' },
];

export const accuracyTrend = Array.from({ length: 30 }, (_, i) => ({
  date: `Mar ${i + 1}`,
  accuracy: 88 + Math.random() * 8,
  target: 90,
}));

export const utilizationData = Array.from({ length: 7 }, (_, i) => ({
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  scheduled: 45 + Math.random() * 20,
  walkin: 15 + Math.random() * 10,
  predicted: 25 + Math.random() * 15,
}));
