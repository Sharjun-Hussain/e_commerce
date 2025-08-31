import { ProtectedRoute } from "@/components/admin/protected-route"
import { AuthProvider } from "@/States/auth-context"
import { OrderProvider } from "@/States/order-store"
import { ProductProvider } from "@/States/product-store"
import { UserProvider } from "@/States/user-store"
import React from "react"


export default function AdminLayout({
    children,
}) {
    return (
        <AuthProvider>
            <ProductProvider>
                <OrderProvider>
                    <UserProvider>
                        <ProtectedRoute>{children}</ProtectedRoute>
                    </UserProvider>
                </OrderProvider>
            </ProductProvider>
        </AuthProvider>
    )
}
