from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from models import *
from database import db_manager
from typing import List

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="Sweet Home Bakery API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize database with seed data"""
    await db_manager.seed_database()
    logging.info("Application started and database seeded")

# Products endpoints
@api_router.get("/products", response_model=ProductResponse)
async def get_products():
    """Get all available products"""
    try:
        products = await db_manager.get_all_products()
        return ProductResponse(products=products)
    except Exception as e:
        logging.error(f"Error fetching products: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch products")

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: int):
    """Get a specific product by ID"""
    try:
        product = await db_manager.get_product_by_id(product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching product {product_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch product")

# Business info endpoints
@api_router.get("/business-info", response_model=BusinessInfo)
async def get_business_info():
    """Get business information"""
    try:
        business_info = await db_manager.get_business_info()
        if not business_info:
            raise HTTPException(status_code=404, detail="Business information not found")
        return business_info
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching business info: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch business information")

@api_router.get("/delivery-options", response_model=List[DeliveryOption])
async def get_delivery_options():
    """Get available delivery options"""
    try:
        delivery_options = await db_manager.get_delivery_options()
        return delivery_options
    except Exception as e:
        logging.error(f"Error fetching delivery options: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch delivery options")

@api_router.get("/business-hours", response_model=BusinessHours)
async def get_business_hours():
    """Get business hours"""
    try:
        business_hours = await db_manager.get_business_hours()
        if not business_hours:
            raise HTTPException(status_code=404, detail="Business hours not found")
        return business_hours
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching business hours: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch business hours")

# Reviews endpoints
@api_router.get("/reviews", response_model=ReviewsResponse)
async def get_reviews(limit: int = 10, offset: int = 0):
    """Get customer reviews with pagination"""
    try:
        reviews, total = await db_manager.get_reviews(limit, offset)
        return ReviewsResponse(reviews=reviews, total=total)
    except Exception as e:
        logging.error(f"Error fetching reviews: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch reviews")

@api_router.post("/reviews", response_model=dict)
async def create_review(review_data: ReviewCreate):
    """Create a new customer review"""
    try:
        review = await db_manager.create_review(review_data.dict())
        return {"review": review, "message": "Review submitted successfully"}
    except Exception as e:
        logging.error(f"Error creating review: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create review")

# Orders endpoints
@api_router.post("/orders", response_model=OrderResponse)
async def create_order(order_data: OrderCreate):
    """Create a new order"""
    try:
        # Process order items to include product names
        processed_items = []
        for item in order_data.items:
            product = await db_manager.get_product_by_id(item["product_id"])
            if not product:
                raise HTTPException(status_code=404, detail=f"Product {item['product_id']} not found")
            
            order_item = OrderItem(
                product_id=item["product_id"],
                product_name=product.name,
                quantity=item["quantity"],
                price=item["price"],
                subtotal=item["price"] * item["quantity"]
            )
            processed_items.append(order_item)
        
        # Create order object
        order = Order(
            customer_info=order_data.customer_info,
            items=processed_items,
            delivery_option=order_data.delivery_option,
            delivery_fee=order_data.delivery_fee,
            subtotal=order_data.subtotal,
            total=order_data.total,
            special_instructions=order_data.special_instructions
        )
        
        # Save to database
        created_order = await db_manager.create_order(order)
        
        return OrderResponse(
            order=created_order,
            order_id=created_order.order_id,
            message="Order placed successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error creating order: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create order")

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get order details by ID"""
    try:
        order = await db_manager.get_order_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching order {order_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch order")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Sweet Home Bakery API is running", "status": "healthy"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on shutdown"""
    logging.info("Shutting down application")