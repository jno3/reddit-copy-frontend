import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseURL, baseGetRequest } from "./ApiRequests";
import { SubListTemplate } from "./Templates";

const AllSubs = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const url = baseURL + "/general/sub/";
    const token = localStorage.getItem("jwt");
    var type = "u";
    if (token !== null) {
        type = "a";
    }
    useEffect(() => {
        const loadData = async () => {
            const tempo = await baseGetRequest(url, token, type);
            if (tempo.status !== 500) {
                setData(tempo.data);
            } else {
                localStorage.removeItem("jwt");
                localStorage.removeItem("username");
                localStorage.removeItem("id");
                alert("session expired");
                navigate("/");
            }
        }
        loadData();
    }, [url, token, type, navigate])
    return (
        <div className="general">
            <Card style={{ width: "40rem" }}>
                <Card.Body>
                    {
                        data.allSubsInfo && data.allSubsInfo.map(
                            sub => {
                                return (
                                    <Card key={sub.id}>
                                        <Card.Body>
                                            <SubListTemplate sub={sub} key={sub.id} />
                                        </Card.Body>
                                    </Card>
                                )
                            }
                        )
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default AllSubs;