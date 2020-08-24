import React, { Component } from 'react'
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
import Cart from './Components/Cart'
import Direccion from './Components/Direccion'

class App extends Component {

  state = {
    logged: false,
    user: {}
  }

  componentDidMount() {
    const log = localStorage.getItem('user')
    
    if (log === null) {
      this.setState({
        logged: false
      }, () => console.log(this.state.logged))
    }
    else {
      this.setState({
        logged: true,
        user: JSON.parse(localStorage.getItem('user'))
      }, () => console.log(this.state.logged))
    }
  }

  render(){
    return (
      <Router>
        <nav class="navbar navbar-light bg-dark">
          <Link to="/" class="navbar-brand text-light">Navbar</Link>
          <form class="form-inline">
            <Link to="/cart" class="text-light font-weight-bold my-2 mx-3 my-sm-0">Cart</Link>

            {
              !this.state.logged?
              <Link to="/login" class="text-light font-weight-bold my-2 mx-3 my-sm-0">Log in</Link>
              : <Link to="/profile" class="text-light font-weight-bold my-2 mx-3 my-sm-0">{this.state.user.nombre}</Link>
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
          <Route path="/Registro" exact>
            <Registro />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/profile/direccion" exact>
            <Direccion />
          </Route>
          <Route path="/cart" exact>
            <Cart />
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
}

export default App
