import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { baseGetRequest, baseURL } from "./ApiRequests";
import { SubTemplate, TopicTemplate } from "./Templates";

const Sub = () => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const url = `${baseURL}/general/sub/${id}/`;
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
        <Card style={{ width: "40rem" }} className="general">
            {
                data.id &&
                <Card.Body>
                    <SubTemplate data={data} />

                    {/* <Link to={`/createtopic/${data.id}`}>Create topic</Link> */}
                    {data.topicList.map(
                        post => {
                            const sub = {
                                "id": post.subId,
                                "name": post.subName,
                            }
                            var request = false;
                            if (localStorage.getItem("jwt") !== null) {
                                request = true;
                            }
                            return (
                                <TopicTemplate sub={sub} post={post} request={request} key={post.id} />
                            )
                        }
                    )}
                </Card.Body>
            }
        </Card >
    )
}

export default Sub;