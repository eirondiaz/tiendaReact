import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class Profile extends Component {

    state = {
        redirect: false,
        user: {}
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/login' />
        }
    }

    componentDidMount() {
        const log = localStorage.getItem('user')
    
        if (log === null) {
            this.setRedirect()
        }
        else {
            this.setState({
                user: JSON.parse(localStorage.getItem('user'))
            })
        }
    }

    logOut = () => {
        localStorage.clear()
    }

    render(){
        return(
            <div className="mx-4 my-5">
                {this.renderRedirect()}
                <div className="row">
                    <div className="col-md-4">
                        <div className="card px-3 py-4">
                            <h3 className="font-weight-bold mb-4">Perfil</h3>
                            <form>
                                <div className="form-group">
                                    <span>Nombre</span>
                                    <input type="text" name="nombre" className="form-control" value={this.state.user.nombre} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <span>Email</span>
                                    <input type="email" name="correo" className="form-control" value={this.state.user.correo} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <span>Contraseña</span>
                                    <input type="password" name="contraseña" className="form-control" value={this.state.user.contraseña} readOnly></input>
                                </div>
                            </form>
                            <Link to="/profile/direccion"><button className="button primmary w-100 mb-3">Agegar direccion de envio</button></Link>
                            <Link to="/login"><button className="button seconndary text-primary w-100 mb-2" onClick={this.logOut}>Log Out</button></Link>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h4>Your Orders</h4>
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Paid</th>
                                    <th scope="col">Delivered</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>981257956623756875</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>true</td>
                                    <td><Link>Details</Link></td>
                                </tr>
                                <tr>
                                    <td>8375687651565873658</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>false</td>
                                    <td><Link>Details</Link></td>
                                </tr>
                                <tr>
                                    <td>56238576857625872658</td>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                    <td>flase</td>
                                    <td><Link>Details</Link></td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile