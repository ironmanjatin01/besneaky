// BeSneaky Artisan Coffee & Cafe Master Data

// Menu data was originally seeded in USD. Present it as realistic INR café pricing.
const INR_PRICE_MULTIPLIER = 90

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Math.round(price * INR_PRICE_MULTIPLIER))

export const COFFEE_CATEGORIES = [
  { id: 'all', name: 'All Coffees & Treats', icon: 'Coffee' },
  { id: 'espresso', name: 'Espresso Classics', icon: 'Zap' },
  { id: 'manual', name: 'Pour Over & Manual', icon: 'Droplets' },
  { id: 'cold', name: 'Cold Brews & Nitro', icon: 'Snowflake' },
  { id: 'signature', name: 'Signature Crafts', icon: 'Sparkles' },
  { id: 'bakery', name: 'Artisan Bakery', icon: 'Utensils' }
]

export const COFFEE_ITEMS = [
  // --- ESPRESSO CLASSICS ---
  {
    id: 'esp-01',
    name: 'Single Origin Doppio Espresso',
    category: 'espresso',
    tagline: 'Syrupy body with vibrant floral acidity and dark cacao finish.',
    price: 3.80,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    origin: 'Ethiopia Yirgacheffe & Guatemala Antigua',
    altitude: '1,950m - 2,100m',
    process: 'Washed & Sun-Dried',
    roastLevel: 'Medium-Light',
    intensity: 5,
    caffeineMg: 130,
    brewRatio: '1:2 (18g in -> 36g out)',
    waterTemp: '93°C (199.4°F)',
    grindSize: 'Fine (Espresso)',
    extractionTime: '27-30 seconds',
    tastingNotes: ['Dark Chocolate', 'Bergamot', 'Jasmine', 'Citrus Zest'],
    milkRatio: '100% Pure Espresso Crema',
    isPopular: true,
    isFeatured: true,
    description: 'Extracted under 9 bars of pressure from our signature high-altitude roasted beans. A rich golden crema crowning a complex body with berry brightness and a lingering velvet chocolate finish.',
    customizations: {
      milkTypes: ['None (Pure Shot)', 'Side of Warm Oat Milk'],
      sweetnessLevels: ['Unsweetened (Recommended)', '50% Raw Sugar', '100% Cane Syrup'],
      shots: ['Standard Double Shot', 'Triple Shot (+ $1.00)'],
      temperatures: ['Hot (93°C)']
    }
  },
  {
    id: 'esp-02',
    name: 'Artisan Cortado',
    category: 'espresso',
    tagline: 'Equal parts velvety microfoam and rich double espresso.',
    price: 4.50,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    origin: 'Colombia Huila Supremo',
    altitude: '1,750m',
    process: 'Honey Processed',
    roastLevel: 'Medium',
    intensity: 4,
    caffeineMg: 120,
    brewRatio: '1:1 Espresso to Steamed Milk',
    waterTemp: '93°C / Milk at 62°C',
    grindSize: 'Fine',
    extractionTime: '28 seconds',
    tastingNotes: ['Toasted Hazelnut', 'Milk Chocolate', 'Caramel Fudge'],
    milkRatio: '50% Espresso, 50% Textured Milk',
    isPopular: true,
    description: 'Originating from Spain, the Cortado cuts the sharpness of double espresso with an equal measure of silky steamed milk, keeping the robust coffee character at the forefront.',
    customizations: {
      milkTypes: ['Whole Milk', 'Oat Milk (Barista Edition)', 'Almond Milk', 'Macadamia Milk (+ $0.60)'],
      sweetnessLevels: ['Unsweetened', 'Vanilla Drop', 'Salted Caramel'],
      shots: ['Double Shot', 'Triple Shot (+ $1.00)'],
      temperatures: ['Standard Hot (62°C)', 'Extra Hot (70°C)']
    }
  },
  {
    id: 'esp-03',
    name: 'Melbourne Flat White',
    category: 'espresso',
    tagline: 'Double ristretto with micro-textured velvety milk and thin crema coat.',
    price: 4.80,
    rating: 4.95,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    origin: 'Brazil Mogiana & Costa Rica Tarrazú',
    altitude: '1,400m',
    process: 'Natural Pulped',
    roastLevel: 'Medium',
    intensity: 4,
    caffeineMg: 140,
    brewRatio: 'Double Ristretto + 120ml Microfoam',
    waterTemp: '92°C / Milk at 60°C',
    grindSize: 'Fine',
    extractionTime: '22 seconds',
    tastingNotes: ['Sweet Cream', 'Roasted Almond', 'Milk Chocolate'],
    milkRatio: '30% Espresso, 70% Micro-steamed Milk',
    isPopular: true,
    isFeatured: true,
    description: 'Crafted in the true Australian style using a double ristretto shot topped with glossy, micro-steamed milk poured to create a thin, smooth layer of velvet microfoam without stiff froth.',
    customizations: {
      milkTypes: ['Whole Milk', 'Oat Milk (Recommended)', 'Almond Milk', 'Coconut Milk'],
      sweetnessLevels: ['Unsweetened', 'Raw Honey', 'Demerara Syrup'],
      shots: ['Double Ristretto', 'Triple Ristretto (+ $1.00)'],
      temperatures: ['Warm Velvet (60°C)', 'Extra Hot']
    }
  },
  {
    id: 'esp-04',
    name: 'Velvet Cappuccino',
    category: 'espresso',
    tagline: 'Third-wave classic with a cloud of aerated milk and dark cocoa dusting.',
    price: 4.60,
    rating: 4.75,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    origin: 'Guatemala Huehuetenango',
    altitude: '1,800m',
    process: 'Washed',
    roastLevel: 'Medium-Dark',
    intensity: 3.5,
    caffeineMg: 125,
    brewRatio: '1/3 Espresso, 1/3 Milk, 1/3 Foam',
    waterTemp: '93°C / Milk at 65°C',
    grindSize: 'Fine',
    extractionTime: '27 seconds',
    tastingNotes: ['Cocoa Dust', 'Vanilla Bean', 'Toasted Walnut'],
    milkRatio: '33% Espresso, 33% Milk, 33% Rich Foam',
    isPopular: false,
    description: 'The iconic 6oz Italian balance: concentrated espresso layered under silky heated milk, topped with a thick pillow of glossy microfoam dusted with 70% dark cocoa powder.',
    customizations: {
      milkTypes: ['Whole Milk', 'Oat Milk', 'Almond Milk', 'Skim Milk'],
      sweetnessLevels: ['Unsweetened', 'Cinnamon Sugar', 'Vanilla Dust'],
      shots: ['Double Shot', 'Triple Shot (+ $1.00)'],
      temperatures: ['Hot (65°C)', 'Extra Hot']
    }
  },
  {
    id: 'esp-05',
    name: 'Sneaky Caffè Latte',
    category: 'espresso',
    tagline: 'Smooth, creamy, and soothing with delicate notes of vanilla and honey.',
    price: 4.90,
    rating: 4.85,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=800&q=80',
    origin: 'Brazil Cerrado Mineiro',
    altitude: '1,100m',
    process: 'Natural',
    roastLevel: 'Medium',
    intensity: 2.5,
    caffeineMg: 110,
    brewRatio: '1:4 Espresso to Milk',
    waterTemp: '93°C / Milk at 65°C',
    grindSize: 'Fine',
    extractionTime: '26 seconds',
    tastingNotes: ['Toasted Oat', 'Honey Blossom', 'Caramel Butter'],
    milkRatio: '20% Espresso, 80% Micro-steamed Milk',
    isPopular: true,
    description: 'A comforting, velvety milk coffee featuring a double espresso foundation gently blended with generous, silky steamed milk and finished with elegant free-poured latte art.',
    customizations: {
      milkTypes: ['Oat Milk (Barista Blend)', 'Whole Milk', 'Almond Milk', 'Macadamia Milk (+ $0.60)'],
      sweetnessLevels: ['Unsweetened', 'Madagascar Vanilla', 'Salted Honey', 'Hazelnut Syrup'],
      shots: ['Double Shot', 'Triple Shot (+ $1.00)'],
      temperatures: ['Hot (65°C)', 'Iced over Ice Spheres']
    }
  },
  {
    id: 'esp-06',
    name: 'Caffè Americano',
    category: 'espresso',
    tagline: 'Double shot poured over pure hot spring water with golden crema ring.',
    price: 3.90,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80',
    origin: 'Kenya Nyeri & Colombia Huila',
    altitude: '1,900m',
    process: 'Washed',
    roastLevel: 'Medium-Light',
    intensity: 3.5,
    caffeineMg: 135,
    brewRatio: 'Double Espresso + 200ml Hot Water',
    waterTemp: '94°C',
    grindSize: 'Fine',
    extractionTime: '28 seconds',
    tastingNotes: ['Blackcurrant', 'Dark Cocoa', 'Crisp Apple'],
    milkRatio: '0% Milk (Pure Water & Espresso)',
    isPopular: false,
    description: 'Crafted by pouring double shots of our floral espresso over hot mineral water, preserving the delicate aromatic crema ring while highlighting crisp fruited acidity.',
    customizations: {
      milkTypes: ['None', 'Splash of Warm Oat Milk', 'Splash of Whole Milk'],
      sweetnessLevels: ['Unsweetened', 'Raw Sugar', 'Stevia Drop'],
      shots: ['Double Shot', 'Triple Shot (+ $1.00)'],
      temperatures: ['Hot (94°C)', 'Iced Americano']
    }
  },

  // --- MANUAL & POUR OVER BREWS ---
  {
    id: 'man-01',
    name: 'V60 Ethiopian Yirgacheffe G1',
    category: 'manual',
    tagline: 'Hand-poured filter coffee with delicate jasmine, lemon zest & bergamot notes.',
    price: 5.50,
    rating: 4.98,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    origin: 'Gedeo Zone, Yirgacheffe, Ethiopia',
    altitude: '2,200m',
    process: 'Washed Heirloom',
    roastLevel: 'Light Roast (Nordic Style)',
    intensity: 2,
    caffeineMg: 150,
    brewRatio: '1:16.6 (15g coffee -> 250ml water)',
    waterTemp: '92°C (197.6°F)',
    grindSize: 'Medium-Fine (Sea Salt)',
    extractionTime: '3:15 minutes',
    tastingNotes: ['Jasmine', 'Bergamot', 'Peach Blossom', 'Meyer Lemon'],
    milkRatio: 'No Milk (Pure Filter Brew)',
    isPopular: true,
    isFeatured: true,
    description: 'Precision hand-brewed using the Hario V60 paper filter dripper. This exceptional Grade-1 Ethiopian lot displays tea-like elegance, intense floral bouquet, and crisp citrus clarity.',
    customizations: {
      milkTypes: ['No Milk (Recommended for Filter)'],
      sweetnessLevels: ['Unsweetened (Preserves Single Origin Profile)'],
      shots: ['Single Dripper (250ml)', 'Large Chemex Share Carafe 500ml (+ $3.50)'],
      temperatures: ['Served Warm (90°C)']
    }
  },
  {
    id: 'man-02',
    name: 'Chemex Colombian Huila Pink Bourbon',
    category: 'manual',
    tagline: 'Ultra-clean cup with stone fruit sweetness, red apple & brown sugar notes.',
    price: 6.20,
    rating: 4.9,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    origin: 'San Adolfo, Huila, Colombia',
    altitude: '1,850m',
    process: 'Anaerobic Fermentation (48h)',
    roastLevel: 'Light-Medium',
    intensity: 3,
    caffeineMg: 160,
    brewRatio: '1:15 (20g coffee -> 300ml water)',
    waterTemp: '94°C',
    grindSize: 'Medium-Coarse',
    extractionTime: '4:00 minutes',
    tastingNotes: ['Pink Guava', 'Red Apple', 'Maple Syrup', 'Cinnamon Dust'],
    milkRatio: 'No Milk',
    isPopular: false,
    description: 'Brewed through heavy specialty Chemex bonded paper filters. Removes all heavy oils and sediment, delivering an extraordinarily clean, sweet, nectar-like body with complex winey notes.',
    customizations: {
      milkTypes: ['No Milk'],
      sweetnessLevels: ['Unsweetened'],
      shots: ['300ml Glass Carafe'],
      temperatures: ['Served Warm in Glass Decanter']
    }
  },
  {
    id: 'man-03',
    name: 'AeroPress Sumatran Lintong Dark Reserve',
    category: 'manual',
    tagline: 'Immersion extraction yielding an earthy, spiced, heavy-bodied cup.',
    price: 5.20,
    rating: 4.82,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    origin: 'Lake Toba, Sumatra, Indonesia',
    altitude: '1,500m',
    process: 'Wet-Hulled (Giling Basah)',
    roastLevel: 'Medium-Dark',
    intensity: 4.5,
    caffeineMg: 175,
    brewRatio: '1:12 Inverted Method',
    waterTemp: '88°C',
    grindSize: 'Medium-Fine',
    extractionTime: '2:10 minutes',
    tastingNotes: ['Cedar Wood', 'Dark Molasses', 'Black Pepper', 'Earthy Cocoa'],
    milkRatio: 'Optional Milk Splash',
    isPopular: false,
    description: 'Prepared using the inverted AeroPress rapid total immersion method. Creates high extraction pressure, accentuating Sumatrans signature herbal spice, low acidity, and heavy mouthfeel.',
    customizations: {
      milkTypes: ['No Milk', 'Splash of Warm Oat Milk'],
      sweetnessLevels: ['Unsweetened', 'Raw Molasses Syrup'],
      shots: ['220ml Plunge'],
      temperatures: ['Served Warm (85°C)']
    }
  },

  // --- COLD BREWS & NITRO ---
  {
    id: 'cld-01',
    name: 'Sneaky Signature Nitro Cold Brew',
    category: 'cold',
    tagline: '20-hour steep infused with food-grade Nitrogen for a stout-like creamy head.',
    price: 5.80,
    rating: 4.97,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    origin: 'Guatemala Antigua & Brazil Santos Blend',
    altitude: '1,600m',
    process: 'Slow Water Extraction',
    roastLevel: 'Medium-Dark',
    intensity: 4.5,
    caffeineMg: 210,
    brewRatio: '20-Hour Immersion Cold Extraction',
    waterTemp: '2°C (35.6°F) Nitrogen Cascading',
    grindSize: 'Coarse',
    extractionTime: '20 Hours Cold Steep',
    tastingNotes: ['Dark Chocolate Malt', 'Bourbon Vanilla', 'Molasses', 'Sweet Cream'],
    milkRatio: 'Naturally Creamy Nitrogen Cascade (No Dairy Needed)',
    isPopular: true,
    isFeatured: true,
    description: 'Slow-steeped in crystal cold mineral water for 20 hours to eliminate bitterness, then pressurized with micro-nitrogen bubbles. Taps out with a cascading velvet head and natural sweet malt flavor.',
    customizations: {
      milkTypes: ['Nitrogen Micro-head (No Milk Needed)', 'Topped with Vanilla Sweet Cold Foam (+ $0.80)'],
      sweetnessLevels: ['Unsweetened (Naturally Sweet)', 'Salted Caramel Drizzle', 'Vanilla Syrup'],
      shots: ['Standard 16oz Pint', 'Grand 20oz Pint (+ $1.20)'],
      temperatures: ['Draft Chilled (2°C - No Ice Needed)']
    }
  },
  {
    id: 'cld-02',
    name: 'Japanese Flash Chill Cold Brew',
    category: 'cold',
    tagline: 'Brewed hot directly over ice spheres to lock in volatile aroma compounds.',
    price: 5.40,
    rating: 4.88,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80',
    origin: 'Kenya AA Nyeri Hill',
    altitude: '1,950m',
    process: 'Washed SL28 & SL34',
    roastLevel: 'Light Roast',
    intensity: 3,
    caffeineMg: 165,
    brewRatio: '1:10 Hot Pour over 40% Ice Weight',
    waterTemp: '95°C onto Ice Spheres',
    grindSize: 'Medium',
    extractionTime: '3:30 minutes',
    tastingNotes: ['Passionfruit', 'Red Currant', 'Floral Earl Grey', 'Cane Sugar'],
    milkRatio: 'No Milk (Pure Chilled Filter)',
    isPopular: false,
    description: 'Using the traditional Japanese Flash Drip technique: hot filter coffee pours directly onto handcrafted clear ice spheres. Instantly traps bright fruit aromatics that cold steeping leaves behind.',
    customizations: {
      milkTypes: ['No Milk'],
      sweetnessLevels: ['Unsweetened', 'Citrus Agave Syrup'],
      shots: ['16oz Glass with Ice Sphere'],
      temperatures: ['Ice Cold (-1°C)']
    }
  },
  {
    id: 'cld-03',
    name: 'Cascara Sparkling Citrus Tonic',
    category: 'cold',
    tagline: 'Fruited coffee cherry tea combined with artisanal tonic & fresh orange peel.',
    price: 5.60,
    rating: 4.79,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    origin: 'Santa Ana, El Salvador (Cascara Cherry Husks)',
    altitude: '1,500m',
    process: 'Sun-Dried Coffee Cherries',
    roastLevel: 'Unroasted Herbal Infusion',
    intensity: 1.5,
    caffeineMg: 45,
    brewRatio: 'Cascara Tea Concentrate + Artisanal Botanical Tonic',
    waterTemp: '85°C Steep, Served over Ice',
    grindSize: 'Whole Dried Husks',
    extractionTime: '8 minute Steep',
    tastingNotes: ['Rosehip', 'Hibiscus Tea', 'Blood Orange Zest', 'Botanical Quinine'],
    milkRatio: 'Sparkling Botanical Mix',
    isPopular: false,
    description: 'Made from upcycled dried husks of organic coffee cherries. Infused with elderflower botanical tonic, sparkling water, and garnished with a flame-expressed blood orange twist.',
    customizations: {
      milkTypes: ['Sparkling Botanical (Dairy Free)'],
      sweetnessLevels: ['Naturally Sweetened', 'Extra Orange Zest'],
      shots: ['16oz Chilled Highball'],
      temperatures: ['Ice Cold']
    }
  },

  // --- SIGNATURE CRAFTS ---
  {
    id: 'sig-01',
    name: 'Sneaky Spiced Belgian Dark Mocha',
    category: 'signature',
    tagline: 'Double espresso blended with 72% melted Belgian chocolate & cardamom cinnamon dust.',
    price: 5.90,
    rating: 4.96,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    origin: 'Guatemala & Ivory Coast Cocoa Blend',
    altitude: '1,600m',
    process: 'Washed Coffee + Single Origin Cocoa',
    roastLevel: 'Medium-Dark',
    intensity: 4,
    caffeineMg: 145,
    brewRatio: 'Double Espresso + 30g Melted Ganache + Steamed Oat Milk',
    waterTemp: '93°C / Milk at 65°C',
    grindSize: 'Fine',
    extractionTime: '28 seconds',
    tastingNotes: ['72% Belgian Ganache', 'Green Cardamom', 'Ceylon Cinnamon', 'Nutmeg'],
    milkRatio: '25% Espresso & Cocoa, 75% Oat Milk',
    isPopular: true,
    isFeatured: true,
    description: 'Our decadent signature house creation: real melted 72% Belgian dark chocolate folded into hot espresso shots, micro-steamed milk, and dusted with green cardamom and Ceylon cinnamon.',
    customizations: {
      milkTypes: ['Oat Milk (Recommended)', 'Whole Milk', 'Almond Milk', 'Macadamia Milk'],
      sweetnessLevels: ['Standard Belgian Ganache', 'Extra Dark (Less Sweet)', 'Sweet Spice'],
      shots: ['Double Shot', 'Triple Shot (+ $1.00)'],
      temperatures: ['Hot Cozy (65°C)', 'Iced Belgian Mocha']
    }
  },
  {
    id: 'sig-02',
    name: 'Charcoal Vanilla Bean Latte',
    category: 'signature',
    tagline: 'Activated bamboo charcoal, Madagascar vanilla bean & velvety microfoam float.',
    price: 5.75,
    rating: 4.85,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    origin: 'Brazil Santos Single Origin',
    altitude: '1,200m',
    process: 'Natural',
    roastLevel: 'Medium',
    intensity: 3,
    caffeineMg: 120,
    brewRatio: 'Charcoal Vanilla Elixir + Double Espresso Shot',
    waterTemp: '92°C',
    grindSize: 'Fine',
    extractionTime: '26 seconds',
    tastingNotes: ['Bourbon Vanilla', 'Smokey Caramel', 'Velvet Marshmallow'],
    milkRatio: '20% Espresso, 80% Charcoal Textured Milk',
    isPopular: false,
    description: 'Visually striking dark velvet latte infused with food-grade coconut shell activated charcoal and real scraped Madagascar vanilla bean specks. Detoxifying yet indulgence in a cup.',
    customizations: {
      milkTypes: ['Oat Milk', 'Whole Milk', 'Almond Milk', 'Coconut Milk'],
      sweetnessLevels: ['Vanilla Infused', 'Unsweetened Charcoal'],
      shots: ['Double Shot', 'Triple Shot (+ $1.00)'],
      temperatures: ['Hot Velvet (65°C)', 'Iced Black Pearl']
    }
  },
  {
    id: 'sig-03',
    name: 'Rose Pistachio Matcha Espresso Float',
    category: 'signature',
    tagline: 'Tri-layer showpiece: Rose-water elixir, Ceremonial Matcha & Espresso float.',
    price: 6.40,
    rating: 4.92,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    origin: 'Uji Kyoto Matcha & Ethiopian Coffee Float',
    altitude: '2,000m',
    process: 'Shade Grown Green Tea + Washed Arabica',
    roastLevel: 'Light Float',
    intensity: 2.5,
    caffeineMg: 115,
    brewRatio: 'Layered Matcha, Oat Milk & Ristretto Float',
    waterTemp: '80°C Matcha / 93°C Espresso',
    grindSize: 'Whisked Powder & Fine Grind',
    extractionTime: 'Multi-layer preparation',
    tastingNotes: ['Damask Rose', 'Uji Umami Matcha', 'Pistachio Cream', 'Sweet Cream'],
    milkRatio: 'Layered Oat Milk Base with Matcha & Coffee Float',
    isPopular: true,
    description: 'A stunning three-tiered masterpiece starting with organic rose petal syrup and oat milk, topped with whisked Uji Ceremonial grade matcha, and finished with a float of light-roast Ethiopian ristretto.',
    customizations: {
      milkTypes: ['Oat Milk (Essential for Layering)', 'Almond Milk', 'Macadamia Milk (+ $0.60)'],
      sweetnessLevels: ['Rose Honey Sweetness', 'Half Sweet Rose'],
      shots: ['Ristretto Float', 'Double Ristretto Float (+ $1.00)'],
      temperatures: ['Chilled over Ice Spheres']
    }
  },

  // --- ARTISAN BAKERY & PAIRINGS ---
  {
    id: 'bak-01',
    name: 'French Butter Croissant w/ Espresso Glaze',
    category: 'bakery',
    tagline: '100% Normandy butter layered pastry drizzled with house coffee glaze.',
    price: 4.20,
    rating: 4.94,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    origin: 'Baked Fresh Daily at 5:00 AM',
    altitude: 'N/A',
    process: '72-Hour Fermented Laminated Dough',
    roastLevel: 'Golden Baked',
    intensity: 1,
    caffeineMg: 10,
    brewRatio: 'Pairs perfectly with Single Origin Doppio or V60',
    waterTemp: 'Warmed at 180°C',
    grindSize: 'N/A',
    extractionTime: '24 Layer Lamination',
    tastingNotes: ['Flaky Butter', 'Roasted Coffee Glaze', 'Toasted Wheat'],
    milkRatio: 'Contains Normandy Dairy Butter',
    isPopular: true,
    isFeatured: true,
    description: 'Handcrafted daily using imported French AOP butter with 84% fat content. 24 delicate paper-thin layers that shatter upon bite, brushed with a thin caramel espresso reduction glaze.',
    customizations: {
      milkTypes: ['Warm Service', 'Room Temp Service'],
      sweetnessLevels: ['With Espresso Glaze', 'Plain Butter Croissant'],
      shots: ['Single Pastry', 'Baker’s Pair (2 pcs + $3.80)'],
      temperatures: ['Warmed Oven Fresh']
    }
  },
  {
    id: 'bak-02',
    name: 'Swedish Cardamom Cinnamon Knott',
    category: 'bakery',
    tagline: 'Freshly crushed green cardamom dough twisted with pearl sugar.',
    price: 4.50,
    rating: 4.91,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    origin: 'Traditional Scandinavian Baker Recipe',
    altitude: 'N/A',
    process: 'Slow Yeast Fermentation',
    roastLevel: 'Caramelized Edge',
    intensity: 1,
    caffeineMg: 0,
    brewRatio: 'Best enjoyed alongside an Artisan Cortado or Flat White',
    waterTemp: 'Warmed',
    grindSize: 'Coarsely Mortared Cardamom Pods',
    extractionTime: 'Stone Hearth Bake',
    tastingNotes: ['Green Cardamom', 'Ceylon Cinnamon', 'Pearl Sugar Crunch'],
    milkRatio: 'Dairy Butter & Sweet Spice',
    isPopular: true,
    description: 'Authentic Swedish Kardemummabulle made with freshly pestle-crushed green cardamom seeds, twisted with cinnamon butter and topped with crunchy Swedish pearl sugar.',
    customizations: {
      milkTypes: ['Warmed Oven Fresh', 'Room Temp'],
      sweetnessLevels: ['Pearl Sugar Dust'],
      shots: ['Single Bun', 'Two Buns (+ $4.00)'],
      temperatures: ['Warmed']
    }
  },
  {
    id: 'bak-03',
    name: 'Espresso Soaked Tiramisu Tartlet',
    category: 'bakery',
    tagline: 'Mascarpone mousse, Savoiardi soaked in Sneaky Nitro Cold Brew & cocoa dust.',
    price: 5.60,
    rating: 4.98,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    origin: 'House Pastry Kitchen',
    altitude: 'N/A',
    process: 'Chilled Layer Assembly',
    roastLevel: 'Chilled',
    intensity: 2.5,
    caffeineMg: 35,
    brewRatio: 'Infused with Nitro Cold Brew Reduction',
    waterTemp: 'Chilled 4°C',
    grindSize: 'N/A',
    extractionTime: '12h Cold Steep Infusion',
    tastingNotes: ['Velvety Mascarpone', 'Dark Espresso Sponge', 'Dutch Cocoa Dust'],
    milkRatio: 'Italian Mascarpone Cream',
    isPopular: true,
    description: 'An individual dessert tartlet featuring a crisp cocoa pastry shell filled with ladyfinger sponge soaked in our concentrated 20-hour Nitro Cold Brew, layered with whipped Italian mascarpone mousse.',
    customizations: {
      milkTypes: ['Chilled Dessert Service'],
      sweetnessLevels: ['Standard Richness'],
      shots: ['Single Tartlet'],
      temperatures: ['Chilled']
    }
  }
]

