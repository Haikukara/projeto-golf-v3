
import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px ;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class PlayersInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            nickname: '',
            phone: '',
            age: 0,
            handicapAnt: 0,
            handicapAtl: 0,
            dinheiroAc: 0,
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputNickname = async event => {
        const nickname = event.target.value
        this.setState({ nickname })
    }

    handleChangeInputPhone = async event => {
        const phone = event.target.value
        this.setState({ phone })
    }

    handleChangeInputAge = async event => {
        const age = event.target.value
        this.setState({ age })
    }

    handleChangeInputHandicapAnt = async event => {
        const handicapAnt = event.target.value
        this.setState({ handicapAnt })
    }

    handleChangeInputHandicapAtl = async event => {
        const handicapAtl = event.target.value
        this.setState({ handicapAtl })
    }

    handleChangeInputDinheiroAc = async event => {
        const dinheiroAc = event.target.value
        this.setState({ dinheiroAc })
    }

    handleIncludePlayer = async () => {
        const { name, nickname, phone, age, handicapAnt, handicapAtl, dinheiroAc } = this.state
        const payload = { name, nickname, phone, age, handicapAnt, handicapAtl, dinheiroAc }

        await api.insertPlayer(payload).then(res => {
            window.alert(`Jogador criado com sucesso`)
            this.setState({
                name: '',
                nickname: '',
                phone: '',
                age: 0,
                handicapAnt: 0,
                handicapAtl: 0,
                dinheiroAc: 0,
            })
        })
    }

    render() {
        const { name, nickname, phone, age, handicapAnt, handicapAtl, dinheiroAc } = this.state
        return (
            <Wrapper>
                <Title>Criar Jogador</Title>

                <Label>Nome: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />
                <Label>Apelido: </Label>
                <InputText
                    type="text"
                    value={nickname}
                    onChange={this.handleChangeInputNickname}
                />
                <Label>Celular: </Label>
                <InputText
                    type="text"
                    value={phone}
                    onChange={this.handleChangeInputPhone}
                />
                <Label>Idade: </Label>
                <InputText
                    type="number"
                    value={age}
                    onChange={this.handleChangeInputAge}
                />
                <Label>Handicap Anterior: </Label>
                <InputText
                    type="number"
                    value={handicapAnt}
                    onChange={this.handleChangeInputHandicapAnt}
                />
                <Label>Handicap Atual: </Label>
                <InputText
                    type="number"
                    value={handicapAtl}
                    onChange={this.handleChangeInputHandicapAtl}
                />
                <Label>Valor Acumulado (R$): </Label>
                <InputText
                    type="number"
                    value={dinheiroAc}
                    onChange={this.handleChangeInputDinheiroAc}
                />
                <Button onClick={this.handleIncludePlayer}>Adicionar Jogador</Button>
                <CancelButton href={'/players/list'}>Cancelar</CancelButton>
            </Wrapper>          
        )
    }
}

export default PlayersInsert;