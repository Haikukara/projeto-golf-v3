import React from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import api, { getAllHandicaprules, getAllPlayers } from '../api'

const Title = styled.h1.attrs({
  className: 'h1',
})``

const Label = styled.label`
margin: 5px;
`
const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 1px;
`
const InputDate = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px 0 5px;
`

const CancelButton = styled.button.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`
const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

async function pegarMatch(id) {
  const match = await api.getMatchById(id)
  return match
}

function createTableData_1(match) {
  let players_1 = []
  players_1 = match.data.data.players_1
  let tableData_1 = []
  players_1.forEach(item => {
    tableData_1.push({
      nickname: item.nickname,
      gross: item.grossPartida,
      handicap: item.handicapPartida,
    })
  });
  return tableData_1
}

function createTableData_2(match) {
  let players_2 = []
  players_2 = match.data.data.players_2
  let tableData_2 = []
  players_2.forEach(item => {
    tableData_2.push({
      nickname: item.nickname,
      gross: item.grossPartida,
      handicap: item.handicapPartida,
    })
  });
  return tableData_2
}


function MatchesUpdate(mat) {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'nickname',
      },
      {
        Header: 'Handicap',
        accessor: 'handicap',
      },
      {
        Header: 'Gross',
        accessor: 'gross',
      },
    ],
    []
  )
  const id = mat.match.params.id
  const [data, setData] = React.useState([])
  const [data2, setData2] = React.useState([])
  const [betPrice, setBetPrice] = React.useState("")
  const [day, setDay] = React.useState("")
  const [checkbox2lugar, setCheckbox2lugar] = React.useState(false)
  const [checkbox3lugar, setCheckbox3lugar] = React.useState(false)
  const [checkbox2lugar2volta, setCheckbox2lugar2volta] = React.useState(false)
  const [checkbox3lugar2volta, setCheckbox3lugar2volta] = React.useState(false)
  const [disableCheckbox, setDisableCheckbox] = React.useState(false)
  const [disableCheckbox2volta, setDisableCheckbox2volta] = React.useState(false)
  const [players, setPlayers] = React.useState([])
  const [handicaprule, setHandicaprule] = React.useState("")
  let _original2 = null;
  let _original = null;

  React.useEffect(() => {
    async function fetchData() {
      const allplayers = await getAllPlayers()
      const match = await pegarMatch(id);
      const handicap = await getAllHandicaprules()
      _original = createTableData_1(match)
      _original2 = createTableData_2(match)
      setHandicaprule(handicap.data.data[0].rule)
      setPlayers(allplayers.data.data)
      setData(_original);
      setData2(_original2)
      setBetPrice(match.data.data.betPrice)
      setDay(match.data.data.day)
      if (match.data.data.secondPrize_1 === 0) {
        setCheckbox2lugar(false)
        setCheckbox3lugar(false)
        setDisableCheckbox(true)
      } else if (match.data.data.thirdPrize_1 === 0) {
        setCheckbox2lugar(true)
        setCheckbox3lugar(false)
        setDisableCheckbox(false)
      } else {
        setCheckbox2lugar(true)
        setCheckbox3lugar(true)
        setDisableCheckbox(false)
      }
      if (match.data.data.secondPrize_2 === 0) {
        setCheckbox2lugar2volta(false)
        setCheckbox3lugar2volta(false)
        setDisableCheckbox2volta(true)
      } else if (match.data.data.thirdPrize_2 === 0) {
        setCheckbox2lugar2volta(true)
        setCheckbox3lugar2volta(false)
        setDisableCheckbox2volta(false)
      } else {
        setCheckbox2lugar2volta(true)
        setCheckbox3lugar2volta(true)
        setDisableCheckbox2volta(false)
      }
    }
    fetchData();
  }, []);
  const [originalData] = React.useState(_original)
  const [skipPageReset, setSkipPageReset] = React.useState(false)
  let day2 = day
  let day3 = day2.slice(0, 10)
  let day4 = day3.slice(6, 10)
  let day5 = day3.slice(2, 6)
  let day6 = day3.slice(0, 2)
  let dayPartida = ''
  dayPartida = dayPartida.concat(day4, day5, day6)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data2])
  const handleChangeInputBetPrice = async event => {
    setBetPrice(event.target.value)
  }
  const handleChangeDay = async event => {
    let dat = event.target.value
    let dat1 = dat.slice(0, 10)
    let dat2 = dat1.slice(8, 10)
    let dat3 = dat1.slice(4, 8)
    let dat4 = dat1.slice(0, 4)
    let day = ''
    day = day.concat(dat2, dat3, dat4)
    setDay(day)
  }
  const handleChangeCheckbox2Lugar = async event => {
    setCheckbox2lugar(!checkbox2lugar)
    if (!checkbox2lugar) {
      setDisableCheckbox(checkbox2lugar)
    } else {
      setDisableCheckbox(checkbox2lugar)
      setCheckbox3lugar(!checkbox2lugar)
    }
  }
  const handleChangeCheckbox3Lugar = async event => {
    setCheckbox3lugar(!checkbox3lugar)
  }
  const handleChangeCheckbox2Lugar2Volta = async event => {
    setCheckbox2lugar2volta(!checkbox2lugar2volta)
    if (!checkbox2lugar2volta) {
      setDisableCheckbox2volta(checkbox2lugar2volta)
    } else {
      setDisableCheckbox2volta(checkbox2lugar2volta)
      setCheckbox3lugar2volta(!checkbox2lugar2volta)
    }
  }
  const handleChangeCheckbox3Lugar2Volta = async event => {
    setCheckbox3lugar2volta(!checkbox3lugar2volta)
  }
  const handleCancelButton = async => {
    window.location.href = `/match/${id}`
  }
  const handleUpdateMatch = async event => {
    let gross_1 = []
    let gross_2 = []
    for (let i = 0; i < data.length; i++) {
      gross_1[data[i].nickname] = data[i].gross
    }
    for (let i = 0; i < data2.length; i++) {
      gross_2[data2[i].nickname] = data2[i].gross
    }
    let net_1 = []
    let net_2 = []
    let betPriceInt = parseInt(betPrice, 10)
    let playersUpdate = []
    let players_1 = []
    let players_2 = []
    if (day === '') {
      return window.alert('Favor especificar a data da partida')
    }
    if (betPrice === '' || betPrice === "0" || betPrice === undefined) {
      return window.alert('Favor especificar um valor de aposta')
    }
    let totalPlayers_1 = 0
    let totalPlayers_2 = 0
    for (const [idx, value] of Object.entries(gross_1)) {
      if (!(value === undefined || value === "" || value === "0")) {
        totalPlayers_1++
        const jogadorAtual = players.find(player => player.nickname === idx);
        let net = parseInt(value, 10) - jogadorAtual.handicapAtl
        net_1.push({ valor: net, nickname: jogadorAtual.nickname })
        players_1.push({
          nickname: jogadorAtual.nickname,
          handicapPartida: jogadorAtual.handicapAtl,
          grossPartida: value,
          netPartida: net,
          dinheiroAcPartida: jogadorAtual.dinheiroAc
        })
      }
    }
    for (const [idx, value] of Object.entries(gross_2)) {
      if (!(value === undefined || value === "" || value === "0")) {
        totalPlayers_2++
        const jogadorAtual2 = players.find(player => player.nickname === idx);
        let net2 = parseInt(value, 10) - jogadorAtual2.handicapAtl
        net_2.push({ valor: net2, nickname: jogadorAtual2.nickname })
        players_2.push({
          nickname: jogadorAtual2.nickname,
          handicapPartida: jogadorAtual2.handicapAtl,
          grossPartida: value,
          netPartida: net2,
          dinheiroAcPartida: jogadorAtual2.dinheiroAc
        })
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
      if (checkbox3lugar2volta) {
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
      }else if (checkbox2lugar2volta){
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
    await api.deleteMatchById(id)
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

  const resetData = () => {
    console.log(data)
    data.push({
      nickname: "juca",
      gross: "25",
      handicap: 8
    })
    console.log(data)

  }

  return (
    <Styles>
      <Button onClick={resetData}>Reset Data</Button>
      <Title>1ª Volta</Title>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <Title>2ª Volta</Title>
      <Table
        columns={columns}
        data={data2}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <Label>Valor da Aposta</Label>
      <InputText type="text" value={betPrice} onChange={handleChangeInputBetPrice} />
      <InputDate type="date" value={dayPartida} onChange={handleChangeDay} />
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="segundolugar" checked={checkbox2lugar} onChange={handleChangeCheckbox2Lugar} />
        <label class="form-check-label" for="segundolugar">
          2º Lugar (1ª Volta)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="terceirolugar" checked={checkbox3lugar} disabled={disableCheckbox} onChange={handleChangeCheckbox3Lugar} />
        <label class="form-check-label" for="terceirolugar">
          3º Lugar (1ª Volta)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="segundolugar2volta" checked={checkbox2lugar2volta} onChange={handleChangeCheckbox2Lugar2Volta} />
        <label class="form-check-label" for="segundolugar2volta">
          2º Lugar (2ª Volta)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="terceirolugar2volta" checked={checkbox3lugar2volta} disabled={disableCheckbox2volta} onChange={handleChangeCheckbox3Lugar2Volta} />
        <label class="form-check-label" for="terceirolugar2volta">
          3º Lugar (2ª Volta)
        </label>
      </div>
      <Button onClick={handleUpdateMatch} >Atualizar</Button> <CancelButton onClick={handleCancelButton} >Cancelar</CancelButton>
    </Styles>
  )
}

export default MatchesUpdate;
