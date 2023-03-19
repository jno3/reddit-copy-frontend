import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseGetRequest, baseURL } from "./ApiRequests";

const User = () => {
    const [data, setData] = useState();
    const { id } = useParams();
    const url = `${baseURL}/general/user/${id}/`;
    const token = localStorage.getItem("jwt");
    const type = "u";
    useEffect(() => {
        const loadData = async () => {
            const temp = await baseGetRequest(url, token, type);
            setData(temp.data);
        }
        loadData();
    }, [url, token, type]);
    return (
        <>
            {
                data &&
                data.postList.map(
                    post => {
                        return (
                            <div key={post.id}>
                                {
                                    post.postType === "COMMENT" &&
                                    <Link to={`/comment/${post.id}`}>
                                    <h5>
                                        {post.content}
                                    </h5>
                                    </Link>
                                }
                                {
                                    post.postType === "TOPIC" &&
                                    <h3>
                                        <Link to={`/topic/${post.id}`}>
                                            {post.content}
                                        </Link>
                                    </h3>
                                }
                            </div>
                        )
                    }
                )
            }
        </>
    )
}

export default User;