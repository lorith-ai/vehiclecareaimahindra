import { motion } from 'framer-motion';
import { Bot, Activity } from 'lucide-react';
import { agents } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const statusConfig = {
  active: { color: 'bg-success', pulse: true, label: 'Active' },
  processing: { color: 'bg-primary', pulse: true, label: 'Processing' },
  idle: { color: 'bg-muted-foreground', pulse: false, label: 'Idle' },
  calling: { color: 'bg-success', pulse: true, label: 'On Call' },
};

const agentIcons: Record<string, string> = {
  master: '🧠',
  data_analysis: '📊',
  diagnosis: '🔍',
  engagement: '📞',
  scheduling: '📅',
  feedback: '⭐',
  ueba: '🛡️',
};

export function AgentStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card rounded-xl border shadow-sm"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-lg">Live Agent Status</h3>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {agents.map((agent, index) => {
          const status = statusConfig[agent.status];

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0 text-2xl">
                {agentIcons[agent.type]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{agent.name}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="relative">
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full',
                          status.color
                        )}
                      />
                      {status.pulse && (
                        <div
                          className={cn(
                            'absolute inset-0 w-2 h-2 rounded-full animate-ping',
                            status.color
                          )}
                        />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {status.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {agent.lastAction}
                </p>
              </div>

              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {agent.lastActionTime}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
