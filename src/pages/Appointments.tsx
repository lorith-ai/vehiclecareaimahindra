import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  List,
  Plus,
  Clock,
  MapPin,
  User,
  Car,
  Phone,
  Edit,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { appointments } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const statusConfig = {
  confirmed: { color: 'bg-success text-success-foreground', label: 'Confirmed' },
  pending: { color: 'bg-warning text-warning-foreground', label: 'Pending' },
  completed: { color: 'bg-muted text-muted-foreground', label: 'Completed' },
  cancelled: { color: 'bg-destructive/20 text-destructive', label: 'Cancelled' },
};

export default function Appointments() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const upcomingAppointments = appointments.filter(
    (a) => a.status === 'confirmed' || a.status === 'pending'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-1">
            Manage service appointments and schedules
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              <CalendarIcon className="w-4 h-4 mr-1" />
              Calendar
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4 mr-1" />
              List
            </Button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="vehicle">Vehicle ID</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MH-02-AB-1234">MH-02-AB-1234</SelectItem>
                      <SelectItem value="KA-01-XY-5678">KA-01-XY-5678</SelectItem>
                      <SelectItem value="DL-03-PQ-9012">DL-03-PQ-9012</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="service">Service Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brake">Brake Service</SelectItem>
                      <SelectItem value="oil">Oil Change</SelectItem>
                      <SelectItem value="battery">Battery Replacement</SelectItem>
                      <SelectItem value="general">General Checkup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input type="date" id="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input type="time" id="time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="center">Service Center</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service center" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tata-andheri">Tata Motors Andheri</SelectItem>
                      <SelectItem value="mahindra-whitefield">Mahindra Whitefield</SelectItem>
                      <SelectItem value="hyundai-cp">Hyundai Connaught Place</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="mt-4">Schedule Appointment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4"
      >
        {[
          { label: 'Today', count: 4, color: 'text-primary' },
          { label: 'This Week', count: 23, color: 'text-success' },
          { label: 'Pending', count: 8, color: 'text-warning' },
          { label: 'Completed', count: 156, color: 'text-muted-foreground' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={cn('text-2xl font-bold', stat.color)}>{stat.count}</p>
          </div>
        ))}
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border shadow-sm p-4"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
          />
        </motion.div>

        {/* Appointments List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-4"
        >
          <h3 className="font-semibold">Upcoming Appointments</h3>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-card rounded-xl border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Car className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-mono font-semibold">{appointment.vehicleId}</h4>
                        <Badge className={statusConfig[appointment.status].color}>
                          {statusConfig[appointment.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {appointment.serviceType}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {appointment.ownerName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {appointment.date} at {appointment.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {appointment.serviceCenter}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
