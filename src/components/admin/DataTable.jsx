"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Search,
    MoreHorizontal,
    Eye,
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    Download,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useAuth } from "@/States/auth-context"
import { useOrders } from "@/States/order-store"
import { Checkbox } from "@/components/ui/checkbox"

// Reusable DataTable component
export const DataTable = ({
    columns,
    data,
    onBulkAction,
    pageSize = 10,
    selectable = true,
    searchable = true,
    filterable = true,
    pagination = true,
}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedRows, setSelectedRows] = useState(new Set())
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({})

    // Calculate pagination
    const totalPages = Math.ceil(data.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = data.slice(startIndex, endIndex)

    // Handle row selection
    const toggleRowSelection = (id) => {
        const newSelected = new Set(selectedRows)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedRows(newSelected)
    }

    // Select all rows on current page
    const toggleSelectAll = () => {
        if (selectedRows.size === paginatedData.length) {
            setSelectedRows(new Set())
        } else {
            const allIds = new Set(paginatedData.map(item => item.id))
            setSelectedRows(allIds)
        }
    }

    // Handle bulk action
    const handleBulkAction = (action) => {
        onBulkAction(Array.from(selectedRows), action)
        setSelectedRows(new Set())
    }

    return (
        <div className="space-y-4">
            {/* Table Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                {selectable && selectedRows.size > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            {selectedRows.size} selected
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Bulk Actions
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleBulkAction("processing")}>
                                    Mark as Processing
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleBulkAction("shipped")}>
                                    Mark as Shipped
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleBulkAction("delivered")}>
                                    Mark as Delivered
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleBulkAction("cancelled")}
                                    className="text-red-600"
                                >
                                    Cancel Orders
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {searchable && (
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search orders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    )}

                    {filterable && (
                        <Select
                            value={filters.status || "all"}
                            onValueChange={(value) => setFilters({ ...filters, status: value })}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {selectable && (
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                                        onCheckedChange={toggleSelectAll}
                                        aria-label="Select all"
                                    />
                                </TableHead>
                            )}
                            {columns.map((column) => (
                                <TableHead key={column.key}>{column.header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((item) => (
                            <TableRow key={item.id}>
                                {selectable && (
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.has(item.id)}
                                            onCheckedChange={() => toggleRowSelection(item.id)}
                                            aria-label={`Select row ${item.id}`}
                                        />
                                    </TableCell>
                                )}
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {column.cell ? column.cell(item) : item[column.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {pagination && totalPages > 1 && (
                <div className="flex items-center justify-between px-2">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
                    </div>
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                Page {currentPage} of {totalPages}
                            </div>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

