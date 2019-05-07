import React, { Component } from 'react';
import '../assets/css/app.scss';

class AddEmployee extends Component {
    state = {
        name: '',
        position: '',
        office: '',
        extn: '',
        start: '',
        salary: ''
    }

    handleInputChange = ({target: {name, value}}) => {

        this.setState({
            [name]: value
        });

    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.add({...this.state});

        this.setState({
            name: '',
            position: '',
            office: '',
            extn: '',
            start: '',
            salary: ''
        });
    }

    render() {
        const { name, position, office, extn, start, salary } = this.state;

        return (
            <div className="form-wrapper">
            <form onSubmit={this.handleSubmit} className="col s12 m3">
                <div className="input-field">
                    <input name="name" autoComplete="off" id="name" type="text" value={name} onChange={this.handleInputChange} />
                    <label htmlFor="name">Employee Name</label>
                </div>
                <div className="input-field">
                    <input name="position" autoComplete="off" id="position" type="text" value={position} onChange={this.handleInputChange} />
                    <label htmlFor="position">Position</label>
                </div>
                <div className="input-field">
                    <input name="office" autoComplete="off" id="office" type="text" value={office} onChange={this.handleInputChange} />
                    <label htmlFor="office">Office</label>
                </div>
                <div className="input-field">
                    <input name="extn" autoComplete="off" id="extn" type="text" value={extn} onChange={this.handleInputChange} />
                    <label htmlFor="extn">Extn</label>
                </div>
                <div className="input-field">
                    <input name="start" autoComplete="off" id="start" type="text" value={start} onChange={this.handleInputChange} />
                    <label htmlFor="start">Start Date</label>
                </div>
                <div className="input-field">
                    <input name="salary" autoComplete="off" id="salary" type="text" value={salary} onChange={this.handleInputChange} />
                    <label htmlFor="salary">Salary</label>
                </div>
                <button className="btn green waves-effect waves-light">Add Employee
                <i className="material-icons right">send</i></button>
            </form>
            </div>
        );
    };
}

export default AddEmployee;