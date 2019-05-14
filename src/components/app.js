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
        errorText: false
    }

    getTotalNumberOfEmployees = async () => {
        await axios.get('/api/get-employee-total.php').then((resp) => {
            this.setState({
                high: resp.data['COUNT(*)']
            });
        })
    }

    checkIfButtonEnabled() {
        if (this.state.offset >= 4 && this.state.nextClicked === false) {
            this.setState({
                backButton: 'enabled'
            });
        }
        if (this.state.offset <= 4 && this.state.nextClicked === true) {
            this.setState({
                offset: 5,
                backButton: 'disabled',
            })
        }
        if ((this.state.low + 4) >= this.state.high) {
            this.setState({
                nextButton: 'disabled',
                low: (parseInt(this.state.high) + 1) - this.state.high % 5
            });
        }
        if (((this.state.low + 4) >= this.state.high) && this.state.high%5 === 0) {
            console.log('got it');
            this.setState({
                low: this.state.low -=5,
                pffset: this.state.offset
            });
            console.log('got it', this.state.offset, this.state.low);
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
            console.log('next',this.state.offset, this.state.low);
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
            console.log(this.state.offset, this.state.low);
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
            if(resp.data.error){
                this.setState({
                    errorText: true
                })
            }
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

    getLast = async () => {
        if(this.state.high%5 === 0){
            let offsetNum = this.state.high;
            await axios.get('/api/list-next-ten.php', {
                params: {
                    offset: offsetNum - 5
                }
            }).then((resp) => {
                this.setState({
                    employees: resp.data.employee_list,
                    offset: offsetNum,
                    low: (parseInt(this.state.high)) - 4,
                    backButton: 'enabled',
                    nextButton: 'disabled'
                });
                console.log(this.state.offset, this.state.low);
            });
        } else {
            let offsetNum = (parseInt(this.state.high)) - this.state.high % 5;
            await axios.get('/api/list-next-ten.php', {
                params: {
                    offset: offsetNum
                }
            }).then((resp) => {
                this.setState({
                    employees: resp.data.employee_list,
                    offset: (parseInt(this.state.high)) - (this.state.high%5) +5,
                    low: (parseInt(this.state.high) + 1) - 4,
                    backButton: 'enabled',
                    nextButton: 'disabled'
                });
                console.log(this.state.offset, this.state.low);
            });
        }
        
    };

    render() {
        return (
            <div>
                <h1 className="center header-title">React Employee Table</h1>

                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row table-container">
                    <EmployeeTable getLast={this.getLast} getAll={this.getEmployeeData} low={this.state.low} high={this.state.high} buttonState={this.state.backButton} nextButtonState={this.state.nextButton} list={this.state.employees} delete={this.deleteEmployee} get={this.getEmployee} next={this.listNextTen} previous={this.listPreviousTen} getAll={this.getEmployeeData} />
                    <AddEmployee col="s12 m3" add={this.addEmployee} error={this.state.errorText} />
                    <Modal employee={this.state.employeeToEdit} edit={this.editEmployee} />
                </div>
            </div>
        );
    }
}

export default App;
