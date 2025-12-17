import { motion } from 'framer-motion';
import { Car, Activity, AlertTriangle, Calendar, Wrench } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RecentPredictions } from '@/components/dashboard/RecentPredictions';
import { AgentStatus } from '@/components/dashboard/AgentStatus';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';
import {
  PredictionsByComponent,
  AccuracyTrendChart,
  UtilizationChart,
} from '@/components/dashboard/Charts';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Real-time overview of your predictive maintenance system
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Vehicles"
          value="247"
          subtitle="Vehicles monitored"
          icon={Car}
          trend={{ value: '+12 this week', positive: true }}
          variant="primary"
          delay={0}
        />
        <MetricCard
          title="Predictions Today"
          value="18"
          subtitle="Failure predictions"
          icon={AlertTriangle}
          breakdown="3 Critical • 7 High • 8 Medium"
          variant="warning"
          delay={0.1}
        />
        <MetricCard
          title="Scheduled Appointments"
          value="23"
          subtitle="This week"
          icon={Calendar}
          breakdown="15 confirmed • 8 pending"
          variant="success"
          delay={0.2}
        />
        <MetricCard
          title="System Health"
          value="98.5%"
          subtitle="All agents operational"
          icon={Activity}
          variant="default"
          delay={0.3}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <RecentPredictions />
          <PredictionsByComponent />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <AgentStatus />
          <ActivityTimeline />
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccuracyTrendChart />
        <UtilizationChart />
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-6 border-t border-border"
      >
        <p className="text-sm text-muted-foreground">
          Made for <span className="font-semibold text-primary">EY Techathon 6.0</span> • Intelligent Vehicle Care AI
        </p>
      </motion.div>
    </div>
  );
}
