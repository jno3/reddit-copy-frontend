import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { baseURL, basePostRequest } from "./ApiRequests";
const Login = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = baseURL + "/authentication/login/";
        const token = null;
        const type = "u";
        basePostRequest(url, inputs, token, type).then(
            response => {
                if (response.status === 200) {
                    localStorage.setItem("jwt", response.data.token);
                    localStorage.setItem("username", response.data.username)
                    navigate("/");
                } else {
                    alert(response.data.message);
                }
            }
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={inputs.username || ""}
                        onChange={handleChange}
                        required
                        minLength={8}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                        required
                        minLength={8}
                    />
                </label>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login;