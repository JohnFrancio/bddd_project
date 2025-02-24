import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./components/Home.jsx";
import Insert from "./components/Insert.jsx";
import List from "./components/List.jsx";

function App() {
    return (
        <Router>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 lg:pl-64 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="insert" element={<Insert />} />
                        <Route path="list" element={<List />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;