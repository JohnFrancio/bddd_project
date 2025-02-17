import React from "react";
import Form from "./components/Form.jsx";
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
    );
}

export default App;
