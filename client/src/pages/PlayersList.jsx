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
const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdatePlayer extends Component {
    updateUser = event => {
        event.preventDefault()
        window.location.href = `/players/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeletePlayer extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Voce quer deletar o jogador ${this.props.name} permanentemente?`
            )
        ) {
            api.deletePlayerById(this.props.id)
            window.location.reload()
        }   

    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }

}


class PlayersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllPlayers().then(players => {
            this.setState({
                players: players.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { players, isLoading } = this.state

        const columns = [
            {
                Header: 'Nome',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Apelido',
                accessor: 'nickname',
                filterable: true,
            },
            {
                Header: 'Celular',
                accessor: 'phone',
            },
            {
                Header: 'Idade',
                accessor: 'age',
            },
            {
                Header: 'Handicap Anterior',
                accessor: 'handicapAnt',
            },
            {
                Header: 'Handicap Atual',
                accessor: 'handicapAtl',
            },
            {
                Header: 'Dinheiro Acumulado (R$)',
                accessor: 'dinheiroAc',
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props){
                    return (
                        <span>
                            <DeletePlayer id={props.original._id} name={props.original.name} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props){
                    return (
                        <span>
                            <UpdatePlayer id={props.original._id} />
                        </span>
                    )
                },
            },
        ]
        
        let showTable = true
        if (!players.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable 
                        data={players}
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
};

export default PlayersList;