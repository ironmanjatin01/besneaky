import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import About from './components/About'
import Footer from './components/Footer'
import QuickViewModal from './components/QuickViewModal'
import CartDrawer from './components/CartDrawer'
import BackgroundCanvas from './components/BackgroundCanvas'
import CustomCursor from './components/CustomCursor'
import AudioPlayer from './components/AudioPlayer'
import HanumanLoader from './components/HanumanLoader'
import confetti from 'canvas-confetti'

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [quickViewShoe, setQuickViewShoe] = useState(null)
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

  // Add item to cart
  const handleAddToCart = (shoe) => {
    const size = shoe.selectedSize || 'Standard'
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === shoe.id && item.selectedSize === size
      )
      if (existingIndex > -1) {
        const updated = [...prevItems]
        updated[existingIndex].quantity += 1
        return updated
      }
      return [...prevItems, { ...shoe, selectedSize: size, quantity: 1 }]
    })
  }

  // Update item quantity
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

  // Clear cart on order placement
  const handleClearCart = () => setCartItems([])

  return (
    <>
      {/* Cinematic Flying Hanumanji Mountain Zoom Entrance Loader */}
      <HanumanLoader onLoadingComplete={() => setIsLoading(false)} />

      {/* Background Interactive Ambient Particle & Web Canvas */}
      <BackgroundCanvas isSpidermanTheme={isSpidermanTheme} />

      {/* Magnetic Custom Ring Cursor */}
      <CustomCursor />

      {/* Direct YouTube Ramayan Songs Audio Player */}
      <AudioPlayer isSpidermanTheme={isSpidermanTheme} />

      {/* Main App Layout */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        isSpidermanTheme={isSpidermanTheme}
        onToggleSpidermanTheme={toggleSpidermanTheme}
      />

      <main style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Hero onOpenQuickView={(shoe) => setQuickViewShoe(shoe)} />

        <ProductGrid
          onOpenQuickView={(shoe) => setQuickViewShoe(shoe)}
          onAddToCart={handleAddToCart}
        />

        <About />
      </main>

      <Footer />

      {/* Quick View Modal Overlay */}
      {quickViewShoe && (
        <QuickViewModal
          shoe={quickViewShoe}
          onClose={() => setQuickViewShoe(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart / Verses Drawer */}
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
