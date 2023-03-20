import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseGetRequest, baseURL } from "./ApiRequests";
import { UserHome } from "./Templates";

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
                            return (
                                <div key={topic.id}>
                                    {topic.subName}
                                    {topic.title}
                                </div>
                            )
                        } else {
                            if(topic.topicList.length > 0){
                                return (
                                    <UserHome data={topic} key={topic.id}/>
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