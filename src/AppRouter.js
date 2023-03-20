import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import AllSubs from "./AllSubs";
import Home from "./Home";
import CreateSub from "./CreateSub";
import Sub from "./Sub";
import CreateTopic from "./CreateTopic";
import Topic from "./Topic";
import User from "./User";
import Following from "./Following";

const AppRouter = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<Home />} />
                        <Route path="allsubs" element={<AllSubs />} />
                        <Route path="sub/:id" element={<Sub />} />
                        <Route path="createsub" element={<CreateSub />} />
                        <Route path="createtopic/:id" element={<CreateTopic />} />
                        <Route path="topic/:id" element={<Topic />} />
                        <Route path="user/:id" element={<User />} />
                        <Route path="following" element={<Following />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter;