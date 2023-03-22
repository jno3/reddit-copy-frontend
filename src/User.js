import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseGetRequest, baseURL } from "./ApiRequests";
import { CommentTemplate, TopicTemplate, UpvoteDownvoteHandler } from "./Templates";

const User = () => {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const { id } = useParams();
    const url = `${baseURL}/general/user/${id}/`;
    const token = localStorage.getItem("jwt");
    var type = "u";
    if (token !== null) {
        type = "a";
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
            } else {
                setData(temp.data);
            }
        }
        loadData();
    }, [url, token, type, navigate]);
    return (
        <div className="general" style={{ marginTop: ".5rem" }}>
            {
                data &&
                <div>
                    <h2>
                        {data.username}'s profile
                    </h2>
                </div>
            }
            {
                data &&
                data.postList.map(
                    post => {
                        var pst = {
                            "id": post.id,
                            "topicTitle": post.content,
                            "creatorUsername": data.username,
                            "creatorId": id
                        }
                        var sub = {
                            "id": post.subId,
                            "name": post.subName
                        }
                        var request = localStorage.getItem("jwt") !== null;
                        if (post.postType === "TOPIC") {
                            return (
                                <Card key={post.id} style={{ width: "40rem", paddingBottom: "2rem" }}>
                                    <Card.Body>
                                        <Card.Subtitle>
                                            post
                                        </Card.Subtitle>
                                        <TopicTemplate post={pst} sub={sub} request={request} />
                                    </Card.Body>
                                </Card>
                            )
                        } else {
                            var dta = {
                                "commentBody": post.content,
                                "subId": post.subId,
                                "subName": post.subName,
                                "creatorUsername": data.username,
                                "creatorId": id
                            }
                            return (
                                <Card key={post.id} style={{ width: "40rem" }}>
                                    <Card.Body>
                                        <Card.Subtitle>
                                            {
                                                post.postOnType === "TOPIC" &&
                                                <>
                                                    reply to post <Link to={`/topic/${post.postOnId}`}>
                                                        "{post.postOnContent}"
                                                    </Link>
                                                </>
                                            } {
                                                post.postOnType === "COMMENT" &&
                                                <>
                                                    reply to comment <Link to={`/comment/${post.postOnId}`}>
                                                        "{post.postOnContent}"
                                                    </Link>
                                                </>
                                            }
                                        </Card.Subtitle>
                                        <CommentTemplate data={dta} />
                                        <UpvoteDownvoteHandler post={pst} request={request} />
                                    </Card.Body>
                                </Card>
                            )
                        }
                    }
                )
            }
        </div>
    )
}

export default User;