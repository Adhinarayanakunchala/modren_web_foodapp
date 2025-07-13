import { useEffect } from "react"

interface MetaTagOptions {
  title?: string
  description?: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
}

export function useMeta(options: MetaTagOptions) {
  useEffect(() => {
    // Update page title
    if (options.title) {
      document.title = options.title
    }

    // Update meta description
    if (options.description) {
      updateMetaTag('meta[name="description"]', 'content', options.description)
    }

    // Update keywords
    if (options.keywords) {
      updateMetaTag('meta[name="keywords"]', 'content', options.keywords.join(', '))
    }

    // Update canonical URL
    if (options.canonical) {
      updateLinkTag('link[rel="canonical"]', 'href', options.canonical)
    }

    // Update Open Graph tags
    if (options.ogTitle) {
      updateMetaTag('meta[property="og:title"]', 'content', options.ogTitle)
    }

    if (options.ogDescription) {
      updateMetaTag('meta[property="og:description"]', 'content', options.ogDescription)
    }

    if (options.ogImage) {
      updateMetaTag('meta[property="og:image"]', 'content', options.ogImage)
    }

    if (options.ogUrl) {
      updateMetaTag('meta[property="og:url"]', 'content', options.ogUrl)
    }

    // Update Twitter Card tags
    if (options.twitterTitle) {
      updateMetaTag('meta[name="twitter:title"]', 'content', options.twitterTitle)
    }

    if (options.twitterDescription) {
      updateMetaTag('meta[name="twitter:description"]', 'content', options.twitterDescription)
    }

    if (options.twitterImage) {
      updateMetaTag('meta[name="twitter:image"]', 'content', options.twitterImage)
    }
  }, [options])
}

// Helper function to update or create meta tags
function updateMetaTag(selector: string, attribute: string, value: string) {
  let element = document.querySelector(selector)
  
  if (element) {
    element.setAttribute(attribute, value)
  } else {
    // Create the meta tag if it doesn't exist
    element = document.createElement('meta')
    
    if (selector.includes('property=')) {
      const property = selector.match(/property="([^"]+)"/)?.[1]
      if (property) {
        element.setAttribute('property', property)
      }
    } else if (selector.includes('name=')) {
      const name = selector.match(/name="([^"]+)"/)?.[1]
      if (name) {
        element.setAttribute('name', name)
      }
    }
    
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }
}

// Helper function to update or create link tags
function updateLinkTag(selector: string, attribute: string, value: string) {
  let element = document.querySelector(selector)
  
  if (element) {
    element.setAttribute(attribute, value)
  } else {
    // Create the link tag if it doesn't exist
    element = document.createElement('link')
    
    if (selector.includes('rel=')) {
      const rel = selector.match(/rel="([^"]+)"/)?.[1]
      if (rel) {
        element.setAttribute('rel', rel)
      }
    }
    
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }
}

