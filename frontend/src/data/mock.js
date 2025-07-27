// Mock data for home baking service
export const bakingService = {
  business: {
    name: "Sweet Home Bakery",
    tagline: "Freshly baked with love, delivered to your door",
    description: "Family-owned bakery creating artisanal baked goods using traditional recipes and the finest ingredients.",
    phone: "(555) 123-BAKE",
    email: "hello@sweethomebakery.com",
    address: "123 Baker Street, Sweet Valley, CA 90210"
  },

  signature_items: [
    {
      id: 1,
      name: "Classic Chocolate Chip Cookies",
      description: "Soft, chewy cookies made with Belgian chocolate chips and Madagascar vanilla. A timeless favorite that melts in your mouth.",
      price: 24.99,
      unit: "dozen",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
      category: "cookies",
      prep_time: "2-3 hours",
      availability: true
    },
    {
      id: 2,
      name: "Artisan Sourdough Bread",
      description: "Hand-crafted sourdough with a crispy crust and perfectly airy interior. Made with our 100-year-old starter culture.",
      price: 12.99,
      unit: "loaf",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
      category: "bread",
      prep_time: "24 hours",
      availability: true
    },
    {
      id: 3,
      name: "Classic Apple Pie",
      description: "Traditional apple pie with flaky, buttery crust filled with cinnamon-spiced Granny Smith apples. Served warm with love.",
      price: 32.99,
      unit: "whole pie",
      image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e9b5?w=400&h=300&fit=crop",
      category: "pies",
      prep_time: "4-5 hours",
      availability: true
    }
  ],

  delivery_options: [
    {
      id: "pickup",
      name: "Store Pickup",
      description: "Pick up your order at our bakery",
      price: 0,
      time: "Available daily 7AM - 7PM",
      icon: "store"
    },
    {
      id: "local_delivery",
      name: "Local Delivery",
      description: "Free delivery within 5 miles",
      price: 0,
      time: "Same day delivery available",
      icon: "truck"
    },
    {
      id: "express_delivery",
      name: "Express Delivery",
      description: "Rush delivery within 2 hours",
      price: 8.99,
      time: "Available 9AM - 5PM",
      icon: "zap"
    }
  ],

  customer_reviews: [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "The chocolate chip cookies are absolutely divine! My family can't get enough of them. Will definitely be ordering again!",
      date: "2024-01-15",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "Best sourdough bread in town! The crust is perfect and the flavor is incredible. Sweet Home Bakery has become our go-to.",
      date: "2024-01-12",
      verified: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Ordered the apple pie for our family dinner and it was a huge hit! Beautifully made and tastes like grandma's recipe.",
      date: "2024-01-10",
      verified: true
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 4,
      comment: "Great quality baked goods and excellent customer service. The delivery was prompt and everything arrived fresh.",
      date: "2024-01-08",
      verified: true
    }
  ],

  business_hours: {
    monday: "7:00 AM - 7:00 PM",
    tuesday: "7:00 AM - 7:00 PM", 
    wednesday: "7:00 AM - 7:00 PM",
    thursday: "7:00 AM - 7:00 PM",
    friday: "7:00 AM - 8:00 PM",
    saturday: "8:00 AM - 8:00 PM",
    sunday: "8:00 AM - 6:00 PM"
  }
};

export const orderStatuses = {
  pending: "Order Received",
  preparing: "Baking in Progress", 
  ready: "Ready for Pickup/Delivery",
  completed: "Order Completed"
};