import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";

const AppRouter = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter;