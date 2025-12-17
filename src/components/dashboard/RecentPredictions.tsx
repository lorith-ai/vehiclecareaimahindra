import { motion } from 'framer-motion';
import { AlertTriangle, Eye, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { predictions } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const priorityConfig = {
  critical: { color: 'bg-destructive text-destructive-foreground', label: 'Critical' },
  high: { color: 'bg-accent text-accent-foreground', label: 'High' },
  medium: { color: 'bg-warning text-warning-foreground', label: 'Medium' },
  low: { color: 'bg-muted text-muted-foreground', label: 'Low' },
};

const componentIcons: Record<string, string> = {
  'Brake Pads': '🛞',
  'Oil Filter': '🛢️',
  'Battery': '🔋',
  'Transmission': '⚙️',
  'Tire Wear': '🚗',
  'Engine Cooling': '🌡️',
  'Air Filter': '💨',
  'Spark Plugs': '⚡',
  'Suspension': '🔧',
  'Clutch': '🔄',
  'Alternator': '🔌',
  'Fuel Injector': '⛽',
};

export function RecentPredictions() {
  const recentPredictions = predictions.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-xl border shadow-sm"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3 className="font-display font-semibold text-lg">Latest Failure Predictions</h3>
          </div>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {recentPredictions.map((prediction, index) => (
          <motion.div
            key={prediction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Vehicle ID */}
              <div className="min-w-[140px]">
                <p className="font-mono font-medium text-sm">{prediction.vehicleId}</p>
              </div>

              {/* Component */}
              <div className="flex items-center gap-2 min-w-[140px]">
                <span className="text-lg">{componentIcons[prediction.component] || '🔧'}</span>
                <span className="text-sm">{prediction.component}</span>
              </div>

              {/* Probability */}
              <div className="flex-1 min-w-[120px] max-w-[160px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Probability</span>
                  <span className="text-sm font-semibold">{prediction.probability}%</span>
                </div>
                <Progress
                  value={prediction.probability}
                  className={cn(
                    'h-2',
                    prediction.probability >= 80
                      ? '[&>div]:bg-destructive'
                      : prediction.probability >= 60
                      ? '[&>div]:bg-warning'
                      : '[&>div]:bg-success'
                  )}
                />
              </div>

              {/* Priority Badge */}
              <div className="min-w-[80px]">
                <Badge className={priorityConfig[prediction.priority].color}>
                  {priorityConfig[prediction.priority].label}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-8">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                {prediction.priority === 'critical' && (
                  <Button size="sm" variant="destructive" className="h-8">
                    <Phone className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                )}
                {prediction.priority === 'high' && (
                  <Button size="sm" variant="secondary" className="h-8">
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
