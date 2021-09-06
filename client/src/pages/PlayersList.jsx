import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import api from '../api';

import styled from 'styled-components';
import 'react-table-6/react-table.css';
import jsPDF from 'jspdf';
import "jspdf-autotable";



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

const Button = styled.button.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
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
            lastMatchDay: '',
        }
    }

    createTableData = (players) => {
        let tableData = [];
        players.forEach(item => {
            tableData.push({
                name: item.name,
                nickname: item.nickname,
                phone: item.phone,
                age: item.age,
                handicapAnt: item.handicapAnt,
                handicapAtl: item.handicapAtl,
                dinheiroAc: item.dinheiroAc,
            })
        })
        return tableData
    }

    exportPDF = (tableData, lastMatchDay) => {
        const unit = "pt"
        const size = "A4"
        const orientation = "landscape"
        const marginLeft = 40
        const PDF = new jsPDF(orientation, unit, size)
        PDF.setFontSize(15)
        const title = `Dados após última partida! (Data da última partida: ${lastMatchDay})`
        const headers = [["Nome", "Apelido", "Handicap Anterior", "Handicap Atual", "Dinheiro Acumulado (R$)"]]
        const data = tableData.map(elt => [elt.name, elt.nickname, elt.handicapAnt, elt.handicapAtl, elt.dinheiroAc])
        let content = {
            startY: 60,
            head: headers,
            body: data
        }
        PDF.text(title, marginLeft, 40)
        PDF.autoTable(content)
        PDF.save(`${lastMatchDay}-TabelaJogadores.pdf`)
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllPlayers().then(players => {
            this.setState({
                players: players.data.data,
            })
        })
        await api.getAllMatches().then(allMatches => {
            this.setState({
                lastMatchDay: allMatches.data.data[allMatches.data.data.length -1].day,
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
        let tableData = this.createTableData(this.state.players)
        let showTable = true
        if (!players.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable 
                        data={tableData}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={50}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
                <Button onClick={() => this.exportPDF(tableData, this.state.lastMatchDay)}>PDF</Button>
            </Wrapper>
        )
    }
};

export default PlayersList;