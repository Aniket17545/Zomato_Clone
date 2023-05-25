import React from "react";
import axios from "axios";
import '../styles/frontPage.css';
import Banner from './home_banner';
import QuickSearch from "./home_quicksearch";

class Homepage extends React.Component {
    constructor() {
        super();
        this.state = {
            location: [],
            mealtype: []
        }
    }

    componentDidMount() {
        axios({
            url: 'http://localhost:5500/location',
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ location: res.data.location })
            })
            .catch((err => console.log(err)))

        axios({
            url: 'http://localhost:5500/mealtype',
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ mealtype: res.data.mealtype })
            })
            .catch((err => console.log(err)))
    }

    render() {
        const { location, mealtype } = this.state;
        console.log(location);
        return (
            <div>
                {/* Banner Part (upper) */}

                <Banner locationData={location} />

                {/* Quick Searches Part (lower) */}

                <QuickSearch mealtypeData={mealtype} />

            </div>
        )
    }
}

export default Homepage;