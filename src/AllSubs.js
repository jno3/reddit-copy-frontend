import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseURL, baseGetRequest } from "./ApiRequests";
const AllSubs = () => {
    const [data, setData] = useState([]);
    const url = baseURL + "/general/sub/";
    const token = null;
    const type = "u";
    useEffect(() => {
        const loadData = async() => {
            const tempo = await baseGetRequest(url, token, type);
            setData(tempo.data);
        }
        loadData();
    }, [url, token, type])
    return (
        <div>
            {
                data.allSubsInfo && data.allSubsInfo.map(
                    sub => {
                        return (
                            <div key={sub.id}>
                                <Link to={`/sub/${sub.id}`}>{sub.subName}</Link>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default AllSubs;