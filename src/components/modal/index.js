import React, { Component } from 'react';
import M from "materialize-css";
import UpdateEmployee from './update_employee';
import "materialize-css/dist/css/materialize.min.css";
import './modal.scss'

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        employee: this.props.employee
    }

    componentDidMount() {
        M.Modal.init(this.Modal);
    }

    render() {
        return (
            <div className="modal-container">

                <div ref={Modal => { this.Modal = Modal }} id="modal" className="modal">
                    <div className="modal-content">
                    <h6 className="right">Please enter the new details for this employee</h6>
                        <UpdateEmployee employee={this.props} edit={this.props.edit}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default Modal;