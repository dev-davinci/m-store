import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Home} />

      <Footer />
    </Router>
  );
};

export default App;
