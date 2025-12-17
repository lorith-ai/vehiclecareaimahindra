import { motion } from 'framer-motion';
import { Clock, AlertCircle, Phone, Calendar, Shield, Lightbulb } from 'lucide-react';
import { timelineEvents } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const typeConfig = {
  detection: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  prediction: { icon: AlertCircle, color: 'text-warning', bg: 'bg-warning/10' },
  contact: { icon: Phone, color: 'text-success', bg: 'bg-success/10' },
  appointment: { icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
  alert: { icon: Shield, color: 'text-muted-foreground', bg: 'bg-muted' },
  insight: { icon: Lightbulb, color: 'text-accent', bg: 'bg-accent/10' },
};

export function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card rounded-xl border shadow-sm"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-display font-semibold text-lg">Today's Activity</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />

          <div className="space-y-4">
            {timelineEvents.map((event, index) => {
              const config = typeConfig[event.type];
              const Icon = config.icon;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="relative flex gap-4 pl-2"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                      config.bg
                    )}
                  >
                    <Icon className={cn('w-3.5 h-3.5', config.color)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-muted-foreground">
                        {event.time}
                      </span>
                    </div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
