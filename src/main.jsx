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
import Cart from "./pages/user/CartPage.jsx"
import Profile from "./pages/user/UserProfile.jsx"
import EditProfilePage from './pages/user/EditProfilePage.jsx';
import Checkout from './pages/user/CheckOutPage.jsx';
import FAQ from './pages/FAQPage.jsx';
import TermsAndConditions from './pages/TermsAndConditionPage.jsx';
import OpticalNews from './pages/NewsPage.jsx';
import AdminSignup from "./pages/admin/SignupPage.jsx"
import AdminLogin from "./pages/admin/LoginPage.jsx"
import AdminDashboard from "./pages/admin/AdminDashboard.jsx"
import ManageProduct from "./pages/admin/ManageProduct.jsx"
import ManageOrder from "./pages/admin/ManageOrederPage.jsx"
import ManageNews from "./pages/admin/ManageNews.jsx"
import { AuthLayout } from './components/index.js'



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
        path:'/admin/signup',
        element:(
          <AuthLayout authentication={false}>
          <AdminSignup/>
          </AuthLayout>
        )
      },
      {
        path:'/admin/login',
        element:(
          <AuthLayout authentication={false}>
          <AdminLogin/>
          </AuthLayout>
        )
      },
      {
        path:'/admin/dashboard',
        element:(
        <AuthLayout authentication={false}>
        <AdminDashboard/>
        </AuthLayout>
      )
      },
      {
        path:'/admin/products',
        element:( 
        <AuthLayout authentication={false}>
          <ManageProduct/>
        </AuthLayout>)
      },
      {
        path:'/admin/orders',
        element:( 
        <AuthLayout authentication={false}>
          <ManageOrder/>
        </AuthLayout>)
      },
      {
        path:'/admin/news',
        element:(
          <AuthLayout authentication={false}>
          <ManageNews/>
          </AuthLayout>
        )
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
