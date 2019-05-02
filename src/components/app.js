import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import EmployeeTable from './employee_table';
import AddEmployee from './add_employee';
import '../assets/css/app.scss';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

    state = {
        employees: [],
        error: ''
    }

    addEmployee = async (employee) => {
        console.log(employee);
        await axios.post('/api/add-employee-to-db.php', {
            name: employee.name,
            position: employee.position,
            office: employee.office,
            extn: employee.extn,
            start: employee.start,
            salary: employee.salary
        });

        this.getEmployeeData();
    }

    deleteEmployee = async (id) => {
        await axios.delete(`/api/grades/${id}`);
        
        this.getEmployeeData();
    }

    componentDidMount() {
        this.getEmployeeData();
    }

    async getEmployeeData() {
        try {
            const resp = await axios.get('/api/list-employees-from-db.php');

            this.setState({
                employees: resp.data.employee_list
            });

        } catch (error) {
            this.setState({
                error: 'Error retrieving data'
            });
        }
    };

    render() {
        return (
            <div>
                <h1 className="center">React Employee Table</h1>

                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row">
                    <EmployeeTable col="s12 m9" list={this.state.employees} delete={this.deleteEmployee} />
                    <AddEmployee col="s12 m3" add={this.addEmployee} />
                </div>
            </div>
        );
    }
}

export default App;
