import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    name:'',
    message: '',
    winner: null,
    userMode:{},
    gameField:[], ameSet:{},
    leaderBoard:[],
    button:'Play',
    timer: null
  };

  componentDidMount() {
    this.getGameSettings();
    this.getLeaderBord();
  }

  async getGameSettings() {
     await fetch('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
        .then(res => res.json())
        .then(data => {
          this.setState({
            gameSet: data
          })
        });
  }

  async getLeaderBord(){
    await fetch('https://starnavi-frontend-test-task.herokuapp.com/winners')
        .then(res => res.json())
        .then(data => {
          this.setState({leaderBoard: data})
        });
  }

  setName(newName){
    this.setState({
      name: newName
    });
  }

 setGameMode(mode) {
    const field = this.state.gameSet[mode].field;
    let gameField = [];
    for (let i = 0; i < field*field; i++) {
      gameField.push('');
    }
    this.setState( {
      userMode: this.state.gameSet[mode],
      gameField
    });
  }

  newGame() {
    const field = this.state.userMode.field;
    let gameField = [];
    for (let i = 0; i < field*field; i++) {
      gameField.push('');
    }
    this.setState( {
      gameField
    });
    this.setRandomMove(this.state.userMode.field * this.state.userMode.field);

  }

  setRandomMove(fieldlength) {
    for (let i = 0; i<(fieldlength); i++ ) {
      const randomKey = Math.floor(Math.random() * fieldlength);
      if (this.state.gameField[randomKey] === '') {
        this.setState((prewState) => {
          const gameField = [...prewState.gameField];
          gameField[randomKey] = 'blue';
          return {
            gameField,
            timer: new Date(),
            message: prewState.name
          }
        });
        break;
      }
    }
  }

  onButtonClick() {
    this.setState({
      button: 'Play Again',
      message: 'Hello '+this.state.name,
    });
    this.newGame();
  };

  onMakeMove(event) {
    const clickKey = event.target.dataset.set;
    const time = new Date();
    this.checkWinner();

    if ( this.state.winner !== null) {return;}

    if (this.state.gameField[clickKey] !== 'blue') {return;}

    if (time - this.state.timer < this.state.userMode.delay ) {
      if (this.state.gameField[clickKey] === 'blue') {
        this.setState((prewState) => {
          const gameField = [...prewState.gameField];
          gameField[clickKey] = 'green';
          return {
            gameField,
            timer: null
          }
        });
          this.setRandomMove(this.state.userMode.field * this.state.userMode.field);
      }
    }
    else if (this.state.gameField[clickKey] === 'blue') {
      this.setState((prewState) => {
        const gameField = [...prewState.gameField];
        gameField[clickKey] = 'red';
        return {
          gameField,
          timer: null
        }
      });
        this.setRandomMove(this.state.userMode.field * this.state.userMode.field);
    }

  }

  checkWinner () {
    let countGreen = 0;
    let countRed = 0;
    for (let i = 0; i < this.state.gameField.length; i++) {
      if (this.state.gameField[i] !== '') {
        if (this.state.gameField[i] === 'green') {countGreen++}
        if (this.state.gameField[i] === 'red') {countRed++}
      }
    }

    if (countRed + countGreen > this.state.gameField.length / 2) {
      const winner =  (countGreen > countRed) ? this.state.name : 'Computer';
       (async () => {
            const rawResponse = await fetch('https://starnavi-frontend-test-task.herokuapp.com/winners', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({winner: winner, date:(new Date()).toString()})
            });
            const content = await rawResponse.json();
            console.log(content);
        })();
      this.setState( {
          winner: winner
      })
       this.getLeaderBord();
    }
  }

  render(){
    let dataArrKey = [];
    for (let key in this.state.gameSet) {
      dataArrKey.push(key);
    }
    const field = this.state.userMode.field;
    let message = (this.state.message === '')
        ? 'Message here'
        : 'Hello ' + this.state.message;
    if (this.state.winner !== null) {
      message = 'Winner ' + this.state.winner;
    }

    return (
        <div className="App">
          <div>
              <div className="prepare-game">
                  <select
                      name="game-set"
                      onChange={(event) => this.setGameMode(event.target.value)}
                  >
                      <option value="start">Pick game mode</option>
                      {dataArrKey.map( item =>
                          <option
                              value={item}
                              key={item}
                          > {item} </option>
                      )}
                  </select>
                  <input type="text"
                         value={this.state.name}
                         onChange={(event) => this.setName(event.target.value)}
                         placeholder="Enter your name"/>
                  <button onClick={ () => this.onButtonClick() }>
                      {this.state.button}
                  </button>
              </div>
              <div className="game-field" >
                  <p className="game-info">{message}</p>
                  <div onClick={(event) => this.onMakeMove(event)}>
                      {this.state.gameField.map((item,key) => {
                          return(
                              <React.Fragment key={key*200} >
                      <span
                          key={key}
                          className={item}
                          data-set={key}>
                      </span>
                                  {((key+1) % field === 0) ? <br key={key*200}/> : ''}
                              </React.Fragment>
                          )})}
                  </div>
              </div>
          </div>
          <div>
              <h2>Leader Bord</h2>
            <div className="leader-item">
                {this.state.leaderBoard.map(item  => {
                   return <div
                        key={item.id}
                   > <span>{item.winner}</span> <span>{item.date}</span> </div>
                })}
            </div>
          </div>
        </div>
    );
  }

}

export default App;
