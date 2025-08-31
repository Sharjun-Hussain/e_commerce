"use client"

import React from "react"
import { createContext, useContext, useReducer } from "react"



const initialState = {
    cart: [],
    wishlist: [],
}

function storeReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingItem = state.cart.find((item) => item.id === action.product.id)
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
                    ),
                }
            }
            return {
                ...state,
                cart: [...state.cart, { ...action.product, quantity: 1 }],
            }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.productId),
            }

        case "UPDATE_QUANTITY":
            if (action.quantity <= 0) {
                return {
                    ...state,
                    cart: state.cart.filter((item) => item.id !== action.productId),
                }
            }
            return {
                ...state,
                cart: state.cart.map((item) => (item.id === action.productId ? { ...item, quantity: action.quantity } : item)),
            }

        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
            }

        case "ADD_TO_WISHLIST":
            const existingWishlistItem = state.wishlist.find((item) => item.id === action.product.id)
            if (existingWishlistItem) {
                return state
            }
            return {
                ...state,
                wishlist: [...state.wishlist, action.product],
            }

        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.filter((item) => item.id !== action.productId),
            }

        case "MOVE_TO_CART":
            const wishlistItem = state.wishlist.find((item) => item.id === action.productId)
            if (!wishlistItem) return state

            const newState = {
                ...state,
                wishlist: state.wishlist.filter((item) => item.id !== action.productId),
            }

            const existingCartItem = newState.cart.find((item) => item.id === action.productId)
            if (existingCartItem) {
                newState.cart = newState.cart.map((item) =>
                    item.id === action.productId ? { ...item, quantity: item.quantity + 1 } : item,
                )
            } else {
                newState.cart = [...newState.cart, { ...wishlistItem, quantity: 1 }]
            }

            return newState

        default:
            return state
    }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(storeReducer, initialState)

    return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
    const context = useContext(StoreContext)
    if (!context) {
        throw new Error("useStore must be used within a StoreProvider")
    }
    return context
}
