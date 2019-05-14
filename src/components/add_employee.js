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

    handleSubmitBtn = event => {
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

    handleCancel = () => {
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
        const { error } = this.props

        return (
            <div className="form-wrapper">
            <form onSubmit={this.handleSubmit} className="col s12 m3">
                <div className="input-field">
                    <input name="name" autoComplete="off" id="name" type="text" value={name} onChange={this.handleInputChange} />
                    <label htmlFor="name"><i className="material-icons left">person</i>Employee Name</label>
                </div>
                <div className="input-field">
                    <input name="position" autoComplete="off" id="position" type="text" value={position} onChange={this.handleInputChange} />
                    <label htmlFor="position"><i className="material-icons left">assignment</i>Position</label>
                </div>
                <div className="input-field">
                    <input name="office" autoComplete="off" id="office" type="text" value={office} onChange={this.handleInputChange} />
                    <label htmlFor="office"><i className="material-icons left">business</i>Office</label>
                </div>
                <div className="input-field">
                    <input name="extn" autoComplete="off" id="extn" type="text" value={extn} onChange={this.handleInputChange} />
                    <label htmlFor="extn"><i className="material-icons left">call</i>Extn</label>
                </div>
                <div className="input-field">
                    <input name="start" autoComplete="off" id="start" type="text" value={start} onChange={this.handleInputChange} />
                    <label htmlFor="start"><i className="material-icons left">date_range</i>Start Date</label>
                </div>
                <div className="input-field">
                    <input name="salary" autoComplete="off" id="salary" type="text" value={salary} onChange={this.handleInputChange} />
                    <label htmlFor="salary"><i className="material-icons left">attach_money
</i>Salary</label>
                </div>
                {/* <span className="error-text">{!error ? `` : `Error: Please fill out all input fields`}</span> */}
                <button onClick={this.handleSubmitBtn} className="btn green waves-effect waves-light col s5 offset-s1 add-button">Add
                <i className="material-icons right">send</i></button>
                <button onClick={this.handleCancel} className="btn red waves-effect waves-light col s5 add-button">Cancel
                <i className="material-icons right">cancel</i></button>
            </form>
            </div>
        );
    };
}

export default AddEmployee;