import React, { Component } from 'react';
import { Button, Col, Modal, Form } from 'react-bootstrap';
import qr from '../img/qr.png'
import tq from '../img/tq.png';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      active: true,
      active1: false,
      submitshow:true,
      id: "",
      order:[]
    };
  }
  componentDidMount(){
    const st = localStorage.getItem('order');
    const Array = JSON.parse(st);
    this.setState({order :Array})
  }

  handleClose = () => {
    this.setState({ show: false });
  }
  hide = () => {
    if (this.state.id == "id123") {
      this.setState({ active: false, active1: false ,submitshow:false});
    
      let obj = { order : true, total:this.props.Totalamt, name:this.props.user.name }
      let item = [];
      if (this.props.addtocart.length > 0) {
         item = this.props.addtocart ;
        item.push(obj);
     }
     if (this.state.order.length > 0) {

      
      let item1 = this.state.order ;
      item.push(item1);
   }
      const myArray = this.props.addtocart;
      const jsonArray = JSON.stringify(myArray);
      localStorage.setItem('order', jsonArray);
    }
    else {
      this.setState({ active1: true })
    }
  }
  handleShow = () => {
    this.setState({ show: true });
  }
  change = (e) => {
    this.setState({ id: e.target.value });
  }

  render() {
    return (
      <>
      {/* this.props.addtocart[0]?.tokenid === 504  */}
         
       <Button className='bg-color mt-3' onClick={this.handleShow}> Order Now </Button>

        <Modal
          className='popup-box'
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          {this.props.addtocart.length > 0 &&  this.props.addtocart[this.props.addtocart.length-1]?.order ?
            <>
              <Modal.Header closeButton className='d-flex align-items-center'>
                <Modal.Title>Thank you for  Order</Modal.Title>
              </Modal.Header>
              <Col className={" justify-content-center  tq mt-2"}>
                <img className={"d-block ms-auto me-auto "} src={tq} alt="QR Code" />
                <h4 className={'text-center'}>Payment Successful !</h4>
              </Col>

              {/* { this.props.addtocart[this.props.addtocart.length-1]?.order ? " " :<h6 className={'text-center'}>Amount: {this.props.Totalamt}</h6>} */}
              <h6 className={'text-center'}>Amount: {this.props.Totalamt}</h6>
              <p className={'text-center'}>Your Token number : 504</p>

            </>:<>
              <Modal.Header closeButton className='d-flex align-items-center'>
                <Modal.Title>Payment</Modal.Title>
              </Modal.Header>
              <Col className="d-flex justify-content-center mt-2">
                <img src={qr} alt="QR Code" />
              </Col>
              
              <h5 className={'text-center'}>Amount: {this.props.Totalamt}</h5>
              <h6 className={'text-center'}>Scan & pay after entering your Transaction ID</h6>
              <Col className=" d-flex justify-content-center mt-2 popup-id-box">

                <input type='text' className={'mx-1'} name='id' value={this.state.id} onChange={this.change} placeholder='Enter Transaction ID' />

              </Col>
              {this.state.active1 ? <Col className="d-flex justify-content-center  m-0"><p className='m-0'>Enter a valid Transaction ID </p></Col> : ""}

            </>}

          <Modal.Footer className="d-flex justify-content-center mt-3 mb-3">

           { this.props.addtocart[this.props.addtocart.length-1]?.order ? " ":<Button onClick={this.hide} className={'bg-color'} variant="primary">Submit</Button>}
            <Button variant="secondary" onClick={this.handleClose}> Close </Button>

          </Modal.Footer>
        </Modal >

      </>
    );
  }
}

export default Example;
