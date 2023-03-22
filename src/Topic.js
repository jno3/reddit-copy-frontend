import { useEffect, useState } from "react";
import { Card, ListGroup, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseGetRequest, basePostRequest, baseURL } from "./ApiRequests";
import { CommentTemplate, UpvoteDownvoteHandler } from "./Templates";

const Topic = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [commentData, setCommentData] = useState({});
    const { id } = useParams();
    const url = `${baseURL}/general/topic/${id}/`;
    const token = localStorage.getItem("jwt");
    var type = "u";
    var logged = false;
    if (token != null) {
        type = "a";
        logged = true;
    }
    useEffect(() => {
        const loadData = async () => {
            const temp = await baseGetRequest(url, token, type);
            if (temp.status === 500) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("username");
                localStorage.removeItem("id");
                alert("session expired")
                navigate("/");
            }else{
                setData(temp.data);
            }
        }
        loadData();
    }, [url, token, type, navigate])

    const handleCommentChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCommentData(values => ({ ...values, [name]: value }));
    }

    const handleCommentSubmit = async (event, _id) => {
        event.preventDefault();
        const url = `${baseURL}/user/post/${_id}/`
        const type = "a";
        const temp = await basePostRequest(url, commentData, token, type);
        if (temp.status === 500) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
            localStorage.removeItem("id");
            alert("session expired");
            navigate("/");
        } else {
            navigate(0);
        }
    }

    const handleUnderComment = (index, isOpen) => {
        const element = document.getElementById(`expand-comm-${index}`);
        if (isOpen) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    }

    return (
        <Card style={{ width: "40rem" }} className="general">
            <Card.Body>
                {
                    data.id &&
                    <>
                        <Card.Title>
                            <h2>
                                {data.title}
                            </h2>
                        </Card.Title>
                        <Card.Subtitle>
                            by <Link to={`/user/${data.creatorId}`}>
                                {data.creatorUsername}
                            </Link> on <Link to={`/sub/${data.subId}`}>
                                {data.subName}
                            </Link>
                        </Card.Subtitle>
                        <Card.Text>
                            {data.body}
                        </Card.Text>
                    </>
                }
                {
                    logged &&
                    data.id &&
                    <UpvoteDownvoteHandler post={data} request={logged} />
                }
                <ListGroup className="list-group-flush">
                    <ListGroup.Item />
                    <ListGroup.Item>
                        {
                            logged &&
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Add a comment..."
                                        name="body"
                                        onChange={handleCommentChange}
                                        required
                                        minLength={8}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={(event) => handleCommentSubmit(event, data.id)}>
                                    Comment
                                </Button>
                            </Form>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {
                            data.id &&
                            data.commentList.map(
                                (comment, index) => {
                                    return (
                                        <Card key={comment.id}>
                                            <Card.Body>
                                                <CommentTemplate data={comment} />
                                                {
                                                    logged &&
                                                    data.id &&
                                                    <>
                                                        <UpvoteDownvoteHandler post={comment} request={logged} />
                                                        <div style={{ float: "right" }}>
                                                            <Button onClick={() => handleUnderComment(index, false)}>
                                                                Comment
                                                            </Button>
                                                            <Button href={`/comment/${comment.id}`}>
                                                                Expand ({comment.subCommentNumber})
                                                            </Button>
                                                        </div>
                                                        <div style={{ marginTop: "3rem", display: "none" }} id={`expand-comm-${index}`}>
                                                            <Form>
                                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        placeholder="Add a comment..."
                                                                        name="body"
                                                                        onChange={handleCommentChange}
                                                                        required
                                                                        minLength={8}
                                                                    />
                                                                </Form.Group>
                                                                <Button variant="primary" type="submit" onClick={(event) => handleCommentSubmit(event, comment.id)}>
                                                                    Comment
                                                                </Button>
                                                                <Button variant="warning" onClick={() => handleUnderComment(index, true)}>
                                                                    Close
                                                                </Button>
                                                            </Form>
                                                        </div>
                                                    </>
                                                }
                                            </Card.Body>
                                        </Card>
                                    )
                                }
                            )
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )

}

export default Topic;