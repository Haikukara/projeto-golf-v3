import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Home
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/players/list" className="nav-link">
                                Listar Jogadores
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/players/create" className="nav-link">
                                Cadastrar Jogador
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/matches/list" className="nav-link">
                                Listar Partidas
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/matches/create" className="nav-link">
                                Cadastrar Partida
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/handicaprule/list" className="nav-link">
                                Regra de Handicap
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links;