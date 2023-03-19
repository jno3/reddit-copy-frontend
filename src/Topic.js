import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseGetRequest, basePostRequest, baseURL } from "./ApiRequests";

const Topic = () => {
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

    const handleCommentSubmit = () => {
        const commentURL = `${baseURL}/user/post/${id}/`
        type = "a";
        basePostRequest(commentURL, commentData, token, type);
    }

    return (
        <div>
            {
                data.id &&
                <div>
                    <h1>{data.title}</h1>
                    <h3>{data.body}</h3>
                    <Link to={`/user/${data.creatorId}`}>{data.creatorUsername}</Link>
                </div>
            }
            {
                logged &&
                <div id="ta-comment">
                    <textarea onChange={handleCommentChange}
                        name="body"
                    />
                    <button onClick={handleCommentSubmit}>
                        comment
                    </button>
                </div>
            }
            {
                data.id && 
                data.commentList.map(
                    comment => {
                        return(
                            <div key={comment.id}>
                                <h5>{comment.commentBody}</h5>
                                <Link to={`/user/${comment.creatorId}`}>
                                    {comment.creatorUsername}
                                </Link>
                                --
                                <Link to={`/comment/${comment.id}`}>
                                    Expand({comment.subCommentNumber})
                                </Link>
                            </div>
                        )
                    }
                )
            }
        </div>
    )

}

export default Topic;