import {Route,Routes} from 'react-router-dom'
import './css/App.css';
import Home  from './components/home/home'
import Cart  from './components/cart/cart'
import Search from './components/search/search';
import { ProductDetails } from './components/productDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path ='/' element = {<Home />} />
        <Route path ="/search/" element = {<Search />} />
        <Route path ='/cart' element = {<Cart />} />
        <Route exact path ='/:productName/:productId' element = {<ProductDetails />} />
        <Route path = '*' element = {<h1 style={{textAlign: "center"}}>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
