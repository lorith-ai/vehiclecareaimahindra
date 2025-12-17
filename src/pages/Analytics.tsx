import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Download,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const kpiData = [
  { name: 'Predictions Made', value: 1247, change: '+23%', icon: Target },
  { name: 'Cost Savings', value: '₹12.4L', change: '+18%', icon: DollarSign },
  { name: 'Customer Satisfaction', value: '94%', change: '+5%', icon: Users },
  { name: 'Prediction Accuracy', value: '92.3%', change: '+2.1%', icon: TrendingUp },
];

const monthlyData = [
  { month: 'Jan', predictions: 120, appointments: 98, resolved: 112 },
  { month: 'Feb', predictions: 145, appointments: 132, resolved: 128 },
  { month: 'Mar', predictions: 168, appointments: 155, resolved: 160 },
  { month: 'Apr', predictions: 192, appointments: 178, resolved: 185 },
  { month: 'May', predictions: 215, appointments: 198, resolved: 205 },
  { month: 'Jun', predictions: 238, appointments: 220, resolved: 230 },
];

const componentDistribution = [
  { name: 'Brake System', value: 28, color: 'hsl(var(--chart-1))' },
  { name: 'Engine', value: 22, color: 'hsl(var(--chart-2))' },
  { name: 'Battery', value: 18, color: 'hsl(var(--chart-3))' },
  { name: 'Transmission', value: 15, color: 'hsl(var(--chart-4))' },
  { name: 'Others', value: 17, color: 'hsl(var(--chart-5))' },
];

const satisfactionData = [
  { month: 'Jan', score: 88 },
  { month: 'Feb', score: 89 },
  { month: 'Mar', score: 91 },
  { month: 'Apr', score: 90 },
  { month: 'May', score: 93 },
  { month: 'Jun', score: 94 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Business insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="month">
            <SelectTrigger className="w-[150px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-card rounded-xl border p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{kpi.name}</p>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold">{kpi.value}</p>
                <span className="text-sm text-success">{kpi.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border p-6"
        >
          <h3 className="font-semibold mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="predictions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="appointments" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Component Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border p-6"
        >
          <h3 className="font-semibold mb-4">Failure Distribution by Component</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="60%" height={250}>
              <PieChart>
                <Pie
                  data={componentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {componentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {componentDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Customer Satisfaction Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-xl border p-6"
      >
        <h3 className="font-semibold mb-4">Customer Satisfaction Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={satisfactionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis domain={[80, 100]} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="hsl(var(--success))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--success))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Manufacturing Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6"
      >
        <h3 className="font-semibold flex items-center gap-2 mb-4">
          <span className="text-2xl">💡</span>
          Manufacturing Insight
        </h3>
        <div className="bg-card/80 rounded-lg p-4 backdrop-blur">
          <p className="font-medium">RCA/CAPA Analysis Result</p>
          <p className="text-muted-foreground mt-2">
            Brake pads from <span className="text-accent font-semibold">Supplier A</span> show{' '}
            <span className="text-destructive font-semibold">23% higher wear rate</span> compared
            to Supplier B across 847 vehicles analyzed.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Button variant="default" className="bg-accent hover:bg-accent/90">
              Send to Manufacturing
            </Button>
            <Button variant="outline">View Full Report</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
