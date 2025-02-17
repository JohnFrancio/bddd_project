import React from "react";
import Form from "./components/Form.jsx";
import DisplayTables from "./components/DisplayTables.jsx"
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <div>
            <h1>React + Django</h1>
            <main class="flex-1 p-6">                   
                    <Form />
                </main>
            <DisplayTables />
        </div>
    );
}

export default App;
