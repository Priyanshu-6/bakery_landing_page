from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import List, Optional
from models import Product, Review, Order, BusinessData, BusinessInfo, BusinessHours, DeliveryOption
import asyncio

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

class DatabaseManager:
    def __init__(self):
        self.products_collection = db.products
        self.reviews_collection = db.reviews
        self.orders_collection = db.orders
        self.business_collection = db.business
    
    # Product methods
    async def get_all_products(self) -> List[Product]:
        products = await self.products_collection.find({"availability": True}).to_list(1000)
        return [Product(**product) for product in products]
    
    async def get_product_by_id(self, product_id: int) -> Optional[Product]:
        product = await self.products_collection.find_one({"id": product_id})
        return Product(**product) if product else None
    
    async def create_product(self, product: Product) -> Product:
        await self.products_collection.insert_one(product.dict())
        return product
    
    # Review methods
    async def get_reviews(self, limit: int = 10, offset: int = 0) -> tuple:
        reviews = await self.reviews_collection.find({"approved": True}).skip(offset).limit(limit).to_list(limit)
        total = await self.reviews_collection.count_documents({"approved": True})
        return [Review(**review) for review in reviews], total
    
    async def create_review(self, review_data: dict) -> Review:
        # Get next ID
        last_review = await self.reviews_collection.find_one(sort=[("id", -1)])
        next_id = (last_review["id"] if last_review else 0) + 1
        
        review_dict = review_data.copy()
        review_dict["id"] = next_id
        review = Review(**review_dict)
        
        await self.reviews_collection.insert_one(review.dict())
        return review
    
    # Order methods
    async def create_order(self, order: Order) -> Order:
        await self.orders_collection.insert_one(order.dict())
        return order
    
    async def get_order_by_id(self, order_id: str) -> Optional[Order]:
        order = await self.orders_collection.find_one({"order_id": order_id})
        return Order(**order) if order else None
    
    # Business methods
    async def get_business_info(self) -> Optional[BusinessInfo]:
        business = await self.business_collection.find_one()
        return BusinessInfo(**business["business_info"]) if business else None
    
    async def get_delivery_options(self) -> List[DeliveryOption]:
        business = await self.business_collection.find_one()
        if business and "delivery_options" in business:
            return [DeliveryOption(**option) for option in business["delivery_options"]]
        return []
    
    async def get_business_hours(self) -> Optional[BusinessHours]:
        business = await self.business_collection.find_one()
        return BusinessHours(**business["business_hours"]) if business and "business_hours" in business else None
    
    async def seed_database(self):
        """Seed database with initial data"""
        # Check if already seeded
        existing_products = await self.products_collection.count_documents({})
        if existing_products > 0:
            return
        
        # Seed products
        products_data = [
            {
                "id": 1,
                "name": "Classic Chocolate Chip Cookies",
                "description": "Soft, chewy cookies made with Belgian chocolate chips and Madagascar vanilla. A timeless favorite that melts in your mouth.",
                "price": 24.99,
                "unit": "dozen",
                "image": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
                "category": "cookies",
                "prep_time": "2-3 hours",
                "availability": True
            },
            {
                "id": 2,
                "name": "Artisan Sourdough Bread",
                "description": "Hand-crafted sourdough with a crispy crust and perfectly airy interior. Made with our 100-year-old starter culture.",
                "price": 12.99,
                "unit": "loaf",
                "image": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
                "category": "bread",
                "prep_time": "24 hours",
                "availability": True
            },
            {
                "id": 3,
                "name": "Classic Apple Pie",
                "description": "Traditional apple pie with flaky, buttery crust filled with cinnamon-spiced Granny Smith apples. Served warm with love.",
                "price": 32.99,
                "unit": "whole pie",
                "image": "https://images.unsplash.com/photo-1621743478914-cc8a86d7e9b5?w=400&h=300&fit=crop",
                "category": "pies",
                "prep_time": "4-5 hours",
                "availability": True
            }
        ]
        
        for product_data in products_data:
            product = Product(**product_data)
            await self.create_product(product)
        
        # Seed reviews
        reviews_data = [
            {
                "name": "Sarah Johnson",
                "rating": 5,
                "comment": "The chocolate chip cookies are absolutely divine! My family can't get enough of them. Will definitely be ordering again!",
                "verified": True
            },
            {
                "name": "Michael Chen",
                "rating": 5,
                "comment": "Best sourdough bread in town! The crust is perfect and the flavor is incredible. Sweet Home Bakery has become our go-to.",
                "verified": True
            },
            {
                "name": "Emily Rodriguez",
                "rating": 5,
                "comment": "Ordered the apple pie for our family dinner and it was a huge hit! Beautifully made and tastes like grandma's recipe.",
                "verified": True
            },
            {
                "name": "David Thompson",
                "rating": 4,
                "comment": "Great quality baked goods and excellent customer service. The delivery was prompt and everything arrived fresh.",
                "verified": True
            }
        ]
        
        for review_data in reviews_data:
            await self.create_review(review_data)
        
        # Seed business data
        business_data = {
            "business_info": {
                "name": "Sweet Home Bakery",
                "tagline": "Freshly baked with love, delivered to your door",
                "description": "Family-owned bakery creating artisanal baked goods using traditional recipes and the finest ingredients.",
                "phone": "(555) 123-BAKE",
                "email": "hello@sweethomebakery.com",
                "address": "123 Baker Street, Sweet Valley, CA 90210"
            },
            "delivery_options": [
                {
                    "id": "pickup",
                    "name": "Store Pickup",
                    "description": "Pick up your order at our bakery",
                    "price": 0.0,
                    "time": "Available daily 7AM - 7PM",
                    "icon": "store"
                },
                {
                    "id": "local_delivery",
                    "name": "Local Delivery",
                    "description": "Free delivery within 5 miles",
                    "price": 0.0,
                    "time": "Same day delivery available",
                    "icon": "truck"
                },
                {
                    "id": "express_delivery",
                    "name": "Express Delivery",
                    "description": "Rush delivery within 2 hours",
                    "price": 8.99,
                    "time": "Available 9AM - 5PM",
                    "icon": "zap"
                }
            ],
            "business_hours": {
                "monday": "7:00 AM - 7:00 PM",
                "tuesday": "7:00 AM - 7:00 PM",
                "wednesday": "7:00 AM - 7:00 PM",
                "thursday": "7:00 AM - 7:00 PM",
                "friday": "7:00 AM - 8:00 PM",
                "saturday": "8:00 AM - 8:00 PM",
                "sunday": "8:00 AM - 6:00 PM"
            }
        }
        
        await self.business_collection.insert_one(business_data)
        print("Database seeded successfully!")

# Global database manager instance
db_manager = DatabaseManager()