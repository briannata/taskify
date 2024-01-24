import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {

  return (
    <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path=":username" element={<Dashboard />} />
                <Route
                    path="/register"
                    element={<Register />}
                />
            </Routes>
        </Router>
  );
}

export default App;
