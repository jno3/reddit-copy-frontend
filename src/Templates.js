import { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFileArrowDownFill, BsFileArrowUpFill } from "react-icons/bs";
import { baseGetRequest, basePatchRequest, basePostRequest, baseURL } from "./ApiRequests";

export const UserHome = ({ data }) => {
    const [status, setStatus] = useState();
    const post = data.topicList[0];
    var url = `${baseURL}/user/postinfo/${post.id}/`;
    const token = localStorage.getItem("jwt");
    const type = "a";
    const v1 = useRef("dark");
    const v2 = useRef("dark");
    useEffect(() => {
        const loadData = async () => {
            const temp = await baseGetRequest(url, token, type);
            if (temp.status !== 500) {
                setStatus(temp.data);
                if (temp.data === 1) {
                    v1.current = "success";
                    v2.current = "dark";
                } else if (temp.data === -1) {
                    v1.current = "dark";
                    v2.current = "danger";
                }
            }
        }
        loadData();
    }, [url, token, type]);

    const handleDownvote = async () => {
        url = `${baseURL}/user/post/downvote/${post.id}/`;
        const temp = await basePostRequest(url, null, token, type);
        if (temp.status !== 500) {
            if (v2.current === "danger") {
                v2.current = "dark";
                v1.current = "dark";
                document.getElementById(`post-btn-2${post.id}`).setAttribute("class", `btn btn-${v2.current}`);
                document.getElementById(`post-btn-1${post.id}`).setAttribute("class", `btn btn-${v1.current}`);
            } else {
                v2.current = "danger";
                v1.current = "dark";
                document.getElementById(`post-btn-2${post.id}`).setAttribute("class", `btn btn-${v2.current}`);
                document.getElementById(`post-btn-1${post.id}`).setAttribute("class", `btn btn-${v1.current}`);
            }
        }
    }
    const handleUpvote = async() => {
        url = `${baseURL}/user/post/upvote/${post.id}/`;
        const temp = await basePostRequest(url, null, token, type);
        if (temp.status !== 500) {
            if (v1.current === "success") {
                v1.current = "dark";
                v2.current = "dark";
                document.getElementById(`post-btn-1${post.id}`).setAttribute("class", `btn btn-${v1.current}`);
                document.getElementById(`post-btn-2${post.id}`).setAttribute("class", `btn btn-${v2.current}`);
            } else {
                v1.current = "success";
                v2.current = "dark";
                document.getElementById(`post-btn-1${post.id}`).setAttribute("class", `btn btn-${v1.current}`);
                document.getElementById(`post-btn-2${post.id}`).setAttribute("class", `btn btn-${v2.current}`);
            }
        }else{
            alert("Session expired!");
        }
    }

    return (
        <Card style={{ width: "38rem", marginTop: "1rem" }}>
            <Card.Body>
                <Card.Title>
                    {post.topicTitle}
                </Card.Title>
                <Card.Subtitle>
                    On <Link to={`/sub/${data.id}`}>
                        {data.name}
                    </Link> by <Link to={`/user/${post.creatorId}`}>
                        {post.creatorUsername}
                    </Link>
                    <Card.Text>
                    </Card.Text>
                    <Button variant="primary" href={`/topic/${post.id}`}>
                        Expand
                    </Button>
                    <div style={{ marginTop: ".4rem" }}>
                        {
                            status !== undefined &&
                            <>
                                <Button variant={`${v1.current}`} onClick={handleUpvote} id={`post-btn-1${post.id}`}>
                                    <BsFileArrowUpFill />
                                </Button>
                                <Button variant={`${v2.current}`} onClick={handleDownvote} id={`post-btn-2${post.id}`}>
                                    <BsFileArrowDownFill />
                                </Button>
                            </>
                        }
                    </div>
                </Card.Subtitle>
            </Card.Body>
        </Card>
    )
}