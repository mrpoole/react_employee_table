import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, { Component } from 'react';
import axios from 'axios';
import AddStudent from './add_student';
import StudentsTable from './student_table';

class App extends Component {
    state = {
        students: [],
        error: ''
    }

    addStudent = async (student) => {
        await axios.post('/api/grades', student);

        this.getStudentData();
    }

    deleteStudent = async (id) => {
        await axios.delete(`/api/grades/${id}`);

        this.getStudentData();
    }

    componentDidMount() {
        this.getStudentData();
    }

    async getStudentData() {
        // Call server here

        try {
            const resp = await axios.get('/api/grades');

            this.setState({
                students: resp.data.data
            });
        } catch(err){

            this.setState({
                error: 'Error retrieving student data'
            });
        }
        
    }

    render(){
        return (
            <div>
                <h1 className="center">React SGT</h1>

                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row">
                    <StudentsTable col="s12 m8" delete={this.deleteStudent} list={this.state.students}/>
                    <AddStudent col="s12 m4" add={this.addStudent}/>
                </div>
            </div>
        );
    }
}

export default App;