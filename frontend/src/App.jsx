import React from "react";
import Form from "./components/Form.jsx";
import DisplayTables from "./components/DisplayTables.jsx"
import Header from "./components/Header.jsx";

function App() {
    return (
            <div>
                <Header />
                <div>
                    <main className="flex-1 p-6">                   
                        <Form />
                    </main>
                    <DisplayTables />
                </div>
            </div>
    );
}

export default App;
