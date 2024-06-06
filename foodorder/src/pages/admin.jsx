import { Component } from "react";
import { Col, Row, Container, Form, Button, InputGroup, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const cardata = [{ id: 1, name: "Chicken Biryani", description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", quantity: 120, price: 150, img1: "http://localhost:3000/img/biryani.gif" },
{ id: 2, name: "Mutton Biryani", description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", quantity: "120", price: 90, img1: "http://localhost:3000/img/mutton-biryani.jpg" },
{ id: 3, name: "Egg Fried Rice", description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", quantity: "12", price: 100, img1: "http://localhost:3000/img/egg-fried.jpg" },
{ id: 4, name: "Chicken Fried Rice", description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", quantity: "130", price: 100, img1: "http://localhost:3000/img/chicken-rice.webp" },
{ id: 5, name: "Egg Biryani", description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", quantity: "10", price: 110, img1: "http://localhost:3000/img/Egg-Biryani.jpg" },
{ id: 6, name: "Egg Noodles", description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", quantity: "17", price: 200, img1: "http://localhost:3000/img/Egg-Fried-Noodles.webp" }

]
const imgage = {
    "Chicken Biryani": "http://localhost:3000/img/biryani.gif",
    "Mutton Biryani": "http://localhost:3000/img/mutton-biryani.jpg",
    "Egg Fried Rice": "http://localhost:3000/img/egg-fried.jpg",
    "Chicken Fried Rice": "http://localhost:3000/img/chicken-rice.webp",
    "Egg Biryani": "http://localhost:3000/img/Egg-Biryani.jpg",
    "Egg Noodles": "http://localhost:3000/img/Egg-Fried-Noodles.webp"
}
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emty: [],
            card: cardata,
            img: imgage,
            id: 0,
            name: "",
            quantity: null,
            price: null,
            description: "",
            item1: [],
            show: false,
            order: []

        }
    }
    componentDidMount() {
        const st = localStorage.getItem('user');
        const Array = JSON.parse(st);
        this.setState({ user: Array }, () => {
            if (this.state.user.name == "admin@gmail.com") {

                const str = localStorage.getItem('array');
                const parsedArray = JSON.parse(str);
                this.setState({ card: parsedArray }, () => {
                    const str = localStorage.getItem('order');
                    const parsedArray1 = JSON.parse(str);
                    this.setState({ order: parsedArray1 })
                    console.log(parsedArray);

                });
            }
            else {
                this.props.history.push('/');
            } 
        })
    }
    change = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }
    editvalue(item) {
        this.setState({
            id: item.id, name: item.name, price: item.price,
            quantity: item.quantity,
            description: item.description
        });

        this.setState({ show: true })
    }
    update = () => {

        let obj = {
            "id": this.state.id,
            "name": this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            "description": this.state.description,
            "img1": this.state.img[this.state.name]
        }

        let update = []
        if (this.state.card.length > 0) {
            update = this.state.card.map(item => item.id == this.state.id ? obj : item);
            this.setState({ card: update, id: "", name: "", price: 0, quantity: 0, description: "", show: false }, () => { this.save() })
        }
    }


    insetitem = () => {
        let item = []
        let obj = {
            "id": this.state.card[this.state.card.length - 1].id + 1,
            "name": this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            "description": this.state.description,
            "img1": this.state.img[this.state.name]
        }
        debugger;
        if (this.state.card.length > 0) {
            item = this.state.card
            item.push(obj);
        }
        this.setState({ card: item, id: "", name: "", price: 0, quantity: 0, description: "" }, () => { this.save() });
    }
    deleteitem(itemid) {

        let item = this.state.card.filter((item) => item.id !== itemid);
        this.setState({ card: item }, () => { this.save() });
    }
    save = () => {
        const myArray = this.state.card;
        const jsonArray = JSON.stringify(myArray);
        localStorage.setItem('array', jsonArray);


        const str = localStorage.getItem('array');
        const parsedArray = JSON.parse(str);
        console.log(parsedArray);
    }
    ordered = () => {
        const myArray = this.state.emty;
        const jsonArray = JSON.stringify(myArray);
        localStorage.setItem('order', jsonArray);
        const str = localStorage.getItem('order');
        const parsedArray = JSON.parse(str);
        this.setState({ order: parsedArray });
    }
    render() {
        return (
            <>
                <h1 className="text-center">Admin</h1>
                <Container >
                    <Row>
                        <Col lg="6" className="p-5 pt-0 ">

                            <Form  >
                                <Row className="mb-3">
                                    {/* <Form.Group as={Col} md="6" controlId="validationCustom04">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" placeholder="id" required name="id" value={this.state.id} onChange={this.change} />

                                    </Form.Group> */}
                                    <Form.Group as={Col} md="7" controlId="validationCustom01">
                                        <Form.Label>Item Name</Form.Label>
                                        <Form.Select aria-label="Default select example" name="name" value={this.state.name} onChange={this.change} required>
                                            <option placeholder="select the option">select the option</option>
                                            <option value="Chicken Biryani">Chicken Biryani</option>
                                            <option value="Mutton Biryani">Mutton Biryani</option>
                                            <option value="Egg Fried Rice">Egg Fried Rice</option>
                                            <option value="Chicken Fried Rice">Chicken Fried Rice</option>
                                            <option value="Egg Biryani">Egg Biryani</option>
                                            <option value="Egg Noodles">Egg Noodles</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} md="7" controlId="validationCustom02">
                                        <Form.Label> Quantity</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            placeholder="quantity"
                                            name="quantity"
                                            onChange={this.change}
                                            value={this.state.quantity}

                                        />

                                    </Form.Group>
                                    <Form.Group as={Col} md="7" controlId="validationCustomUsername">
                                        <Form.Label>Price</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">₹</InputGroup.Text>
                                            <Form.Control
                                                type="number"
                                                placeholder="Price of the item"
                                                name="price" onChange={this.change}
                                                value={this.state.price}
                                                required
                                            />

                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="7" controlId="validationCustom03">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={2} type="text" name="description" value={this.state.description} onChange={this.change} placeholder="Description" required />

                                    </Form.Group>


                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        required
                                        label="Agree to terms and conditions"
                                        feedback="You must agree before submitting."
                                        feedbackType="invalid"
                                    />
                                </Form.Group>
                                {this.state.show ? <Button className="bg-color" onClick={this.update}>update</Button> : <Button className="mx-3 bg-color" onClick={this.insetitem}>Add new item</Button>}

                            </Form>



                        </Col>
                        <Col lg="6" className="admin-right-box">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>

                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Item price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.card.length > 0 && this.state.card.map((item, index) => {
                                        return (
                                            <>

                                                <tr>
                                                    <td>{index + 1}</td>

                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td><Button className="bg-color mt-3 p-0 px-2 pe-2" onClick={() => this.editvalue(item)}>Edit</Button></td>
                                                    <td><FontAwesomeIcon className="mt-3 fs-6 px-2 pe-2" onClick={() => this.deleteitem(item.id)} icon={faTrash} /></td>
                                                </tr>

                                            </>
                                        )
                                    })

                                    }

                                </tbody>
                            </Table>



                        </Col >
                    </Row>
                    <Row>
                        <Col lg='7'>
                            <h1>Order</h1>
                            <Table striped bordered hover className="mt-5 mb-5">
                                <thead>
                                    <tr>
                                        <th>Token no</th>

                                        <th>Item Name</th>

                                        <th>Item price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.order.length > 0 && this.state.order.map((item, index) => {
                                        return (
                                            <>

                                                <tr>
                                                    <td>{item.tokenid}</td>

                                                    <td>{item.name}</td>

                                                    <td>{item.price}</td>
                                                    <td>{item.value}</td>

                                                </tr>


                                            </>
                                        )
                                    })

                                    }

                                </tbody>
                                <Button className="mt-5" onClick={this.ordered}>Order Delivered </Button>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
export default Admin;