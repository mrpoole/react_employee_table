import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import EmployeeTable from './employee_table';
import AddEmployee from './add_employee';
import '../assets/css/app.scss';
import React, { Component } from 'react';
import axios from 'axios';
import Modal from './modal';

class App extends Component {

    state = {
        employees: [],
        error: '',
        employeeToEdit: null
    }

    editEmployee = async (employee) => {
        console.log('edit called', employee.id);
        await axios.get('/api/edit-employee.php', {
            params: {
                id: `${employee.id}`,
                name: `${employee.name}`,
                position: `${employee.position}`,
                office: `${employee.office}`,
                extn: `${employee.extn}`,
                start: `${employee.start}`,
                salary: `${employee.salary}`
            }
        }).then((resp) => { console.log(resp)});

        this.getEmployeeData();
    }

    getEmployee = async (id) => {
        await axios.get('/api/get-employee.php', {
            params: {
                id: `${id}`
            }
        }).then((resp) => { this.setState({
            employeeToEdit: resp.data
        })});

        this.getEmployeeData();
    }

    addEmployee = async (employee) => {
        await axios.get('/api/add-employee-to-db.php', {
            params: {
                name: `${employee.name}`,
                position: `${employee.position}`,
                office: `${employee.office}`,
                extn: `${employee.extn}`,
                start: `${employee.start}`,
                salary: `${employee.salary}`
            }
        }).then((resp) => { console.log(resp) });

        this.getEmployeeData();
    }

    deleteEmployee = async (id) => {
        await axios.get('/api/delete-employee.php', {
            params: {
                id: `${id}`
            }
        }).then((resp) => { console.log(resp) });

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
                <div className="row table-container">
                    <EmployeeTable list={this.state.employees} delete={this.deleteEmployee} get={this.getEmployee}/>
                    <AddEmployee col="s12 m3" add={this.addEmployee} />
                    <Modal employee={this.state.employeeToEdit} edit={this.editEmployee}/>
                </div>
            </div>
        );
    }
}

export default App;
