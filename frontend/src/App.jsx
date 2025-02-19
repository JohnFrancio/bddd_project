import React from "react";
import Form from "./components/Form.jsx";
import DisplayTables from "./components/DisplayTables.jsx"
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <>
            <Header />
            <div>
                {/* <Navbar /> */}
                <main className="flex-1 p-6">
                    <Form />
                </main>
                <DisplayTables />
            </div>
        </>
    );
}

export default App;
