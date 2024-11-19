import { useState, useEffect } from "react";
import axios from "axios";

const AddTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({ name: "", email: "" });
    const [teacherBtn, setTeacherBtn] = useState("Add Teacher");
    const BASE_URL = "http://localhost:3000/api";
    const getTeachers = `${BASE_URL}/teachers`;
    const postTeacher = `${BASE_URL}/addTeacher`;

    // Fetch teachers function
    const fetchTeachers = async () => {
        try {
            const response = await axios.get(getTeachers);
            setTeachers(response.data.reverse());
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    // Fetch teachers on component mount
    useEffect(() => {
        fetchTeachers();
    }, []);

    // Add teacher to database
    const handleAddTeacher = async (e) => {
        e.preventDefault();
        try {
            const emailExists = teachers.some((teacher) => teacher.email === newTeacher.email);
            if (emailExists) {
                alert("Email already exists. Please use a different email.");
            } else if (newTeacher.name && newTeacher.email) {
                const response = await axios.post(postTeacher, newTeacher);
                setTeachers([response.data, ...teachers]);
                setNewTeacher({ name: "", email: "" });
            } else {
                alert("Please fill in all fields");
            }
        } catch (error) {
            console.error("Error adding teacher:", error);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher((prevTeacher) => ({ ...prevTeacher, [name]: value }));
    };

    // Delete teacher from database
    const handleDeleteTeacher = async (id) => {
        const deleteTeacherURL = `${BASE_URL}/teachers/${id}`;
        try {
            await axios.delete(deleteTeacherURL);
            fetchTeachers();
        } catch (error) {
            console.error("Error deleting teacher:", error.message);
        }
    };

    return (
        <div>
            <div className="container">
                <h1>MERN Stack Project (CRUD) - Manage Teachers</h1>
                <form onSubmit={handleAddTeacher}>
                    <input
                        type="text"
                        placeholder="Enter the name"
                        autoComplete="off"
                        name="name"
                        value={newTeacher.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        placeholder="Enter the email"
                        autoComplete="off"
                        name="email"
                        value={newTeacher.email}
                        onChange={handleInputChange}
                    />
                    <button>{teacherBtn}</button>
                </form>
            </div>
            <div className="container">
                <header className="header1">
                    <h3>Manage Teachers</h3>
                </header>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers &&
                                teachers.map((teacher, key) => (
                                    <tr key={key}>
                                        <td>{teacher._id}</td>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.email}</td>
                                        <td>
                                            <button
                                                className="delete_btn action-btn"
                                                onClick={() => handleDeleteTeacher(teacher._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddTeacher;
