# API Contracts & Integration Plan - Sweet Home Bakery

## Overview
This document defines the API contracts and integration plan for the home baking service landing page. It serves as a protocol to implement backend seamlessly and build a bug-free full-stack application.

## Current Mock Data Structure (from mock.js)

### Business Information
- Business details (name, tagline, description, contact info)
- Business hours
- Address information

### Signature Items (Products)
```javascript
{
  id: number,
  name: string,
  description: string,
  price: number,
  unit: string,
  image: string,
  category: string,
  prep_time: string,
  availability: boolean
}
```

### Delivery Options
```javascript
{
  id: string,
  name: string,
  description: string,
  price: number,
  time: string,
  icon: string
}
```

### Customer Reviews
```javascript
{
  id: number,
  name: string,
  rating: number,
  comment: string,
  date: string,
  verified: boolean
}
```

### Cart Items (Frontend State)
```javascript
{
  ...product_data,
  quantity: number
}
```

## Required API Endpoints

### 1. Products Management
**GET /api/products**
- Returns: Array of all available baked goods
- Response: `{ products: Product[] }`

**GET /api/products/:id**
- Returns: Single product details
- Response: `{ product: Product }`

### 2. Business Information
**GET /api/business-info**
- Returns: Business details, hours, contact info
- Response: `{ business: BusinessInfo }`

### 3. Delivery Options
**GET /api/delivery-options**
- Returns: Available delivery/pickup options
- Response: `{ delivery_options: DeliveryOption[] }`

### 4. Reviews Management
**GET /api/reviews**
- Returns: Customer reviews with pagination
- Query params: `?limit=10&offset=0`
- Response: `{ reviews: Review[], total: number }`

**POST /api/reviews**
- Creates new customer review
- Body: `{ name: string, rating: number, comment: string }`
- Response: `{ review: Review, message: string }`

### 5. Orders Management
**POST /api/orders**
- Creates new order
- Body: 
```javascript
{
  customer_info: {
    name: string,
    email: string,
    phone: string,
    address?: string
  },
  items: [
    {
      product_id: number,
      quantity: number,
      price: number
    }
  ],
  delivery_option: string,
  delivery_fee: number,
  subtotal: number,
  total: number,
  special_instructions?: string
}
```
- Response: `{ order: Order, order_id: string, message: string }`

**GET /api/orders/:order_id**
- Returns: Order details and status
- Response: `{ order: Order }`

### 6. Contact/Business Hours
**GET /api/business-hours**
- Returns: Current business hours
- Response: `{ hours: BusinessHours, is_open: boolean }`

## MongoDB Collections Design

### Products Collection
```javascript
{
  _id: ObjectId,
  id: number,
  name: string,
  description: string,
  price: number,
  unit: string,
  image: string,
  category: string,
  prep_time: string,
  availability: boolean,
  created_at: Date,
  updated_at: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  order_id: string,
  customer_info: {
    name: string,
    email: string,
    phone: string,
    address?: string
  },
  items: [
    {
      product_id: number,
      product_name: string,
      quantity: number,
      price: number,
      subtotal: number
    }
  ],
  delivery_option: string,
  delivery_fee: number,
  subtotal: number,
  total: number,
  status: string, // 'pending', 'preparing', 'ready', 'completed'
  special_instructions?: string,
  created_at: Date,
  updated_at: Date
}
```

### Reviews Collection
```javascript
{
  _id: ObjectId,
  id: number,
  name: string,
  rating: number,
  comment: string,
  verified: boolean,
  created_at: Date,
  approved: boolean
}
```

### Business Collection (Static Data)
```javascript
{
  _id: ObjectId,
  business_info: BusinessInfo,
  delivery_options: DeliveryOption[],
  business_hours: BusinessHours
}
```

## Frontend Integration Changes

### Remove Mock Data Usage
1. **BakingLandingPage.jsx**: Replace mock data imports with API calls
2. **API Integration Points**:
   - Component mount: Fetch products, business info, delivery options, reviews
   - Add to cart: Keep local state management
   - Order placement: POST to /api/orders
   - Review submission: POST to /api/reviews

### API Service Layer
Create `src/services/api.js`:
```javascript
const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const bakingApi = {
  getProducts: () => fetch(`${API_BASE}/products`).then(res => res.json()),
  getBusinessInfo: () => fetch(`${API_BASE}/business-info`).then(res => res.json()),
  getDeliveryOptions: () => fetch(`${API_BASE}/delivery-options`).then(res => res.json()),
  getReviews: (limit = 4) => fetch(`${API_BASE}/reviews?limit=${limit}`).then(res => res.json()),
  createOrder: (orderData) => fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  }).then(res => res.json()),
  submitReview: (reviewData) => fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  }).then(res => res.json())
};
```

### Error Handling & Loading States
- Add loading spinners during API calls
- Error handling for failed requests
- Success messages for order placement
- Form validation for order form

## Implementation Priority

### Phase 1: Basic CRUD APIs
1. Products endpoints (GET)
2. Business info endpoints (GET)
3. Reviews endpoints (GET)
4. Seed database with mock data

### Phase 2: Order Management
1. Orders endpoints (POST, GET)
2. Order status tracking
3. Customer information validation

### Phase 3: Frontend Integration
1. Replace mock data with API calls
2. Add loading states
3. Error handling
4. Success feedback

### Phase 4: Enhanced Features
1. Review submission
2. Order tracking
3. Admin capabilities (if needed)

## Database Seeding Strategy
- Initialize database with products from mock.js
- Add business information
- Seed with initial reviews
- Set up delivery options

This contract ensures smooth integration between frontend and backend while maintaining all existing functionality.