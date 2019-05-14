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
        employeeToEdit: null,
        offset: 5,
        nextClicked: false,
        backButton: 'disabled',
        nextButton: 'enabled',
        low: 1,
        high: null,
    }

    getTotalNumberOfEmployees = async () => {
        await axios.get('/api/get-employee-total.php').then((resp) => {
            this.setState({
                high: resp.data['COUNT(*)']
            });
        })
    }

    checkIfButtonEnabled() {
        if (this.state.offset >= 5 && this.state.nextClicked === false) {
            this.setState({
                backButton: 'enabled'
            });
        }
        if (this.state.offset <= 5 && this.state.nextClicked === true) {
            this.setState({
                offset: 5,
                backButton: 'disabled',
            })
        }
        if ((this.state.low + 5) >= this.state.high) {
            this.setState({
                nextButton: 'disabled',
                low: (parseInt(this.state.high) + 1) - this.state.high%5
            });
        }
    }

    listNextTen = async () => {
        await axios.get('/api/list-next-ten.php', {
            params: {
                offset: `${this.state.offset}`
            }
        }).then((resp) => {
            this.setState({
                backButton: 'enabled',
                nextClicked: true,
                employees: resp.data.employee_list,
                offset: this.state.offset += 5,
                low: this.state.low += 5
            });
            this.checkIfButtonEnabled();
        });
    };

    listPreviousTen = async () => {
        const offsetNumber = this.state.offset - 10;
        await axios.get('/api/list-next-ten.php', {
            params: {
                offset: `${offsetNumber}`
            }
        }).then((resp) => {
            this.checkIfButtonEnabled();
            this.setState({
                nextClicked: true,
                employees: resp.data.employee_list,
                offset: this.state.offset -= 5,
                low: this.state.low -= 5,
                nextButton: 'enabled'
            });
            this.checkIfButtonEnabled();
        });
    };

    editEmployee = async (employee) => {
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
        }).then((resp) => {
            console.log(resp);
        });

        this.getEmployeeData();
    }

    getEmployee = async (id) => {
        await axios.get('/api/get-employee.php', {
            params: {
                id: `${id}`
            }
        }).then((resp) => {
            this.setState({
                employeeToEdit: resp.data
            })
        });
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
        }).then((resp) => {
            console.log(resp);
        });
        this.getEmployeeData();
    }

    deleteEmployee = async (id) => {
        await axios.get('/api/delete-employee.php', {
            params: {
                id: `${id}`
            }
        }).then((resp) => {
            console.log(resp);
        });

        this.getEmployeeData();
    }

    componentDidMount() {
        this.getEmployeeData();
    }

    getEmployeeData = async () => {
        try {
            const resp = await axios.get('/api/list-employees-from-db.php');
            this.getTotalNumberOfEmployees();
            this.setState({
                employees: resp.data.employee_list,
                offset: 5,
                nextClicked: false,
                backButton: 'disabled',
                nextButton: 'enabled',
                low: 1,
                high: null
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
                <h1 className="center header-title">React Employee Table</h1>

                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row table-container">
                    <EmployeeTable low={this.state.low} high={this.state.high} buttonState={this.state.backButton} nextButtonState={this.state.nextButton} list={this.state.employees} delete={this.deleteEmployee} get={this.getEmployee} next={this.listNextTen} previous={this.listPreviousTen} getAll={this.getEmployeeData} />
                    <AddEmployee col="s12 m3" add={this.addEmployee} />
                    <Modal employee={this.state.employeeToEdit} edit={this.editEmployee} />
                </div>
            </div>
        );
    }
}

export default App;
