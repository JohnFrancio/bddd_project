import React from "react";
import Form from "./components/Form.jsx";
<<<<<<< HEAD
import DisplayTables from "./components/DisplayTables.jsx"

function App() {
    return (
        <div>
            <h1>React + Django</h1>
            <Form />
            <DisplayTables />
        </div>
=======
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
function App() {
    return (
        <>
            <Header />
            <div>
                {/* <Navbar /> */}
                <main class="flex-1 p-6">                   
                    <Form />
                </main>
            </div>
        </>
>>>>>>> 1eefccec801d29230822dc214e85cd84b0b52b71
    );
}

export default App;
