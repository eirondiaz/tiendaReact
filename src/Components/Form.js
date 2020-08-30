import React, { Component } from 'react'
import axios from 'axios'

class Form extends Component {

    state = {
        nombre: '',
        categoria: '',
        precio: '',
        stock: ''
    }

    handleChange = e => {
        const { name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        axios.post('https://localhost:44348/api/productos/', this.state)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div className="col-md-4">
                <div className="card p-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-box-open"></i></span>
                            </div>
                            <input type="text" onChange={this.handleChange} name="nombre" className="form-control" placeholder="Nombre" required></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-tags"></i></span>
                            </div>
                            <input type="text" onChange={this.handleChange} name="categoria" className="form-control" placeholder="Categoria" required></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-money-bill"></i></span>
                            </div>
                            <input type="number" onChange={this.handleChange} name="precio" className="form-control" placeholder="Precio" required></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-list-ol"></i></span>
                            </div>
                            <input type="number" onChange={this.handleChange} name="stock" className="form-control" placeholder="Stock" required></input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success w-100"><i className="fas fa-database"></i>   AGREGAR</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Form