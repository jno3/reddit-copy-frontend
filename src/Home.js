import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseGetRequest, baseURL } from "./ApiRequests";
import { TopicTemplate } from "./Templates";

const Home = () => {
    const [data, setData] = useState();
    const navigate = useNavigate();
    var url = `${baseURL}/user/`;
    const token = localStorage.getItem("jwt");
    var type = "a";
    if (token === null) {
        type = "u";
        url = `${baseURL}/general/`;
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
    }, [url, token, type])

    return (
        <div>
            {
                data &&
                data.map(
                    topic => {
                        if (topic.topicList === undefined) {
                            const sub = {
                                "id": topic.subId,
                                "name": topic.subName,
                            }
                            const post = topic;
                            return (
                                <TopicTemplate sub={sub} post={post} request={false} key={topic.id} />
                            )
                        } else {
                            const sub = topic;
                            const post = sub.topicList[0];
                            if (sub.topicList.length > 0) {
                                return (
                                    <TopicTemplate sub={sub} post={post} request={true} key={topic.id} />
                                )
                            }
                        }
                    }
                )
            }
        </div>
    )
}

export default Home;