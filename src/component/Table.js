import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import App from '../App';
import 'react-table/react-table.css';

class Table extends React.Component {
    constructor(props) {
        super(props);

        let columns = ['API', 'Auth', 'Category', 'Cors', 'Description', 'HTTPS', 'Link'];
        columns = this.prepareColumns(columns);

        this.state = {
            data: [],
            columns: columns,
            pageSize: 1,
            loading: true
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    prepareColumns(columns) {
        return columns.map(column => { 
            const result = {
                Header: column, 
                accessor: column
            }

            if(column === 'Link'){
                result.Cell = row => {
                    if(row.value){
                        return (<a href={row.value} target='_blank'>{row.value}</a>);
                    }
                };
            }
            
            return result;
        });
    }
    
    fetchData() {
        this.setState({ loading: true });

        App.checkServiceAvailability().then(() => {
            App.getEntries()
                .then(res => {
                    this.setState({
                        data: res.entries || [],
                        pageSize: res.count || 1 ,
                        loading: false
                    });
                })
                .catch(() => this.setState({ data: [], loading: false }));
            })
            .catch(() => {
                this.setState({ data: [], loading: false });
            });
    }

    customFilterMethod(filter, row, column) {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value) : true
    }

    render() {
        const { columns, data, pageSize, loading } = this.state;

        return (
            <ReactTable
                columns={columns}
                data={data}
                loading={loading}
                showPagination={false}
                pageSize={pageSize}
                resizable={false}
                filterable={true}
                noDataText={'No entries found. Service is not available.'}
                className="-striped -highlight"
                defaultFilterMethod={this.customFilterMethod}
                onFilteredChange={
                    (column, value) => {
                        console.log(column);
                        console.log(value);
                    }
                }
            />
        );
    }
}

export default Table;