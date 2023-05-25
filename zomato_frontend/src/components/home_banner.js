import React from "react";
import axios from "axios";
import navHook from "./nav";

class Banner extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: [],
            inputText: undefined,
            suggestion: []
        }
    }

    handleLocationChange = (e) => {
        const location = e.target.value;
        sessionStorage.setItem('location', location);

        axios({
            url: `http://localhost:5500/restaurant/${location}`,
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants })
            })
            .catch((err => console.log(err)))
    }

    handleInputChange = (event) => {
        const { restaurant } = this.state;
        const inputText = event.target.value;

        let suggestion = [];

        suggestion = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestion });
    }

    selectRestaturant = (ss) => {
        this.props.navigate(`/details?restaurant=${ss}`);
    }

    showSuggestion = () => {
        const { inputText, suggestion } = this.state;

        if (suggestion.length == 0 && inputText == undefined) {
            return null;
        }

        if (suggestion.length > 0 && inputText == '') {
            return null;
        }

        if (suggestion.length == 0 && inputText) {
            return (
                <li>No results found !!</li>
            )

        }

        return (
            suggestion.map((item, index) => (
                <li key={index} onClick={() => this.selectRestaturant(item._id)}>
                    <img src={item.thumb} className="suggImg" alt=""/>
                    <span className="suggHeading">{item.name}</span>
                    <span className="suggText">{item.locality}</span>
                </li>
            ))
        )
    }

    render() {
        const { locationData } = this.props
        return (
            <div>
                <div className="bg-cover bg-image d-flex">
                    <div className="container mt-3">
                        {/* <div className="row">
                            <div className="col text-end">
                                <button type="button" className="btn btn-outline-light">Login</button> &nbsp;
                                <button type="button" className="btn btn-outline-light">Create an account</button>
                            </div>
                        </div> */}
                        <div className="row mt-5">
                            <div className="col d-flex justify-content-center">
                                <div className="text-danger circle-h">
                                    <h2 className="logo-h">e!</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col d-flex justify-content-center">
                                <h3 className="text-light line">Find the best restaurants, cafés, and bars</h3>
                            </div>
                        </div>
                        <div className="row mt-3 d-flex justify-content-center">
                            <div className="col selectbar">
                                <select className="form-control input1 py-2" onChange={this.handleLocationChange}>
                                    <option value="0" disabled selected>Please type a location</option>
                                    {
                                        locationData?.map((item) => {
                                            return (
                                                <option value={item.city_id}>{`${item.name}`}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col input-group searchbar">
                                <i className="input-group-text bi bi-search input2"></i>
                                <input type="text" className="form-control input2 py-2" placeholder="Search for restaurants" onChange={this.handleInputChange} />
                                <ul className="suggestionBox">{this.showSuggestion()}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default navHook(Banner);