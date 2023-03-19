import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL, basePostRequest } from "./ApiRequests";
const CreateTopic = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const {id} = useParams();
    const url = `${baseURL}/user/sub/${id}/`;
    const token = localStorage.getItem("jwt");
    const type = "a";
    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await basePostRequest(url, inputs, token, type);
        navigate(`/topic/${response.data.id}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                        required
                        minLength={8}
                    />
                </label>
                <label>
                    Body:
                    <textarea
                        type="password"
                        name="body"
                        value={inputs.body || ""}
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

export default CreateTopic;