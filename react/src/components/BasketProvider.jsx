import React, { createContext, useContext, useState } from 'react'

const BasketContext = createContext()

export const useBasket = () => {
  const context = useContext(BasketContext)
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider')
  }
  return context
}

const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([])
  const [isBasketOpen, setIsBasketOpen] = useState(false)

  const addToBasket = (item) => {
    setBasketItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const removeFromBasket = (itemId) => {
    setBasketItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromBasket(itemId)
      return
    }
    setBasketItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return basketItems.reduce((total, item) => total + item.quantity, 0)
  }

  const clearBasket = () => {
    setBasketItems([])
  }

  const toggleBasket = () => {
    setIsBasketOpen(!isBasketOpen)
  }

  const value = {
    basketItems,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearBasket,
    isBasketOpen,
    toggleBasket,
    setIsBasketOpen
  }

  return (
    <BasketContext.Provider value={value}>
      {children}
    </BasketContext.Provider>
  )
}

export default BasketProvider
