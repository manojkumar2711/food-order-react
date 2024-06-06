import { Component } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Sidebar from "../component/slidebar";

// const cardata = [{ id: "1", name: "Chicken Biryani", des: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", avail: "120", price: 150, img1: "http://localhost:3000/img/biryani.gif" },
// { id: "2", name: "Mutton Biryani", des: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", avail: "120", price: 90, img1: "http://localhost:3000/img/mutton-biryani.jpg" },
// { id: "3", name: "Egg Fried Rice", des: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", avail: "12", price: 100, img1: "http://localhost:3000/img/egg-fried.jpg" },
// { id: "4", name: "Chicken Fried Rice", des: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", avail: "130", price: 100, img1: "http://localhost:3000/img/chicken-rice.webp" },
// { id: "5", name: "Egg Biryani ", des: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", avail: "10", price: 110, img1: "http://localhost:3000/img/Egg-Biryani.jpg" },
// { id: "6", name: "Egg Noodles  ", des: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.", avail: "17", price: 200, img1: "http://localhost:3000/img/Egg-Fried-Noodles.webp" }

// ]
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card:[],
            addtocart: [],
            totalvalue: 0,
            Totalamt:0,
            user:{}

        };
    }
    componentDidMount(){
        const st = localStorage.getItem('user');
        const Array = JSON.parse(st);
        this.setState({user:Array},()=>{
            if(this.state.user.status == true){
                debugger;
                const str = localStorage.getItem('array');
                const parsedArray = JSON.parse(str);
                this.setState({card:parsedArray},()=>{
                    const str = localStorage.getItem('order');
                    const parsedArray = JSON.parse(str);
                    this.setState({ addtocart:parsedArray},()=>{
                        if(this.state.addtocart.length>0){
                        this.setState({Totalamt:this.state.addtocart[this.state.addtocart.length-1].total});
                    }
                    })
                })
            }
            else{
                debugger;
                this.props.history.push('/');
            }
        })
       
   
    }
    change(id, name, price, value) {
        let item = []
        let obj = {
            "id": id,
            "name": name,
            "price": price, 
            "value": value,
            "Tprice": price,
            "value": 1,
            "tokenid":this.state.user.name ,
            "order":false
        }
        if (this.state.addtocart.length > 0) {
            item = this.state.addtocart;
            item.push(obj);
        } else {
            item.push(obj);
        }

        this.setState({ addtocart: item }, () => {
            this.sum();
        });


    }

    delete = (index) => {
        let Items = this.state.addtocart.filter((item, idx) => idx !== index);
        this.setState({ addtocart: Items }, () => {
            this.sum();
        });
    }
    changevalue = (e, id, price) => {
        let update = []
        if (this.state.addtocart.length > 0) {
            update = this.state.addtocart.map(item => item.id == id ? { ...item, Tprice: (price * e.target.value),value:e.target.value } : item);
            this.setState({ addtocart: update }, () => {
                this.sum();
            })

        }

    }
    sum() {
        if (this.state.addtocart.length > 0) {
            let sum1 = this.state.addtocart.map(item => item.Tprice).reduce((a, c) => { return a + c });
            this.setState({ Totalamt: sum1 })
        }
    }
    render() {
        return (
            <>

                <Container fluid>
                    <Row>
                        <Col lg='9'>
                            <Row>
                                {this.state.card.length > 0 && this.state.card.map((item, index) => {
                                    return (<>

                                        <Col lg="4" className="p-4 mt-2   ">
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Img className={"food-img"} variant="top" src={item.img1} />
                                                <Card.Body>
                                                    <Card.Title className={"d-inline "}>{item.name}</Card.Title>
                                                    <span className={"Avail p-1 mx-2 float-end m-0"}>Qty : {item.quantity}</span>
                                                    <Card.Text className={"mt-2 fs-5"}> Price : ₹ {item.price}</Card.Text>
                                                    <Card.Text>
                                                        {item.description}
                                                    </Card.Text>
                                                    <Button className={"bg-color"} onClick={() => this.change(item.id, item.name, item.price, item.value)}>Add to cart</Button>

                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </>

                                    );
                                })
                                }
                            </Row>



                        </Col>
                        <Col lg="3" >  <Sidebar changevalue={this.changevalue} delete={this.delete} {...this.state} />

                        </Col>
                    </Row>

                </Container>



            </>
        )
    }

}
export default Home;