// Pre-defined meta configurations for common pages
export const metaConfigs = {
  home: {
    title: "FreshStore - Fresh Groceries Delivered Fast",
    description: "Get farm-fresh produce, quality meats, and pantry essentials delivered to your door in as little as 30 minutes. Shop now for the best deals on groceries!",
    keywords: ["groceries", "fresh produce", "online shopping", "food delivery", "organic"],
    ogTitle: "FreshStore - Fresh Groceries Delivered Fast",
    ogDescription: "Get farm-fresh produce delivered to your door in 30 minutes",
    twitterTitle: "FreshStore - Fresh Groceries Delivered Fast",
    twitterDescription: "Get farm-fresh produce delivered to your door in 30 minutes"
  },
  
  products: {
    title: "Products | FreshStore",
    description: "Browse our wide selection of fresh groceries, organic produce, quality meats, dairy products, and pantry essentials. Find everything you need for your kitchen.",
    keywords: ["grocery products", "fresh food", "organic produce", "meat", "dairy", "pantry"],
    ogTitle: "Fresh Grocery Products | FreshStore",
    ogDescription: "Browse our wide selection of fresh groceries and organic produce",
    twitterTitle: "Fresh Grocery Products | FreshStore",
    twitterDescription: "Browse our wide selection of fresh groceries and organic produce"
  },
  
  about: {
    title: "About Us | FreshStore",
    description: "Learn about FreshStore - your trusted partner for fresh groceries delivered fast. Discover our mission, values, and commitment to quality since 2020.",
    keywords: ["about freshstore", "grocery delivery company", "fresh food mission", "quality groceries"],
    ogTitle: "About FreshStore - Fresh Groceries Delivered Fast",
    ogDescription: "Learn about FreshStore - your trusted partner for fresh groceries delivered fast",
    twitterTitle: "About FreshStore - Fresh Groceries Delivered Fast",
    twitterDescription: "Learn about FreshStore - your trusted partner for fresh groceries delivered fast"
  },
  
  contact: {
    title: "Contact Us | FreshStore",
    description: "Get in touch with FreshStore for customer support, partnerships, or any questions about our fresh grocery delivery service. We're here to help!",
    keywords: ["contact freshstore", "customer support", "grocery delivery help", "contact information"],
    ogTitle: "Contact FreshStore - Customer Support",
    ogDescription: "Get in touch with FreshStore for customer support and questions",
    twitterTitle: "Contact FreshStore - Customer Support",
    twitterDescription: "Get in touch with FreshStore for customer support and questions"
  },
  
  services: {
    title: "Our Services | FreshStore",
    description: "Discover FreshStore's grocery delivery services: same-day delivery, weekly subscriptions, personal shopping, meal kits, and corporate catering solutions.",
    keywords: ["grocery delivery services", "same day delivery", "meal kits", "personal shopping", "corporate catering"],
    ogTitle: "Grocery Delivery Services | FreshStore",
    ogDescription: "Discover our grocery delivery services including same-day delivery and meal kits",
    twitterTitle: "Grocery Delivery Services | FreshStore",
    twitterDescription: "Discover our grocery delivery services including same-day delivery and meal kits"
  },
  
  profile: {
    title: "My Profile | FreshStore",
    description: "Manage your FreshStore account, view order history, update personal information, manage addresses, and customize your grocery shopping preferences.",
    keywords: ["user profile", "account management", "order history", "personal settings"],
    ogTitle: "My Profile | FreshStore",
    ogDescription: "Manage your FreshStore account and shopping preferences",
    twitterTitle: "My Profile | FreshStore",
    twitterDescription: "Manage your FreshStore account and shopping preferences"
  }
}

// Product-specific meta generator
export function generateProductMeta(product: any) {
  return {
    title: `${product.name} | FreshStore`,
    description: `Buy ${product.name} - ${product.description}. Price: $${product.price}. Rating: ${product.rating} stars. Available for fast delivery.`,
    keywords: [
      product.name.toLowerCase(),
      product.category.name.toLowerCase(),
      "fresh groceries",
      "fast delivery",
      "online shopping"
    ],
    ogTitle: `${product.name} | FreshStore`,
    ogDescription: `${product.description} - Available for $${product.price}`,
    ogImage: product.image,
    twitterTitle: `${product.name} | FreshStore`,
    twitterDescription: `${product.description} - $${product.price}`,
    twitterImage: product.image
  }
}

// Category-specific meta generator
export function generateCategoryMeta(category: any) {
  return {
    title: `${category.name} | FreshStore`,
    description: `Shop fresh ${category.name.toLowerCase()} online. ${category.description} Fast delivery available. Browse our selection of quality products.`,
    keywords: [
      category.name.toLowerCase(),
      "fresh groceries",
      "online shopping",
      "fast delivery"
    ],
    ogTitle: `${category.name} | FreshStore`,
    ogDescription: `Shop fresh ${category.name.toLowerCase()} with fast delivery`,
    ogImage: category.image,
    twitterTitle: `${category.name} | FreshStore`,
    twitterDescription: `Shop fresh ${category.name.toLowerCase()} with fast delivery`,
    twitterImage: category.image
  }
}