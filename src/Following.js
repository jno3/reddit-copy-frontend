import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseGetRequest, baseURL } from "./ApiRequests";

const Following = () => {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const url = `${baseURL}/user/sub/`;
    const token = localStorage.getItem("jwt");
    const type = "a";
    useEffect(() => {
        const loadData = async () => {
            const temp = await baseGetRequest(url, token, type);
            if (temp.status !== 200) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("username");
                alert("session ended");
                navigate(0);
                navigate("/");
            } else {
                setData(temp.status);
            }
        }
        loadData();
    }, [url, token, type, navigate]);

    return (
        <div>
            {
                data &&
                // data.allSubsInfo.map(
                //     sub => {
                //         console.log(sub)
                //         return(
                //             <div key={sub.id}>
                //                 {sub.subName}
                //             </div>
                //         )
                //     }
                // )
                "aa"
            }
        </div>
    )
}

export default Following;