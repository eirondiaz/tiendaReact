import React, { Component } from 'react'
import axios from 'axios'

class Table extends Component {

    state = {
        posts: []
    }

     handleDelete = d => {
        console.log('w')
        if (window.confirm('Estas de acuerdo que deseas eliminar este producto?')) {
            axios.delete('https://localhost:44381/api/productos/' + d)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    
    componentDidMount() {
        axios.get('https://localhost:44381/api/productos/')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidUpdate() {
        axios.get('https://localhost:44381/api/productos/')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div className="col-md-8">
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.posts.map((p, k) => (
                        <tr key={p.id}>
                            <th scope="row">{k + 1}</th>
                            <td>{p.nombre}</td>
                            <td>{p.categoria}</td>
                            <td>${p.precio}</td>
                            <td>{p.stock}</td>
                            <td><a href={`/detalles/${p.id}`} className="btn btn-primary mr-2"><i className="fas fa-info-circle"></i></a>
                                <button className="btn btn-danger" onClick={() => this.handleDelete(p.id)}><i className="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
                </table>
            </div>
        )
    }
}

export default Table