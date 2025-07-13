"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  Camera, 
  Edit,
  Save,
  X,
  Upload
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { updateUserProfile, uploadUserPhoto } from "@/store/slices/userSlice"
import { showSuccessNotification, showErrorNotification } from "@/store/slices/uiSlice"
import { RootState } from "@/store"

interface ProfileFormData {
  name: string
  email: string
  phone?: string
  bio?: string
}

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.user)
  const { favorites } = useAppSelector((state: RootState) => state.user)
  const { items: orders } = useAppSelector((state: RootState) => state.cart)
  
  const [isEditing, setIsEditing] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || ""
  })

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
          <Button onClick={() => window.location.href = "/auth/login"}>
            Login
          </Button>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    try {
      await dispatch(updateUserProfile(formData))
      dispatch(showSuccessNotification("Profile updated successfully"))
      setIsEditing(false)
    } catch (error) {
      dispatch(showErrorNotification("Failed to update profile"))
    }
  }

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingPhoto(true)
    try {
      const formData = new FormData()
      formData.append('photo', file)
      
      // Mock photo upload - in real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      dispatch(showSuccessNotification("Photo uploaded successfully"))
    } catch (error) {
      dispatch(showErrorNotification("Failed to upload photo"))
    } finally {
      setUploadingPhoto(false)
    }
  }

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const sidebarItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-lg">
                      {user?.name ? getUserInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Button 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        disabled={uploadingPhoto}
                      >
                        {uploadingPhoto ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        ) : (
                          <Camera className="h-4 w-4" />
                        )}
                      </Button>
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-lg">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="profile" orientation="vertical" className="w-full">
                  <TabsList className="grid w-full grid-rows-5 h-auto">
                    {sidebarItems.map(item => (
                      <TabsTrigger 
                        key={item.id} 
                        value={item.id}
                        className="justify-start gap-2 p-3"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Profile Information</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                    >
                      {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                        <p className="text-muted-foreground">Start shopping to see your orders here</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">Order #{order.id}</h4>
                              <Badge variant="outline">Processing</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {order.product.name} x {order.quantity}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">
                                ${(order.product.price * order.quantity).toFixed(2)}
                              </span>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {favorites.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                        <p className="text-muted-foreground">Add products to your wishlist to see them here</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favorites.map((product) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="border rounded-lg p-4"
                          >
                            <div className="aspect-square bg-muted rounded-lg mb-3"></div>
                            <h4 className="font-semibold mb-1">{product.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              ${product.price.toFixed(2)}
                            </p>
                            <Button size="sm" className="w-full">
                              Add to Cart
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>My Addresses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No addresses saved</h3>
                      <p className="text-muted-foreground mb-4">Add an address for faster checkout</p>
                      <Button>Add New Address</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Notifications</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Email notifications</span>
                            <Button variant="outline" size="sm">Toggle</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Push notifications</span>
                            <Button variant="outline" size="sm">Toggle</Button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Privacy</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Profile visibility</span>
                            <Button variant="outline" size="sm">Private</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}