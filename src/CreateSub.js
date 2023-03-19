import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL, basePostRequest } from "./ApiRequests";

const CreateSub = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = baseURL + "/user/sub/";
        const token = localStorage.getItem("jwt");
        const type = "a";
        basePostRequest(url, inputs, token, type).then(
            response => {
                if (response.status === 200) {
                    const data = response.data;
                    navigate(`/sub/${data.id}`);
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
                    New sub's name:
                    <input
                        type="text"
                        name="name"
                        value={inputs.name || ""}
                        onChange={handleChange}
                        required
                        minLength={8}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={inputs.description || ""}
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

export default CreateSub;