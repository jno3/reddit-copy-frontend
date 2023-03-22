import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseURL, basePostRequest } from "./ApiRequests";
const CreateTopic = () => {
    const { id } = useParams();
    const [inputs, setInputs] = useState({});
    const token = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${baseURL}/user/sub/${id}/`;
        const type = "a";
        const temp = await basePostRequest(url, inputs, token, type);
        if (temp.status === 500) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
            localStorage.removeItem("id");
            alert("session expired")
            navigate("/");
        } else {
            navigate(`/sub/${id}`);
        }
    }

    return (
        <div className="general">
            <Card style={{ width: "38rem", marginTop: "1rem" }}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title."
                                name="title"
                                value={inputs.title || ""}
                                onChange={handleChange}
                                required
                                minLength={8}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                placeholder="Body."
                                name="body"
                                value={inputs.body || ""}
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

export default CreateTopic;