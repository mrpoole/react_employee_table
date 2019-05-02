import React, { Component } from 'react';
import EmployeeRow from './employee_row';


class EmployeeTable extends Component {
    render() {
        const { col = 's12', list } = this.props;

        const employeeElements = list.map((employee) => {
            return (<EmployeeRow key={employee.id} {...employee} delete={this.props.delete}/>);
        });

        return (
            <div className={`col ${col}`}>
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
        )
    }
}

export default EmployeeTable;