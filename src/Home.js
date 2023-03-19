import { useEffect, useState } from "react";
import { baseGetRequest, baseURL } from "./ApiRequests";

const Home = () => {
    const [data, setData] = useState([]);
    var url = `${baseURL}/user/`;
    const token = localStorage.getItem("jwt");
    var type = "a";
    if (token === null) {
        type = "u";
        url = `${baseURL}/general/`;
    }
    useEffect(() => {
        const loadData = async () => {
            const tempData = await baseGetRequest(url, token, type);
            setData(tempData.data);
        }
        loadData();
    }, [url, token, type])

    return (
        <div>
            {
                console.log(data)
            }
        </div>
    )
}

export default Home;