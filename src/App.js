import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './Components/Form'
import Table from './Components/Table'
import Detalles from './Components/Detalles'
import Login from './Components/Login'
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Main from './Components/Main'
import Footer from './Components/Footer'
import Producto from './Components/Producto'
import Registro from './Components/Registro'
import Profile from './Components/Profile'
import Prueba from './Components/Prueba'
import Cart from './Components/Cart'
import Direccion from './Components/Direccion'
import PlaceOrder from './Components/PlaceOrder'
import { useDispatch, useSelector } from 'react-redux'
import { getCartAction } from './redux/carritoDucks'
import OrderDetails from './Components/orderUserDetails/OrderDetails'

const App = () => {

  const dispatch = useDispatch()
  const cartCounttt = useSelector(state => state.carritos.cartList.length)

  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const log = localStorage.getItem('user')

    log !== null? setLogged(true): setLogged(false)
    log !== null? setUser(JSON.parse(log)): setLogged(false) 
    log !== null? dispatch(getCartAction(JSON.parse(log).id)): setLogged(false) 
  }, [])

  return (
    <Router>
      <nav className="navbar navbar-light bg-dark">
        <Link to="/" className="navbar-brand text-light">JopiTienda</Link>
        <form className="form-inline">
          <Link to="/cart" className="text-light font-weight-bold my-2 mx-1 my-sm-0">Cart</Link>
          <span className='badge badge-warning' id='lblCartCount'>{cartCounttt}</span>
          {
            !logged?
            <Link to="/login" className="text-light font-weight-bold my-2 mx-3 my-sm-0">Log in</Link>
            : <Link to="/profile" className="text-light font-weight-bold my-2 mx-3 my-sm-0">{user.nombre}</Link>
          }
          
        </form>
      </nav>
      <Switch>
        <Route path="/agregar" exact>
          <div className="container">
            <h2 className="display-3 mt-2 mb-4 text-center">Agregar Productos</h2>
            <div className="row">
              <Form />
              <Table />
            </div>
          </div>
        </Route>
        <Route path="/detalles/:id" exact>
          <Detalles />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/prueba" exact>
          <Prueba />
        </Route>
        <Route path="/Registro" exact>
          <Registro />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/orderdetails/:id" exact>
          <OrderDetails />
        </Route>
        <Route path="/profile/direccion" exact>
          <Direccion />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path='/placeorder' exact>
          <PlaceOrder />
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/producto/:id" exact>
          <Producto />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
