import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import About from "../pages/About";
import ProductContainer from "../containers/ProductContainer";
import AddProductFormContainer from "../containers/AddProductFormContainer";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Dashboard from "../pages/Dashboard";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AdminRoute from "../routes/AdminRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductContainer />} />
          <Route path="/add-products" element={<AddProductFormContainer />} />
          <Route
            path="/edit-product/:id"
            element={<AddProductFormContainer />}
          />
          {/* <Route path="/orders" element={<Orders />} /> */}
          <Route element={<AdminRoute />}>
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
