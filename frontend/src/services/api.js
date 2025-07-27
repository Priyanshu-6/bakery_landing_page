// API service layer for Sweet Home Bakery
const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

class BakingApiService {
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProduct(productId) {
    try {
      const response = await fetch(`${API_BASE}/products/${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      throw error;
    }
  }

  async getBusinessInfo() {
    try {
      const response = await fetch(`${API_BASE}/business-info`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching business info:', error);
      throw error;
    }
  }

  async getDeliveryOptions() {
    try {
      const response = await fetch(`${API_BASE}/delivery-options`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching delivery options:', error);
      throw error;
    }
  }

  async getBusinessHours() {
    try {
      const response = await fetch(`${API_BASE}/business-hours`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching business hours:', error);
      throw error;
    }
  }

  async getReviews(limit = 4, offset = 0) {
    try {
      const response = await fetch(`${API_BASE}/reviews?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  async createOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getOrder(orderId) {
    try {
      const response = await fetch(`${API_BASE}/orders/${orderId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  }

  async submitReview(reviewData) {
    try {
      const response = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const bakingApi = new BakingApiService();
export default bakingApi;