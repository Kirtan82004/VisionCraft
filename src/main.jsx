import React from 'react';
import ReactDom from 'react-dom/client'
import App from './App.jsx';
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/AboutUs.jsx';
import SignUp from './pages/SignUpPage.jsx';
import Login from "./pages/LoginPage.jsx"
import Product from "./pages/ProductListingPage.jsx"
import ProductDetail from "./pages/ProductDetailPage.jsx"
import OrderDetails from './pages/OrderDetails.jsx';
import Cart from "./pages/user/CartPage.jsx"
import Profile from "./pages/user/UserProfile.jsx"
import EditProfilePage from './pages/user/EditProfilePage.jsx';
import Checkout from './pages/user/CheckOutPage.jsx';
import FAQ from './pages/FAQPage.jsx';
import TermsAndConditions from './pages/TermsAndConditionPage.jsx';
import OpticalNews from './pages/NewsPage.jsx';
import { AuthLayout } from './components/index.js'
//-----------ADMIN COMPONENTS IMPORTS----------------
import Dashboard from './components/admin/dashboard.jsx';
import OrdersPage from './pages/admin/orders.jsx';
import InventoryPage from './pages/admin/inventory.jsx';
import InvoicesPage from './pages/admin/invoices.jsx';
import AppointmentPage from './pages/admin/appointments.jsx';
import CustomersPage from './pages/admin/customers.jsx';
import NotificationsPage from './pages/admin/notifications.jsx';
import SendMailPage from './pages/admin/sendMail.jsx';
import ServicesPage from './pages/admin/services.jsx';
import SettingsPage from './pages/admin/settings.jsx';
import ProductDetailPage from './pages/admin/productDetails.jsx';
import EditProductPage from './pages/admin/editProduct.jsx';
import AddProductPage from './pages/admin/addProduct.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path:'/login',
        element: (
        <AuthLayout authentication ={false}>
          <Login />
        </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication ={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: '/products',
        element: (
          <AuthLayout authentication ={true}>
            <Product />
          </AuthLayout>
        )
      },
      {
        path: '/product/:productId',
        element: (
          <AuthLayout authentication ={true}>
            <ProductDetail />
          </AuthLayout>
        )
      },
      {
        path: '/orderDetails/:orderId',
        element:(
          <AuthLayout authentication ={true}>
            <OrderDetails />
          </AuthLayout>
        )
      },
      {
        path: '/cart',
        element: (
          <AuthLayout authentication ={true}>
            <Cart/>
          </AuthLayout>
        )
      },
      {
        path: '/profile',
        element: (
          <AuthLayout authentication ={true}>
            <Profile />
          </AuthLayout>
        )
      },
      {
        path:'/edit-profile',
        element: (
          <AuthLayout authentication ={true}>
            <EditProfilePage/>
          </AuthLayout>
        )
      },
      {
        path:'/checkout',
        element: (
          <AuthLayout authentication ={true}>
            <Checkout />
          </AuthLayout>
        )
      },
      {
        path:`/faq`,
        element:(
            <FAQ/>
        )
      },
      {
        path:'/terms',
        element:(
            <TermsAndConditions/>
        )
      },
      {
        path:'/news',
        element:(
            <OpticalNews/>
        )
      },
      {
        path:'/admin/dashboard',
        element: <Dashboard/>
      },
      {
        path:'/admin/orders',
        element:  <OrdersPage />
      },
      {
        path:'/admin/Inventory',
        element: <InventoryPage/>
      }  ,
      {
        path:'/admin/invoices',
        element: <InvoicesPage/>
      },
      {
        path:'/admin/appointments',
        element: <AppointmentPage/>
      },
      {
        path:'/admin/customers',
        element: <CustomersPage/>
      },
      {
        path:'/admin/notifications',
        element: <NotificationsPage/>
      },
      {
        path:'/admin/send-mail',
        element: <SendMailPage/>
      },
      {
        path:'/admin/services',
        element: <ServicesPage/>
      },
      {
        path:'/admin/settings',
        element: <SettingsPage/>
      },
      {
        path:'/admin/product/:id',
        element: <ProductDetailPage/>
      },
      {
        path:'/admin/product/edit/:id',
        element: <EditProductPage/>
      },
      {
        path:'/admin/product/add',
        element: <AddProductPage/>
      }
    ]
  }
])



ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>




)
