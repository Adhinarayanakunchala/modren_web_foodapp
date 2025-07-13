import { Category, Product } from "@/types"

export const categories: Category[] = [
  {
    id: "1",
    name: "Fresh Produce",
    slug: "fresh-produce",
    icon: "🥬",
    description: "Fresh fruits and vegetables",
    image: "/api/placeholder/400/300"
  },
  {
    id: "2",
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    icon: "🥛",
    description: "Milk, cheese, eggs and dairy products",
    image: "/api/placeholder/400/300"
  },
  {
    id: "3",
    name: "Meat & Seafood",
    slug: "meat-seafood",
    icon: "🥩",
    description: "Fresh meat and seafood",
    image: "/api/placeholder/400/300"
  },
  {
    id: "4",
    name: "Bakery",
    slug: "bakery",
    icon: "🍞",
    description: "Fresh bread and baked goods",
    image: "/api/placeholder/400/300"
  },
  {
    id: "5",
    name: "Pantry",
    slug: "pantry",
    icon: "🏺",
    description: "Canned goods, spices, and pantry essentials",
    image: "/api/placeholder/400/300"
  },
  {
    id: "6",
    name: "Beverages",
    slug: "beverages",
    icon: "🥤",
    description: "Drinks, juices, and beverages",
    image: "/api/placeholder/400/300"
  },
  {
    id: "7",
    name: "Snacks",
    slug: "snacks",
    icon: "🍿",
    description: "Chips, cookies, and snack foods",
    image: "/api/placeholder/400/300"
  },
  {
    id: "8",
    name: "Frozen Foods",
    slug: "frozen-foods",
    icon: "🧊",
    description: "Frozen meals and ingredients",
    image: "/api/placeholder/400/300"
  }
]

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Bananas",
    description: "Fresh, organic bananas perfect for breakfast or snacking. Rich in potassium and natural sugars.",
    price: 2.99,
    originalPrice: 3.49,
    category: categories[0],
    image: "/api/placeholder/400/400",
    images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    features: ["Organic", "Non-GMO", "Pesticide-free"],
    nutritionInfo: {
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.3,
      fiber: 3.1,
      sodium: 1,
      sugar: 14
    },
    tags: ["organic", "fruit", "healthy"],
    discount: 14
  },
  {
    id: "2",
    name: "Fresh Avocados",
    description: "Creamy, nutrient-rich avocados. Perfect for toast, salads, or guacamole.",
    price: 1.99,
    category: categories[0],
    image: "/api/placeholder/400/400",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    features: ["High in healthy fats", "Rich in fiber", "Vitamin K"],
    nutritionInfo: {
      calories: 320,
      protein: 4,
      carbs: 17,
      fat: 29,
      fiber: 14,
      sodium: 7,
      sugar: 1
    },
    tags: ["healthy", "superfood", "vegetarian"]
  },
  {
    id: "3",
    name: "Grass-Fed Ground Beef",
    description: "Premium grass-fed ground beef, 85% lean. Perfect for burgers, tacos, and more.",
    price: 8.99,
    category: categories[2],
    image: "/api/placeholder/400/400",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    features: ["Grass-fed", "No antibiotics", "High protein"],
    nutritionInfo: {
      calories: 250,
      protein: 26,
      carbs: 0,
      fat: 15,
      fiber: 0,
      sodium: 75,
      sugar: 0
    },
    tags: ["protein", "grass-fed", "premium"]
  },
  {
    id: "4",
    name: "Sourdough Bread",
    description: "Artisan sourdough bread with a crispy crust and tangy flavor. Baked fresh daily.",
    price: 4.99,
    category: categories[3],
    image: "/api/placeholder/400/400",
    rating: 4.6,
    reviews: 203,
    inStock: true,
    features: ["Artisan-made", "Natural fermentation", "No preservatives"],
    nutritionInfo: {
      calories: 90,
      protein: 3,
      carbs: 17,
      fat: 1,
      fiber: 1,
      sodium: 180,
      sugar: 0
    },
    tags: ["artisan", "sourdough", "fresh"]
  },
  {
    id: "5",
    name: "Organic Whole Milk",
    description: "Creamy organic whole milk from grass-fed cows. Rich in calcium and vitamin D.",
    price: 3.49,
    category: categories[1],
    image: "/api/placeholder/400/400",
    rating: 4.4,
    reviews: 97,
    inStock: true,
    features: ["Organic", "Grass-fed", "rBST-free"],
    nutritionInfo: {
      calories: 150,
      protein: 8,
      carbs: 12,
      fat: 8,
      fiber: 0,
      sodium: 105,
      sugar: 12
    },
    tags: ["organic", "dairy", "calcium"]
  },
  {
    id: "6",
    name: "Atlantic Salmon Fillet",
    description: "Fresh Atlantic salmon fillet, skin-on. Rich in omega-3 fatty acids.",
    price: 12.99,
    category: categories[2],
    image: "/api/placeholder/400/400",
    rating: 4.9,
    reviews: 78,
    inStock: true,
    features: ["Wild-caught", "Omega-3 rich", "Sustainable"],
    nutritionInfo: {
      calories: 206,
      protein: 22,
      carbs: 0,
      fat: 12,
      fiber: 0,
      sodium: 59,
      sugar: 0
    },
    tags: ["seafood", "omega-3", "protein"]
  },
  {
    id: "7",
    name: "Organic Spinach",
    description: "Fresh organic baby spinach leaves. Perfect for salads, smoothies, and cooking.",
    price: 2.49,
    category: categories[0],
    image: "/api/placeholder/400/400",
    rating: 4.3,
    reviews: 142,
    inStock: true,
    features: ["Organic", "Baby leaves", "Pre-washed"],
    nutritionInfo: {
      calories: 7,
      protein: 0.9,
      carbs: 1.1,
      fat: 0.1,
      fiber: 0.7,
      sodium: 24,
      sugar: 0.1
    },
    tags: ["organic", "leafy-greens", "healthy"]
  },
  {
    id: "8",
    name: "Artisan Cheese Selection",
    description: "Curated selection of artisan cheeses including aged cheddar, brie, and gouda.",
    price: 15.99,
    category: categories[1],
    image: "/api/placeholder/400/400",
    rating: 4.7,
    reviews: 65,
    inStock: true,
    features: ["Artisan-crafted", "Aged", "Variety pack"],
    nutritionInfo: {
      calories: 113,
      protein: 7,
      carbs: 1,
      fat: 9,
      fiber: 0,
      sodium: 180,
      sugar: 0
    },
    tags: ["artisan", "cheese", "gourmet"]
  },
  {
    id: "9",
    name: "Craft Beer Variety Pack",
    description: "Selection of 12 craft beers from local breweries. Perfect for beer enthusiasts.",
    price: 19.99,
    category: categories[5],
    image: "/api/placeholder/400/400",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    features: ["Local breweries", "Variety pack", "Craft beer"],
    tags: ["beer", "craft", "local"]
  },
  {
    id: "10",
    name: "Organic Almonds",
    description: "Raw organic almonds, perfect for snacking or baking. High in protein and healthy fats.",
    price: 7.99,
    category: categories[6],
    image: "/api/placeholder/400/400",
    rating: 4.5,
    reviews: 189,
    inStock: true,
    features: ["Organic", "Raw", "High protein"],
    nutritionInfo: {
      calories: 164,
      protein: 6,
      carbs: 6,
      fat: 14,
      fiber: 4,
      sodium: 0,
      sugar: 1
    },
    tags: ["organic", "nuts", "protein"]
  },
  {
    id: "11",
    name: "Frozen Blueberries",
    description: "Premium frozen wild blueberries. Perfect for smoothies, baking, and breakfast.",
    price: 4.99,
    category: categories[7],
    image: "/api/placeholder/400/400",
    rating: 4.4,
    reviews: 156,
    inStock: true,
    features: ["Wild blueberries", "Antioxidant-rich", "No sugar added"],
    nutritionInfo: {
      calories: 84,
      protein: 1.1,
      carbs: 21,
      fat: 0.3,
      fiber: 3.6,
      sodium: 1,
      sugar: 15
    },
    tags: ["frozen", "berries", "antioxidants"]
  },
  {
    id: "12",
    name: "Himalayan Pink Salt",
    description: "Pure Himalayan pink salt with natural minerals. Perfect for cooking and seasoning.",
    price: 5.99,
    category: categories[4],
    image: "/api/placeholder/400/400",
    rating: 4.6,
    reviews: 87,
    inStock: true,
    features: ["Himalayan", "Natural minerals", "Unrefined"],
    tags: ["salt", "minerals", "cooking"]
  }
]

export const featuredProducts = products.filter(p => p.discount || p.rating >= 4.7)
export const popularProducts = products.filter(p => p.reviews >= 100)
export const newProducts = products.slice(0, 6)