import React, { Component } from 'react'
import ReactTable from 'react-table-6';
import api from '../api';

import styled from 'styled-components';
import 'react-table-6/react-table.css';

const Show = styled.div`
    color: #009900;
    cursor: pointer;
`

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class ShowMatch extends Component {
    showPartida = event => {
        event.preventDefault()
        window.location.href = `/match/${this.props.id}`
    }

    render() {
        return <Show onClick={this.showPartida}>Show</Show>
    }
}

class MatchesList extends Component {
    constructor(props){
        super(props)
        this.state = {
            matches: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllMatches().then(matches => {
            this.setState({
                matches: matches.data.data,
                isLoading: false
            })
        })    
    }

    render() {
        const { matches, isLoading } = this.state
        const columns = [
            {
                Header: 'Data',
                accessor: 'day',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props){
                    return (
                        <span>
                            <ShowMatch id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!matches.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable 
                        data={matches}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={50}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default MatchesList