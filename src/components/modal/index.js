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
        console.log('from modal',this.props);
        return (
            <div className="modal-container">

                <div ref={Modal => { this.Modal = Modal }} id="modal1" className="modal">
                    <div className="modal-content">
                        <h6>Are you sure you want to edit this employee?</h6>
                        <UpdateEmployee/>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </div>

        );
    }
}

export default Modal;