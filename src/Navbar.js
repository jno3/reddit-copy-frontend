import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { baseGetRequest, baseURL } from "./ApiRequests";
import 'bootstrap/dist/css/bootstrap.min.css';
const LocalNavbar = () => {
    const token = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const handleLogoutClick = async () => {
        const url = `${baseURL}/authentication/logout/`;
        const token = localStorage.getItem("jwt");
        const type = "a";
        const temp = await baseGetRequest(url, token, type);
        if (temp.status === 200) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
        }
        navigate(0);
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/allsubs">All subs</Nav.Link>
                            {

                                token &&
                                <>
                                    <Nav.Link href="/createsub">Create sub</Nav.Link>
                                    <Nav.Link href="/following">My subs</Nav.Link>
                                    <Nav.Link href="#" onClick={handleLogoutClick}>Logout</Nav.Link>
                                </>
                            }
                            {
                                !token &&
                                <>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </>
    )
}

export default LocalNavbar;