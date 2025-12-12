// src/router/routes.jsx
import React, { Suspense,lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../components/index.js";


// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home.jsx"));
const About = lazy(() => import("../pages/AboutUs.jsx"));
const SignUp = lazy(() => import("../pages/SignUpPage.jsx"));
const Login = lazy(() => import("../pages/LoginPage.jsx"));
const Product = lazy(() => import("../pages/ProductListingPage.jsx"));
const ProductDetail = lazy(() => import("../pages/ProductDetailPage.jsx"));
const OrderDetails = lazy(() => import("../pages/OrderDetails.jsx"));
const Cart = lazy(() => import("../pages/user/CartPage.jsx"));
const Profile = lazy(() => import("../pages/user/UserProfile.jsx"));
const EditProfilePage = lazy(() => import("../pages/user/EditProfilePage.jsx"));
const Checkout = lazy(() => import("../pages/user/CheckOutPage.jsx"));
const FAQ = lazy(() => import("../pages/FAQPage.jsx"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndConditionPage.jsx"));
const OpticalNews = lazy(() => import("../pages/NewsPage.jsx"));

// Admin
const Dashboard = lazy(() => import("../components/admin/dashboard.jsx"));
const OrdersPage = lazy(() => import("../pages/admin/orders.jsx"));
const InventoryPage = lazy(() => import("../pages/admin/inventory.jsx"));
const InvoicesPage = lazy(() => import("../pages/admin/invoices.jsx"));
const AppointmentPage = lazy(() => import("../pages/admin/appointments.jsx"));
const CustomersPage = lazy(() => import("../pages/admin/customers.jsx"));
const NotificationsPage = lazy(() => import("../pages/admin/notifications.jsx"));
const SendMailPage = lazy(() => import("../pages/admin/sendMail.jsx"));
const ServicesPage = lazy(() => import("../pages/admin/services.jsx"));
const SettingsPage = lazy(() => import("../pages/admin/settings.jsx"));
const AdminProductDetailPage = lazy(() => import("../pages/admin/productDetails.jsx"));
const EditProductPage = lazy(() => import("../pages/admin/editProduct.jsx"));
const AddProductPage = lazy(() => import("../pages/admin/addProduct.jsx"));

import App from "../App.jsx";

const Loading = () => <div>Loading...</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },

      // Public Auth
      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },

      // Protected User Routes
      {
        path: "products",
        element: (
          <AuthLayout authentication={true}>
            <Product />
          </AuthLayout>
        ),
      },
      {
        path: "product/:productId",
        element: (
          <AuthLayout authentication={true}>
            <ProductDetail />
          </AuthLayout>
        ),
      },
      {
        path: "orderDetails/:orderId",
        element: (
          <AuthLayout authentication={true}>
            <OrderDetails />
          </AuthLayout>
        ),
      },
      {
        path: "cart",
        element: (
          <AuthLayout authentication={true}>
            <Cart />
          </AuthLayout>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "edit-profile",
        element: (
          <AuthLayout authentication={true}>
            <EditProfilePage />
          </AuthLayout>
        ),
      },
      {
        path: "checkout",
        element: (
          <AuthLayout authentication={true}>
            <Checkout />
          </AuthLayout>
        ),
      },

      // Public Pages
      { path: "faq", element: <FAQ /> },
      { path: "terms", element: <TermsAndConditions /> },
      { path: "news", element: <OpticalNews /> },

      // Admin
      { path: "admin/dashboard", element: <Dashboard /> },
      { path: "admin/orders", element: <OrdersPage /> },
      { path: "admin/inventory", element: <InventoryPage /> },
      { path: "admin/invoices", element: <InvoicesPage /> },
      { path: "admin/appointments", element: <AppointmentPage /> },
      { path: "admin/customers", element: <CustomersPage /> },
      { path: "admin/notifications", element: <NotificationsPage /> },
      { path: "admin/send-mail", element: <SendMailPage /> },
      { path: "admin/services", element: <ServicesPage /> },
      { path: "admin/settings", element: <SettingsPage /> },
      { path: "admin/product/:id", element: <AdminProductDetailPage /> },
      { path: "admin/product/edit/:id", element: <EditProductPage /> },
      { path: "admin/product/add", element: <AddProductPage /> },
    ],
  },
]);