export const CAFE_METRICS = [
  { label: 'Ideal Extraction Temp', value: '93°C', sub: 'Precision Groupheads' },
  { label: 'Single Origin Lots', value: '100%', sub: 'Ethically Sourced' },
  { label: 'Cold Brew Steep', value: '20 Hours', sub: 'Nitro Infused' },
  { label: 'Barista Rating', value: '4.95 ★', sub: 'Over 2,500 Reviews' }
]

export const BREWING_METHODS = [
  {
    id: 'v60',
    name: 'Hario V60',
    ratio: 16.6, // 1g coffee to 16.6ml water
    idealTemp: '92°C',
    grind: 'Medium-Fine (Sea Salt)',
    timeSec: 195, // 3:15
    icon: 'Droplet',
    steps: [
      'Rinse paper filter with hot water to remove papery taste and preheat cone.',
      'Add 15g medium-fine coffee ground, create a slight dimple in the center.',
      'Bloom: Pour 40g water in spiral motion. Wait 45 seconds to let gases release.',
      'Pour 1: Continue pouring in slow steady circles up to 150g total water.',
      'Pour 2: At 1:30, finish final pour up to 250g. Give a gentle swirl and drawdown.'
    ]
  },
  {
    id: 'chemex',
    name: 'Chemex Pour-Over',
    ratio: 15.0,
    idealTemp: '94°C',
    grind: 'Medium-Coarse (Kosher Salt)',
    timeSec: 240, // 4:00
    icon: 'Feather',
    steps: [
      'Place heavy bonded filter, rinse thoroughly with boiling water and drain.',
      'Add 20g medium-coarse grounds and level the bed evenly.',
      'Bloom pour with 60g water. Allow 50 seconds for full bloom reaction.',
      'Pour steadily in concentric rings avoiding filter walls up to 300g.',
      'Let gravity complete drawdown for a crystalline, clean body.'
    ]
  },
  {
    id: 'aeropress',
    name: 'AeroPress (Inverted)',
    ratio: 12.0,
    idealTemp: '88°C',
    grind: 'Medium-Fine',
    timeSec: 130, // 2:10
    icon: 'Compass',
    steps: [
      'Set AeroPress upside down in inverted position with plunger set to mark 4.',
      'Add 15g coffee grounds into chamber.',
      'Pour 180g water at 88°C, stir vigorously for 10 seconds with paddle.',
      'Attach rinsed filter cap. At 1:30, invert onto decanter and press smoothly for 30s.'
    ]
  },
  {
    id: 'frenchpress',
    name: 'French Press Immersion',
    ratio: 14.0,
    idealTemp: '95°C',
    grind: 'Coarse (Breadcrumbs)',
    timeSec: 270, // 4:30
    icon: 'Coffee',
    steps: [
      'Preheat carafe. Add 30g coarse ground coffee.',
      'Pour 420g boiling water (95°C) ensuring all grounds are saturated.',
      'Cover with plunger without pressing down. Steep undisturbed for 4 minutes.',
      'Break crust with spoon, skim foam off surface. Press plunger down gently and serve.'
    ]
  },
  {
    id: 'espresso',
    name: 'Espresso Grouphead',
    ratio: 2.0,
    idealTemp: '93°C',
    grind: 'Ultra-Fine (Powdered Sand)',
    timeSec: 28,
    icon: 'Zap',
    steps: [
      'Dose 18g finely ground coffee into clean portafilter basket.',
      'Distribute bed evenly using WDT needle distribution tool.',
      'Tamp firmly with 30 lbs of level pressure.',
      'Lock into grouphead and extract 36g of liquid gold espresso in 27-30 seconds.'
    ]
  }
]

