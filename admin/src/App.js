import React, { Component } from 'react';
// import './App.css';
import Nav from './components/navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './components/admin';
import AdPost from './components/adposting';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/post" component={AdPost} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const Home = () => (
  <div>
    <hi>Bar Advertising</hi>
  </div>
)

export default App;