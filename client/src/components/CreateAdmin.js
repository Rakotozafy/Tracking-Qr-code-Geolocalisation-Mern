/*eslint-disable*/
import React, { Component } from 'react'
import axios from 'axios'

export default class CreateAdmin extends Component {

    state = {
        ref_utilisateur: '',
        nom_utilisateur: '',
        mdp_utilisateur: '',
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/user');
        if (res.data.length > 0) {
            this.setState({
                users: res.data.map(user => user.username),
                userSelected: res.data[0].username
            })
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:5000/admins' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                ref_utilisateur: res.data.ref_utilisateur,
                nom_utilisateur: res.data.nom_utilisateur,
                mdp_utilisateur: res.data.mdp_utilisateur,
                _id: res.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedAdmin = {
                ref_utilisateur: this.state.ref_utilisateur,
                nom_utilisateur: this.state.nom_utilisateur,
                mdp_utilisateur: this.state.mdp_utilisateur,
            };
            await axios.put('http://localhost:5000/admins/' + this.state._id, updatedAdmin);
        } else {
            const newAdmin = {
                ref_utilisateur: this.state.ref_utilisateur,
                nom_utilisateur: this.state.nom_utilisateur,
                mdp_utilisateur: this.state.mdp_utilisateur,
            };
            axios.post('http://localhost:5000/admins', newAdmin);
        }
        window.location.href = '/';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Note</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* SELECT THE USER */}
                        <div className="form-group">
                            {/* <select
                                className="form-control"
                                value={this.state.userSelected}
                                onChange={this.onInputChange}
                                name="userSelected"
                                required>
                                {
                                    this.state.users.map(user => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))
                                }
                            </select> */}
                        </div>
                        {/* Note Title */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ref_utilisateur"
                                onChange={this.onInputChange}
                                name="ref_utilisateur"
                                value={this.state.ref_utilisateur}
                                required />
                        </div>
                        {/* nom_utilisateur */}
                        <div className="form-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="nom_utilisateur"
                                name="nom_utilisateur"
                                onChange={this.onInputChange}
                                value={this.state.nom_utilisateur}
                                required>
                            </textarea>
                        </div>
                        {/* Note Date */}

                        <div className="form-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="mdp_utilisateur"
                                name="mdp_utilisateur"
                                onChange={this.onInputChange}
                                value={this.state.mdp_utilisateur}
                                required>
                            </textarea>
                        </div>

                        <button className="btn btn-primary">
                            Save <i className="material-icons">
                                assignment
                            </i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
