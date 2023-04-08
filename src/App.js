import {Route,Routes} from 'react-router-dom'
import './css/App.css'
import Home  from './components/home/home'
import Cart  from './components/cart/cart'
import Search from './components/search/search'
import { UserAccount } from './components/userAccount/userAccount'
import { ProductDetails } from './components/productDetails/productDetails'
import { PersistLogin } from './components/persistLogin'
import { Register } from './components/register/register'
import { ActivateAccount } from './components/activateAccount'
import { Favorites } from './components/favorites'

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/'element = {<PersistLogin />}>
          <Route index exact       element = {<Home />}    />
          <Route path ="/search/"  element = {<Search />}  />
          <Route path ="/register" element = {<Register />}    />
          <Route path ='/cart'     element = {<Cart />}    />
          <Route path='/account'   element = {<UserAccount />}    />
          <Route path='/activate'  element = {<ActivateAccount />}    />
          <Route path='/favorites' element = {<Favorites />}    />
          <Route exact path ='/:productName/:productId' element = {<ProductDetails />} />
          <Route path = '*' element = {<h1 style={{textAlign: "center"}}>404 Not Found</h1>} />
        </Route>  
      </Routes>
    </div>
  );
}

export default App;
