import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import SneakyBeanVault from './components/SneakyBeanVault'
import CoffeeAnatomy from './components/CoffeeAnatomy'
import About from './components/About'
import Footer from './components/Footer'
import QuickViewModal from './components/QuickViewModal'
import CartDrawer from './components/CartDrawer'
import BackgroundCanvas from './components/BackgroundCanvas'
import JazzPlayer from './components/JazzPlayer'

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [quickViewCoffee, setQuickViewCoffee] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sneaky_theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('sneaky_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Add coffee item to cart
  const handleAddToCart = (coffee) => {
    const customSizeKey = coffee.selectedSize || 'Standard Hot'
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === coffee.id && item.selectedSize === customSizeKey
      )
      if (existingIndex > -1) {
        const updated = [...prevItems]
        updated[existingIndex].quantity += coffee.quantity || 1
        return updated
      }
      return [
        ...prevItems,
        {
          ...coffee,
          selectedSize: customSizeKey,
          quantity: coffee.quantity || 1
        }
      ]
    })
    setIsCartOpen(true)
  }

  // Update quantity
  const handleUpdateQuantity = (id, selectedSize, newQty) => {
    if (newQty < 1) return
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, quantity: newQty }
          : item
      )
    )
  }

  // Remove item from cart
  const handleRemoveItem = (id, selectedSize) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      )
    )
  }

  // Clear cart
  const handleClearCart = () => setCartItems([])

  return (
    <>
      <BackgroundCanvas />

      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        isDarkMode={theme === 'dark'}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero
          onOpenQuickView={(coffee) => setQuickViewCoffee(coffee)}
          onAddToCart={handleAddToCart}
        />

        <ProductGrid
          onOpenQuickView={(coffee) => setQuickViewCoffee(coffee)}
          onAddToCart={handleAddToCart}
        />

        <SneakyBeanVault />

        <CoffeeAnatomy />

        <About />
      </main>

      <Footer />

      {/* Quick View Modal Overlay */}
      {quickViewCoffee && (
        <QuickViewModal
          shoe={quickViewCoffee}
          onClose={() => setQuickViewCoffee(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Order Ticket Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Soft Jazz Lounge Player */}
      <JazzPlayer />
    </>
  )
}
