import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Eye,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { predictions } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const priorityConfig = {
  critical: { color: 'bg-destructive text-destructive-foreground', label: 'Critical' },
  high: { color: 'bg-accent text-accent-foreground', label: 'High' },
  medium: { color: 'bg-warning text-warning-foreground', label: 'Medium' },
  low: { color: 'bg-muted text-muted-foreground', label: 'Low' },
};

const statusConfig = {
  new: { color: 'bg-primary/20 text-primary', label: 'New' },
  in_progress: { color: 'bg-warning/20 text-warning', label: 'In Progress' },
  scheduled: { color: 'bg-success/20 text-success', label: 'Scheduled' },
  resolved: { color: 'bg-muted text-muted-foreground', label: 'Resolved' },
};

export default function Predictions() {
  const [selectedPredictions, setSelectedPredictions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredPredictions = predictions.filter((p) => {
    const matchesSearch =
      p.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.component.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority =
      priorityFilter === 'all' || p.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const toggleSelection = (id: string) => {
    setSelectedPredictions((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedPredictions.length === filteredPredictions.length) {
      setSelectedPredictions([]);
    } else {
      setSelectedPredictions(filteredPredictions.map((p) => p.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold">Predictions</h1>
          <p className="text-muted-foreground mt-1">
            AI-generated failure predictions for all monitored vehicles
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4"
      >
        {[
          { label: 'Critical', count: predictions.filter((p) => p.priority === 'critical').length, color: 'text-destructive' },
          { label: 'High', count: predictions.filter((p) => p.priority === 'high').length, color: 'text-accent' },
          { label: 'Medium', count: predictions.filter((p) => p.priority === 'medium').length, color: 'text-warning' },
          { label: 'Low', count: predictions.filter((p) => p.priority === 'low').length, color: 'text-muted-foreground' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={cn('text-2xl font-bold', stat.color)}>{stat.count}</p>
          </div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-4"
      >
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Vehicle ID or Component..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

        {selectedPredictions.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-muted-foreground">
              {selectedPredictions.length} selected
            </span>
            <Button size="sm" variant="outline">
              Bulk Schedule
            </Button>
            <Button size="sm" variant="outline">
              Bulk Contact
            </Button>
          </div>
        )}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border shadow-sm overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedPredictions.length === filteredPredictions.length}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Vehicle ID</TableHead>
              <TableHead>Component</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Time to Failure</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPredictions.map((prediction) => (
              <TableRow key={prediction.id} className="hover:bg-muted/30">
                <TableCell>
                  <Checkbox
                    checked={selectedPredictions.includes(prediction.id)}
                    onCheckedChange={() => toggleSelection(prediction.id)}
                  />
                </TableCell>
                <TableCell className="font-mono font-medium">
                  {prediction.vehicleId}
                </TableCell>
                <TableCell>{prediction.component}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <Progress
                      value={prediction.probability}
                      className={cn(
                        'h-2 flex-1',
                        prediction.probability >= 80
                          ? '[&>div]:bg-destructive'
                          : prediction.probability >= 60
                          ? '[&>div]:bg-warning'
                          : '[&>div]:bg-success'
                      )}
                    />
                    <span className="text-sm font-medium w-12 text-right">
                      {prediction.probability}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {prediction.timeToFailure}
                </TableCell>
                <TableCell>
                  <Badge className={priorityConfig[prediction.priority].color}>
                    {priorityConfig[prediction.priority].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusConfig[prediction.status].color}
                  >
                    {statusConfig[prediction.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
