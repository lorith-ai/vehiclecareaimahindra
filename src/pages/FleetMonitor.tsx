import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Grid3X3,
  Map,
  Thermometer,
  Battery,
  Gauge,
  AlertTriangle,
  Phone,
  Calendar,
  Eye,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSimulation } from '@/contexts/SimulationContext';
import { cn } from '@/lib/utils';

const statusConfig = {
  healthy: { color: 'bg-success', label: 'Healthy' },
  warning: { color: 'bg-warning', label: 'Warning' },
  critical: { color: 'bg-destructive', label: 'Critical' },
};

export default function FleetMonitor() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { getVehicles, state } = useSimulation();
  const vehicles = getVehicles();

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) =>
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vehicles, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold">Fleet Monitor</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and manage all vehicles in your fleet
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-4"
      >
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Vehicle ID, Model, or City..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="healthy">Healthy</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('map')}
          >
            <Map className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle, index) => (
          <motion.div
            key={`${vehicle.id}-${state.lastUpdate}`}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-xl border shadow-sm hover:shadow-lg transition-all overflow-hidden relative"
          >
            {/* Real-time indicator */}
            {state.isRunning && (
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-success z-10"
                title="Live data"
              />
            )}
            {/* Header */}
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-mono font-bold text-lg">{vehicle.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {vehicle.model} • {vehicle.year}
                  </p>
                </div>
                <Badge className={cn(statusConfig[vehicle.status].color, 'text-white')}>
                  {statusConfig[vehicle.status].label}
                </Badge>
              </div>
            </div>

            {/* Health Score */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${vehicle.healthScore * 2.01} 201`}
                      className={cn(
                        vehicle.healthScore >= 80
                          ? 'text-success'
                          : vehicle.healthScore >= 60
                          ? 'text-warning'
                          : 'text-destructive'
                      )}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      key={`health-${vehicle.id}-${vehicle.healthScore}`}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl font-bold"
                    >
                      {vehicle.healthScore}
                    </motion.span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Health Score</p>
                  <p className="text-xs text-muted-foreground">
                    Owner: {vehicle.owner}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last Service: {vehicle.lastService}
                  </p>
                </div>
              </div>
            </div>

            {/* Sensors */}
            <div className="p-4 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Thermometer className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Engine</p>
                  <motion.p
                    key={`temp-${vehicle.id}-${vehicle.sensors.engineTemp}`}
                    initial={{ scale: 1.2, color: 'var(--primary)' }}
                    animate={{ scale: 1, color: 'inherit' }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'text-sm font-medium',
                      vehicle.sensors.engineTemp > 100 && 'text-destructive',
                      vehicle.sensors.engineTemp > 95 && vehicle.sensors.engineTemp <= 100 && 'text-warning'
                    )}
                  >
                    {vehicle.sensors.engineTemp.toFixed(1)}°C
                  </motion.p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Brake</p>
                  <motion.p
                    key={`brake-${vehicle.id}-${vehicle.sensors.brakeWear}`}
                    initial={{ scale: 1.2, color: 'var(--primary)' }}
                    animate={{ scale: 1, color: 'inherit' }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'text-sm font-medium',
                      vehicle.sensors.brakeWear > 80 && 'text-destructive',
                      vehicle.sensors.brakeWear > 60 && vehicle.sensors.brakeWear <= 80 && 'text-warning'
                    )}
                  >
                    {vehicle.sensors.brakeWear.toFixed(1)}%
                  </motion.p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <Battery className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Battery</p>
                  <motion.p
                    key={`battery-${vehicle.id}-${vehicle.sensors.battery}`}
                    initial={{ scale: 1.2, color: 'var(--primary)' }}
                    animate={{ scale: 1, color: 'inherit' }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'text-sm font-medium',
                      vehicle.sensors.battery < 12.2 && 'text-destructive',
                      vehicle.sensors.battery < 12.3 && vehicle.sensors.battery >= 12.2 && 'text-warning'
                    )}
                  >
                    {vehicle.sensors.battery.toFixed(2)}V
                  </motion.p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Gauge className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Oil</p>
                  <motion.p
                    key={`oil-${vehicle.id}-${vehicle.sensors.oilPressure}`}
                    initial={{ scale: 1.2, color: 'var(--primary)' }}
                    animate={{ scale: 1, color: 'inherit' }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'text-sm font-medium',
                      vehicle.sensors.oilPressure < 30 && 'text-destructive',
                      vehicle.sensors.oilPressure < 35 && vehicle.sensors.oilPressure >= 30 && 'text-warning'
                    )}
                  >
                    {vehicle.sensors.oilPressure.toFixed(1)} PSI
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border bg-muted/30 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Details
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Phone className="w-4 h-4 mr-1" />
                Contact
              </Button>
              <Button size="sm" variant="default" className="flex-1">
                <Calendar className="w-4 h-4 mr-1" />
                Schedule
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
