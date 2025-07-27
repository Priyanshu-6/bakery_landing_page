from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Product Models
class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    unit: str
    image: str
    category: str
    prep_time: str
    availability: bool = True
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

class ProductResponse(BaseModel):
    products: List[Product]

# Business Models
class BusinessInfo(BaseModel):
    name: str
    tagline: str
    description: str
    phone: str
    email: str
    address: str

class BusinessHours(BaseModel):
    monday: str
    tuesday: str
    wednesday: str
    thursday: str
    friday: str
    saturday: str
    sunday: str

class DeliveryOption(BaseModel):
    id: str
    name: str
    description: str
    price: float
    time: str
    icon: str

class BusinessData(BaseModel):
    business_info: BusinessInfo
    delivery_options: List[DeliveryOption]
    business_hours: BusinessHours

# Review Models
class Review(BaseModel):
    id: int
    name: str
    rating: int = Field(ge=1, le=5)
    comment: str
    verified: bool = True
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    approved: bool = True

class ReviewCreate(BaseModel):
    name: str
    rating: int = Field(ge=1, le=5)
    comment: str

class ReviewsResponse(BaseModel):
    reviews: List[Review]
    total: int

# Order Models
class CustomerInfo(BaseModel):
    name: str
    email: str
    phone: str
    address: Optional[str] = None

class OrderItem(BaseModel):
    product_id: int
    product_name: str
    quantity: int
    price: float
    subtotal: float

class OrderCreate(BaseModel):
    customer_info: CustomerInfo
    items: List[dict]  # Will contain product_id, quantity, price
    delivery_option: str
    delivery_fee: float
    subtotal: float
    total: float
    special_instructions: Optional[str] = None

class Order(BaseModel):
    order_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_info: CustomerInfo
    items: List[OrderItem]
    delivery_option: str
    delivery_fee: float
    subtotal: float
    total: float
    status: str = "pending"
    special_instructions: Optional[str] = None
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

class OrderResponse(BaseModel):
    order: Order
    order_id: str
    message: str