import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import UserList from "./pages/UserList";
import UserEdit from "./pages/UserEdit";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import OrderList from "./pages/OrderList";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/products/:id" component={ProductDetails} />
      <Route path="/cart/:id?" component={Cart} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/payment" component={Payment} />
      <Route path="/placeorder" component={PlaceOrder} />
      <Route path="/order/:id" component={Order} />
      <Route path="/admin/userlist" component={UserList} />
      <Route path="/admin/user/:id/edit" component={UserEdit} />
      <Route path="/admin/productlist" component={ProductList} />
      <Route path="/admin/product/:id/edit" component={ProductEdit} />
      <Route path="/admin/orderlist" component={OrderList} />
      <Route path="/search/:keyword" component={Home} exact />
      <Route path="/page/:pageNumber" component={Home} exact />
      <Route path="/search/:keyword/page/:pageNumber" component={Home} exact />
      <Route path="/" exact component={Home} />
      <Footer />
    </Router>
  );
};

export default App;
