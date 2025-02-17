import React from "react";
import Form from "./components/Form.jsx";
import DisplayTables from "./components/DisplayTables.jsx"
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
<<<<<<< HEAD
        <>
            <Header />
            <div>
                {/* <Navbar /> */}
                <main className="flex-1 p-6">                   
=======
        <div>
            <h1>React + Django</h1>
            <main class="flex-1 p-6">                   
>>>>>>> 5cbb6ba2c256bf08d86c954cf75b8e54a60a5751
                    <Form />
                </main>
            <DisplayTables />
        </div>
    );
}

export default App;
