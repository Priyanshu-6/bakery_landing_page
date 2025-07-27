import React, { useState } from 'react';
import { bakingService } from '../data/mock';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Star, Phone, Mail, MapPin, Clock, Store, Truck, Zap, ShoppingCart, Plus, Minus } from 'lucide-react';

const BakingLandingPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState('pickup');

  const addToCart = (item, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getCartTotal = () => {
    const itemsTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = bakingService.delivery_options.find(opt => opt.id === selectedDelivery)?.price || 0;
    return itemsTotal + deliveryFee;
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getDeliveryIcon = (iconName) => {
    switch(iconName) {
      case 'store': return <Store className="w-5 h-5" />;
      case 'truck': return <Truck className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      default: return <Store className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-warm-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-warm-text">{bakingService.business.name}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({getCartItemCount()})</span>
                </Button>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-sm text-warm-text-subtle">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>{bakingService.business.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-cream to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-warm-text mb-6">
            {bakingService.business.tagline}
          </h2>
          <p className="text-xl text-warm-text-subtle max-w-3xl mx-auto mb-10">
            {bakingService.business.description}
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-warm-accent hover:bg-warm-accent/90 text-white px-8 py-3">
              Order Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-warm-text mb-4">Our Signature Baked Goods</h3>
            <p className="text-lg text-warm-text-subtle">Handcrafted daily with love and the finest ingredients</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {bakingService.signature_items.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-12">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-warm-text">{item.name}</CardTitle>
                    <Badge variant="secondary" className="bg-warm-accent/10 text-warm-accent">
                      ${item.price}
                    </Badge>
                  </div>
                  <CardDescription className="text-warm-text-subtle">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-warm-text-subtle">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Prep time: {item.prep_time}
                    </div>
                    <div className="text-lg font-bold text-warm-text">
                      ${item.price}/{item.unit}
                    </div>
                  </div>
                  <Button 
                    onClick={() => addToCart(item)}
                    className="w-full bg-warm-accent hover:bg-warm-accent/90 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="py-8 bg-warm-cream/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-warm-text">Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-warm-text">{item.name}</h4>
                        <p className="text-sm text-warm-text-subtle">${item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <span className="ml-4 font-bold text-warm-text">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Delivery Options */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-warm-text mb-4">Delivery & Pickup Options</h3>
            <p className="text-lg text-warm-text-subtle">Choose how you'd like to receive your order</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {bakingService.delivery_options.map((option) => (
              <Card 
                key={option.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedDelivery === option.id ? 'ring-2 ring-warm-accent bg-warm-accent/5' : ''
                }`}
                onClick={() => setSelectedDelivery(option.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-3 w-12 h-12 bg-warm-accent/10 rounded-full flex items-center justify-center text-warm-accent">
                    {getDeliveryIcon(option.icon)}
                  </div>
                  <CardTitle className="text-lg text-warm-text">{option.name}</CardTitle>
                  <CardDescription className="text-warm-text-subtle">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-sm text-warm-text-subtle mb-2">{option.time}</div>
                  <div className="text-lg font-bold text-warm-text">
                    {option.price === 0 ? 'FREE' : `$${option.price}`}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Total */}
      {cart.length > 0 && (
        <section className="py-8 bg-warm-cream/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-warm-text">Subtotal:</span>
                  <span className="text-warm-text">${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg mt-2">
                  <span className="text-warm-text">Delivery:</span>
                  <span className="text-warm-text">
                    ${bakingService.delivery_options.find(opt => opt.id === selectedDelivery)?.price.toFixed(2) || '0.00'}
                  </span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-warm-text">Total:</span>
                  <span className="text-warm-text">${getCartTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full mt-6 bg-warm-accent hover:bg-warm-accent/90 text-white" size="lg">
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-warm-text mb-4">What Our Customers Say</h3>
            <p className="text-lg text-warm-text-subtle">Real reviews from our happy customers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bakingService.customer_reviews.map((review) => (
              <Card key={review.id} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-warm-text">{review.name}</CardTitle>
                    {review.verified && <Badge variant="outline" className="text-xs">Verified</Badge>}
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-text-subtle text-sm leading-relaxed">{review.comment}</p>
                  <p className="text-xs text-warm-text-subtle mt-3">{new Date(review.date).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-text text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">{bakingService.business.name}</h4>
              <p className="text-gray-300 mb-4">{bakingService.business.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{bakingService.business.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{bakingService.business.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{bakingService.business.email}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <div className="space-y-1 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>7:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>7:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div><a href="#" className="text-gray-300 hover:text-white transition-colors">Menu</a></div>
                <div><a href="#" className="text-gray-300 hover:text-white transition-colors">Custom Orders</a></div>
                <div><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></div>
                <div><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-600" />
          <div className="text-center text-sm text-gray-300">
            <p>&copy; 2024 {bakingService.business.name}. All rights reserved. Made with ❤️ for our community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BakingLandingPage;