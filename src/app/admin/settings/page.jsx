"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, Database, CreditCard, Truck, AlertTriangle, CheckCircle, Save } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useAuth } from "@/States/auth-context"

export default function SettingsPage() {
    const { user, hasPermission } = useAuth()
    const [isSaving, setIsSaving] = useState(false)
    const [settings, setSettings] = useState({
        siteName: "TechMart Electronics",
        siteDescription: "Your trusted electronics store",
        currency: "USD",
        timezone: "UTC",
        emailNotifications: true,
        smsNotifications: false,
        lowStockAlert: true,
        orderNotifications: true,
        maintenanceMode: false,
        allowRegistration: true,
        requireEmailVerification: true,
        maxLoginAttempts: 5,
        sessionTimeout: 30,
        backupFrequency: "daily",
        autoBackup: true,
    })

    const handleSave = async () => {
        setIsSaving(true)
        // Simulate save process
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSaving(false)
        console.log("Settings saved:", settings)
    }

    const systemHealth = [
        { component: "Database", status: "healthy", uptime: "99.9%" },
        { component: "API Server", status: "healthy", uptime: "99.8%" },
        { component: "File Storage", status: "warning", uptime: "98.5%" },
        { component: "Email Service", status: "healthy", uptime: "99.7%" },
        { component: "Payment Gateway", status: "healthy", uptime: "99.9%" },
    ]

    const getStatusBadge = (status) => {
        switch (status) {
            case "healthy":
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Healthy
                    </Badge>
                )
            case "warning":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Warning
                    </Badge>
                )
            case "error":
                return (
                    <Badge variant="destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Error
                    </Badge>
                )
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-600 mt-1">Manage your store configuration and preferences</p>
                    </div>
                    <Button onClick={handleSave} disabled={isSaving}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>

                <Tabs defaultValue="general" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                        <TabsTrigger value="system">System</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="w-5 h-5 mr-2" />
                                    General Settings
                                </CardTitle>
                                <CardDescription>Basic store configuration</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="siteName">Store Name</Label>
                                        <Input
                                            id="siteName"
                                            value={settings.siteName}
                                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Currency</Label>
                                        <Select
                                            value={settings.currency}
                                            onValueChange={(value) => setSettings({ ...settings, currency: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="USD">USD - US Dollar</SelectItem>
                                                <SelectItem value="EUR">EUR - Euro</SelectItem>
                                                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="siteDescription">Store Description</Label>
                                    <Textarea
                                        id="siteDescription"
                                        value={settings.siteDescription}
                                        onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                                        rows={3}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select
                                        value={settings.timezone}
                                        onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="UTC">UTC</SelectItem>
                                            <SelectItem value="EST">Eastern Time</SelectItem>
                                            <SelectItem value="PST">Pacific Time</SelectItem>
                                            <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Bell className="w-5 h-5 mr-2" />
                                    Notification Settings
                                </CardTitle>
                                <CardDescription>Configure how you receive notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Notifications</Label>
                                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                                    </div>
                                    <Switch
                                        checked={settings.emailNotifications}
                                        onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>SMS Notifications</Label>
                                        <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                                    </div>
                                    <Switch
                                        checked={settings.smsNotifications}
                                        onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Low Stock Alerts</Label>
                                        <p className="text-sm text-gray-500">Get notified when products are running low</p>
                                    </div>
                                    <Switch
                                        checked={settings.lowStockAlert}
                                        onCheckedChange={(checked) => setSettings({ ...settings, lowStockAlert: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Order Notifications</Label>
                                        <p className="text-sm text-gray-500">Get notified about new orders</p>
                                    </div>
                                    <Switch
                                        checked={settings.orderNotifications}
                                        onCheckedChange={(checked) => setSettings({ ...settings, orderNotifications: checked })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Shield className="w-5 h-5 mr-2" />
                                    Security Settings
                                </CardTitle>
                                <CardDescription>Configure security and access controls</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Allow User Registration</Label>
                                        <p className="text-sm text-gray-500">Allow new users to register accounts</p>
                                    </div>
                                    <Switch
                                        checked={settings.allowRegistration}
                                        onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Require Email Verification</Label>
                                        <p className="text-sm text-gray-500">Users must verify their email address</p>
                                    </div>
                                    <Switch
                                        checked={settings.requireEmailVerification}
                                        onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                                        <Input
                                            id="maxLoginAttempts"
                                            type="number"
                                            value={settings.maxLoginAttempts}
                                            onChange={(e) => setSettings({ ...settings, maxLoginAttempts: Number.parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                                        <Input
                                            id="sessionTimeout"
                                            type="number"
                                            value={settings.sessionTimeout}
                                            onChange={(e) => setSettings({ ...settings, sessionTimeout: Number.parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="payments" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2" />
                                    Payment Settings
                                </CardTitle>
                                <CardDescription>Configure payment methods and processing</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center py-8">
                                    <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Gateway Integration</h3>
                                    <p className="text-gray-500 mb-4">Connect your payment processors to accept payments</p>
                                    <Button variant="outline">Configure Payment Methods</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="shipping" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Truck className="w-5 h-5 mr-2" />
                                    Shipping Settings
                                </CardTitle>
                                <CardDescription>Configure shipping methods and rates</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center py-8">
                                    <Truck className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping Configuration</h3>
                                    <p className="text-gray-500 mb-4">Set up shipping zones, rates, and delivery options</p>
                                    <Button variant="outline">Configure Shipping</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="system" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Database className="w-5 h-5 mr-2" />
                                    System Health
                                </CardTitle>
                                <CardDescription>Monitor system components and performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {systemHealth.map((component) => (
                                        <div key={component.component} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="font-medium">{component.component}</div>
                                                {getStatusBadge(component.status)}
                                            </div>
                                            <div className="text-sm text-gray-500">Uptime: {component.uptime}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Backup & Maintenance</CardTitle>
                                <CardDescription>System backup and maintenance settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Maintenance Mode</Label>
                                        <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
                                    </div>
                                    <Switch
                                        checked={settings.maintenanceMode}
                                        onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Auto Backup</Label>
                                        <p className="text-sm text-gray-500">Automatically backup data</p>
                                    </div>
                                    <Switch
                                        checked={settings.autoBackup}
                                        onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                                    <Select
                                        value={settings.backupFrequency}
                                        onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hourly">Hourly</SelectItem>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline">Create Backup</Button>
                                    <Button variant="outline">Restore Backup</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    )
}
