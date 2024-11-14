# Pizza Booking Application

## Overview

The **Pizza Booking Application** is a user-friendly web application designed for pizza lovers to place customized orders. The app allows users to select from various pizza bases, toppings, and quantities, offering real-time price updates. With a smooth and intuitive interface, users can personalize their orders, view order summaries, and complete checkout seamlessly. Additionally, it provides an admin panel for managing pizza bases, toppings, and orders.

## Key Features

### 1. **User Registration and Authentication**
   - **Create an Account**: Users can register with an email, password, and basic contact information.
   - **Login**: Registered users can securely log in to access their profile and order history.
   - **Password Recovery**: Password reset functionality for forgotten passwords.

### 2. **Order Customization**
   - **Choose Pizza Base**: Select from a variety of pizza bases like Thin Crust, Thick Crust, Stuffed Crust, Gluten-Free, and Whole Wheat.
   - **Select Toppings**: Choose from a wide selection of toppings including vegetables, meats, cheeses, and other options.
   - **Real-Time Price Update**: The total price is updated in real-time based on the selected base, toppings, and quantity.

### 3. **Order Summary and Checkout**
   - **Order Summary**: View the selected base, toppings, quantity, and total price before finalizing the order.
   - **Checkout**: Input delivery details such as address and contact number.
   - **Payment Options**: Secure payment via credit card, debit card, or PayPal.
   - **Order Confirmation**: Users receive a confirmation page with order details and estimated delivery time.

### 4. **Order Management**
   - **Order History**: Users can view their past orders along with details such as items ordered, date, and total cost.
   - **Reorder**: Option to quickly reorder from previous orders.

### 5. **Admin Panel**
   - **Admin Login**: Secure login for admins.
   - **Manage Pizza Options**: Admins can add, modify, or delete pizza bases and toppings.
   - **Order Management**: Admins can view and update the status of orders (e.g., preparing, out for delivery, delivered).

### 6. **Performance and Scalability**
   - **Responsive Design**: The app is fully responsive across various devices like desktops, tablets, and smartphones.
   - **Fast Load Times**: Optimized for quick page loads and smooth user interactions.

### 7. **Security**
   - **Secure Payment Processing**: Payment information is handled securely using industry-standard protocols.
   - **Password Encryption**: User passwords are securely hashed and stored.

## Technologies Used

- **Frontend:**
  - **React.js**: For building the user interface.
  - **Tailwind CSS**: For responsive and modern design.
  - **JavaScript (ES6)**: Used for app logic and functionality.

- **Backend:**
  - **Node.js**: JavaScript runtime used to build the backend server.
  - **Express.js**: A minimal web framework for handling routing and API requests.

- **Database:**
  - **MySQL**: Relational database used to store user data, orders, and pizza options.

- **Authentication:**
  - **JWT (JSON Web Tokens)**: For secure authentication and session management.

## Installation

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/username/pizza-booking-app.git
   ```

2. Install dependencies:
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For the backend:
     ```bash
     cd backend
     npm install
     ```

3. Set up environment variables (for database connection, JWT secret, etc.) in the `.env` file.

4. Run the app:
   - Start the backend server:
     ```bash
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

5. Open the app in your browser at `http://localhost:3000`.

## License

This project is licensed under the MIT License - see the [LICENSE](VasanthSM) file for details.

Before cloning, please **DM me** for access.
