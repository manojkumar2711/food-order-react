import React, { Component } from 'react';
import { Row, InputGroup, Form, Col, Button, Container, Anchor } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = [{
            exit: false,
            show: false,
            fname: "",
            lname: "",
            moblieno: null,
            email: "",
            password: "",
            database: [],
            checkemail: "",
            checkpassword: "",
            data:[],
            validated: false
        }]
    }
    componentDidMount() {
        this.getitem();
    }
    getitem = () => {
        const str = localStorage.getItem('database');
        const parsedArray = JSON.parse(str);
        this.setState({ database: parsedArray !=null ? parsedArray :[] });
    }
    show = () => {
        this.setState({ show: !this.state.show });
    }
    hide = () => {
        this.setState({ show: !this.state.show }, () => {
            this.getitem();
        });
    }
    savedata = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    signup = () => {
        let obj = {
            fname: this.state.fname,
            lname: this.state.lname,
            moblieno: this.state.moblieno,
            email: this.state.email,
            password: this.state.password
        }
        let item = []
        if (this.state.database.length > 0) {
            item = this.state.database
            item.push(obj);
        }
        const myArray = item;
        const jsonArray = JSON.stringify(myArray);
        localStorage.setItem('database', jsonArray);


        const str = localStorage.getItem('database');
        const parsedArray = JSON.parse(str);
        console.log(parsedArray);
        this.hide();
    }
    ckeckdata = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    login = () => {
        if (this.state.database.length > 0 && this.state.database.some(item => item.email === this.state.checkemail) && this.state.database.some(item => item.password === this.state.checkpassword)
        && this.state.checkemail !== undefined ) {
          
            let data={name:this.state.checkemail,status:true}
            const myArray = data;
            const jsonArray = JSON.stringify(myArray);
            localStorage.setItem('user', jsonArray);
            this.navigateToHome();
        }
        else {
            console.log("not exist");
            this.setState({ exit: true })
        }
    }
    navigateToHome = () => {
        this.props.history.push('/home');
    };
    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          
            event.preventDefault();
            event.stopPropagation();
                
        }
        
        this.setState({ validated: true },()=>{
            // this.signup();
        });
    };
    render() {
        return (
            <>

                {this.state.show ?
                    <Container>
                        <Col lg="4" className='mx-auto mt-3 mb-5 shadow-lg p-3 mb-5 bg-white rounded' >
                            <h5 className='text-center mb-3 p-3 rounded'>Registertion form</h5>
                            <Form  noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                                <Row className="">
                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="First name"
                                            defaultValue=""
                                            name="fname"
                                            onChange={this.savedata}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a Firstname.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" >
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Last name"
                                            defaultValue=""
                                            name="lname"
                                            onChange={this.savedata}
                                        /> <Form.Control.Feedback type="invalid">
                                            Please choose a lastname.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                        <Form.Label>Moblie Number</Form.Label>
                                        <InputGroup >
                                            <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Moblie Number"
                                                required
                                                name="moblieno"
                                                onChange={this.savedata}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a username.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                                        <Form.Label>E mail</Form.Label>
                                        <Form.Control type="email"
                                            placeholder="email"
                                            required
                                            name="email"
                                            onChange={this.savedata}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid email.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password"
                                            placeholder="password"
                                            required
                                            name="password"
                                            onChange={this.savedata}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid password.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3 mt-1">
                                        <Form.Check
                                            required
                                            label="Agree to terms and conditions"
                                            feedback="You must agree before submitting."
                                            feedbackType="invalid"
                                        />
                                    </Form.Group>

                                </Row>
                                <Col className='d-flex justify-content-center'>
                                    <Button className="bg-color pe-5 px-5 " type='submit' onClick={this.handleSubmit} >Sign up</Button>
                                </Col>
                            </Form>
                            <Col className='d-flex justify-content-center mt-2'>
                                <Anchor className='bg-text' onClick={this.show}>login</Anchor>

                            </Col>
                        </Col>
                    </Container>
                    :

                    <Container>
                        <Col lg="4" className='mx-auto mt-3 mb-5 shadow-lg p-3 mb-5 mt-5 bg-white rounded' >
                            <h5 className='text-center  p-3 rounded'>Login</h5>

                            <Form>

                                <Row className="">


                                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                                        <Form.Label>E mail</Form.Label>
                                        <Form.Control type="email" placeholder="email"
                                            name="checkemail"
                                            onChange={this.ckeckdata}
                                            required />

                                    </Form.Group>
                                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="password"
                                            name="checkpassword"
                                            onChange={this.ckeckdata}
                                            required />

                                    </Form.Group>
                                    <Form.Group className="mb-3 mt-1">
                                        <Form.Check
                                            required
                                            label="Agree to terms and conditions"
                                            feedback="You must agree before submitting."
                                            feedbackType="invalid"
                                        />
                                    </Form.Group>
                                    {this.state.exit ? <p className='bg-text'>user is not exist</p> : ""}
                                </Row>
                                <Col className='d-flex justify-content-center'>
                                    <Button className="bg-color pe-5 px-5" onClick={this.login} >login</Button>
                                </Col>

                            </Form>
                            <Col className='d-flex justify-content-center mt-2'>
                                <Anchor className='bg-text' onClick={this.show}>create account</Anchor>

                            </Col>
                        </Col>
                    </Container>
                }

            </>
        );
    }
}

export default Login;
