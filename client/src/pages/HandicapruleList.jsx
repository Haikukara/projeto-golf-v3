import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import api from '../api';

import styled from 'styled-components';
import 'react-table-6/react-table.css';



const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

class UpdateHandicaprule extends Component {
    updateUser = event => {
        event.preventDefault()
        window.location.href = `/handicaprule/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update> 
    }
}



class HandicapruleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rules: [],
            columns: [],
            isLoading: false,
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllHandicaprules().then(rules => {
            this.setState({
                rules: rules.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { rules, isLoading } = this.state
        const columns = [
            {
                Header: 'Regra de Handicap',
                accessor: 'rule',
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props){
                    return (
                        <span>
                            <UpdateHandicaprule id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!rules.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable 
                        data={rules}
                        columns={columns}
                        loading={isLoading}
                        showPageSizeOptions={false}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default HandicapruleList;