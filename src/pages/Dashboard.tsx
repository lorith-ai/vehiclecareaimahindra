import { useMemo } from 'react';
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
import { useSimulation } from '@/contexts/SimulationContext';

export default function Dashboard() {
  const { getVehicles, getAlerts, state } = useSimulation();
  const vehicles = getVehicles();
  const alerts = getAlerts();

  // Calculate metrics from real-time data
  const metrics = useMemo(() => {
    const activeVehicles = vehicles.length;
    const criticalVehicles = vehicles.filter((v) => v.status === 'critical').length;
    const warningVehicles = vehicles.filter((v) => v.status === 'warning').length;
    const healthyVehicles = vehicles.filter((v) => v.status === 'healthy').length;
    const criticalAlerts = alerts.filter((a) => a.type === 'critical').length;
    const warningAlerts = alerts.filter((a) => a.type === 'warning').length;
    const avgHealthScore = vehicles.reduce((sum, v) => sum + v.healthScore, 0) / vehicles.length || 0;

    return {
      activeVehicles,
      criticalVehicles,
      warningVehicles,
      healthyVehicles,
      criticalAlerts,
      warningAlerts,
      avgHealthScore,
    };
  }, [vehicles, alerts]);
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-display font-bold">Dashboard</h1>
            {state.isRunning && (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-2 px-2 py-1 rounded-md bg-success/10 border border-success/20"
              >
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-xs text-success font-medium">Live</span>
              </motion.div>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Real-time overview of your predictive maintenance system
            {state.isRunning && ` • ${state.speed}x speed • ${vehicles.length} vehicles monitored`}
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Vehicles"
          value={metrics.activeVehicles.toString()}
          subtitle={`${metrics.healthyVehicles} healthy • ${metrics.warningVehicles} warning • ${metrics.criticalVehicles} critical`}
          icon={Car}
          trend={state.isRunning ? { value: 'Live', positive: true } : undefined}
          variant="primary"
          delay={0}
        />
        <MetricCard
          title="Active Alerts"
          value={(metrics.criticalAlerts + metrics.warningAlerts).toString()}
          subtitle={`${metrics.criticalAlerts} Critical • ${metrics.warningAlerts} Warning`}
          icon={AlertTriangle}
          breakdown={metrics.criticalAlerts > 0 ? `${metrics.criticalAlerts} Critical • ${metrics.warningAlerts} Warning` : undefined}
          variant={metrics.criticalAlerts > 0 ? 'warning' : 'default'}
          delay={0.1}
        />
        <MetricCard
          title="Average Health Score"
          value={metrics.avgHealthScore.toFixed(1)}
          subtitle={`${metrics.healthyVehicles} vehicles healthy`}
          icon={Activity}
          breakdown={`${metrics.warningVehicles} warning • ${metrics.criticalVehicles} critical`}
          variant={metrics.avgHealthScore >= 80 ? 'success' : metrics.avgHealthScore >= 60 ? 'warning' : 'destructive'}
          delay={0.2}
        />
        <MetricCard
          title="Simulation Status"
          value={state.isRunning ? 'Running' : 'Paused'}
          subtitle={`Speed: ${state.speed}x • ${alerts.length} alerts`}
          icon={Calendar}
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
