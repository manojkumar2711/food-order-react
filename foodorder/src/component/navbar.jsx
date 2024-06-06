import { Component } from "react";
import logo from "../img/logo10.jpg"
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
const st = localStorage.getItem('user');
const Array = JSON.parse(st);

class Navbar1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // user: Array.name,
             user: "manoj",
            data: { name: "" }

        };

    }
    componentDidMount() {
        this.callfecth();
    }
    callfecth = () => {
        const st = localStorage.getItem('user');
        const Array = JSON.parse(st);
        this.setState({ user: Array })
    }
    logout = () => {
        let data = { name: "", status: false }
        const myArray = this.state.data;
        const jsonArray = JSON.stringify(myArray);
        localStorage.setItem('user', jsonArray);
        this.callfecth();
    }
    render() {
        return (<>
            <Navbar expand="lg" className="bg-body-tertiary navbar2 navbar-fixed-top">
                <Container fluid>
                    <img className={"logo-img"} src={logo} />
                    <Navbar.Brand className={'heading px-3 pe-3 p-2 mx-2'} href="/">Food App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav " className={"justify-content-end"}>
                        <Nav className="justify-content-end mx-4 " activeKey="">
                            <Nav.Item>
                                <Nav.Link className={"mx-2 me-2  fs-5 nabartilte "} href="/home">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className={"mx-2 me-2 fs-5 nabartilte"} eventKey="link-1">Service</Nav.Link>
                            </Nav.Item>
                            {this.state.user.name == "admin@gmail.com" ?
                                <Nav.Item>
                                    <Nav.Link className={"mx-2 me-2 fs-5 nabartilte"} href="/admin" eventKey="link-2">Admin</Nav.Link>
                                </Nav.Item> : ""}


                            <Nav.Item>
                                {this.state.user.status == true  ? 
                                <>
                                    <>
                                        <OverlayTrigger
                                            trigger="click"
                                            placement="bottom"
                                            overlay={
                                                <Popover id={`popover-positioned-bottom`}>
                                                    <Popover.Header as="h3">Profile</Popover.Header>
                                                    <Popover.Body>
                                                        {this.state.user != undefined && <h6>{this.state.user.name}</h6>}
                                                        <Button className={"bg-color mt-2 p-1"} onClick={this.logout}>Logout</Button>
                                                    </Popover.Body>
                                                </Popover>
                                            }
                                        >
                                            <Nav.Link eventKey="disabled" href="" className={"mx-2 me-2 fs-5 nabartilte"}>
                                                <FontAwesomeIcon icon={faUser} />
                                            </Nav.Link>
                                        </OverlayTrigger>
                                    </>
                                </> : <Nav.Link eventKey="disabled" href="/" className={"mx-2 me-2 fs-5 nabartilte"}>
                                    Login
                                </Nav.Link>}
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

        )
    }


}
export default Navbar1;
