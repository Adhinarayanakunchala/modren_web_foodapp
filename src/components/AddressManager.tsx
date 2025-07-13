"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Home, 
  Building, 
  Check,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addAddress, updateAddress, deleteAddress, setDefaultAddress } from "@/store/slices/userSlice"
import { showSuccessNotification } from "@/store/slices/uiSlice"
import { RootState } from "@/store"
import { Address } from "@/types"

interface AddressFormData {
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  type: 'home' | 'work' | 'other'
}

interface AddressManagerProps {
  onAddressSelect?: (address: Address) => void
  selectedAddressId?: string
  isCheckout?: boolean
}

export function AddressManager({ 
  onAddressSelect, 
  selectedAddressId,
  isCheckout = false 
}: AddressManagerProps) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.user)
  const addresses = user?.addresses || []
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState<AddressFormData>({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    type: "home"
  })

  const handleInputChange = (field: keyof AddressFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingAddress) {
        await dispatch(updateAddress({ 
          id: editingAddress.id, 
          ...formData,
          isDefault: editingAddress.isDefault
        }))
        dispatch(showSuccessNotification("Address updated successfully"))
        setEditingAddress(null)
      } else {
        await dispatch(addAddress({
          ...formData,
          id: Date.now().toString(),
          isDefault: addresses.length === 0
        }))
        dispatch(showSuccessNotification("Address added successfully"))
        setShowAddForm(false)
      }
      
      // Reset form
      setFormData({
        name: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "USA",
        type: "home"
      })
    } catch (error) {
      console.error("Error saving address:", error)
    }
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      type: address.type
    })
    setShowAddForm(true)
  }

  const handleDelete = async (addressId: string) => {
    await dispatch(deleteAddress(addressId))
    dispatch(showSuccessNotification("Address deleted successfully"))
  }

  const handleSetDefault = async (addressId: string) => {
    await dispatch(setDefaultAddress(addressId))
    dispatch(showSuccessNotification("Default address updated"))
  }

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="h-4 w-4" />
      case 'work':
        return <Building className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {isCheckout ? "Select Delivery Address" : "My Addresses"}
        </h2>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          variant="outline"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      {/* Address Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => handleInputChange("type", e.target.value as 'home' | 'work' | 'other')}
                        className="mt-1 w-full px-3 py-2 border border-input rounded-md"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={(e) => handleInputChange("street", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingAddress ? "Update" : "Add"} Address
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false)
                        setEditingAddress(null)
                        setFormData({
                          name: "",
                          street: "",
                          city: "",
                          state: "",
                          zipCode: "",
                          country: "USA",
                          type: "home"
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedAddressId === address.id 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onAddressSelect?.(address)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getAddressTypeIcon(address.type)}
                <span className="font-semibold">{address.name}</span>
                <Badge variant="outline" className="text-xs">
                  {address.type}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1">
                {address.isDefault && (
                  <Badge variant="default" className="text-xs">
                    Default
                  </Badge>
                )}
                {selectedAddressId === address.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mb-3">
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {!address.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSetDefault(address.id)
                  }}
                >
                  Set as Default
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleEdit(address)
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(address.id)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {addresses.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No addresses saved</h3>
          <p className="text-muted-foreground mb-4">
            Add your first address to get started
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </div>
      )}
    </div>
  )
}