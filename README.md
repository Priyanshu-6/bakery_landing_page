# Sweet Home Bakery - Home Baking Service Landing Page

A warm and inviting full-stack web application for a home baking service featuring signature baked goods, online ordering system, delivery options, and customer reviews.

![Sweet Home Bakery](https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=400&fit=crop)

## 🌟 Features

- **Beautiful Landing Page**: Warm, inviting design with professional layout
- **Product Showcase**: Display signature baked goods with photos and pricing
- **Shopping Cart**: Functional add-to-cart system with real-time updates
- **Order Management**: Complete order placement with database persistence
- **Delivery Options**: Multiple delivery and pickup options with pricing
- **Customer Reviews**: Display customer testimonials with star ratings
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Toast notifications for user feedback

## 🛠 Tech Stack

### Frontend
- **React** 19.0.0 - Modern JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation and serialization
- **Python-dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (v4.4 or higher)
- **Yarn** package manager
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd sweet-home-bakery
```

### 2. Backend Setup

#### Install Python Dependencies

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Environment Configuration

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env  # If example exists, or create new file
```

Add the following environment variables to `backend/.env`:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=sweet_home_bakery
```

### 3. Frontend Setup

#### Install Node Dependencies

```bash
cd frontend
yarn install
```

#### Environment Configuration

Create a `.env` file in the `frontend` directory:

```bash
cd frontend
touch .env
```

Add the following environment variables to `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 4. Database Setup

#### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS with Homebrew:
brew services start mongodb/brew/mongodb-community

# On Ubuntu/Debian:
sudo systemctl start mongod

# On Windows:
# Start MongoDB service from Services panel or run:
net start MongoDB
```

#### Database Initialization

The database will be automatically seeded with initial data when you start the backend server for the first time.

## 🏃‍♂️ Running the Application

### 1. Start the Backend Server

```bash
cd backend
# Make sure virtual environment is activated
python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The backend API will be available at: `http://localhost:8001`

### 2. Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
yarn start
```

The frontend application will be available at: `http://localhost:3000`

### 3. Access the Application

Open your browser and navigate to `http://localhost:3000` to see the Sweet Home Bakery landing page.

## 📁 Project Structure

```
sweet-home-bakery/
├── backend/
│   ├── server.py           # FastAPI main application
│   ├── models.py           # Pydantic data models
│   ├── database.py         # Database connection and operations
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Backend environment variables
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Shadcn UI components
│   │   │   └── BakingLandingPage.jsx  # Main landing page
│   │   ├── services/
│   │   │   └── api.js        # API service layer
│   │   ├── data/
│   │   │   └── mock.js       # Mock data (for reference)
│   │   ├── hooks/
│   │   │   └── use-toast.js  # Toast notification hook
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── .env               # Frontend environment variables
├── contracts.md           # API contracts documentation
└── README.md             # This file
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID

### Business Information
- `GET /api/business-info` - Get business details
- `GET /api/delivery-options` - Get delivery options
- `GET /api/business-hours` - Get business hours

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{order_id}` - Get order details

### Reviews
- `GET /api/reviews` - Get customer reviews
- `POST /api/reviews` - Submit new review

### Health Check
- `GET /api/` - API health check

## 🧪 Testing the Application

### 1. Test Backend APIs

You can test the backend APIs using curl or any API testing tool:

```bash
# Test health check
curl http://localhost:8001/api/

# Get all products
curl http://localhost:8001/api/products

# Get business info
curl http://localhost:8001/api/business-info
```

### 2. Test Frontend Features

1. **Add to Cart**: Click "Add to Cart" on any product
2. **Cart Management**: Use +/- buttons to modify quantities
3. **Delivery Selection**: Choose different delivery options
4. **Order Placement**: Click "Place Order" to test the full flow

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start
- **Issue**: `KeyError: 'MONGO_URL'`
- **Solution**: Ensure `.env` file exists in backend directory with correct variables

#### Frontend Can't Connect to Backend
- **Issue**: Network errors or CORS issues
- **Solution**: Verify backend is running on port 8001 and `REACT_APP_BACKEND_URL` is set correctly

#### MongoDB Connection Failed
- **Issue**: `ServerSelectionTimeoutError`
- **Solution**: 
  - Ensure MongoDB is running
  - Check connection string in `.env`
  - Verify MongoDB is accessible on localhost:27017

#### Missing Dependencies
- **Issue**: Import errors
- **Solution**: 
  - Backend: `pip install -r requirements.txt`
  - Frontend: `yarn install`

### Development Commands

```bash
# Backend
cd backend
python -m uvicorn server:app --reload --host 0.0.0.0 --port 8001

# Frontend
cd frontend
yarn start

# Check backend logs
tail -f logs/backend.log  # If logging to file

# Database operations
mongosh sweet_home_bakery  # Connect to database
```

## 🚀 Deployment

For production deployment, consider:

1. **Environment Variables**: Set production values for database URLs and API endpoints
2. **Database**: Use MongoDB Atlas or other managed MongoDB service
3. **Backend**: Deploy to services like Heroku, AWS, or DigitalOcean
4. **Frontend**: Build and deploy to Netlify, Vercel, or AWS S3
5. **HTTPS**: Enable SSL/TLS certificates
6. **CORS**: Configure proper CORS settings for production domains

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature')
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the API contracts in `contracts.md`
3. Create an issue in the repository
4. Contact the development team

---

**Happy Baking! 🧁**

Made with ❤️ for the Sweet Home Bakery community.
