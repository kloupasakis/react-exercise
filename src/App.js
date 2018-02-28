import React from 'react';
import Table from './component/Table';
import Header from './component/Header';
import ServiceStatus from './component/ServiceStatus';
import "babel-polyfill";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_HOST = 'https://api.publicapis.org';
const API_SERVICES = { 
    'entries': 'entries',
    'ping': 'health-check'
}

class App extends React.Component{
    constructor (props){
        super(props);

        this.state = { isServiceOnline: false };
        App.checkServiceAvailability = App.checkServiceAvailability.bind(this);
    }

    static checkServiceAvailability() {
        const url = new URL(API_SERVICES.ping, API_HOST);
        return fetch(PROXY_URL + url)
            .then(response => response.json())
            .then(data => {
                const res = data && data.alive;
                this.setState({ isServiceOnline: res });
                return res;
            })
            .catch(e => {
                this.setState({ isServiceOnline: false });
                throw "Service is not available";
            });
    }

    static getEntries() {
        const url = new URL(API_SERVICES.entries, API_HOST);
        return fetch(PROXY_URL + url)
            .then(response => response.json())
            .catch(() => {
                throw "Error in getting entries";
            });
    }

    render() {
        return (
            <div className='container-fluid'>
                <Header />
                <ServiceStatus isServiceOnline={this.state.isServiceOnline} />
                <Table />
            </div>
        );
    }
}

export default App;