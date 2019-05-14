import React, { Component } from 'react';
import useForm from 'react-hook-form'
import './modal.scss';

class UpdateEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            position: '',
            office: '',
            extn: '',
            start: '',
            salary: ''
        }
    }

    handleInputChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.edit({ ...this.state });

        this.setState({
            id: this.state.id,
            name: '',
            position: '',
            office: '',
            extn: '',
            start: '',
            salary: ''
        });
    }

    checkIfEmployeeExists(employee) {
        if (!employee) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const employee = this.props.employee.employee;

        if (this.checkIfEmployeeExists(employee)) {
            const { name, position, office, extn, start, salary } = this.state;
            this.state.id = employee.id;
            return (
                <form onSubmit={this.handleSubmit} className={`col s12 update-form`}>
                    <div className="input-field">
                        <input name="name" autoComplete="off" id="name" type="text" placeholder={employee.name} value={name ? name : ''} onChange={this.handleInputChange} />
                        <label htmlFor="name" className="active">Employee Name</label>
                    </div>
                    <div className="input-field">
                        <input name="position" autoComplete="off" id="position" type="text" placeholder={employee.position} value={position ? position : ''} onChange={this.handleInputChange} />
                        <label htmlFor="position" className="active">Position</label>
                    </div>
                    <div className="input-field">
                        <input name="office" autoComplete="off" id="office" type="text" placeholder={employee.office} value={office} onChange={this.handleInputChange} />
                        <label htmlFor="office" className="active">Office</label>
                    </div>
                    <div className="input-field">
                        <input name="extn" autoComplete="off" id="extn" type="text" placeholder={employee.extn} value={extn} onChange={this.handleInputChange} />
                        <label htmlFor="extn" className="active">Extn</label>
                    </div>
                    <div className="input-field">
                        <input name="start" autoComplete="off" id="start" type="text" placeholder={employee.start_date} value={start} onChange={this.handleInputChange} />
                        <label htmlFor="start" className="active">Start Date</label>
                    </div>
                    <div className="input-field">
                        <input name="salary" autoComplete="off" id="salary" type="text" placeholder={employee.salary} value={salary} onChange={this.handleInputChange} />
                        <label htmlFor="salary" className="active">Salary</label>
                    </div>
                    <div className="right button-container">
                        <button className="btn green waves-effect waves-light modal-close">Update Employee
                    <i className="material-icons right">send</i></button>
                        <a className="btn red waves-effect waves-light modal-close">Cancel
                    <i className="material-icons right">cancel</i></a>
                    </div>
                </form>
            );
        } else {
            return (<h1 className="center loading-icon">LOADING</h1>)
        }

    };
}

export default UpdateEmployee;