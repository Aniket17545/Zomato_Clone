import React from "react";
import '../styles/filter.css';
import '../styles/details.css';
import queryString from "query-string";
import axios from "axios";
import Modal from "react-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: {},
            galleryModal: false,
            menuModal: false,
            resId: undefined,
            menuItems: [],
            subtotal: 0
        }
    }

    componentDidMount() {
        const q = queryString.parse(window.location.search);
        const { restaurant } = q;

        axios({
            url: `http://localhost:5500/restaurants/${restaurant}`,
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurant, resId: restaurant })
            })
            .catch((err => console.log(err)))
    }

    handleModal = (state, value) => {
        const { resId } = this.state;

        if (state == "menuModal" && value == true) {
            axios({
                url: `http://localhost:5500/menu/${resId}`,
                method: "GET",
                headers: { 'Content-Type': 'application/JSON' }
            })

                .then(res => {
                    this.setState({ menuItems: res.data.menuitems })
                })
                .catch(err => console.log(err))
        }

        this.setState({ [state]: value });
    }

    addItems = (index, operationType) => {
        let total = 0;
        const items = [...this.state.menuItems];
        const item = items[index];

        if (operationType == 'add') {
            item.qty += 1;
        } else {
            item.qty -= 1;
        }
        items[index] = item;

        items.map((x) => {
            total += x.qty * x.price;
        })
        this.setState({ menuItems: items, subtotal: total })
    }

    initPayment = (data) => {
        const options = {
            key: "rzp_test_eQNvcPFTWrHYo8",
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,

            handler: async (response) => {
                try {
                    const verifyUrl = "http://localhost:5500/api/payment/verify";
                    const { data } = await axios.post(verifyUrl, response);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    handlePayment = async () => {
        const { subtotal } = this.state;

        try {
            const orderUrl = "http://localhost:5500/api/payment/orders";
            const { data } = await axios.post(orderUrl, { amount: subtotal });

            console.log(data);
            this.initPayment(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { restaurant, galleryModal, menuModal, menuItems, subtotal, formModal } = this.state;

        return (
            <div>
                {/* Navbar */}
                {/* <nav class="navbar bg-danger" data-bs-theme="">
                    <div class="container">
                        <div class="navbar-brand text-danger circle">
                            <h2 class="logo">e!</h2>
                        </div>
                        <form class="d-flex nav-form">
                            <button type="button" class="btn btn-danger">Login</button>
                            <button type="button" class="btn btn-outline-light">Create an account</button>
                        </form>
                    </div>
                </nav> */}

                {/* Body Part */}
                <div className="container">
                    <div>
                        <img src={restaurant.thumb} width="100%" height="350" className="mt-2" />
                        <input type="button" className="button" value="Click to see Image Gallery" onClick={() => this.handleModal('galleryModal', true)} />
                    </div>

                    <div className="heading mt-3">{restaurant.name}</div>
                    <input type="button" className="btn-order" value="Place Online Order" onClick={() => this.handleModal('menuModal', true)} />

                    <div className="tabs">
                        <div className="tab">
                            <input type="radio" id="tab-1" name="tab-group-1" checked />
                            <label for="tab-1">Overview</label>

                            <div className="content">
                                <div className="about">About this place</div>
                                <div className="head mt-3">Cuisine</div>
                                <div className="value mt-1">{restaurant && restaurant.Cuisine && restaurant.Cuisine.map(cuisine => `${cuisine.name}, `)}</div>
                                <div className="head mt-3">Average Cost</div>
                                <div className="value mt-1">&#8377; {restaurant.cost} for two people(approx)</div>
                            </div>
                        </div>

                        <div className="tab">
                            <input type="radio" id="tab-2" name="tab-group-1" />
                            <label for="tab-2">Contact</label>
                            <div className="content">
                                <div className="head">Phone Number</div>
                                <div className="value">{restaurant.contact_number}</div>
                                <div className="head mt-3">{restaurant.name}</div>
                                <div className="value">{restaurant.address}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={galleryModal}
                    style={customStyles}>
                    <div style={{ float: "right", marginBottom: "12px" }} onClick={() => this.handleModal('galleryModal', false)}><i class="bi bi-x-circle-fill"></i></div>

                    <Carousel showThumbs={false} showStatus={false}>
                        <div>
                            <img src={restaurant.thumb} className="bannerImg" />
                        </div>
                    </Carousel>
                </Modal>

                <Modal
                    isOpen={menuModal}
                    style={customStyles}>
                    <div>
                        <div style={{ float: "right", marginBottom: "5px" }} onClick={() => this.handleModal('menuModal', false)}>
                            <i class="bi bi-x-circle-fill"></i>
                        </div>
                        <div>
                            <br />
                            <h3 className="restaurant-name">{restaurant.name}</h3>
                            <h3 className="item-total">SubTotal : {subtotal} </h3>
                            <button className="btn btn-danger order-button pay" onClick={() => {
                                this.handleModal('menuModal', false);
                                this.handleModal('formModal', true);
                            }}> Pay Now</button>
                            {menuItems?.map((item, index) => {
                                return <div style={{ width: '44rem', marginTop: '28px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
                                    <div style={{ width: '44rem', margin: '' }}>
                                        <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                <span className="card-body">
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.price}</h5>
                                                    <p className="item-descp">{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <img className="card-img-center title-img" src={`./img/${item.image}`} style={{
                                                    height: '90px',
                                                    width: '90px',
                                                    borderRadius: '5px',
                                                    marginTop: '2px',
                                                    marginLeft: '58px'
                                                }} />
                                                {item.qty == 0 ? <div>
                                                    <button className="add-button" onClick={() => this.addItems(index, 'add')}>Add</button>
                                                </div> :
                                                    <div className="add-number">
                                                        <button onClick={() => this.addItems(index, 'sub')} >-</button>
                                                        <span class="qty">{item.qty}</span>
                                                        <button onClick={() => this.addItems(index, 'add')} >+</button>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            <div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={formModal}
                    style={customStyles}>
                    <div style={{ float: "right", marginBottom: "5px" }} onClick={() => this.handleModal('formModal', false)}>
                        <i class="bi bi-x-circle-fill"></i>
                    </div>
                    <div>
                        <h2>{restaurant.name}</h2>
                        <div>
                            <label>Name : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Name" />
                        </div>
                        <div>
                            <label>Email : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Email" />
                        </div>
                        <div>
                            <label>Address: </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Address" />
                        </div>
                        <div>
                            <label>Contact Number : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="tel" placeholder="Enter your Contact Details" />
                        </div>
                        <button className="btn btn-success"
                            style={{ float: 'right', marginTop: '20px' }} onClick={this.handlePayment} >Proceed</button>
                    </div>


                </Modal>

            </div>
        )
    }
}

export default Details;