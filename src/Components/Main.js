import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom' 
import './Ap.css'

class Main extends Component {

    state = {
        prod: []
    }

    componentDidMount() {
        axios.get('https://localhost:44381/api/productos/')
            .then(res => {
                this.setState({
                    prod: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div className="container py-5">
                <div className="row"> 
                    {
                        this.state.prod.map(prod => (
                            <div className="col-md-3">
                                <div className="card mb-5">
                                    <img width="50px" height="270px" src="https://mms-images-prod.imgix.net/mms/images/catalog/b65970c681d6fa3ea1b6760d3c137415/colors/116223/views/alt/front_medium_extended.png?ixlib=rails-2.1.4&w=240&h=300&fit=crop&dpr=1&q=39&fm=png&auto=format" class="card-img-top" alt="..."></img>
                                    <div className="card-body">
                                        <Link to={`/producto/${prod.id}`} className="font-weight-bold text-primary h4">{prod.nombre}</Link>
                                        <p>{prod.categoria}</p>
                                        <p className="font-weight-bold">${prod.precio}</p>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <p className="font-italic">(2 reviews)</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Main