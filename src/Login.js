import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseURL, basePostRequest } from "./ApiRequests";
const Login = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        const url = `${baseURL}/authentication/login/`
        const token = null;
        const type = "u";
        const temp = await basePostRequest(url, inputs, token, type);
        if(temp.status === 500){
            const warning = document.getElementById("pw-alert");
            warning.style.visibility = "visible";
            setTimeout(() => {
                warning.style.visibility = "hidden";
            }, 3000);
        }else{
            const {data} = temp;
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("id", data.userId);
            navigate("/");
        }
    }

    return (
        <div className="general">
            <Card style={{ width: "38rem", marginTop: "1rem" }}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={inputs.username || ""}
                                onChange={handleChange}
                                required
                                minLength={8}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={inputs.password || ""}
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
                <Card.Footer className="text-muted" style={{visibility: "hidden"}} id="pw-alert">
                    Wrong credentials.
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Login;