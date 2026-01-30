# Quirex - Real Estate Management Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing real estate properties, user accounts, and payment processing.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [Project Components](#project-components)
- [Contributing](#contributing)

## ✨ Features

### User Features
- **User Registration & Authentication** - Secure user registration and login
- **Property Browsing** - View available real estate properties
- **Purchase History** - Track properties bought by users
- **User Profile Management** - Update personal information and preferences
- **Contact Us** - Get in touch with the platform
- **Responsive Design** - Mobile-friendly interface

### Admin Features
- **Property Management** - Add, view, and manage property listings
- **Sold Properties Tracking** - Monitor completed transactions
- **User Management** - View and manage registered users
- **Contact List Management** - Track and manage user inquiries
- **Admin Dashboard** - Central hub for administrative tasks
- **Admin Profile** - Manage admin account settings

### Payment Features
- **Razorpay Integration** - Secure payment gateway for property transactions
- **Payment Processing** - Handle property purchase payments

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js 5.1
- **Database**: MongoDB with Mongoose 8.16
- **File Upload**: express-fileupload
- **Payment Gateway**: Razorpay
- **Security**: CORS enabled
- **Environment**: dotenv
- **Development**: Nodemon

### Frontend
- **Library**: React 19
- **Build Tool**: Vite 7
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Yup validation
- **UI Framework**: Bootstrap 5
- **Animations**: AOS (Animate On Scroll) & Typewriter Effect
- **Icons**: React Icons
- **Notifications**: SweetAlert2
- **Counter Animation**: React Countup
- **Linting**: ESLint

## 📁 Project Structure

```
Quirex/
├── Backend/
│   ├── index.js                 # Server entry point
│   ├── package.json             # Backend dependencies
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── model/
│   │   └── table.js            # Database schemas
│   ├── route/
│   │   ├── userRoute.js        # User endpoints
│   │   ├── adminRoute.js       # Admin endpoints
│   │   └── paymentRoute.js     # Payment endpoints
│   └── uploads/                # File upload directory
│
├── frontend/
│   ├── index.html              # HTML entry point
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration
│   ├── eslint.config.js        # ESLint configuration
│   ├── public/
│   │   └── img/                # Public images
│   └── src/
│       ├── main.jsx            # React app entry
│       ├── App.jsx             # Main app component
│       ├── App.css             # Global styles
│       ├── index.css           # Base styles
│       ├── NotFound.jsx        # 404 page
│       ├── assets/             # Static assets
│       ├── hooks/              # Custom React hooks
│       └── components/
│           ├── ScrollToTop.jsx
│           ├── AdminComponents/
│           │   ├── AddProperty.jsx
│           │   ├── AdminContactUsList.jsx
│           │   ├── AdminLogout.jsx
│           │   ├── AdminProfile.jsx
│           │   ├── AdminPropertyList.jsx
│           │   ├── AdminSoldProperty.jsx
│           │   └── UserList.jsx
│           └── landingComponents/
│               ├── About.jsx
│               ├── ContactUs.jsx
│               ├── Counter.jsx
│               ├── Footer.jsx
│               ├── Home.jsx
│               ├── Login.jsx
│               ├── NavBar.jsx
│               ├── OurAnimities.jsx
│               ├── Property.jsx
│               ├── Services.jsx
│               ├── Slider.jsx
│               ├── Testimonial.jsx
│               ├── TopNavbar.jsx
│               └── UserRegister.jsx
│           └── userComponents/
│               ├── UserBoughtList.jsx
│               ├── UserLogOut.jsx
│               └── UserProfile.jsx
│
└── README.md                   # Project documentation
```

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16 or higher) and npm installed
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Razorpay Account** for payment processing
- **Git** for version control

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Quirex
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file in the `Backend` folder with the following variables:

```env
# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# Server Configuration
PORT=9000

# Razorpay Keys
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend Configuration
No additional environment setup required. The frontend connects to the backend API at `http://localhost:9000/api`.

## 🏃 Running the Application

### Backend
```bash
cd Backend
npm run dev
```
The server will run on `http://localhost:9000`

### Frontend
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173` (default Vite port)

### Build Frontend for Production
```bash
cd frontend
npm run build
```

## 🔌 API Routes

### User Routes
- `POST /api/register` - Register a new user
- `POST /api/login` - User login
- `GET /api/user-profile` - Get user profile
- `PUT /api/update-profile` - Update user profile
- `GET /api/user-purchases` - Get user's purchased properties

### Admin Routes
- `POST /api/admin-login` - Admin login
- `GET /api/admin-properties` - Get all properties
- `POST /api/add-property` - Add new property
- `PUT /api/edit-property/:id` - Edit property
- `DELETE /api/delete-property/:id` - Delete property
- `GET /api/users` - Get all users
- `GET /api/contacts` - Get contact inquiries

### Payment Routes
- `POST /api/payment/create-order` - Create Razorpay payment order
- `POST /api/payment/verify` - Verify payment

## 🎯 Project Components

### Admin Components
- **AddProperty**: Form to add new real estate properties
- **AdminPropertyList**: Display all properties with edit/delete options
- **AdminSoldProperty**: Track completed property sales
- **UserList**: Manage registered users
- **AdminContactUsList**: View user contact inquiries
- **AdminProfile**: Admin account management
- **AdminLogout**: Logout functionality

### Landing Components
- **Home**: Main landing page with hero section
- **Slider**: Property carousel showcase
- **Property**: Property listings display
- **About**: Company information
- **Services**: Service offerings
- **OurAmmenities**: Featured amenities showcase
- **Testimonial**: User testimonials
- **ContactUs**: Contact form
- **Login**: User login page
- **UserRegister**: User registration page
- **NavBar & TopNavbar**: Navigation components
- **Footer**: Footer section
- **Counter**: Animated statistics counter

### User Components
- **UserProfile**: User profile management
- **UserBoughtList**: Display user's purchased properties
- **UserLogout**: Logout functionality

## 📝 Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

## 🔒 Security Features

- CORS enabled for secure cross-origin requests
- Environment variable protection with dotenv
- Razorpay secure payment integration
- File upload validation with express-fileupload
- Form validation with React Hook Form and Yup

## 📧 Contact & Support

For issues, questions, or contributions, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ using MERN Stack**
