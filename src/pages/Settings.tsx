import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Sliders,
  Bell,
  Users,
  Key,
  Plug,
  Shield,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure system parameters and preferences
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="system" className="gap-2">
              <Sliders className="w-4 h-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="agents" className="gap-2">
              <SettingsIcon className="w-4 h-4" />
              Agents
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Key className="w-4 h-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Plug className="w-4 h-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>
                  General system settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="ist">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-refresh Dashboard</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically refresh data every 30 seconds
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable UEBA Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Show behavioral anomaly alerts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agent Settings */}
          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Configuration</CardTitle>
                <CardDescription>
                  Configure AI agent thresholds and parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Critical Threshold</Label>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Slider defaultValue={[85]} max={100} step={1} />
                    <p className="text-xs text-muted-foreground mt-1">
                      Predictions above this threshold are marked as critical
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>High Threshold</Label>
                      <span className="text-sm text-muted-foreground">70%</span>
                    </div>
                    <Slider defaultValue={[70]} max={100} step={1} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Medium Threshold</Label>
                      <span className="text-sm text-muted-foreground">50%</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Agent Toggles</h4>
                  <div className="space-y-4">
                    {[
                      { name: 'Voice AI Engagement', enabled: true },
                      { name: 'Auto-scheduling', enabled: true },
                      { name: 'Manufacturing Insights', enabled: true },
                      { name: 'Customer Feedback Collection', enabled: false },
                    ].map((agent) => (
                      <div
                        key={agent.name}
                        className="flex items-center justify-between"
                      >
                        <Label>{agent.name}</Label>
                        <Switch defaultChecked={agent.enabled} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Critical Predictions', description: 'High-priority failure alerts' },
                  { label: 'New Predictions', description: 'All new prediction notifications' },
                  { label: 'Appointment Updates', description: 'Booking confirmations and changes' },
                  { label: 'Agent Status', description: 'Agent activity and errors' },
                  { label: 'System Alerts', description: 'Performance and security alerts' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <Label>{item.label}</Label>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Admin User', email: 'admin@ivc.ai', role: 'Admin' },
                    { name: 'Service Manager', email: 'service@ivc.ai', role: 'Manager' },
                    { name: 'Analyst', email: 'analyst@ivc.ai', role: 'Viewer' },
                  ].map((user) => (
                    <div
                      key={user.email}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Select defaultValue={user.role.toLowerCase()}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                <Button className="mt-4">
                  <Users className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage API keys for external integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Production API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value="sk-prod-xxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="font-mono"
                    />
                    <Button variant="outline">Copy</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Test API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value="sk-test-xxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="font-mono"
                    />
                    <Button variant="outline">Copy</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>External Integrations</CardTitle>
                <CardDescription>
                  Connect with service centers and telematics providers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Tata Service Network', status: 'Connected', icon: '🚗' },
                  { name: 'Mahindra Service Portal', status: 'Connected', icon: '🚙' },
                  { name: 'Telematics Provider A', status: 'Connected', icon: '📡' },
                  { name: 'SMS Gateway', status: 'Pending', icon: '📱' },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Status: {integration.status}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={
                        integration.status === 'Connected' ? 'outline' : 'default'
                      }
                    >
                      {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end"
      >
        <Button size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </motion.div>
    </div>
  );
}
