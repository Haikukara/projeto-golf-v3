import React, { Component } from 'react'
import ReactTable from 'react-table-6';
import api from '../api';
import jsPDF from 'jspdf';
import "jspdf-autotable";

import styled from 'styled-components';
import 'react-table-6/react-table.css';


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Label = styled.label`
  margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`



class MatchShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            allMatches: [],
            allPlayers: [],
            match: [],
            columns_1: [],
            columns_2: [],
            players_1: [],
            players_2: [],
            betPrice: '',
            first_1: [],
            second_1: [],
            third_1: [],
            first_2: [],
            second_2: [],
            third_2: [],
            day: '',
            firstPrize_1: 0,
            secondPrize_1: 0,
            thirdPrize_1: 0,
            firstPrize_2: 0,
            secondPrize_2: 0,
            thirdPrize_2: 0,
            isLoading: false,
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const { id, match } = this.state
        const matches = await api.getMatchById(id)
        await api.getAllMatches().then(allMatches => {
            this.setState({
                allMatches: allMatches.data.data,
            })
        })
        await api.getAllPlayers().then(allPlayers => {
            this.setState({
                allPlayers: allPlayers.data.data,
            })
        })
        this.setState({
            match: match,
            players_1: matches.data.data.players_1,
            players_2: matches.data.data.players_2,
            betPrice: matches.data.data.betPrice,
            first_1: matches.data.data.first_1,
            second_1: matches.data.data.second_1,
            third_1: matches.data.data.third_1,
            first_2: matches.data.data.first_2,
            second_2: matches.data.data.second_2,
            third_2: matches.data.data.third_2,
            day: matches.data.data.day,
            firstPrize_1: matches.data.data.firstPrize_1,
            secondPrize_1: matches.data.data.secondPrize_1,
            thirdPrize_1: matches.data.data.thirdPrize_1,
            firstPrize_2: matches.data.data.firstPrize_2,
            secondPrize_2: matches.data.data.secondPrize_2,
            thirdPrize_2: matches.data.data.thirdPrize_2,
            isLoading: false,
        })
    }

    createTableData_1 = (players_1, first_1, second_1, third_1) => {
        let tableData_1 = []
        let index = 0
        let primeiro = '-'
        let segundo = '-'
        let terceiro = '-'
        players_1.forEach(item => {
            if (!(first_1[index] === undefined)) {
                primeiro = first_1[index]
            } else {
                primeiro = '-'
            }
            if (!(second_1[index] === undefined)) {
                segundo = second_1[index]
            } else {
                segundo = '-'
            }
            if (!(third_1[index] === undefined)) {
                terceiro = third_1[index]
            } else {
                terceiro = '-'
            }
            tableData_1.push({
                nickname: item.nickname,
                gross: item.grossPartida,
                handicap: item.handicapPartida,
                net: item.netPartida,
                dinheiro: item.dinheiroAcPartida,
                primeiro: primeiro,
                segundo: segundo,
                terceiro: terceiro,
            })
            index++
        })
        return tableData_1
    }

    createTableData_2 = (players_2, first_2, second_2, third_2) => {
        let tableData_2 = []
        let index = 0
        let primeiro = '-'
        let segundo = '-'
        let terceiro = '-'
        players_2.forEach(item => {
            if (!(first_2[index] === undefined)) {
                primeiro = first_2[index]
            } else {
                primeiro = '-'
            }
            if (!(second_2[index] === undefined)) {
                segundo = second_2[index]
            } else {
                segundo = '-'
            }
            if (!(third_2[index] === undefined)) {
                terceiro = third_2[index]
            } else {
                terceiro = '-'
            }
            tableData_2.push({
                nickname: item.nickname,
                gross: item.grossPartida,
                handicap: item.handicapPartida,
                net: item.netPartida,
                dinheiro: item.dinheiroAcPartida,
                primeiro: primeiro,
                segundo: segundo,
                terceiro: terceiro,
            })
            index++
        })
        return tableData_2
    }

    exportPDF = (tableData_1, tableData_2) => {
        const unit = "pt"
        const size = "A4"
        const orientation = "landscape"

        const marginLeft = 40
        const doc_1 = new jsPDF(orientation, unit, size)
        const doc_2 = new jsPDF(orientation, unit, size)
        doc_1.setFontSize(15)
        doc_2.setFontSize(15)
        const title_1 = `1ª Volta \nData: ${this.state.day}   Valor da Aposta: ${this.state.betPrice}   Prêmio 1º: ${this.state.firstPrize_1}   Prêmio 2º: ${this.state.secondPrize_1}   Prêmio 3º: ${this.state.thirdPrize_1}`
        const headers = [["Nome", "Gross", "Handicap", "Net", "Dinheiro Acumulado", "Primeiro Colocado", "Segundo Colocado", "Terceiro Colocado"]]
        const data_1 = tableData_1.map(elt => [elt.nickname, elt.gross, elt.handicap, elt.net, elt.dinheiro, elt.primeiro, elt.segundo, elt.terceiro])
        const title_2 = `2ª Volta \nData: ${this.state.day}   Valor da Aposta: ${this.state.betPrice}   Prêmio 1º: ${this.state.firstPrize_2}   Prêmio 2º: ${this.state.secondPrize_2}   Prêmio 3º: ${this.state.thirdPrize_2}`
        const data_2 = tableData_2.map(elt => [elt.nickname, elt.gross, elt.handicap, elt.net, elt.dinheiro, elt.primeiro, elt.segundo, elt.terceiro])
        let content_1 = {
            startY: 60,
            head: headers,
            body: data_1
        }
        let content_2 = {
            startY: 60,
            head: headers,
            body: data_2
        }

        doc_1.text(title_1, marginLeft, 40)
        doc_1.autoTable(content_1)
        doc_1.save(`${this.state.day}-PrimeiraVolta.pdf`)
        doc_2.text(title_2, marginLeft, 40)
        doc_2.autoTable(content_2)
        doc_2.save(`${this.state.day}-SegundaVolta.pdf`)
    }

    remakeMatch = async () => {
        const { players_1, players_2 } = this.state
        let ids = new Set(players_1.map(d => d.nickname))
        let players_12 = [...players_1, ...players_2.filter(d => !ids.has(d.nickname))]
        let playersUpdate = []
        players_12.forEach(item => {
            const jogadorAtual = this.state.allPlayers.find(player => player.nickname === item.nickname)
            playersUpdate.push({
                id: jogadorAtual._id,
                name: jogadorAtual.name,
                nickname: jogadorAtual.nickname,
                phone: jogadorAtual.phone,
                age: jogadorAtual.age,
                handicapAnt: jogadorAtual.handicapAnt,
                handicapAtl: item.handicapPartida,
                dinheiroAc: item.dinheiroAcPartida,
            })
        })
        for (let item of playersUpdate) {
            const payload = {
                name: item.name,
                nickname: item.nickname,
                phone: item.phone,
                age: item.age,
                handicapAnt: item.handicapAnt,
                handicapAtl: item.handicapAtl,
                dinheiroAc: item.dinheiroAc,
            }

            await api.updatePlayerById(item.id, payload).catch(error => console.log(error.message))
        }
        window.location.href = `/matches/update/${this.state.id}`

    }

    deleteMatch = async () => {
        const { players_1, players_2 } = this.state
        let ids = new Set(players_1.map(d => d.nickname))
        let players_12 = [...players_1, ...players_2.filter(d => !ids.has(d.nickname))]
        let playersUpdate = []
        players_12.forEach(item => {
            const jogadorAtual = this.state.allPlayers.find(player => player.nickname === item.nickname)
            playersUpdate.push({
                id: jogadorAtual._id,
                name: jogadorAtual.name,
                nickname: jogadorAtual.nickname,
                phone: jogadorAtual.phone,
                age: jogadorAtual.age,
                handicapAnt: jogadorAtual.handicapAnt,
                handicapAtl: item.handicapPartida,
                dinheiroAc: item.dinheiroAcPartida,
            })
        })
        for (let item of playersUpdate) {
            const payload = {
                name: item.name,
                nickname: item.nickname,
                phone: item.phone,
                age: item.age,
                handicapAnt: item.handicapAnt,
                handicapAtl: item.handicapAtl,
                dinheiroAc: item.dinheiroAc,
            }

            await api.updatePlayerById(item.id, payload).catch(error => console.log(error.message))
        }
        api.deleteMatchById(this.state.id)
        window.location.href = `/matches/list`
    }


    render() {
        const { match, isLoading } = this.state
        const columns_1 = [
            {
                Header: 'Nome',
                accessor: 'nickname',
            },
            {
                Header: 'Gross',
                accessor: 'gross',
            },
            {
                Header: 'Handicap',
                accessor: 'handicap',
            },
            {
                Header: 'Net',
                accessor: 'net',
            },
            {
                Header: 'Dinheiro Acumulado',
                accessor: 'dinheiro',
            },
            {
                Header: 'Primeiro Colocado',
                accessor: 'primeiro',
            },
            {
                Header: 'Segundo Colocado',
                accessor: 'segundo',
            },
            {
                Header: 'Terceiro Colocado',
                accessor: 'terceiro',
            },
        ]
        const columns_2 = [
            {
                Header: 'Nome',
                accessor: 'nickname',
            },
            {
                Header: 'Gross',
                accessor: 'gross',
            },
            {
                Header: 'Handicap',
                accessor: 'handicap',
            },
            {
                Header: 'Net',
                accessor: 'net',
            },
            {
                Header: 'Dinheiro Acumulado',
                accessor: 'dinheiro',
            },
            {
                Header: 'Primeiro Colocado',
                accessor: 'primeiro',
            },
            {
                Header: 'Segundo Colocado',
                accessor: 'segundo',
            },
            {
                Header: 'Terceiro Colocado',
                accessor: 'terceiro',
            },
        ]
        let tableData_1 = this.createTableData_1(this.state.players_1, this.state.first_1, this.state.second_1, this.state.third_1)
        let tableData_2 = this.createTableData_2(this.state.players_2, this.state.first_2, this.state.second_2, this.state.third_2)
        let showTable_1 = true
        let showTable_2 = true
        if (!this.state.players_1.length) {
            showTable_2 = false
        }
        if (!this.state.players_2.length) {
            showTable_2 = false
        }
        let showRmkMatch = true
        try {
            if (this.state.id === this.state.allMatches[this.state.allMatches.length - 1]._id) {
                showRmkMatch = false
            }
        } catch (error) {
            console.log(error.message)
        }
        return (
            <Wrapper>
                <Title>1ª Volta</Title>
                <Label>Data: {this.state.day}</Label> <Label>Valor da Aposta: {this.state.betPrice}</Label> <Label>Prêmio 1º: {this.state.firstPrize_1}</Label> <Label>Prêmio 2º: {this.state.secondPrize_1}</Label> <Label>Prêmio 3º: {this.state.thirdPrize_1}</Label>
                {showTable_1 && (
                    <ReactTable
                        data={tableData_1}
                        columns={columns_1}
                        loading={isLoading}
                        defaultPageSize={50}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
                <Title>2ª Volta</Title>
                <Label>Data: {this.state.day}</Label> <Label>Valor da Aposta: {this.state.betPrice}</Label> <Label>Prêmio 1º: {this.state.firstPrize_2}</Label> <Label>Prêmio 2º: {this.state.secondPrize_2}</Label> <Label>Prêmio 3º: {this.state.thirdPrize_2}</Label>
                {showTable_2 && (
                    <ReactTable
                        data={tableData_2}
                        columns={columns_2}
                        loading={isLoading}
                        defaultPageSize={50}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
                <p></p>
                <Button onClick={() => this.exportPDF(tableData_1, tableData_2)}>PDF</Button>
                <Button onClick={this.remakeMatch} disabled={showRmkMatch}>Refazer Partida</Button>
                <Button  onClick={this.deleteMatch} disabled={showRmkMatch}>Deletar Partida</Button>
            </Wrapper>
        )
    }
}

export default MatchShow