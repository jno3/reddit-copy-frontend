import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseGetRequest, baseURL } from "./ApiRequests";
import { SubListTemplate } from "./Templates";

const Following = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const url = `${baseURL}/user/sub/`;
    const token = localStorage.getItem("jwt");
    const type = "a";
    useEffect(() => {
        const loadData = async () => {
            const temp = await baseGetRequest(url, token, type);
            if (temp.status !== 500) {
                setData(temp.data);
            } else {
                localStorage.removeItem("jwt");
                localStorage.removeItem("username");
                alert("session ended");
                navigate(0);
                navigate("/");
            }
        }
        loadData();
    }, [url, token, type, navigate]);

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

export default Following;