"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  Truck,
  Shield,
  Leaf,
  Clock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { aboutUs } from "@/data/dummy-data"

export default function AboutPage() {
  // Update page metadata dynamically
  useEffect(() => {
    document.title = "About Us | FreshStore"
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about FreshStore - your trusted partner for fresh groceries delivered fast. Discover our mission, values, and commitment to quality since 2020.')
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', 'About FreshStore - Fresh Groceries Delivered Fast')
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Learn about FreshStore - your trusted partner for fresh groceries delivered fast. Discover our mission, values, and commitment to quality.')
    }
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'About FreshStore - Fresh Groceries Delivered Fast')
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Learn about FreshStore - your trusted partner for fresh groceries delivered fast.')
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {aboutUs.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              {aboutUs.subtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {aboutUs.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aboutUs.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="p-6 hover-lift">
                  <CardContent className="p-0">
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to our customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutUs.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift beam-effect">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind FreshStore who work every day to bring you the best grocery experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutUs.team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center hover-lift">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <Badge variant="outline" className="mb-3">
                      {member.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8">
              To revolutionize grocery shopping by making fresh, quality food accessible to everyone through innovative technology, exceptional service, and a commitment to sustainability.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Our Goal</h3>
                <p className="text-muted-foreground">
                  To be the most trusted grocery delivery service in every community we serve.
                </p>
              </div>
              <div className="text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Our Passion</h3>
                <p className="text-muted-foreground">
                  Connecting families with fresh, healthy food that brings people together.
                </p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Our Promise</h3>
                <p className="text-muted-foreground">
                  To continuously improve and exceed customer expectations every day.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}