import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components'

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
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
class HandicapruleUpdate extends Component {
   constructor(props) {
       super(props)
       this.state = {
           id: this.props.match.params.id,
           rule: '',
       }
   } 

   handleChangeInputRule = async event => {
       const rule = event.target.value
       this.setState({ rule })
   }

   handleUpdateHandicaprule = async () => {
       const { id, rule } = this.state
       const payload = { rule }
       await api.updateHandicapruleById(id, payload).then(res => {
           window.alert('Regra atualizada com sucesso!')
           this.setState({
               rule: ''
           })
       })
   }

   componentDidMount = async () => {
       const { id } = this.state
       const handicaprule = await api.getHandicapruleById(id)

       this.setState({
            rule: handicaprule.data.data.rule
       })
   }

   render() {
       const { rule } = this.state
       return (
           <Wrapper>
               <Label>Regra de Handicap (R$): </Label>
                <InputText
                    type="number"
                    value={rule}
                    onChange={this.handleChangeInputRule}
                />
                <Button onClick={this.handleUpdateHandicaprule}>Atualizar Regra</Button>
                <CancelButton href={'/handicaprule/list'}>Cancelar</CancelButton>
           </Wrapper>
       )
   }
}


export default HandicapruleUpdate