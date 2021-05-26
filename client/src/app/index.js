import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { NavBar } from '../components';
import { PlayersList, PlayersInsert, PlayersUpdate, MatchesList, MatchesInsert, MatchShow, HandicapruleUpdate, HandicapruleList } from '../pages';
import Header from '../Header';
import Footer from '../Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
              <Header />
              <NavBar />
              <Switch>
                  <Route path="/players/list" exact component={PlayersList} />
                  <Route path="/players/create" exact component={PlayersInsert} />
                  <Route path="/players/update/:id" exact component={PlayersUpdate} />
                  <Route path="/matches/list" exact component={MatchesList} />
                  <Route path="/matches/create" exact component={MatchesInsert} />
                  <Route path="/match/:id" exact component={MatchShow} />
                  <Route path="/handicaprule/update/:id" exact component={HandicapruleUpdate} />
                  <Route path="/handicaprule/list" exact component={HandicapruleList} />
              </Switch>
              <Footer />
        </Router>
    )
};

export default App;