import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseGetRequest, baseURL } from "./ApiRequests";

const Sub = () => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const url = baseURL + "/general/sub/" + id + "/";
    const token = localStorage.getItem("jwt");
    const type = "u";
    useEffect(() => {
        const loadData = async () => {
            const temp = await baseGetRequest(url, token, type);
            setData(temp.data);
        }
        loadData();
    }, [url, token, type])


    return (
        <div>
            {
                data.id &&
                <div>
                    <h1>{data.name}</h1>
                    <h2>{data.description}</h2>
                    <Link to={`/createtopic/${data.id}`}>Create topic</Link>
                    {data.topicList.map(
                        post => {
                            return (
                                <div key={post.id}>
                                    <div>
                                        <Link to={`/topic/${post.id}`}>{post.topicTitle}</Link>
                                    {post.creatorUsername}
                                </div>
                                </div>
                            )
                        }
                    )}
        </div>
            }
        </div >
    )
}

export default Sub;