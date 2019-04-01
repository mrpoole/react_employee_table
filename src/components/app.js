import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import StudentTable from './student_table';
import AddStudent from './add_student';
import '../assets/css/app.scss';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

    state = {
        students: [],
        error: ''
    }

    addStudent = async (student) => {
        await axios.post('api/grades', student);

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
        try {
            const resp = await axios.get('/api/grades');

            this.setState({
                students: resp.data.data
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
                <h1 className="center">React SGT</h1>

                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row">
                    <StudentTable col="s12 m8" list={this.state.students} delete={this.deleteStudent} />
                    <AddStudent col="s12 m4" add={this.addStudent} />
                </div>
            </div>
        );
    }
}

export default App;
