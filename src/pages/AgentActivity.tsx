import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Search,
  Filter,
  Pause,
  Play,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { agentActivities, agents } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const agentTypeConfig = {
  master: { label: 'Master', color: 'bg-primary', icon: '🧠' },
  data_analysis: { label: 'Data Analysis', color: 'bg-chart-1', icon: '📊' },
  diagnosis: { label: 'Diagnosis', color: 'bg-chart-2', icon: '🔍' },
  engagement: { label: 'Engagement', color: 'bg-chart-3', icon: '📞' },
  scheduling: { label: 'Scheduling', color: 'bg-chart-4', icon: '📅' },
  feedback: { label: 'Feedback', color: 'bg-chart-5', icon: '⭐' },
  ueba: { label: 'UEBA Security', color: 'bg-destructive', icon: '🛡️' },
};

const statusConfig = {
  success: { icon: CheckCircle, color: 'text-success' },
  processing: { icon: Clock, color: 'text-warning' },
  error: { icon: AlertTriangle, color: 'text-destructive' },
};

export default function AgentActivity() {
  const [isPaused, setIsPaused] = useState(false);
  const [activities, setActivities] = useState(agentActivities);
  const [filter, setFilter] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate real-time updates
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newActivity = {
        id: `ACT${Date.now()}`,
        agentType: ['master', 'data_analysis', 'diagnosis', 'engagement', 'scheduling', 'feedback'][
          Math.floor(Math.random() * 6)
        ] as any,
        action: [
          'Processing sensor data',
          'Analyzing vehicle patterns',
          'Generating prediction',
          'Customer notification sent',
          'Appointment confirmed',
          'Survey response received',
        ][Math.floor(Math.random() * 6)],
        details: `Vehicle ${['MH', 'KA', 'DL', 'TN'][Math.floor(Math.random() * 4)]}-0${
          Math.floor(Math.random() * 9) + 1
        }-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        )}-${Math.floor(Math.random() * 9000) + 1000}`,
        timestamp: new Date().toISOString(),
        status: 'success' as const,
      };

      setActivities((prev) => [newActivity, ...prev.slice(0, 49)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const filteredActivities =
    filter === 'all'
      ? activities
      : activities.filter((a) => a.agentType === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold">Agent Activity</h1>
        <p className="text-muted-foreground mt-1">
          Real-time monitoring of all AI agent activities
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-card rounded-xl border shadow-sm"
        >
          {/* Controls */}
          <div className="p-4 border-b border-border flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search activities..." className="pl-10" />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="master">Master Agent</SelectItem>
                <SelectItem value="data_analysis">Data Analysis</SelectItem>
                <SelectItem value="diagnosis">Diagnosis</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="scheduling">Scheduling</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Feed */}
          <div
            ref={scrollRef}
            className="h-[600px] overflow-y-auto scrollbar-thin"
          >
            <AnimatePresence initial={false}>
              {filteredActivities.map((activity, index) => {
                const config = agentTypeConfig[activity.agentType];
                const StatusIcon = statusConfig[activity.status].icon;

                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{config.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {config.label}
                          </Badge>
                          <StatusIcon
                            className={cn(
                              'w-4 h-4',
                              statusConfig[activity.status].color
                            )}
                          />
                        </div>
                        <p className="font-medium text-sm mt-1">
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {activity.details}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Agent Stats */}
        <div className="space-y-6">
          {/* Performance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border shadow-sm p-4"
          >
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              Agent Performance
            </h3>
            <div className="space-y-4">
              {agents.slice(0, 5).map((agent) => (
                <div key={agent.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {agentTypeConfig[agent.type].icon}
                    </span>
                    <span className="text-sm">{agent.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-success">
                      {Math.floor(Math.random() * 20 + 80)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* UEBA Security */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl border shadow-sm p-4"
          >
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-success" />
              UEBA Security Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <span className="text-sm">Threat Level</span>
                <Badge className="bg-success text-success-foreground">
                  Low
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-foreground">0</p>
                  <p className="text-xs text-muted-foreground">Anomalies</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-foreground">247</p>
                  <p className="text-xs text-muted-foreground">Events Scanned</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                All behavioral patterns within normal baseline
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
