import React from 'react';

class ServiceStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isServiceOnline } = this.props;
        const statusText = isServiceOnline ? 'Service is online' : 'Service is offline';

        return (
            <div className="service-status">
                <span className={`badge ${isServiceOnline ? 'badge-success' : 'badge-danger'}`}>
                    {statusText}
                </span>
            </div>
        )
    }
}

export default ServiceStatus;