export const COFFEE_LAYERS_DATA = [
  {
    id: 'espresso',
    name: 'Double Espresso',
    tagline: 'Pure concentrated coffee liquid gold extracted at 9 bars.',
    layers: [
      { name: 'Espresso Crema', percentage: 20, color: '#C88D48' },
      { name: 'Pure Double Espresso', percentage: 80, color: '#2C1B14' }
    ],
    ratioText: '100% Concentrated Arabica Shot',
    tempText: '93°C',
    intensityText: '5 / 5'
  },
  {
    id: 'cortado',
    name: 'Artisan Cortado',
    tagline: 'Equal parts dark espresso and silky warm milk.',
    layers: [
      { name: 'Micro-Foam Rim', percentage: 10, color: '#FFF8F0' },
      { name: 'Steamed Whole / Oat Milk', percentage: 45, color: '#E8D5C4' },
      { name: 'Double Espresso Base', percentage: 45, color: '#2C1B14' }
    ],
    ratioText: '1:1 Espresso to Milk',
    tempText: '62°C',
    intensityText: '4 / 5'
  },
  {
    id: 'flatwhite',
    name: 'Flat White',
    tagline: 'Double ristretto velvety microfoam coat with seamless blend.',
    layers: [
      { name: 'Velvet Microfoam Coating', percentage: 12, color: '#FFFBF5' },
      { name: 'Steamed Microfoam Milk', percentage: 58, color: '#D9C2B1' },
      { name: 'Double Ristretto Base', percentage: 30, color: '#362218' }
    ],
    ratioText: '1:2.5 Ristretto to Microfoam',
    tempText: '60°C',
    intensityText: '4 / 5'
  },
  {
    id: 'cappuccino',
    name: 'Velvet Cappuccino',
    tagline: 'Equal third parts: Espresso, warm milk, and dense cloud foam.',
    layers: [
      { name: 'Dense Aerated Milk Cloud + Cocoa Dust', percentage: 35, color: '#FFFFFF' },
      { name: 'Steamed Milk Layer', percentage: 33, color: '#E2CEBC' },
      { name: 'Espresso Base', percentage: 32, color: '#2C1B14' }
    ],
    ratioText: '1:1:1 Equal Tri-Layer',
    tempText: '65°C',
    intensityText: '3.5 / 5'
  },
  {
    id: 'latte',
    name: 'Caffè Latte',
    tagline: 'Smooth espresso foundation with rich, silky steamed milk.',
    layers: [
      { name: 'Microfoam Art Layer', percentage: 10, color: '#FFF9F2' },
      { name: 'Warm Steamed Milk', percentage: 70, color: '#EDE0D4' },
      { name: 'Espresso Shot Base', percentage: 20, color: '#2C1B14' }
    ],
    ratioText: '1:4 Espresso to Milk',
    tempText: '65°C',
    intensityText: '2.5 / 5'
  },
  {
    id: 'mocha',
    name: 'Spiced Belgian Mocha',
    tagline: 'Melted Belgian cocoa, double espresso, steamed milk & spice.',
    layers: [
      { name: 'Cardamom Cinnamon Foam', percentage: 12, color: '#F7E7CE' },
      { name: 'Steamed Oat Milk', percentage: 48, color: '#D5C4B1' },
      { name: 'Espresso Shot', percentage: 20, color: '#3A231A' },
      { name: '72% Belgian Dark Chocolate Ganache', percentage: 20, color: '#1A0C08' }
    ],
    ratioText: 'Espresso + Melted Ganache + Milk',
    tempText: '65°C',
    intensityText: '4 / 5'
  }
]
