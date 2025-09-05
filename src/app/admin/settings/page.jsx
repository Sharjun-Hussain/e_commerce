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
import {
    Settings, Bell, Shield, Database, CreditCard, Truck, AlertTriangle,
    CheckCircle, Save, Palette, Users, FileText, Globe, Image,
    Mail, ShoppingCart, Box, RefreshCw, Download, Upload
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useAuth } from "@/States/auth-context"

export default function SettingsPage() {
    const { user, hasPermission } = useAuth()
    const [isSaving, setIsSaving] = useState(false)
    const [activeTab, setActiveTab] = useState("general")
    const [settings, setSettings] = useState({
        // General Settings
        siteName: "TechMart Electronics",
        siteDescription: "Your trusted electronics store",
        contactEmail: "support@techmart.com",
        contactPhone: "+1 (555) 123-4567",
        address: "123 Commerce St, Tech City, TC 12345",
        currency: "USD",
        timezone: "UTC",
        language: "en",
        dateFormat: "MM/DD/YYYY",

        // Theme & Appearance
        primaryColor: "#3b82f6",
        secondaryColor: "#64748b",
        accentColor: "#f97316",
        darkMode: false,
        roundedCorners: "medium",
        fontFamily: "Inter",
        logo: "/logo.png",
        favicon: "/favicon.ico",

        // Notifications
        emailNotifications: true,
        smsNotifications: false,
        lowStockAlert: true,
        orderNotifications: true,
        newUserNotifications: true,
        newsletterSubscriptions: true,

        // Security
        allowRegistration: true,
        requireEmailVerification: true,
        twoFactorAuth: false,
        maxLoginAttempts: 5,
        sessionTimeout: 30,
        passwordMinLength: 8,
        passwordRequireSpecial: true,

        // Payments
        paymentMethods: ["credit_card", "paypal"],
        defaultPaymentMethod: "credit_card",
        currencyPosition: "before",
        decimalPlaces: 2,
        taxEnabled: true,
        taxRate: 8.25,
        taxInclusive: false,

        // Shipping
        shippingEnabled: true,
        freeShippingThreshold: 50,
        shippingMethods: ["standard", "express", "overnight"],
        defaultShippingMethod: "standard",
        shippingOrigin: "US",
        shippingCalculation: "weight",

        // Inventory
        lowStockThreshold: 10,
        allowBackorders: false,
        inventoryTracking: true,
        showStockLevel: true,

        // Products
        productsPerPage: 24,
        allowReviews: true,
        reviewApproval: true,
        relatedProducts: true,
        recentlyViewed: true,

        // Checkout
        guestCheckout: true,
        requireShipping: true,
        requireBilling: true,
        orderConfirmationEmail: true,

        // SEO
        metaTitle: "TechMart Electronics - Your Tech Store",
        metaDescription: "Shop the latest electronics at TechMart",
        metaKeywords: "electronics, tech, gadgets",
        socialImage: "/social-image.jpg",
        googleAnalyticsId: "",

        // Maintenance
        maintenanceMode: false,
        maintenanceMessage: "We're performing maintenance. We'll be back soon!",

        // Backup
        backupFrequency: "daily",
        autoBackup: true,
        backupRetention: 30,
    })

    const handleSave = async () => {
        setIsSaving(true)
        // Simulate save process
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSaving(false)
        console.log("Settings saved:", settings)
    }

    const handleImportSettings = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const importedSettings = JSON.parse(e.target.result)
                    setSettings({ ...settings, ...importedSettings })
                } catch (error) {
                    console.error("Error parsing settings file:", error)
                }
            }
            reader.readAsText(file)
        }
    }

    const handleExportSettings = () => {
        const dataStr = JSON.stringify(settings, null, 2)
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
        const exportFileDefaultName = 'settings.json'

        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }

    const systemHealth = [
        { component: "Database", status: "healthy", uptime: "99.9%" },
        { component: "API Server", status: "healthy", uptime: "99.8%" },
        { component: "File Storage", status: "warning", uptime: "98.5%" },
        { component: "Email Service", status: "healthy", uptime: "99.7%" },
        { component: "Payment Gateway", status: "healthy", uptime: "99.9%" },
        { component: "Search Index", status: "healthy", uptime: "99.6%" },
        { component: "Cache Server", status: "healthy", uptime: "99.9%" },
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

    const colorOptions = [
        { name: "Blue", value: "#3b82f6" },
        { name: "Red", value: "#ef4444" },
        { name: "Green", value: "#10b981" },
        { name: "Purple", value: "#8b5cf6" },
        { name: "Orange", value: "#f97316" },
        { name: "Pink", value: "#ec4899" },
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-600 mt-1">Manage your store configuration and preferences</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleExportSettings}>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <Label htmlFor="import-settings" className="cursor-pointer">
                            <Input
                                id="import-settings"
                                type="file"
                                accept=".json"
                                onChange={handleImportSettings}
                                className="hidden"
                            />
                            <Button variant="outline" asChild>
                                <span>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Import
                                </span>
                            </Button>
                        </Label>
                        <Button onClick={handleSave} disabled={isSaving}>
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="checkout">Checkout</TabsTrigger>
                        <TabsTrigger value="seo">SEO</TabsTrigger>
                        <TabsTrigger value="system">System</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="w-5 h-5 mr-2" />
                                    General Settings
                                </CardTitle>
                                <CardDescription>Basic store configuration and contact information</CardDescription>
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
                                                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                                                <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
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

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="contactEmail">Contact Email</Label>
                                        <Input
                                            id="contactEmail"
                                            type="email"
                                            value={settings.contactEmail}
                                            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contactPhone">Contact Phone</Label>
                                        <Input
                                            id="contactPhone"
                                            value={settings.contactPhone}
                                            onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Business Address</Label>
                                    <Textarea
                                        id="address"
                                        value={settings.address}
                                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                        rows={2}
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
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
                                                <SelectItem value="CET">Central European Time</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Language</Label>
                                        <Select
                                            value={settings.language}
                                            onValueChange={(value) => setSettings({ ...settings, language: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="es">Spanish</SelectItem>
                                                <SelectItem value="fr">French</SelectItem>
                                                <SelectItem value="de">German</SelectItem>
                                                <SelectItem value="ja">Japanese</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dateFormat">Date Format</Label>
                                        <Select
                                            value={settings.dateFormat}
                                            onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="appearance" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Palette className="w-5 h-5 mr-2" />
                                    Theme & Appearance
                                </CardTitle>
                                <CardDescription>Customize the look and feel of your store</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="primaryColor">Primary Color</Label>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                id="primaryColor"
                                                type="color"
                                                value={settings.primaryColor}
                                                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                                                className="w-12 h-12 p-1"
                                            />
                                            <Select
                                                value={settings.primaryColor}
                                                onValueChange={(value) => setSettings({ ...settings, primaryColor: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a color" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {colorOptions.map((color) => (
                                                        <SelectItem key={color.value} value={color.value}>
                                                            <div className="flex items-center">
                                                                <div
                                                                    className="w-4 h-4 rounded-full mr-2"
                                                                    style={{ backgroundColor: color.value }}
                                                                />
                                                                {color.name}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="fontFamily">Font Family</Label>
                                        <Select
                                            value={settings.fontFamily}
                                            onValueChange={(value) => setSettings({ ...settings, fontFamily: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Inter">Inter</SelectItem>
                                                <SelectItem value="Roboto">Roboto</SelectItem>
                                                <SelectItem value="Open Sans">Open Sans</SelectItem>
                                                <SelectItem value="Poppins">Poppins</SelectItem>
                                                <SelectItem value="Montserrat">Montserrat</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="roundedCorners">Border Radius</Label>
                                        <Select
                                            value={settings.roundedCorners}
                                            onValueChange={(value) => setSettings({ ...settings, roundedCorners: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">None</SelectItem>
                                                <SelectItem value="small">Small</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="large">Large</SelectItem>
                                                <SelectItem value="full">Full</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="darkMode">Dark Mode</Label>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-500">Enable dark mode theme</p>
                                            <Switch
                                                checked={settings.darkMode}
                                                onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="logo">Store Logo</Label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 border rounded-md flex items-center justify-center bg-gray-100">
                                                {settings.logo ? (
                                                    <img src={settings.logo} alt="Logo" className="max-w-full max-h-full" />
                                                ) : (
                                                    <Image className="w-8 h-8 text-gray-400" />
                                                )}
                                            </div>
                                            <Input
                                                id="logo"
                                                value={settings.logo}
                                                onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                                                placeholder="/path/to/logo.png"
                                            />
                                        </div>
                                        <Button variant="outline" size="sm" className="mt-2">
                                            Upload New Logo
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="favicon">Favicon</Label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 border rounded-md flex items-center justify-center bg-gray-100">
                                                {settings.favicon ? (
                                                    <img src={settings.favicon} alt="Favicon" className="max-w-full max-h-full" />
                                                ) : (
                                                    <Image className="w-4 h-4 text-gray-400" />
                                                )}
                                            </div>
                                            <Input
                                                id="favicon"
                                                value={settings.favicon}
                                                onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
                                                placeholder="/path/to/favicon.ico"
                                            />
                                        </div>
                                        <Button variant="outline" size="sm" className="mt-2">
                                            Upload New Favicon
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-4 border rounded-lg bg-gray-50">
                                    <h3 className="font-medium mb-2">Theme Preview</h3>
                                    <div className="flex gap-2">
                                        <div
                                            className="w-12 h-12 rounded-md"
                                            style={{ backgroundColor: settings.primaryColor }}
                                        />
                                        <div className="text-sm">
                                            <p className="font-medium" style={{ color: settings.primaryColor }}>
                                                Primary Color Sample
                                            </p>
                                            <p className="text-gray-600">This is how your theme will look</p>
                                        </div>
                                    </div>
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
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>New User Notifications</Label>
                                        <p className="text-sm text-gray-500">Get notified when new users register</p>
                                    </div>
                                    <Switch
                                        checked={settings.newUserNotifications}
                                        onCheckedChange={(checked) => setSettings({ ...settings, newUserNotifications: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Newsletter Subscriptions</Label>
                                        <p className="text-sm text-gray-500">Allow users to subscribe to newsletters</p>
                                    </div>
                                    <Switch
                                        checked={settings.newsletterSubscriptions}
                                        onCheckedChange={(checked) => setSettings({ ...settings, newsletterSubscriptions: checked })}
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
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Two-Factor Authentication</Label>
                                        <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                                    </div>
                                    <Switch
                                        checked={settings.twoFactorAuth}
                                        onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                                        <Input
                                            id="maxLoginAttempts"
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={settings.maxLoginAttempts}
                                            onChange={(e) => setSettings({ ...settings, maxLoginAttempts: Number.parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                                        <Input
                                            id="sessionTimeout"
                                            type="number"
                                            min="5"
                                            max="1440"
                                            value={settings.sessionTimeout}
                                            onChange={(e) => setSettings({ ...settings, sessionTimeout: Number.parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                                        <Input
                                            id="passwordMinLength"
                                            type="number"
                                            min="6"
                                            max="20"
                                            value={settings.passwordMinLength}
                                            onChange={(e) => setSettings({ ...settings, passwordMinLength: Number.parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="passwordRequireSpecial">Require Special Characters</Label>
                                        <div className="flex items-center justify-between pt-2">
                                            <p className="text-sm text-gray-500">Passwords must contain special characters</p>
                                            <Switch
                                                checked={settings.passwordRequireSpecial}
                                                onCheckedChange={(checked) => setSettings({ ...settings, passwordRequireSpecial: checked })}
                                            />
                                        </div>
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
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <Label>Enabled Payment Methods</Label>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        {["credit_card", "paypal", "apple_pay", "google_pay", "bank_transfer", "cash_on_delivery"].map((method) => (
                                            <div key={method} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={method}
                                                    checked={settings.paymentMethods.includes(method)}
                                                    onChange={(e) => {
                                                        const updatedMethods = e.target.checked
                                                            ? [...settings.paymentMethods, method]
                                                            : settings.paymentMethods.filter(m => m !== method)
                                                        setSettings({ ...settings, paymentMethods: updatedMethods })
                                                    }}
                                                    className="rounded border-gray-300"
                                                />
                                                <Label htmlFor={method} className="text-sm font-normal capitalize">
                                                    {method.replace(/_/g, ' ')}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Label htmlFor="defaultPaymentMethod">Default Payment Method</Label>
                                    <Select
                                        value={settings.defaultPaymentMethod}
                                        onValueChange={(value) => setSettings({ ...settings, defaultPaymentMethod: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {settings.paymentMethods.map((method) => (
                                                <SelectItem key={method} value={method}>
                                                    {method.replace(/_/g, ' ')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="currencyPosition">Currency Position</Label>
                                        <Select
                                            value={settings.currencyPosition}
                                            onValueChange={(value) => setSettings({ ...settings, currencyPosition: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="before">Before amount ($100)</SelectItem>
                                                <SelectItem value="after">After amount (100$)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="decimalPlaces">Decimal Places</Label>
                                        <Input
                                            id="decimalPlaces"
                                            type="number"
                                            min="0"
                                            max="4"
                                            value={settings.decimalPlaces}
                                            onChange={(e) => setSettings({ ...settings, decimalPlaces: Number.parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Enable Taxes</Label>
                                        <p className="text-sm text-gray-500">Apply taxes to orders</p>
                                    </div>
                                    <Switch
                                        checked={settings.taxEnabled}
                                        onCheckedChange={(checked) => setSettings({ ...settings, taxEnabled: checked })}
                                    />
                                </div>

                                {settings.taxEnabled && (
                                    <>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                                                <Input
                                                    id="taxRate"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    max="30"
                                                    value={settings.taxRate}
                                                    onChange={(e) => setSettings({ ...settings, taxRate: Number.parseFloat(e.target.value) })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="taxInclusive">Tax Display</Label>
                                                <Select
                                                    value={settings.taxInclusive ? "inclusive" : "exclusive"}
                                                    onValueChange={(value) => setSettings({ ...settings, taxInclusive: value === "inclusive" })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="inclusive">Inclusive in prices</SelectItem>
                                                        <SelectItem value="exclusive">Added at checkout</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <Separator />

                                <div className="text-center py-4">
                                    <Button variant="outline">Configure Payment Gateways</Button>
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
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Enable Shipping</Label>
                                        <p className="text-sm text-gray-500">Allow shipping for orders</p>
                                    </div>
                                    <Switch
                                        checked={settings.shippingEnabled}
                                        onCheckedChange={(checked) => setSettings({ ...settings, shippingEnabled: checked })}
                                    />
                                </div>

                                {settings.shippingEnabled && (
                                    <>
                                        <Separator />

                                        <div className="space-y-4">
                                            <Label>Enabled Shipping Methods</Label>
                                            <div className="grid gap-2">
                                                {["standard", "express", "overnight", "free", "local_pickup"].map((method) => (
                                                    <div key={method} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`shipping-${method}`}
                                                            checked={settings.shippingMethods.includes(method)}
                                                            onChange={(e) => {
                                                                const updatedMethods = e.target.checked
                                                                    ? [...settings.shippingMethods, method]
                                                                    : settings.shippingMethods.filter(m => m !== method)
                                                                setSettings({ ...settings, shippingMethods: updatedMethods })
                                                            }}
                                                            className="rounded border-gray-300"
                                                        />
                                                        <Label htmlFor={`shipping-${method}`} className="text-sm font-normal capitalize">
                                                            {method.replace(/_/g, ' ')}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <Label htmlFor="defaultShippingMethod">Default Shipping Method</Label>
                                            <Select
                                                value={settings.defaultShippingMethod}
                                                onValueChange={(value) => setSettings({ ...settings, defaultShippingMethod: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {settings.shippingMethods.map((method) => (
                                                        <SelectItem key={method} value={method}>
                                                            {method.replace(/_/g, ' ')}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Separator />

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                                                <Input
                                                    id="freeShippingThreshold"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={settings.freeShippingThreshold}
                                                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number.parseFloat(e.target.value) })}
                                                />
                                                <p className="text-sm text-gray-500">Set to 0 to disable free shipping</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="shippingOrigin">Shipping Origin</Label>
                                                <Select
                                                    value={settings.shippingOrigin}
                                                    onValueChange={(value) => setSettings({ ...settings, shippingOrigin: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="US">United States</SelectItem>
                                                        <SelectItem value="UK">United Kingdom</SelectItem>
                                                        <SelectItem value="EU">European Union</SelectItem>
                                                        <SelectItem value="CA">Canada</SelectItem>
                                                        <SelectItem value="AU">Australia</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="shippingCalculation">Shipping Calculation</Label>
                                            <Select
                                                value={settings.shippingCalculation}
                                                onValueChange={(value) => setSettings({ ...settings, shippingCalculation: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="weight">Based on weight</SelectItem>
                                                    <SelectItem value="price">Based on order total</SelectItem>
                                                    <SelectItem value="flat">Flat rate</SelectItem>
                                                    <SelectItem value="free">Free shipping</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </>
                                )}

                                <Separator />

                                <div className="text-center py-4">
                                    <Button variant="outline">Manage Shipping Zones</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="products" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Box className="w-5 h-5 mr-2" />
                                    Product Settings
                                </CardTitle>
                                <CardDescription>Configure product catalog and inventory settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="productsPerPage">Products Per Page</Label>
                                        <Input
                                            id="productsPerPage"
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={settings.productsPerPage}
                                            onChange={(e) => setSettings({ ...settings, productsPerPage: Number.parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                                        <Input
                                            id="lowStockThreshold"
                                            type="number"
                                            min="0"
                                            value={settings.lowStockThreshold}
                                            onChange={(e) => setSettings({ ...settings, lowStockThreshold: Number.parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Inventory Tracking</Label>
                                        <p className="text-sm text-gray-500">Track product inventory levels</p>
                                    </div>
                                    <Switch
                                        checked={settings.inventoryTracking}
                                        onCheckedChange={(checked) => setSettings({ ...settings, inventoryTracking: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Allow Backorders</Label>
                                        <p className="text-sm text-gray-500">Allow orders for out-of-stock products</p>
                                    </div>
                                    <Switch
                                        checked={settings.allowBackorders}
                                        onCheckedChange={(checked) => setSettings({ ...settings, allowBackorders: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Stock Level</Label>
                                        <p className="text-sm text-gray-500">Display stock quantity to customers</p>
                                    </div>
                                    <Switch
                                        checked={settings.showStockLevel}
                                        onCheckedChange={(checked) => setSettings({ ...settings, showStockLevel: checked })}
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Allow Product Reviews</Label>
                                        <p className="text-sm text-gray-500">Allow customers to review products</p>
                                    </div>
                                    <Switch
                                        checked={settings.allowReviews}
                                        onCheckedChange={(checked) => setSettings({ ...settings, allowReviews: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Require Review Approval</Label>
                                        <p className="text-sm text-gray-500">Manually approve reviews before publishing</p>
                                    </div>
                                    <Switch
                                        checked={settings.reviewApproval}
                                        onCheckedChange={(checked) => setSettings({ ...settings, reviewApproval: checked })}
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Related Products</Label>
                                        <p className="text-sm text-gray-500">Display related products on product pages</p>
                                    </div>
                                    <Switch
                                        checked={settings.relatedProducts}
                                        onCheckedChange={(checked) => setSettings({ ...settings, relatedProducts: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Recently Viewed</Label>
                                        <p className="text-sm text-gray-500">Display recently viewed products</p>
                                    </div>
                                    <Switch
                                        checked={settings.recentlyViewed}
                                        onCheckedChange={(checked) => setSettings({ ...settings, recentlyViewed: checked })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="checkout" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Checkout Settings
                                </CardTitle>
                                <CardDescription>Configure checkout process and options</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Allow Guest Checkout</Label>
                                        <p className="text-sm text-gray-500">Allow customers to checkout without creating an account</p>
                                    </div>
                                    <Switch
                                        checked={settings.guestCheckout}
                                        onCheckedChange={(checked) => setSettings({ ...settings, guestCheckout: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Require Shipping Address</Label>
                                        <p className="text-sm text-gray-500">Always require a shipping address</p>
                                    </div>
                                    <Switch
                                        checked={settings.requireShipping}
                                        onCheckedChange={(checked) => setSettings({ ...settings, requireShipping: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Require Billing Address</Label>
                                        <p className="text-sm text-gray-500">Always require a billing address</p>
                                    </div>
                                    <Switch
                                        checked={settings.requireBilling}
                                        onCheckedChange={(checked) => setSettings({ ...settings, requireBilling: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Send Order Confirmation Email</Label>
                                        <p className="text-sm text-gray-500">Send confirmation email after order is placed</p>
                                    </div>
                                    <Switch
                                        checked={settings.orderConfirmationEmail}
                                        onCheckedChange={(checked) => setSettings({ ...settings, orderConfirmationEmail: checked })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="seo" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Globe className="w-5 h-5 mr-2" />
                                    SEO Settings
                                </CardTitle>
                                <CardDescription>Configure search engine optimization settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="metaTitle">Meta Title</Label>
                                    <Input
                                        id="metaTitle"
                                        value={settings.metaTitle}
                                        onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                                        placeholder="Default meta title for your store"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="metaDescription">Meta Description</Label>
                                    <Textarea
                                        id="metaDescription"
                                        value={settings.metaDescription}
                                        onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                                        rows={3}
                                        placeholder="Default meta description for your store"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="metaKeywords">Meta Keywords</Label>
                                    <Input
                                        id="metaKeywords"
                                        value={settings.metaKeywords}
                                        onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value })}
                                        placeholder="Comma-separated keywords for your store"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="googleAnalyticsId">Google Analytics Tracking ID</Label>
                                    <Input
                                        id="googleAnalyticsId"
                                        value={settings.googleAnalyticsId}
                                        onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                                        placeholder="G-XXXXXXXXXX"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="socialImage">Social Sharing Image</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 border rounded-md flex items-center justify-center bg-gray-100">
                                            {settings.socialImage ? (
                                                <img src={settings.socialImage} alt="Social" className="max-w-full max-h-full" />
                                            ) : (
                                                <Image className="w-8 h-8 text-gray-400" />
                                            )}
                                        </div>
                                        <Input
                                            id="socialImage"
                                            value={settings.socialImage}
                                            onChange={(e) => setSettings({ ...settings, socialImage: e.target.value })}
                                            placeholder="/path/to/social-image.jpg"
                                        />
                                    </div>
                                    <Button variant="outline" size="sm" className="mt-2">
                                        Upload Image
                                    </Button>
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
                                <div className="mt-4 flex justify-end">
                                    <Button variant="outline" size="sm">
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Refresh Status
                                    </Button>
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

                                {settings.maintenanceMode && (
                                    <div className="space-y-2">
                                        <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                                        <Textarea
                                            id="maintenanceMessage"
                                            value={settings.maintenanceMessage}
                                            onChange={(e) => setSettings({ ...settings, maintenanceMessage: e.target.value })}
                                            rows={3}
                                            placeholder="Message to display during maintenance"
                                        />
                                    </div>
                                )}

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

                                <div className="grid gap-4 md:grid-cols-2">
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
                                    <div className="space-y-2">
                                        <Label htmlFor="backupRetention">Backup Retention (days)</Label>
                                        <Input
                                            id="backupRetention"
                                            type="number"
                                            min="1"
                                            max="365"
                                            value={settings.backupRetention}
                                            onChange={(e) => setSettings({ ...settings, backupRetention: Number.parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    <Button variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Create Backup
                                    </Button>
                                    <Button variant="outline">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Restore Backup
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    )
}