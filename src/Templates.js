import { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsFileArrowDownFill, BsFileArrowUpFill } from "react-icons/bs";
import { baseGetRequest, basePostRequest, baseURL } from "./ApiRequests";

export const UpvoteDownvoteHandler = (props) => {
    const [status, setStatus] = useState();
    const { post, request } = props;
    var url = `${baseURL}/user/postinfo/${post.id}/`;
    const navigate = useNavigate();
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
            } else {
                localStorage.removeItem("jwt");
                localStorage.removeItem("username");
                localStorage.removeItem("id");
                alert("session expired");
                navigate("/");
            }
        }
        if (request) {
            loadData();
        }
    }, [url, token, type, navigate, request]);

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
    const handleUpvote = async () => {
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
        } else {
            alert("Session expired!");
        }
    }

    return (
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
            {
                Number(localStorage.getItem("id")) === post.creatorId &&
                <>
                    <Button variant="warning">
                        Edit
                    </Button>
                    <Button variant="danger">
                        Delete
                    </Button>
                </>
            }
        </div>
    )
}
export const TopicTemplate = (props) => {
    const { post, sub, request } = props;

    return (
        <Card style={{ width: "38rem", marginTop: "1rem" }}>
            <Card.Body>
                <Card.Title>
                    {post.topicTitle}
                </Card.Title>
                <Card.Subtitle>
                    On <Link to={`/sub/${sub.id}`}>
                        {sub.name}
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
                            <UpvoteDownvoteHandler post={post} sub={sub} request={request} />
                        }
                    </div>
                </Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export const SubTemplate = (props) => {
    const { data } = props;
    const userId = localStorage.getItem("id");
    const navigate = useNavigate();
    const url = `${baseURL}/user/subinfo/${data.id}/`;
    const token = localStorage.getItem("jwt");
    const type = "a";
    useEffect(() => {
        const loadInfo = () => {
            if (userId !== null) {
                const userElement = document.getElementById("user-restricted");
                userElement.style.display = "inline-block";
            }
            if (data.subModList.includes(Number(userId))) {
                const modElements = document.getElementsByClassName("mod-restricted");
                for (const element of modElements) {
                    element.style.display = "inline-block";
                }
            }
        }
        const loadData = async () => {
            const temp = await baseGetRequest(url, token, type);
            if (temp.status !== 500) {
                const subdata = temp.data;
                if (subdata) {
                    const element = document.getElementById("unfollow-button");
                    element.style.display = "inline-block";
                } else {
                    const element = document.getElementById("follow-button");
                    element.style.display = "inline-block";
                }
            } else {
                alert("session expired");
                localStorage.removeItem("jwt");
                localStorage.removeItem("username");
                localStorage.removeItem("id");
                navigate("/");
            }
        }
        loadInfo();
        if (token !== null) {
            loadData();
        }
    }, [userId, data.subModList, token, url, navigate])

    const handleFUClick = async () => {
        const url = `${baseURL}/user/sub/follow-unfollow/${data.id}/`;
        const temp = await basePostRequest(url, null, token, type);
        if (temp.status === 500) {
            alert("session expired");
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
            localStorage.removeItem("id");
        }
        navigate(0);
    }
    return (
        <>
            <Card.Title>
                <h1>
                    {data.name}
                </h1>
            </Card.Title>
            <Card.Text>
                {data.description}
            </Card.Text>
            <Button variant="primary" id="user-restricted" style={{ display: "none" }}
                href={`/createtopic/${data.id}`}
            >
                New topic
            </Button>
            <Button variant="warning" className="mod-restricted" style={{ display: "none" }}>
                Edit sub
            </Button>
            <Button variant="danger" className="mod-restricted" style={{ display: "none" }}>
                Delete sub
            </Button>
            <Button variant="success" id="follow-button" style={{ display: "none" }}
                onClick={handleFUClick}
            >
                Follow
            </Button>
            <Button variant="danger" id="unfollow-button" style={{ display: "none" }}
                onClick={handleFUClick}
            >
                Unfollow
            </Button>
        </>
    )
}

export const CommentTemplate = (props) => {
    const { data } = props;
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Text>
                        {
                            data.commentBody
                        }
                    </Card.Text>
                    <Card.Text>
                        by {
                            <Link to={`/user/${data.creatorId}`}>
                                {data.creatorUsername}
                            </Link>
                        } on {
                            <Link to={`/sub/${data.subId}`}>
                                {data.subName}
                            </Link>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export const SubListTemplate = (props) => {
    const { sub } = props;
    const navigate = useNavigate();
    const url = `${baseURL}/user/subinfo/${sub.id}/`;
    const token = localStorage.getItem("jwt");
    const type = "a";
    const [status, setStatus] = useState();
    useEffect(() => {
        const loadStatus = async () => {
            const temp = await baseGetRequest(url, token, type);
            if (temp.status !== 500) {
                setStatus(temp.data);
            } else {
                localStorage.removeItem("jwt");
                localStorage.removeItem("username");
                localStorage.removeItem("id");
                alert("session expired");
                navigate("/");
            }
        }
        if (token !== null) {
            loadStatus();
        }
    }, [url, token, type, navigate])
    
    const handleFUClick = async () => {
        const url = `${baseURL}/user/sub/follow-unfollow/${sub.id}/`;
        const temp = await basePostRequest(url, null, token, type);
        if (temp.status === 500) {
            alert("session expired");
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
            localStorage.removeItem("id");
        }
        navigate(0);
    }

    return (
        status !== null &&
        <>
            <Link to={`/sub/${sub.id}`}>
                {sub.subName}
            </Link> - {sub.subDescription}
            {
                status !== true &&
                <Button variant="success" style={{ float: "right" }} onClick={handleFUClick}>
                    Follow
                </Button>
            }
            {
                status !== false &&
                <Button variant="danger" style={{ float: "right" }} onClick={handleFUClick}>
                    Unfollow
                </Button>
            }
        </>
    )
}