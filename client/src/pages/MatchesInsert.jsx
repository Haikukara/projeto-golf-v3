import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components'
import api from '../api';
import Table from "react-table-6";
import selectTableHOC from "react-table-6/lib/hoc/selectTable";
import "react-table-6/react-table.css";

const Title = styled.h1.attrs({
  className: 'h1',
})``

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
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
const InputDate = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px 0 5px;
`
const InputNumber = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px 0 5px;
`

const SelectTable = selectTableHOC(Table);

class MatchesInsert extends Component {
  static defaultProps = {
    keyField: "nickname"
  };

  static propTypes = {
    keyField: PropTypes.string
  };

  /**
   * Toggle a single checkbox for select table
   */
  toggleSelection = (key, shift, row) => {
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);

    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  /**
   * Toggle all checkboxes for select table
   */
  toggleAll = () => {
    const { keyField } = this.props;
    const selectAll = !this.state.selectAll;
    const selection = [];

    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(`select-${item._original[keyField]}`);
      });
    }
    this.setState({ selectAll, selection });
  };

  /**
   * Whether or not a row is selected for select table
   */
  isSelected = key => {
    return this.state.selection.includes(`select-${key}`);
  };

  rowFn = (state, rowInfo, column, instance) => {
    const { selection } = this.state;

    return {
      onClick: (e, handleOriginal) => {


        // IMPORTANT! React-Table uses onClick internally to trigger
        // events like expanding SubComponents and pivots.
        // By default a custom 'onClick' handler will override this functionality.
        // If you want to fire the original onClick handler, call the
        // 'handleOriginal' function.
        if (handleOriginal) {
          handleOriginal();
        }
      },
      style: {
        background:
          rowInfo &&
          selection.includes(`select-${rowInfo.original.nickname}`) &&
          "lightgreen"
      }
    };
  };



  constructor(props) {
    super(props);

    const isChecked = this.props.match.params.checkbox === 'true';
    this.state = {
      selectAll: false,
      selection: [],
      players: [],
      columns: [],
      isLoading: false,
      day: '',
      betPrice: '',
      gross_1: [],
      gross_2: [],
      net_1: [],
      net_2: [],
      checkbox2lugar: isChecked,
      checkbox3lugar: isChecked,
      checkbox2lugar2Volta: isChecked,
      checkbox3lugar2Volta: isChecked,
      disableCheckbox: true,
      disableCheckbox2Volta: true,
      handicaprule: 0,
    };
  }



  componentDidMount = async () => {
    this.setState({ isLoading: true })

    await api.getAllHandicaprules().then(handicaprule => {
      this.setState({
        handicaprule: handicaprule.data.data[0].rule
      })
    })

    await api.getAllPlayers().then(players => {
      this.setState({
        players: players.data.data,
        isLoading: false,
      })
    })
 
  }

  handleChangeInputGross1 = (index) => async event => {
    this.state.gross_1[index] = event.target.value
  }

  handleChangeInputGross2 = (index) => async event => {
    this.state.gross_2[index] = event.target.value
  }

  handleChangeBetPrice = async event => {
    const betPrice = event.target.value
    this.setState({ betPrice })
  }

  handleChangeDay = async event => {
    let data = event.target.value
    let data1 = data.slice(0,10)
    let data2 = data1.slice(8, 10)
    let data3 = data1.slice(4, 8)
    let data4 = data1.slice(0, 4)
    let day = ''
    day = day.concat(data2, data3, data4)
    this.setState({ day })
  }

  handleChangeCheckbox2Lugar = async event => {
    this.setState({
      checkbox2lugar: !this.state.checkbox2lugar
    });
    if (!this.state.checkbox2lugar) {
      this.setState({
        disableCheckbox: this.state.checkbox2lugar
      })
    } else {
      this.setState({
        disableCheckbox: this.state.checkbox2lugar,
        checkbox3lugar: !this.state.checkbox2lugar
      })
    }
  }

  handleChangeCheckbox3Lugar = async event => {
    this.setState({
      checkbox3lugar: !this.state.checkbox3lugar
    });
  }

  handleChangeCheckbox2Lugar2Volta = async event => {
    this.setState({
      checkbox2lugar2Volta: !this.state.checkbox2lugar2Volta
    });
    if (!this.state.checkbox2lugar2Volta) {
      this.setState({
        disableCheckbox2Volta: this.state.checkbox2lugar2Volta
      })
    } else {
      this.setState({
        disableCheckbox2Volta: this.state.checkbox2lugar2Volta,
        checkbox3lugar2Volta: !this.state.checkbox2lugar2Volta
      })
    }
  }

  handleChangeCheckbox3Lugar2Volta = async event => {
    this.setState({
      checkbox3lugar2Volta: !this.state.checkbox3lugar2Volta
    });
  }

  handleIncludeMatch = async () => {
    const { selection, players, day, betPrice, gross_1, gross_2, net_1, net_2, checkbox2lugar, checkbox3lugar, checkbox2lugar2Volta, checkbox3lugar2Volta, handicaprule } = this.state
    let betPriceInt = parseInt(betPrice, 10)
    let playersUpdate = []
    let players_1 = []
    let players_2 = []
    if (day === '') {
      return window.alert('Favor especificar a data da partida')
    }
    if (betPrice === '' || betPrice === "0" || betPrice === undefined){
      return window.alert('Favor especificar um valor de aposta')
    }
    if (selection.length < 2) {
      return window.alert(`Selecionar ao menos 2 jogadores`)
    }
    let totalPlayers_1 = 0
    let totalPlayers_2 = 0
    
    for (const [idx, value] of Object.entries(gross_1)) {
      if (selection.includes(`select-${idx}`)) {
        if (!(value === undefined || value === "" || value === "0")){
          totalPlayers_1++
          const jogadorAtual = players.find(player => player.nickname === idx);
          let net = parseInt(value, 10) -  jogadorAtual.handicapAtl
          net_1.push({valor: net, nickname: jogadorAtual.nickname})
          players_1.push({
            nickname: jogadorAtual.nickname,
            handicapPartida: jogadorAtual.handicapAtl,
            grossPartida: value,
            netPartida: net,     
            dinheiroAcPartida: jogadorAtual.dinheiroAc     
          })
        }
      } 
    }
    for (const [idx, value] of Object.entries(gross_2)) {
      if (selection.includes(`select-${idx}`)) {
        if (!(value === undefined || value === "" || value === "0")){
          totalPlayers_2++
          const jogadorAtual2 = players.find(player => player.nickname === idx);
          let net2 = parseInt(value, 10) -  jogadorAtual2.handicapAtl
          net_2.push({valor: net2, nickname: jogadorAtual2.nickname})
          players_2.push({
            nickname: jogadorAtual2.nickname,
            handicapPartida: jogadorAtual2.handicapAtl,
            grossPartida: value,
            netPartida: net2,     
            dinheiroAcPartida: jogadorAtual2.dinheiroAc     
          })
        }
      } 
    }
    let totalMoney_1 = betPriceInt * totalPlayers_1
    let totalMoney_2 = betPriceInt * totalPlayers_2
    let net_1ordenado = net_1
    let net_2ordenado = net_2
    net_1ordenado.sort((a,b) => {
      if(a.valor < b.valor)
        return -1;
      if(a.valor > b.valor)
        return 1;
      return 0;
    });
    net_2ordenado.sort((a,b) => {
      if(a.valor < b.valor)
        return -1;
      if(a.valor > b.valor)
        return 1;
      return 0;
    })
    let first_1 = []
    let second_1 = []
    let third_1 = []
    let thirdPrize_1
    let secondPrize_1
    let firstPrize_1
    let secondScore_1
    let thirdScore_1
    let first_2 = []
    let second_2 = []
    let third_2 = []
    let thirdPrize_2
    let secondPrize_2
    let firstPrize_2
    let secondScore_2
    let thirdScore_2
    let topScore_1
    let topScore_2
    let segundaVolta = true
    let primeiraVolta = true
    if (net_2ordenado.length === 0) {
      segundaVolta = false
    } else {
      topScore_2 = net_2ordenado[0].valor
    }
    if (net_1ordenado.length === 0) {
      primeiraVolta = false
    } else {
      topScore_1 = net_1ordenado[0].valor
    }
    for (let i = 0; i < net_1ordenado.length; i++){
      if (net_1ordenado[i].valor === topScore_1) {
        const jogadorAtual = players.find(player => player.nickname === net_1ordenado[i].nickname);
        first_1.push(jogadorAtual.nickname)
        try{
            secondScore_1 = net_1ordenado[i+1].valor
        } catch (e){
          break
        }
      }else if (net_1ordenado[i].valor === secondScore_1){
        const jogadorAtual = players.find(player => player.nickname === net_1ordenado[i].nickname);
        second_1.push(jogadorAtual.nickname)
        try{
          thirdScore_1 = net_1ordenado[i+1].valor
        } catch (e) {
          break
        }
      }else if (net_1ordenado[i].valor === thirdScore_1){
        const jogadorAtual = players.find(player => player.nickname === net_1ordenado[i].nickname);
        third_1.push(jogadorAtual.nickname) 
      }else{
        break
      }
    }
    let temSegundo_1
    let temTerceiro_1
    if (second_1.length === 0){
      temSegundo_1 = false
    }else{
      temSegundo_1 = true
    }
    if (third_1.length === 0){
      temTerceiro_1 = false
    }else{
      temTerceiro_1 = true
    }
    let restFirst_1 = 0
    let restSecond_1 = 0
    let restThird_1 = 0
    if (primeiraVolta) {
      if (checkbox3lugar) {
        if (first_1.length === 1){
          if (second_1.length === 1){
            if (temTerceiro_1) {
              firstPrize_1 = totalMoney_1 - (betPriceInt * 3)
              secondPrize_1 = betPriceInt * 2
              thirdPrize_1 = Math.floor(betPriceInt / third_1.length)
              restThird_1 = betPriceInt % third_1.length
            }else{
              firstPrize_1 = totalMoney_1 - betPriceInt
              secondPrize_1 = betPriceInt
              thirdPrize_1 = 0
            }
          }else{
            firstPrize_1 = totalMoney_1 - (betPriceInt * 3)
            secondPrize_1 = Math.floor((betPriceInt * 3) / second_1.length)
            thirdPrize_1 = 0
            restSecond_1 = (betPriceInt * 3) % second_1.length
          } 
        }else if(first_1.length === 2) {
            if (temSegundo_1) {
              firstPrize_1 = Math.floor((totalMoney_1 - betPriceInt) / 2)
              secondPrize_1 = Math.floor(betPriceInt / second_1.length)
              thirdPrize_1 = 0
              restFirst_1 = (totalMoney_1 - betPriceInt) % 2
              restSecond_1 = betPriceInt % second_1.length
            }else {
              firstPrize_1 = Math.floor(totalMoney_1 / 2)
              secondPrize_1 = 0
              thirdPrize_1 = 0
              restFirst_1 = totalMoney_1 % 2
            }
        }else{
          firstPrize_1 = Math.floor(totalMoney_1 / first_1.length)
          secondPrize_1 = 0
          thirdPrize_1 = 0
          restFirst_1 = totalMoney_1 % first_1.length
        }
      }else if (checkbox2lugar){
        if (first_1.length === 1){
          firstPrize_1 = totalMoney_1 - betPriceInt
          secondPrize_1 = Math.floor(betPriceInt / second_1.length)
          thirdPrize_1 = 0
          restSecond_1 = betPriceInt % second_1.length
        }else{
          firstPrize_1 = Math.floor(totalMoney_1 / first_1.length)
          secondPrize_1 = 0
          thirdPrize_1 = 0
          restFirst_1 = totalMoney_1 % first_1.length
        }
      }else{
        firstPrize_1 = Math.floor(totalMoney_1 / first_1.length)
        secondPrize_1 = 0
        thirdPrize_1 = 0
        restFirst_1 = totalMoney_1 % first_1.length
      }
    }else{
      firstPrize_1 = 0
      secondPrize_1 = 0
      thirdPrize_1 = 0
    }

    for (let i = 0; i < net_2ordenado.length; i++){
      if (net_2ordenado[i].valor === topScore_2) {
        const jogadorAtual2 = players.find(player => player.nickname === net_2ordenado[i].nickname);
        first_2.push(jogadorAtual2.nickname)
        try{
            secondScore_2 = net_2ordenado[i+1].valor
        } catch (e){
          break
        }
      }else if (net_2ordenado[i].valor === secondScore_2){
        const jogadorAtual2 = players.find(player => player.nickname === net_2ordenado[i].nickname);
        second_2.push(jogadorAtual2.nickname)
        try{
          thirdScore_2 = net_2ordenado[i+1].valor
        } catch (e) {
          break
        }
      }else if (net_2ordenado[i].valor === thirdScore_2){
        const jogadorAtual2 = players.find(player => player.nickname === net_2ordenado[i].nickname);
        third_2.push(jogadorAtual2.nickname) 
      }else{
        break
      }
    }
    let temSegundo_2
    let temTerceiro_2
    if (second_2.length === 0){
      temSegundo_2 = false
    }else{
      temSegundo_2 = true
    }
    if (third_2.length === 0){
      temTerceiro_2 = false
    }else{
      temTerceiro_2 = true
    }
    let restFirst_2 = 0
    let restSecond_2 = 0
    let restThird_2 = 0
    if (segundaVolta) {
      if (checkbox3lugar2Volta) {
        if (first_2.length === 1){
          if (second_2.length === 1){
            if (temTerceiro_2) {
              firstPrize_2 = totalMoney_2 - (betPriceInt * 3)
              secondPrize_2 = betPriceInt * 2
              thirdPrize_2 = Math.floor(betPriceInt / third_2.length)
              restThird_2 = betPriceInt % third_2.length
            }else{
              firstPrize_2 = totalMoney_2 - betPriceInt
              secondPrize_2 = betPriceInt
              thirdPrize_2 = 0
            }
          }else{
            firstPrize_2 = totalMoney_2 - (betPriceInt * 3)
            secondPrize_2 = Math.floor((betPriceInt * 3) / second_2.length)
            thirdPrize_2 = 0
            restSecond_2 = (betPriceInt * 3) % second_2.length
          } 
        }else if(first_2.length === 2) {
            if (temSegundo_2) {
              firstPrize_2 = Math.floor((totalMoney_2 - betPriceInt) / 2)
              secondPrize_2 = Math.floor(betPriceInt / second_2.length)
              thirdPrize_2 = 0
              restFirst_2 = (totalMoney_2 - betPriceInt) % 2
              restSecond_2 = betPriceInt % second_2.length
            }else {
              firstPrize_2 = Math.floor(totalMoney_2 / 2)
              secondPrize_2 = 0
              thirdPrize_2 = 0
              restFirst_2 = totalMoney_2 % 2
            }
        }else{
          firstPrize_2 = Math.floor(totalMoney_2 / first_2.length)
          secondPrize_2 = 0
          thirdPrize_2 = 0
          restFirst_2 = totalMoney_2 % first_2.length
        }
      }else if (checkbox2lugar2Volta){
        if (first_2.length === 1){
          firstPrize_2 = totalMoney_2 - betPriceInt
          secondPrize_2 = Math.floor(betPriceInt / second_2.length)
          thirdPrize_2 = 0
          restSecond_2 = betPriceInt % second_2.length
        }else{
          firstPrize_2 = Math.floor(totalMoney_2 / first_2.length)
          secondPrize_2 = 0
          thirdPrize_2 = 0
          restFirst_2 = totalMoney_2 % first_2.length
        }
      }else{
        firstPrize_2 = Math.floor(totalMoney_2 / first_2.length)
        secondPrize_2 = 0
        thirdPrize_2 = 0
        restFirst_2 = totalMoney_2 / first_2.length
      }
    }else{
      firstPrize_2 = 0
      secondPrize_2 = 0
      thirdPrize_2 = 0
    }
    let flagrestFirst_1 = true
    let flagrestSecond_1 = true 
    let flagrestThird_1 = true
    net_1.forEach(item => {
      players.find(player => player.nickname === item.nickname).dinheiroAc -= betPriceInt
      if (first_1.includes(item.nickname)) {
        if (flagrestFirst_1){
          players.find(player => player.nickname === item.nickname).dinheiroAc += restFirst_1
          flagrestFirst_1 = false
        }
        players.find(player => player.nickname === item.nickname).dinheiroAc += firstPrize_1
      }else if (second_1.includes(item.nickname)) {
        if (flagrestSecond_1) {
          players.find(player => player.nickname === item.nickname).dinheiroAc += restSecond_1
          flagrestSecond_1 = false
        }
        players.find(player => player.nickname === item.nickname).dinheiroAc += secondPrize_1
      }else if (third_1.includes(item.nickname)){
        if (flagrestThird_1) {
          players.find(player => player.nickname === item.nickname).dinheiroAc += restThird_1
          flagrestThird_1 = false
        }
        players.find(player => player.nickname === item.nickname).dinheiroAc += thirdPrize_1
      }
    })
    let flagrestFirst_2 = true
    let flagrestSecond_2 = true
    let flagrestThird_2 = true
    net_2.forEach(item => {
      players.find(player => player.nickname === item.nickname).dinheiroAc -= betPriceInt
      if (first_2.includes(item.nickname)) {
        if (flagrestFirst_2) {
          players.find(player => player.nickname === item.nickname).dinheiroAc += restFirst_2
          flagrestFirst_2 = false
        }
        players.find(player => player.nickname === item.nickname).dinheiroAc += firstPrize_2
      }else if (second_2.includes(item.nickname)) {
        if (flagrestSecond_2) {
          players.find(player => player.nickname === item.nickname).dinheiroAc += restSecond_2
          flagrestSecond_2 = false
        }
        players.find(player => player.nickname === item.nickname).dinheiroAc += secondPrize_2
      }else if (third_2.includes(item.nickname)){
        if (flagrestThird_2) {
          players.find(player => player.nickname === item.nickname).dinheiroAc += restThird_2
          flagrestThird_2 = false
        }
        players.find(player => player.nickname === item.nickname).dinheiroAc += thirdPrize_2
      }
    })
    players.forEach(item => {
      let handicapAntUpdate = item.handicapAnt
      let handicapAtlUpdate = item.handicapAtl
      let dinheiroAcUpdate = item.dinheiroAc
      if (dinheiroAcUpdate >= handicaprule * 1.5){
        handicapAntUpdate = item.handicapAtl
        handicapAtlUpdate -= 1
        dinheiroAcUpdate = 0
      }else if (dinheiroAcUpdate <= handicaprule * -1){
        handicapAntUpdate = item.handicapAtl
        handicapAtlUpdate += 1
        dinheiroAcUpdate = 0
      }
      playersUpdate.push({
        id: item._id,
        name: item.name,
        nickname: item.nickname,
        phone: item.phone,
        age: item.age,
        handicapAnt: handicapAntUpdate,
        handicapAtl: handicapAtlUpdate,
        dinheiroAc: dinheiroAcUpdate,
      })
    })
     
    if (window.confirm(
        `
        Confirma a criação de partida com esses dados?
        `
    )){
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
  
      const payload = {
        players_1,
        players_2,
        totalPlayers_1,
        totalPlayers_2,
        betPrice,
        first_1,
        second_1,
        third_1,
        first_2,
        second_2,
        third_2,
        day,
        firstPrize_1,
        secondPrize_1,
        thirdPrize_1,
        firstPrize_2,
        secondPrize_2,
        thirdPrize_2,
      }
      await api.insertMatch(payload).then(res => {
        alert(`
        Partida criada com sucesso!
        Resultado:
        1ª Volta
          1º Lugar: ${first_1} --> Prêmio: ${firstPrize_1} Resto: ${restFirst_1} para ${first_1[0]}.
          2º Lugar: ${second_1} --> Prêmio: ${secondPrize_1} Resto: ${restSecond_1} para ${second_1[0]}
          3º Lugar: ${third_1} --> Prêmio: ${thirdPrize_1} Resto: ${restThird_1} para ${third_1[0]}
        2ª Volta
          1º Lugar: ${first_2} --> Prêmio: ${firstPrize_2} Resto: ${restFirst_2} para ${first_2[0]}.
          2º Lugar: ${second_2} --> Prêmio: ${secondPrize_2} Resto: ${restSecond_2} para ${second_2[0]}
          3º Lugar: ${third_2} --> Prêmio: ${thirdPrize_2} Resto: ${restThird_2} para ${third_2[0]}
        `)
        window.location.reload()
      })
    }

  }

  render() {
    const context = this
    const { players, isLoading, day, betPrice, gross_1, gross_2, net_1, net_2, checkbox2lugar, checkbox3lugar, disableCheckbox, checkbox2lugar2Volta, checkbox3lugar2Volta, disableCheckbox2Volta, handicaprule } = this.state
    const columns = [
      {
        Header: 'Apelido',
        accessor: 'nickname',
        filterable: true,
      },
      {
        Header: 'Handicap',
        accessor: 'handicapAtl',
        filterable: false,
      },
      {
        Header: '1ª Volta (Gross)',
        accessor: '',
        Cell: function (props) {
          return (
            <InputNumber
              value={context.state.teste}
              type="number"
              onChange={context.handleChangeInputGross1(props.original.nickname)}
            />
          )
        },
      },
      {
        Header: '2ª Volta (Gross)',
        accessor: '',
        Cell: function (props) {
          return (
            <InputNumber
              type="number"
              onChange={context.handleChangeInputGross2(props.original.nickname)}
            />
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
        <Title>Selecionar Jogadores</Title>
        {showTable && (
          <SelectTable
            {...this.props}
            ref={r => (this.checkboxTable = r)}
            toggleSelection={this.toggleSelection}
            selectAll={this.state.selectAll}
            selectType="checkbox"
            toggleAll={this.toggleAll}
            isSelected={this.isSelected}
            getTrProps={this.rowFn}
            data={players}
            columns={columns}
            loading={isLoading}
            defaultPageSize={players.length}
            minRows={0}
            keyField="nickname"
            showPagination={false}
          />
        )}
        <InputDate type="date" onChange={this.handleChangeDay} />
        <InputNumber placeholder="Valor da Aposta" type="number" onChange={this.handleChangeBetPrice} />
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="segundolugar" checked={this.state.checkbox2lugar} onChange={this.handleChangeCheckbox2Lugar} />
          <label class="form-check-label" for="segundolugar">
            2º Lugar (1ª Volta)
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="terceirolugar" checked={this.state.checkbox3lugar} disabled={this.state.disableCheckbox} onChange={this.handleChangeCheckbox3Lugar} />
          <label class="form-check-label" for="terceirolugar">
            3º Lugar (1ª Volta)
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="segundolugar2volta" checked={this.state.checkbox2lugar2Volta} onChange={this.handleChangeCheckbox2Lugar2Volta} />
          <label class="form-check-label" for="segundolugar2volta">
            2º Lugar (2ª Volta)
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="terceirolugar2volta" checked={this.state.checkbox3lugar2Volta} disabled={this.state.disableCheckbox2Volta} onChange={this.handleChangeCheckbox3Lugar2Volta} />
          <label class="form-check-label" for="terceirolugar2volta">
            3º Lugar (2ª Volta)
          </label>
        </div>
        <Button onClick={this.handleIncludeMatch}>Criar Partida</Button>
        <CancelButton href={'/matches/list'}>Cancelar</CancelButton>
      </Wrapper>
    );
  }
}

export default MatchesInsert;
