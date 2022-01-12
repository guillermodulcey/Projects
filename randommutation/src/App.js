import logo from './logo.svg';
import './App.css';
import React from 'react';

import * as RN from './RandomMutation.js'

function Square(props){
  return (
    <button className="square">
      {props.value}
    </button>
  );
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.nums = Math.round(Math.random() * 10) + 4;
    this.reducer = (previousValue, currentValue) => previousValue + currentValue;
    this.values = Array.from({length: this.nums}, () => Math.floor(Math.random() * 60) + 1);
    this.solution_length = this.values.length;
    this.inOrOut = Array(this.solution_length).fill(0);
    this.wait = 20;

    this.state = {
      total: this.values.reduce(this.reducer),
      best: this.calculateProfit(this.values, this.inOrOut),
      cost: this.inOrOut.reduce(this.reducer),
    }
  }

  calculateProfit(values, inOrOut){
    let sum = 0;
    for (let index = 0; index < values.length; index++) {
      if (inOrOut[index]) {
        sum += values[index];
      }
    }
    return sum;
  }

  async getAPI(cost){
    var jsonData;
    if(cost === 'greedy'){
      jsonData = JSON.stringify({ "values": this.values, "cost": cost, "pop": 1});
    }
    if(cost === 'size'){
      jsonData = JSON.stringify({ "values": this.values, "cost": cost, "target": this.nums/2});
    }
    if(cost === 'value'){
      jsonData = JSON.stringify({ "values": this.values, "cost": cost, "target": 100});
    }

    const response = await fetch('/evolutive', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: jsonData
    });

    const data = await response.json();
    return data['solution'];
  }

  fit_greedy(){
    //const randomMutation = new RN.RandomMutation(this.values, new RN.Cost());
    //this.fit(randomMutation);
    let data = this.getAPI("greedy");
    data.then(
      (value) => {this.inOrOut = value;},
      (error) => {console.log(error); }
    );
    setTimeout(()=>{console.log('waiting for results...'); this.update_state();}, this.wait);
  }

  fit_half(){
    //const randomMutation = new RN.RandomMutation(this.values, new RN.Cost_Half(this.values));
    //this.fit(randomMutation);
    let data = this.getAPI("size");
    data.then(
      (value) => {this.inOrOut = value;},
      (error) => {console.log(error); }
    );
    setTimeout(()=>{console.log('waiting for results...'); this.update_state();}, this.wait);
  }

  fit_target(){
    //const randomMutation = new RN.RandomMutation(this.values, new RN.Cost_Closest(this.values, 100));
    //this.fit(randomMutation);
    let data = this.getAPI("value");
    data.then(
      (value) => {this.inOrOut = value;},
      (error) => {console.log(error); }
    );
    setTimeout(()=>{console.log('waiting for results...'); this.update_state();}, this.wait);
  }

  update_state(){
    this.setState({
      best: this.calculateProfit(this.values, this.inOrOut),
      cost: this.inOrOut.reduce(this.reducer)
    });
  }

  renderSquares(values) {
    let squares = [];
    let i = 0;
    for (const value of values) {      
      squares.push(
        <Square
        key={i}
        value={value}
        />
        );
      i += 1;
    }
    
    return (
      <div>{squares}</div>
    );
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <div># of objects {this.nums} -- Total = {this.state.total} -- Best = {this.state.best} -- Elements = {this.state.cost}</div>
          
          {this.renderSquares(this.values)}
          {this.renderSquares(this.inOrOut)}

          <div>
            <button className='button' onClick={() => this.fit_greedy()}>Take all!</button>
            <button className='button' onClick={() => this.fit_half()}>Take most profit half</button>
            <button className='button' onClick={() => this.fit_target()}>Take closest to 100</button>
          </div>

        </header>       
      </div>
    );
  }
}

export default App;
