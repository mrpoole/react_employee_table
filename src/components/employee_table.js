import React, { Component } from 'react';
import EmployeeRow from './employee_row';
import '../assets/css/app.scss';
import axios from 'axios';


class EmployeeTable extends Component {
    render() {
        const { list, next, previous, buttonState, nextButtonState, low, high, getAll, getLast } = this.props;

        const employeeElements = list.map((employee) => {
            return (<EmployeeRow key={employee.id} {...employee} delete={this.props.delete} get={this.props.get} />);
        });

        return (
            <div className="col s14 m9 employee-container">
                <div className="employee-table-container">
                    <table className="highlight">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Extn.</th>
                                <th>Start Date</th>
                                <th>Salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeElements}
                        </tbody>
                    </table>
                </div>
                <div className="next-buttons center">
                    <button onClick={getAll} className={`btn blue`}>
                        <i className="material-icons center">fast_rewind</i></button>
                    <button onClick={previous} className={`btn blue ${buttonState}`}>
                        <i className="material-icons center">navigate_before</i></button>
                    <div className="range">{low} - {high}</div>
                    <button onClick={next} className={`btn green ${nextButtonState}`}>
                        <i className="material-icons center">navigate_next</i></button>
                        <button onClick={getLast} className={`btn blue`}>
                        <i className="material-icons center">fast_forward</i></button>
                </div>
            </div>
        )
    }
}

export default EmployeeTable;