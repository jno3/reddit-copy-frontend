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
        logged = true;
    }
    useEffect(() => {
        const loadData = async () => {
            const temp = await baseGetRequest(url, token, type);
            setData(temp.data);
        }
        loadData();
    }, [url, token, type])

    const handleCommentChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCommentData(values => ({ ...values, [name]: value }));
    }

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const url = `${baseURL}/user/post/${id}/`
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

    return (
        <Card style={{ width: "40rem" }}>
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
                                <Button variant="primary" type="submit" onClick={handleCommentSubmit}>
                                    Comment
                                </Button>
                            </Form>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {
                            data.id &&
                            data.commentList.map(
                                comment => {
                                    return (
                                        <Card key={comment.id}>
                                            <Card.Body>
                                                <CommentTemplate data={comment} />
                                                {
                                                    logged &&
                                                    data.id &&
                                                    <UpvoteDownvoteHandler post={comment} request={logged} />
                                                }
                                            </Card.Body>
                                        </Card>
                                        // <div key={comment.id}>
                                        //     <h5>{comment.commentBody}</h5>
                                        //     <Link to={`/user/${comment.creatorId}`}>
                                        //         {comment.creatorUsername}
                                        //     </Link>
                                        //     --
                                        //     <Link to={`/comment/${comment.id}`}>
                                        //         Expand({comment.subCommentNumber})
                                        //     </Link>
                                        // </div>
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