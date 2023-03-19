import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { baseURL, basePostRequest } from "./ApiRequests";

const Register = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const url = `${baseURL}/authentication/register/`;
    const token = null;
    const type = "u";
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputs._password !== inputs.password && inputs.password !== "") {
            const warn = document.getElementById("pw-alert");
            warn.style.visibility = "visible";

            setTimeout(() => {
                warn.style.visibility = "hidden";
            }, 2000);
        } else {
            delete inputs['_password'];
            const result = await basePostRequest(url, inputs, token, type);
            if(result.status === 200){
                navigate("/");
            }else{
                alert("yuppp an error")
            }
        }
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
                <label>
                    Confirm password:
                    <input
                        type="password"
                        name="_password"
                        value={inputs._password || ""}
                        onChange={handleChange}
                        required
                        minLength={8}
                    />
                </label>
                <input type="submit" />
            </form>
            <div id="pw-alert" style={{ visibility: "hidden" }}>
                Passwords do not match
            </div>
        </div>
    )
}

export default Register;