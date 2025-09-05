"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
    ArrowLeft,
    Upload,
    X,
    Plus,
    ArrowLeftCircleIcon,
    Save,
    Eye,
    Package,
    DollarSign,
    Tag,
    FileText,
    Truck,
    Shield,
    BarChart3,
    ImageIcon,
    VideoIcon,
    LinkIcon,
    Calendar,
    Globe,
    FileBox,
    Warehouse,
    Percent,
    Clock,
    SlidersHorizontal,
    Edit,
    Star,
    ShoppingCart
} from "lucide-react"
import Link from "next/link"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useProducts } from "@/States/product-store"

export default function AddProductPage() {
    const router = useRouter()
    const { addProduct } = useProducts()
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("basic")
    const [viewMode, setViewMode] = useState("edit") // 'edit' or 'preview'
    const fileInputRef = useRef(null)
    const videoInputRef = useRef(null)

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        shortDescription: "",
        price: "",
        originalPrice: "",
        costPrice: "",
        taxRate: "",
        category: "",
        subcategory: "",
        brand: "",
        sku: "",
        upc: "",
        ean: "",
        stock: "",
        lowStockThreshold: "5",
        weight: "",
        weightUnit: "kg",
        dimensions: {
            length: "",
            width: "",
            height: "",
            unit: "cm"
        },
        status: "draft",
        featured: false,
        images: [],
        videos: [],
        tags: [],
        specifications: {},
        shipping: {
            requiresShipping: true,
            freeShipping: false,
            shippingClass: "standard"
        },
        seo: {
            metaTitle: "",
            metaDescription: "",
            slug: ""
        },
        variants: [],
        relatedProducts: [],
        availabilityDate: "",
        warranty: {
            hasWarranty: false,
            period: "",
            type: "manufacturer"
        },
        digitalProduct: false,
        downloadFiles: [],
        salesCount: 0,
        viewCount: 0,
        rating: 0,
        reviewCount: 0
    })

    const [newTag, setNewTag] = useState("")
    const [newSpecKey, setNewSpecKey] = useState("")
    const [newSpecValue, setNewSpecValue] = useState("")
    const [imageUrls, setImageUrls] = useState([""])
    const [videoUrls, setVideoUrls] = useState([""])
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    const categories = ["Laptops", "Smartphones", "Tablets", "Headphones", "Monitors", "Accessories", "Software", "Books"]
    const subcategories = {
        Laptops: ["Gaming", "Business", "Ultrabooks", "2-in-1", "Chromebooks", "Workstations"],
        Smartphones: ["Flagship", "Mid-range", "Budget", "Foldable", "Gaming"],
        Tablets: ["Entertainment", "Business", "Drawing", "Gaming", "Kids"],
        Headphones: ["Wireless", "Noise-cancelling", "Earbuds", "Over-ear", "Gaming"],
        Monitors: ["Gaming", "Office", "Ultrawide", "4K", "Curved", "Portable"],
        Accessories: ["Cases", "Chargers", "Stands", "Cables", "Adapters", "Protectors"],
        Software: ["Operating Systems", "Productivity", "Security", "Creative", "Utilities"],
        Books: ["Technology", "Business", "Fiction", "Non-Fiction", "Educational"]
    }
    const brands = ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Sony", "Microsoft", "Google", "Asus", "Acer", "LG", "Logitech"]
    const weightUnits = ["kg", "g", "lb", "oz"]
    const dimensionUnits = ["cm", "in", "m", "ft"]
    const shippingClasses = ["standard", "express", "priority", "fragile", "oversized"]
    const warrantyTypes = ["manufacturer", "seller", "extended", "none"]
    const warrantyPeriods = ["30 days", "60 days", "90 days", "6 months", "1 year", "2 years", "3 years", "5 years", "Lifetime"]

    const toggleViewMode = () => {
        setViewMode(viewMode === "edit" ? "preview" : "edit")
    }

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.')
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }))
        } else {
            setFormData((prev) => ({ ...prev, [field]: value }))
        }
    }

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()],
            }))
            setNewTag("")
        }
    }

    const removeTag = (tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }))
    }

    const addSpecification = () => {
        if (newSpecKey.trim() && newSpecValue.trim()) {
            setFormData((prev) => ({
                ...prev,
                specifications: {
                    ...prev.specifications,
                    [newSpecKey.trim()]: newSpecValue.trim(),
                },
            }))
            setNewSpecKey("")
            setNewSpecValue("")
        }
    }

    const removeSpecification = (keyToRemove) => {
        setFormData((prev) => ({
            ...prev,
            specifications: Object.fromEntries(Object.entries(prev.specifications).filter(([key]) => key !== keyToRemove)),
        }))
    }

    const addImageUrl = (index, value) => {
        const newImageUrls = [...imageUrls]
        newImageUrls[index] = value
        setImageUrls(newImageUrls)

        // Update form data with non-empty URLs
        setFormData(prev => ({
            ...prev,
            images: newImageUrls.filter(url => url.trim() !== "")
        }))
    }

    const addImageField = () => {
        setImageUrls([...imageUrls, ""])
    }

    const removeImageField = (index) => {
        if (imageUrls.length > 1) {
            const newImageUrls = imageUrls.filter((_, i) => i !== index)
            setImageUrls(newImageUrls)

            setFormData(prev => ({
                ...prev,
                images: newImageUrls.filter(url => url.trim() !== "")
            }))
        }
    }

    const addVideoUrl = (index, value) => {
        const newVideoUrls = [...videoUrls]
        newVideoUrls[index] = value
        setVideoUrls(newVideoUrls)

        // Update form data with non-empty URLs
        setFormData(prev => ({
            ...prev,
            videos: newVideoUrls.filter(url => url.trim() !== "")
        }))
    }

    const addVideoField = () => {
        setVideoUrls([...videoUrls, ""])
    }

    const removeVideoField = (index) => {
        if (videoUrls.length > 1) {
            const newVideoUrls = videoUrls.filter((_, i) => i !== index)
            setVideoUrls(newVideoUrls)

            setFormData(prev => ({
                ...prev,
                videos: newVideoUrls.filter(url => url.trim() !== "")
            }))
        }
    }

    const handleFileUpload = (event, type) => {
        const files = event.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        setUploadProgress(0)

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsUploading(false)

                    // Add uploaded files to form data
                    const fileUrls = Array.from(files).map(file => URL.createObjectURL(file))
                    if (type === 'image') {
                        setFormData(prev => ({
                            ...prev,
                            images: [...prev.images, ...fileUrls]
                        }))
                    } else if (type === 'video') {
                        setFormData(prev => ({
                            ...prev,
                            videos: [...prev.videos, ...fileUrls]
                        }))
                    }

                    return 100
                }
                return prev + 10
            })
        }, 200)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            addProduct({
                name: formData.name,
                description: formData.description,
                shortDescription: formData.shortDescription,
                price: Number.parseFloat(formData.price),
                originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
                costPrice: formData.costPrice ? Number.parseFloat(formData.costPrice) : undefined,
                taxRate: formData.taxRate ? Number.parseFloat(formData.taxRate) : undefined,
                category: formData.category,
                subcategory: formData.subcategory,
                brand: formData.brand,
                sku: formData.sku,
                upc: formData.upc,
                ean: formData.ean,
                stock: Number.parseInt(formData.stock),
                lowStockThreshold: Number.parseInt(formData.lowStockThreshold),
                weight: formData.weight,
                weightUnit: formData.weightUnit,
                dimensions: formData.dimensions,
                status: formData.status,
                featured: formData.featured,
                images: formData.images.length > 0 ? formData.images : ["/placeholder.svg"],
                videos: formData.videos,
                tags: formData.tags,
                specifications: formData.specifications,
                shipping: formData.shipping,
                seo: formData.seo,
                variants: formData.variants,
                relatedProducts: formData.relatedProducts,
                availabilityDate: formData.availabilityDate,
                warranty: formData.warranty,
                digitalProduct: formData.digitalProduct,
                downloadFiles: formData.downloadFiles,
                salesCount: formData.salesCount,
                viewCount: formData.viewCount,
                rating: formData.rating,
                reviewCount: formData.reviewCount
            })

            router.push("/admin/products")
        } catch (error) {
            console.error("Error adding product:", error)
        } finally {
            setIsLoading(false)
        }
    }


    const ProductPreview = () => {
        return (
            <div className="bg-white p-6 rounded-lg border">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div>
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                            {formData.images.length > 0 ? (
                                <img
                                    src={formData.images[0]}
                                    alt={formData.name}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <ImageIcon className="w-16 h-16" />
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {formData.images.slice(0, 4).map((img, index) => (
                                <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{formData.name || "Product Name"}</h1>

                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">({formData.reviewCount} reviews)</span>
                        </div>

                        <div className="mb-6">
                            {formData.originalPrice && (
                                <p className="text-lg text-gray-500 line-through">${formData.originalPrice}</p>
                            )}
                            <p className="text-3xl font-bold text-gray-900">${formData.price || "0.00"}</p>

                            {formData.originalPrice && formData.price && (
                                <div className="mt-1">
                                    <Badge variant="destructive" className="text-xs">
                                        Save {Math.round((1 - formData.price / formData.originalPrice) * 100)}%
                                    </Badge>
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <h3 className="font-medium text-gray-900 mb-2">Availability</h3>
                            {formData.stock > 0 ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    In Stock ({formData.stock} available)
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                    Out of Stock
                                </Badge>
                            )}
                        </div>

                        <div className="mb-6">
                            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-600">{formData.shortDescription || formData.description || "No description provided."}</p>
                        </div>

                        <Button className="w-full mb-3" size="lg">
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                        </Button>

                        <Button variant="outline" className="w-full">
                            Buy Now
                        </Button>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-12">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="grid grid-cols-4 mb-6">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="specifications">Specifications</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Product Description</h3>
                            <p className="text-gray-600 whitespace-pre-line">
                                {formData.description || "No description provided."}
                            </p>
                        </TabsContent>

                        <TabsContent value="specifications" className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
                            <div className="space-y-2">
                                {Object.entries(formData.specifications).length > 0 ? (
                                    Object.entries(formData.specifications).map(([key, value]) => (
                                        <div key={key} className="flex border-b pb-2">
                                            <span className="font-medium text-gray-900 w-1/3">{key}</span>
                                            <span className="text-gray-600">{value}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600">No specifications provided.</p>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="reviews" className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                            <div className="flex items-center justify-center p-12 border rounded-lg bg-gray-50">
                                <p className="text-gray-500">No reviews yet.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="shipping" className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Shipping & Returns</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Shipping</h4>
                                    <p className="text-gray-600">
                                        {formData.shipping.freeShipping
                                            ? "Free shipping on all orders"
                                            : "Standard shipping rates apply"}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Returns</h4>
                                    <p className="text-gray-600">30-day money-back guarantee</p>
                                </div>
                                {formData.warranty.hasWarranty && (
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Warranty</h4>
                                        <p className="text-gray-600">{formData.warranty.period} {formData.warranty.type} warranty</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/products">
                            <span className="w-14 h-14 bg-secondary rounded-md text-center flex items-center justify-center">
                                <ArrowLeftCircleIcon className="w-8 h-8 text-primary-foreground" />
                            </span>
                        </Link>

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {viewMode === "edit" ? "Add New Product" : "Product Preview"}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {viewMode === "edit"
                                    ? "Create a new product for your catalog"
                                    : "Preview how your product will appear to customers"}
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant={viewMode === "preview" ? "default" : "bordered"}
                            onClick={toggleViewMode}
                        >
                            {viewMode === "edit" ? (
                                <>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
                                </>
                            ) : (
                                <>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Product
                                </>
                            )}
                        </Button>
                        {viewMode === "edit" && (
                            <Button type="submit" form="product-form" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Save className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Product
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>

                {viewMode === "edit" ? (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-8 mb-6 w-full overflow-x-auto">
                            <TabsTrigger value="basic" className="flex items-center whitespace-nowrap">
                                <Package className="w-4 h-4 mr-2" />
                                Basic Info
                            </TabsTrigger>
                            <TabsTrigger value="pricing" className="flex items-center whitespace-nowrap">
                                <DollarSign className="w-4 h-4 mr-2" />
                                Pricing
                            </TabsTrigger>
                            <TabsTrigger value="inventory" className="flex items-center whitespace-nowrap">
                                <Warehouse className="w-4 h-4 mr-2" />
                                Inventory
                            </TabsTrigger>
                            <TabsTrigger value="media" className="flex items-center whitespace-nowrap">
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Media
                            </TabsTrigger>
                            <TabsTrigger value="shipping" className="flex items-center whitespace-nowrap">
                                <Truck className="w-4 h-4 mr-2" />
                                Shipping
                            </TabsTrigger>
                            <TabsTrigger value="seo" className="flex items-center whitespace-nowrap">
                                <Globe className="w-4 h-4 mr-2" />
                                SEO
                            </TabsTrigger>
                            <TabsTrigger value="attributes" className="flex items-center whitespace-nowrap">
                                <Tag className="w-4 h-4 mr-2" />
                                Attributes
                            </TabsTrigger>
                            <TabsTrigger value="advanced" className="flex items-center whitespace-nowrap">
                                <SlidersHorizontal className="w-4 h-4 mr-2" />
                                Advanced
                            </TabsTrigger>
                        </TabsList>

                        <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                            <TabsContent value="basic" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Basic Information</CardTitle>
                                        <CardDescription>Essential product details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Product Name *</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                placeholder="Enter product name"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="shortDescription">Short Description</Label>
                                            <Textarea
                                                id="shortDescription"
                                                value={formData.shortDescription}
                                                onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                                                placeholder="Brief product description (shown in listings)"
                                                rows={2}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">Full Description *</Label>
                                            <Textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => handleInputChange("description", e.target.value)}
                                                placeholder="Detailed product description"
                                                rows={6}
                                                required
                                            />
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="category">Category *</Label>
                                                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.map((category) => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="subcategory">Subcategory</Label>
                                                <Select
                                                    value={formData.subcategory}
                                                    onValueChange={(value) => handleInputChange("subcategory", value)}
                                                    disabled={!formData.category}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select subcategory" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {formData.category && subcategories[formData.category]?.map((subcategory) => (
                                                            <SelectItem key={subcategory} value={subcategory}>
                                                                {subcategory}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="brand">Brand *</Label>
                                            <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select brand" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {brands.map((brand) => (
                                                        <SelectItem key={brand} value={brand}>
                                                            {brand}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="pricing" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Pricing</CardTitle>
                                        <CardDescription>Set product pricing information</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="price">Selling Price *</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={formData.price}
                                                    onChange={(e) => handleInputChange("price", e.target.value)}
                                                    placeholder="0.00"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="originalPrice">Compare at Price</Label>
                                                <Input
                                                    id="originalPrice"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={formData.originalPrice}
                                                    onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="costPrice">Cost per Item</Label>
                                                <Input
                                                    id="costPrice"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={formData.costPrice}
                                                    onChange={(e) => handleInputChange("costPrice", e.target.value)}
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                                                <Input
                                                    id="taxRate"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    max="30"
                                                    value={formData.taxRate}
                                                    onChange={(e) => handleInputChange("taxRate", e.target.value)}
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="taxable"
                                                checked={true}
                                                onCheckedChange={() => { }}
                                            />
                                            <Label htmlFor="taxable">Charge tax on this product</Label>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="inventory" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Inventory Management</CardTitle>
                                        <CardDescription>Manage stock and SKU information</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="sku">SKU (Stock Keeping Unit) *</Label>
                                                <Input
                                                    id="sku"
                                                    value={formData.sku}
                                                    onChange={(e) => handleInputChange("sku", e.target.value)}
                                                    placeholder="Enter SKU"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="upc">UPC (Barcode)</Label>
                                                <Input
                                                    id="upc"
                                                    value={formData.upc}
                                                    onChange={(e) => handleInputChange("upc", e.target.value)}
                                                    placeholder="Enter UPC"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="ean">EAN (International Article Number)</Label>
                                                <Input
                                                    id="ean"
                                                    value={formData.ean}
                                                    onChange={(e) => handleInputChange("ean", e.target.value)}
                                                    placeholder="Enter EAN"
                                                />
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="stock">Quantity *</Label>
                                                <Input
                                                    id="stock"
                                                    type="number"
                                                    min="0"
                                                    value={formData.stock}
                                                    onChange={(e) => handleInputChange("stock", e.target.value)}
                                                    placeholder="0"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                                                <Input
                                                    id="lowStockThreshold"
                                                    type="number"
                                                    min="0"
                                                    value={formData.lowStockThreshold}
                                                    onChange={(e) => handleInputChange("lowStockThreshold", e.target.value)}
                                                    placeholder="5"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="trackInventory"
                                                checked={true}
                                                onCheckedChange={() => { }}
                                            />
                                            <Label htmlFor="trackInventory">Track inventory</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="continueSelling"
                                                checked={true}
                                                onCheckedChange={() => { }}
                                            />
                                            <Label htmlFor="continueSelling">Continue selling when out of stock</Label>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="media" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Media</CardTitle>
                                        <CardDescription>Add product images and videos</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Image Upload Section */}
                                        <div className="space-y-4">
                                            <Label>Product Images</Label>

                                            {/* File Upload */}
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="mt-4">
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        onChange={(e) => handleFileUpload(e, 'image')}
                                                        accept="image/*"
                                                        multiple
                                                        className="hidden"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => fileInputRef.current?.click()}
                                                        disabled={isUploading}
                                                    >
                                                        <Upload className="w-4 h-4 mr-2" />
                                                        Upload Images
                                                    </Button>
                                                    <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>

                                                    {isUploading && (
                                                        <div className="mt-4">
                                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                                <div
                                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                                    style={{ width: `${uploadProgress}%` }}
                                                                ></div>
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Image URL Inputs */}
                                            <div className="space-y-2">
                                                <Label className="flex items-center">
                                                    <LinkIcon className="w-4 h-4 mr-2" />
                                                    Or add image URLs
                                                </Label>
                                                {imageUrls.map((url, index) => (
                                                    <div key={index} className="flex gap-2 items-center">
                                                        <Input
                                                            value={url}
                                                            onChange={(e) => addImageUrl(index, e.target.value)}
                                                            placeholder="Paste image URL"
                                                        />
                                                        {imageUrls.length > 1 && (
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="icon"
                                                                onClick={() => removeImageField(index)}
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                                <Button type="button" variant="outline" onClick={addImageField}>
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Add Another Image URL
                                                </Button>
                                            </div>

                                            {/* Image Preview */}
                                            {formData.images.length > 0 && (
                                                <div className="mt-4">
                                                    <Label>Image Previews</Label>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {formData.images.map((img, index) => (
                                                            <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden">
                                                                <img
                                                                    src={img}
                                                                    alt={`Preview ${index + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                                                    onClick={() => {
                                                                        const newImages = [...formData.images]
                                                                        newImages.splice(index, 1)
                                                                        setFormData(prev => ({ ...prev, images: newImages }))
                                                                    }}
                                                                >
                                                                    <X className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <Separator />

                                        {/* Video Upload Section */}
                                        <div className="space-y-4">
                                            <Label>Product Videos</Label>

                                            {/* File Upload */}
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                                <VideoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="mt-4">
                                                    <input
                                                        type="file"
                                                        ref={videoInputRef}
                                                        onChange={(e) => handleFileUpload(e, 'video')}
                                                        accept="video/*"
                                                        multiple
                                                        className="hidden"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => videoInputRef.current?.click()}
                                                        disabled={isUploading}
                                                    >
                                                        <Upload className="w-4 h-4 mr-2" />
                                                        Upload Videos
                                                    </Button>
                                                    <p className="mt-2 text-sm text-gray-500">MP4, MOV up to 100MB</p>
                                                </div>
                                            </div>

                                            {/* Video URL Inputs */}
                                            <div className="space-y-2">
                                                <Label className="flex items-center">
                                                    <LinkIcon className="w-4 h-4 mr-2" />
                                                    Or add video URLs
                                                </Label>
                                                {videoUrls.map((url, index) => (
                                                    <div key={index} className="flex gap-2 items-center">
                                                        <Input
                                                            value={url}
                                                            onChange={(e) => addVideoUrl(index, e.target.value)}
                                                            placeholder="Paste video URL (YouTube, Vimeo, etc.)"
                                                        />
                                                        {videoUrls.length > 1 && (
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="icon"
                                                                onClick={() => removeVideoField(index)}
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                                <Button type="button" variant="outline" onClick={addVideoField}>
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Add Another Video URL
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="shipping" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Shipping</CardTitle>
                                        <CardDescription>Product shipping information</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="requiresShipping"
                                                checked={formData.shipping.requiresShipping}
                                                onCheckedChange={(value) => handleInputChange("shipping.requiresShipping", value)}
                                            />
                                            <Label htmlFor="requiresShipping">This product requires shipping</Label>
                                        </div>

                                        {formData.shipping.requiresShipping && (
                                            <>
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="weight">Weight</Label>
                                                        <div className="flex">
                                                            <Input
                                                                id="weight"
                                                                type="number"
                                                                step="0.01"
                                                                min="0"
                                                                value={formData.weight}
                                                                onChange={(e) => handleInputChange("weight", e.target.value)}
                                                                placeholder="0.00"
                                                            />
                                                            <Select
                                                                value={formData.weightUnit}
                                                                onValueChange={(value) => handleInputChange("weightUnit", value)}
                                                            >
                                                                <SelectTrigger className="w-20">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {weightUnits.map(unit => (
                                                                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="shippingClass">Shipping Class</Label>
                                                        <Select
                                                            value={formData.shipping.shippingClass}
                                                            onValueChange={(value) => handleInputChange("shipping.shippingClass", value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {shippingClasses.map(cls => (
                                                                    <SelectItem key={cls} value={cls}>
                                                                        {cls.charAt(0).toUpperCase() + cls.slice(1)}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Dimensions (L × W × H)</Label>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <div className="flex">
                                                            <Input
                                                                placeholder="Length"
                                                                value={formData.dimensions.length}
                                                                onChange={(e) => handleInputChange("dimensions.length", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <Input
                                                                placeholder="Width"
                                                                value={formData.dimensions.width}
                                                                onChange={(e) => handleInputChange("dimensions.width", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <Input
                                                                placeholder="Height"
                                                                value={formData.dimensions.height}
                                                                onChange={(e) => handleInputChange("dimensions.height", e.target.value)}
                                                            />
                                                            <Select
                                                                value={formData.dimensions.unit}
                                                                onValueChange={(value) => handleInputChange("dimensions.unit", value)}
                                                                className="w-16"
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {dimensionUnits.map(unit => (
                                                                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id="freeShipping"
                                                        checked={formData.shipping.freeShipping}
                                                        onCheckedChange={(value) => handleInputChange("shipping.freeShipping", value)}
                                                    />
                                                    <Label htmlFor="freeShipping">Free shipping</Label>
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="seo" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Search Engine Listing</CardTitle>
                                        <CardDescription>Customize how your product appears in search engines</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="metaTitle">Meta Title</Label>
                                            <Input
                                                id="metaTitle"
                                                value={formData.seo.metaTitle}
                                                onChange={(e) => handleInputChange("seo.metaTitle", e.target.value)}
                                                placeholder="Product meta title (recommended: 50-60 characters)"
                                                maxLength={60}
                                            />
                                            <p className="text-xs text-gray-500">{formData.seo.metaTitle.length}/60 characters</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="metaDescription">Meta Description</Label>
                                            <Textarea
                                                id="metaDescription"
                                                value={formData.seo.metaDescription}
                                                onChange={(e) => handleInputChange("seo.metaDescription", e.target.value)}
                                                placeholder="Product meta description (recommended: 150-160 characters)"
                                                rows={3}
                                                maxLength={160}
                                            />
                                            <p className="text-xs text-gray-500">{formData.seo.metaDescription.length}/160 characters</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="slug">URL Handle</Label>
                                            <Input
                                                id="slug"
                                                value={formData.seo.slug}
                                                onChange={(e) => handleInputChange("seo.slug", e.target.value)}
                                                placeholder="product-url-handle"
                                            />
                                            <p className="text-xs text-gray-500">https://yourstore.com/products/{formData.seo.slug || "product-url-handle"}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="attributes" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Product Attributes</CardTitle>
                                        <CardDescription>Add tags and specifications</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <Label>Product Tags</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}
                                                    placeholder="Add a tag"
                                                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                                                />
                                                <Button type="button" onClick={addTag} variant="outline">
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                                        {tag}
                                                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <Label>Specifications</Label>
                                            <div className="grid gap-2 md:grid-cols-3">
                                                <Input
                                                    value={newSpecKey}
                                                    onChange={(e) => setNewSpecKey(e.target.value)}
                                                    placeholder="Specification name"
                                                />
                                                <Input
                                                    value={newSpecValue}
                                                    onChange={(e) => setNewSpecValue(e.target.value)}
                                                    placeholder="Specification value"
                                                />
                                                <Button type="button" onClick={addSpecification} variant="outline">
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Add
                                                </Button>
                                            </div>
                                            <div className="space-y-2">
                                                {Object.entries(formData.specifications).map(([key, value]) => (
                                                    <div key={key} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                                        <span className="text-sm">
                                                            <strong>{key}:</strong> {value}
                                                        </span>
                                                        <X
                                                            className="w-4 h-4 cursor-pointer text-gray-500 hover:text-red-500"
                                                            onClick={() => removeSpecification(key)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="advanced" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Advanced Settings</CardTitle>
                                        <CardDescription>Additional product settings</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="status">Status</Label>
                                            <Select
                                                value={formData.status}
                                                onValueChange={(value) => handleInputChange("status", value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
                                                    <SelectItem value="archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="featured"
                                                checked={formData.featured}
                                                onCheckedChange={(value) => handleInputChange("featured", value)}
                                            />
                                            <Label htmlFor="featured">Feature this product</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="digitalProduct"
                                                checked={formData.digitalProduct}
                                                onCheckedChange={(value) => handleInputChange("digitalProduct", value)}
                                            />
                                            <Label htmlFor="digitalProduct">This is a digital product</Label>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="availability">Availability Date</Label>
                                            <Input
                                                id="availability"
                                                type="datetime-local"
                                                onChange={(e) => handleInputChange("availabilityDate", e.target.value)}
                                            />
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <Label>Warranty Information</Label>
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="hasWarranty"
                                                    checked={formData.warranty.hasWarranty}
                                                    onCheckedChange={(value) => handleInputChange("warranty.hasWarranty", value)}
                                                />
                                                <Label htmlFor="hasWarranty">This product has warranty</Label>
                                            </div>

                                            {formData.warranty.hasWarranty && (
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="warrantyPeriod">Warranty Period</Label>
                                                        <Select
                                                            value={formData.warranty.period}
                                                            onValueChange={(value) => handleInputChange("warranty.period", value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select period" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {warrantyPeriods.map(period => (
                                                                    <SelectItem key={period} value={period}>{period}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="warrantyType">Warranty Type</Label>
                                                        <Select
                                                            value={formData.warranty.type}
                                                            onValueChange={(value) => handleInputChange("warranty.type", value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {warrantyTypes.map(type => (
                                                                    <SelectItem key={type} value={type}>
                                                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <Label htmlFor="relatedProducts">Related Products</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select related products" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {/* Would be populated with actual products in a real application */}
                                                    <SelectItem value="product1">Product 1</SelectItem>
                                                    <SelectItem value="product2">Product 2</SelectItem>
                                                    <SelectItem value="product3">Product 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </form>
                    </Tabs>
                ) : (
                    <ProductPreview />
                )}
            </div>
        </AdminLayout>
    )


}


