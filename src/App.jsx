import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import CoffeeAnatomy from './components/CoffeeAnatomy'
import BrewCalculator from './components/BrewCalculator'
import ProductGrid from './components/ProductGrid'
import About from './components/About'
import Footer from './components/Footer'
import QuickViewModal from './components/QuickViewModal'
import CartDrawer from './components/CartDrawer'
import BackgroundCanvas from './components/BackgroundCanvas'
import CustomCursor from './components/CustomCursor'
import AudioPlayer from './components/AudioPlayer'
import BaristaLoader from './components/BaristaLoader'
import confetti from 'canvas-confetti'

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [quickViewCoffee, setQuickViewCoffee] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSpidermanTheme, setIsSpidermanTheme] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const toggleSpidermanTheme = () => {
    setIsSpidermanTheme((prev) => !prev)
  }

  useEffect(() => {
    if (isSpidermanTheme) {
      document.documentElement.setAttribute('data-theme', 'spiderman')
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.2 },
        colors: ['#f59e0b', '#d97706', '#fbbf24', '#fef3c7']
      })
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [isSpidermanTheme])

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
      {/* Barista Coffee Extraction Splash Loader */}
      <BaristaLoader onLoadingComplete={() => setIsLoading(false)} />

      {/* Background Interactive Ambient Particle Canvas */}
      <BackgroundCanvas isSpidermanTheme={isSpidermanTheme} />

      {/* Custom Coffee Ring Cursor */}
      <CustomCursor />

      {/* Ambient Roastery Audio Player */}
      <AudioPlayer />

      {/* Header */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        isSpidermanTheme={isSpidermanTheme}
        onToggleSpidermanTheme={toggleSpidermanTheme}
      />

      <main style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Hero
          onOpenQuickView={(coffee) => setQuickViewCoffee(coffee)}
          onAddToCart={handleAddToCart}
        />

        <CoffeeAnatomy />

        <BrewCalculator />

        <ProductGrid
          onOpenQuickView={(coffee) => setQuickViewCoffee(coffee)}
          onAddToCart={handleAddToCart}
        />

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
    </>
  )
}
