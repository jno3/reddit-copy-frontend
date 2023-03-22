import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseURL, basePostRequest } from "./ApiRequests";
const CreateSub = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${baseURL}/user/sub/`;
        const type = "a";
        const temp = await basePostRequest(url, inputs, token, type);
        if (temp.status === 500) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
            localStorage.removeItem("id");
            alert("session expired")
            navigate("/");
        } else {
            console.log(temp.data.id);
            navigate(`/sub/${temp.data.id}`);
        }
    }

    return (
        <div className="general">
            <Card style={{ width: "38rem", marginTop: "1rem" }}>
                <Card.Body>
                    <Card.Title>Create new sub</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicText1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the sub's name."
                                name="name"
                                value={inputs.name || ""}
                                onChange={handleChange}
                                required
                                minLength={8}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                placeholder="Enter the sub's description."
                                name="description"
                                value={inputs.description || ""}
                                onChange={handleChange}
                                required
                                minLength={8}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CreateSub;