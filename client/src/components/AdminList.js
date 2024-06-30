/*eslint-disable*/
import React, { Component } from 'react'
import axios from 'axios'
// import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default class AdminList extends Component {

    state = {
        notes: []
    }

    async componentDidMount() {
        this.getAdmin();
    }

    getAdmin = async () => {
        const res = await axios.get('http://localhost:5000/admin')
        this.setState({
            admins: res.data
        });
    }

    deleteAdmin = async (adminId) => {
        await axios.delete('http://localhost:4000/admin' + adminId);
        this.getAdmin();
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.admins.map(admin => (
                        <div className="col-md-4 p-2" key={admin._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{admin.ref_utilisateur}</h5>
                                    <Link to={"/edit/" + admin._id} className="btn btn-secondary">
                                        <i className="material-icons">
                                            border_color</i>
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>
                                        {admin.nom_utilisateur}
                                    </p>
                                    <p>
                                        Author: {admin.mdp_admin}
                                    </p>
                                  
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteAdmin(admin._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
