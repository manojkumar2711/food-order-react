import React, { Component } from 'react';
import { Navbar, Nav, Col, Table, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Example from './popup';
let cardata = [{ item1: "Biryani", price: "110", quantity: '1' },
{ item1: "Sandwich", price: "80", quantity: '1' }
]
class RightSideNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }

    render() {
        return (
            <>
                <Col className="navbar-fixed-right  mx-5 " fixed="right">
                    <Col className={'sildebar-box '}>
                        {this.props.addtocart.length > 0 && this.props.addtocart.map((item, index) => {
                            debugger;
                            return (<>
                            { item.name != null ?
                                <Col className='cart-top-box'  >
                                    <Card.Body className={'cart-box p-3'}>
                                        <Card.Title className='fs-6 '>{item.name}   </Card.Title>
                                        <p className="fs-6  m-1 mx-0">Price : {item.price} </p>
                                        <p className="fs-6  m-1 mx-0 d-inline ">Quantity : </p>
                                        <input className={'mx-2 me-5'} defaultValue={item.value} onChange={(e) => this.props.changevalue(e, item.id, item.price)} type="number"></input>
                                        <p className=' mb-1 d-inline  mx-4'> Total Price : {item.Tprice} </p>
                                        <button className={'float-end'}> <FontAwesomeIcon className={'icon1'} onClick={() => this.props.delete(index)} icon={faTrash} /></button>
                                      
                                    </Card.Body>
                                </Col>:" "}
                            </>
                            )

                        })}

                        <Col className='cart-top-box'  >
                            <Card.Body className={'cart-box p-3'}>

                                <Card.Title className='fs-6 '>Total Price : ₹ {this.props.Totalamt} </Card.Title>
                            </Card.Body>
                        </Col>
                        <Col className={'d-flex justify-content-center'}>

                            <Example {...this.props} />

                        </Col>
                    </Col>

                </Col>
            </>
        );
    }
}

export default RightSideNavbar;
