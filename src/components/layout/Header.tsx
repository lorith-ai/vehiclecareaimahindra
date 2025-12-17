import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, ChevronRight, Home, Play, Pause, RotateCcw, Zap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSimulation } from '@/contexts/SimulationContext';
import { cn } from '@/lib/utils';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/fleet': 'Fleet Monitor',
  '/predictions': 'Predictions',
  '/appointments': 'Appointments',
  '/agents': 'Agent Activity',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

const notifications = [
  { id: 1, title: 'Critical Alert', message: 'Vehicle MH-02-AB-1234 requires immediate attention', time: '2 min ago', type: 'critical' },
  { id: 2, title: 'Appointment Confirmed', message: 'Service booked for KA-01-XY-5678', time: '15 min ago', type: 'success' },
  { id: 3, title: 'New Prediction', message: '3 new predictions generated', time: '1 hour ago', type: 'info' },
];

export function Header() {
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);
  const { state: simState, start, stop, reset, setSpeed, injectFailure, getVehicles } = useSimulation();

  const currentPage = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-30">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Left: Breadcrumb & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-foreground font-medium">{currentPage}</span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl">
          <motion.div
            animate={{ scale: searchFocused ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search vehicles, predictions, appointments..."
              className="pl-10 bg-muted/50 border-border/50 focus:bg-background transition-colors"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </motion.div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Simulation Controls */}
          <div className="flex items-center gap-2 border-r border-border pr-3">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => simState.isRunning ? stop() : start()}
              className="h-9 w-9"
            >
              {simState.isRunning ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>

            {/* Speed Control */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-xs">{simState.speed}x</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Simulation Speed</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[1, 2, 5, 10].map((speed) => (
                  <DropdownMenuItem
                    key={speed}
                    onClick={() => setSpeed(speed)}
                    className={cn(simState.speed === speed && 'bg-accent')}
                  >
                    {speed}x Speed
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Reset */}
            <Button
              variant="ghost"
              size="icon"
              onClick={reset}
              className="h-9 w-9"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            {/* Inject Failure */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 gap-1 text-destructive hover:text-destructive">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-xs">Inject</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Inject Failure</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {getVehicles().slice(0, 5).map((vehicle) => (
                  <DropdownMenuSub key={vehicle.id}>
                    <DropdownMenuSubTrigger className="text-xs">
                      {vehicle.id}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => injectFailure(vehicle.id, 'brake')}>
                        Brake Failure
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => injectFailure(vehicle.id, 'engine')}>
                        Engine Overheat
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => injectFailure(vehicle.id, 'battery')}>
                        Battery Failure
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => injectFailure(vehicle.id, 'oil')}>
                        Oil Pressure Drop
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Indicator */}
            {simState.isRunning && (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-success"
                title="Simulation Running"
              />
            )}
          </div>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                  3
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-4 border-b border-border">
                <h4 className="font-semibold">Notifications</h4>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">{notif.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notif.message}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    AK
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm hidden md:inline">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>API Keys</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
