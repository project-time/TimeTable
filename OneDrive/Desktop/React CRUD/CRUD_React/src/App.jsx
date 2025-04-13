import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClickSpark from './Components/ClickSpark.jsx';


export default function App() {
    const [inputData, setInputData] = useState({ inputBox: "" });
    const [savedData, setSavedData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSubmit = () => {
        if (inputData.inputBox.trim() === "") return;

        if (isEditing) {
            const updated = savedData.map((item, index) =>
                index === editIndex ? inputData : item
            );
            setSavedData(updated);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setSavedData([...savedData, inputData]);
        }

        setInputData({ inputBox: "" });
    };

    const handleDelete = (index) => {
        const filtered = savedData.filter((_, i) => i !== index);
        setSavedData(filtered);
    };

    const handleEdit = (index) => {
        setInputData(savedData[index]);
        setIsEditing(true);
        setEditIndex(index);
    };

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const themeClass = isDarkMode ? "bg-dark text-light" : "bg-light text-dark";
    const cardTheme = isDarkMode ? "bg-secondary text-light" : "bg-white";

    return (
        <ClickSpark>
        <div className={`min-vh-100 ${themeClass}`}>
            <div className="container py-5">

                {/* Header Section */}
                <div className="text-center mb-4 position-relative">
                    <h2 className="fw-bold d-inline-flex align-items-center justify-content-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="logo"
                            style={{ width: 40, marginRight: 10 }}
                        />
                        To-Do List
                    </h2>

                    {/* Theme Switch in top right */}
                    <div className="position-absolute top-0 end-0 mt-2 me-2">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="themeSwitch"
                                checked={isDarkMode}
                                onChange={toggleTheme}
                            />
                            <label className="form-check-label" htmlFor="themeSwitch">
                                {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Input Field */}
                <div className="d-flex justify-content-center mb-4">
                    <input
                        className="form-control me-2 w-50"
                        name="inputBox"
                        type="text"
                        placeholder="Type something..."
                        value={inputData.inputBox}
                        onChange={handleInput}
                    />
                    <button
                        className={`btn ${isEditing ? "btn-success" : "btn-primary"}`}
                        onClick={handleSubmit}
                    >
                        {isEditing ? "Update" : "Add"}
                    </button>
                </div>

                {/* List Items */}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {savedData.length === 0 && (
                            <p className="text-center text-muted">No tasks added yet.</p>
                        )}

                        {savedData.map((data, index) => (
                            <div className={`card mb-3 shadow-sm ${cardTheme}`} key={index}>
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div className="text-break fw-semibold">
                                        {index + 1}. {data.inputBox}
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handleEdit(index)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
        </ClickSpark>
    );
}
