import { Link, Outlet } from "react-router-dom";
const Navbar = () => {
    const token = localStorage.getItem("jwt");
    return (
        <>
            <div>
                <Link to={"/createsub"}>Create sub</Link>
                --
                <Link to={"/allsubs"}>All subs</Link>
                {
                    token &&
                    <>
                    --
                    <Link to={"/mysubs"}>My subs</Link>
                    --
                    <Link to={"/logout"}>Logout</Link>
                    </>
                }
                {
                    !token &&
                    <div>
                        --
                        <Link to={"/login"}>Login</Link>
                        --
                        <Link to={"/register"}>Register</Link>
                    </div>
                }
            </div>

            <Outlet />
        </>
    )
}

export default Navbar;