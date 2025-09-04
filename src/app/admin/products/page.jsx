"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Package,
    AlertTriangle,
    Plus,
    Download,
    Eye,
    Edit,
    Trash2,
    MoreHorizontal
} from "lucide-react"
import { useAuth } from "@/States/auth-context"
import { useProducts } from "@/States/product-store"
import { useRouter } from "next/navigation"
import ReusableListingPage from "@/components/admin/ReusableListingPage"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProductsPage() {
    const { products, deleteProduct, updateProduct } = useProducts()
    const { hasPermission } = useAuth()
    const router = useRouter()

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800">Active</Badge>
            case "inactive":
                return <Badge variant="secondary">Inactive</Badge>
            case "draft":
                return <Badge variant="outline">Draft</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getStockBadge = (stock) => {
        if (stock === 0) {
            return <Badge variant="destructive">Out of Stock</Badge>
        } else if (stock < 10) {
            return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
        }
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
    }

    const handleBulkAction = (action, productIds) => {
        if (action === "activate") {
            productIds.forEach(id => updateProduct(id, { status: "active" }))
        } else if (action === "deactivate") {
            productIds.forEach(id => updateProduct(id, { status: "inactive" }))
        } else if (action === "export") {
            console.log("Exporting products:", productIds)
        } else if (action === "delete") {
            productIds.forEach(id => deleteProduct(id))
        }
    }

    const handleRowClick = (product) => {
        router.push(`/admin/products/${product.id}`)
    }

    const productsColumns = [
        {
            accessor: "name",
            header: "Product",
            sortable: true,
            cell: (product) => (
                <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={product.images[0] || "/placeholder.svg"} alt={product.name} />
                        <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                </div>
            )
        },
        {
            accessor: "sku",
            header: "SKU",
            sortable: true,
            cell: (product) => <span className="font-mono text-sm">{product.sku}</span>
        },
        {
            accessor: "category",
            header: "Category",
            sortable: true,
            cell: (product) => product.category
        },
        {
            accessor: "price",
            header: "Price",
            sortable: true,
            cell: (product) => (
                <div>
                    <span className="font-medium">${product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.originalPrice}
                        </span>
                    )}
                </div>
            )
        },
        {
            accessor: "stock",
            header: "Stock",
            sortable: true,
            cell: (product) => (
                <div className="flex flex-col space-y-1">
                    <span className="text-sm">{product.stock} units</span>
                    {getStockBadge(product.stock)}
                </div>
            )
        },
        {
            accessor: "status",
            header: "Status",
            sortable: true,
            cell: (product) => getStatusBadge(product.status),
            filterOptions: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "draft", label: "Draft" },
            ]
        }
    ]

    const bulkActions = [
        { value: "activate", label: "Activate Products" },
        { value: "deactivate", label: "Deactivate Products" },
        { value: "export", label: "Export Selected" },
        { value: "delete", label: "Delete Products", destructive: true },
    ]

    const stats = [
        {
            title: "Total Products",
            value: products.length.toString(),
            icon: Package,
        },
        {
            title: "Active Products",
            value: products.filter((p) => p.status === "active").length.toString(),
            icon: Package,
        },
        {
            title: "Low Stock Items",
            value: products.filter((p) => p.stock < 10 && p.stock > 0).length.toString(),
            icon: AlertTriangle,
        },
        {
            title: "Out of Stock",
            value: products.filter((p) => p.stock === 0).length.toString(),
            icon: AlertTriangle,
        },
    ]

    const headerRightContent = (
        <div className="flex items-center space-x-2">
            <Button variant="bordered" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
            </Button>
            {hasPermission("products.write") && (
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </Button>
                </Link>
            )}
        </div>
    )

    // Custom action renderer for the table
    const renderActions = (product) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleRowClick(product)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </DropdownMenuItem>
                {hasPermission("products.write") && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/products/edit/${product.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Product
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() =>
                                updateProduct(product.id, {
                                    status: product.status === "active" ? "inactive" : "active"
                                })
                            }
                        >
                            {product.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Product
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the product "
                                        {product.name}" from your catalog.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => deleteProduct(product.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )

    return (
        <ReusableListingPage
            title="Products"
            description="Manage your product catalog"
            data={products}
            columns={productsColumns}
            stats={stats}
            bulkActions={bulkActions}
            searchableColumns={[
                { accessor: "name" },
                { accessor: "sku" },
                { accessor: "brand" },
                { accessor: "category" }
            ]}
            filterableColumns={[
                {
                    accessor: "status",
                    header: "Status",
                    filterOptions: [
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                        { value: "draft", label: "Draft" },
                    ]
                },
                {
                    accessor: "stockStatus",
                    header: "Stock Status",
                    filterOptions: [
                        { value: "inStock", label: "In Stock" },
                        { value: "lowStock", label: "Low Stock" },
                        { value: "outOfStock", label: "Out of Stock" },
                    ]
                }
            ]}
            onBulkAction={handleBulkAction}
            onRowClick={handleRowClick}
            headerRightContent={headerRightContent}
            requireWritePermission={true}
            renderActions={renderActions}
        />
    )
}