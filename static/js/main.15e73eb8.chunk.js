(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){e.exports=a(20)},17:function(e,t,a){},19:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(5),i=a.n(s),o=(a(17),a(3)),u=a(1),l=a.n(u),c=a(2),m=a(6),d=a(7),h=a(9),f=a(8),g=a(10),p=(a(19),function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(h.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={name:"",message:"",winner:null,userMode:{},gameField:[],ameSet:{},leaderBoard:[],button:"Play",timer:null},a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.getGameSettings(),this.getLeaderBord()}},{key:"getGameSettings",value:function(){var e=Object(c.a)(l.a.mark(function e(){var t=this;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://starnavi-frontend-test-task.herokuapp.com/game-settings").then(function(e){return e.json()}).then(function(e){t.setState({gameSet:e})});case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"getLeaderBord",value:function(){var e=Object(c.a)(l.a.mark(function e(){var t=this;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://starnavi-frontend-test-task.herokuapp.com/winners").then(function(e){return e.json()}).then(function(e){t.setState({leaderBoard:e})});case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"setName",value:function(e){this.setState({name:e})}},{key:"setGameMode",value:function(e){for(var t=this.state.gameSet[e].field,a=[],n=0;n<t*t;n++)a.push("");this.setState({userMode:this.state.gameSet[e],gameField:a})}},{key:"newGame",value:function(){for(var e=this.state.userMode.field,t=[],a=0;a<e*e;a++)t.push("");this.setState({gameField:t}),this.setRandomMove(this.state.userMode.field*this.state.userMode.field)}},{key:"setRandomMove",value:function(e){var t=this;if(!this.checkWinner())for(var a=function(a){var n=Math.floor(Math.random()*e);if(""===t.state.gameField[n])return t.setState(function(e){var t=Object(o.a)(e.gameField);return t[n]="blue",{gameField:t,timer:new Date,message:e.name}}),"break"},n=0;n<e;n++){if("break"===a())break}}},{key:"onButtonClick",value:function(){this.setState({button:"Play Again",message:"Hello "+this.state.name}),this.newGame()}},{key:"onMakeMove",value:function(e){var t=e.target.dataset.set,a=new Date;null===this.state.winner&&"blue"===this.state.gameField[t]&&(a-this.state.timer<this.state.userMode.delay?"blue"===this.state.gameField[t]&&(this.setState(function(e){var a=Object(o.a)(e.gameField);return a[t]="green",{gameField:a,timer:null}}),this.setRandomMove(this.state.userMode.field*this.state.userMode.field)):"blue"===this.state.gameField[t]&&(this.setState(function(e){var a=Object(o.a)(e.gameField);return a[t]="red",{gameField:a,timer:null}}),this.setRandomMove(this.state.userMode.field*this.state.userMode.field)))}},{key:"checkWinner",value:function(){for(var e=0,t=0,a=0;a<this.state.gameField.length;a++)""!==this.state.gameField[a]&&("green"===this.state.gameField[a]&&e++,"red"===this.state.gameField[a]&&t++);if(t+e>this.state.gameField.length/2){var n=e>t?this.state.name:"Computer";return Object(c.a)(l.a.mark(function e(){var t,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://starnavi-frontend-test-task.herokuapp.com/winners",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({winner:n,date:(new Date).toString()})});case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,console.log(a);case 7:case"end":return e.stop()}},e)}))(),this.setState({winner:n}),this.getLeaderBord(),!0}return!1}},{key:"render",value:function(){var e=this,t=[];for(var a in this.state.gameSet)t.push(a);var n=this.state.userMode.field,s=""===this.state.message?"Message here":"Hello "+this.state.message;return null!==this.state.winner&&(s="Winner "+this.state.winner),r.a.createElement("div",{className:"App"},r.a.createElement("div",null,r.a.createElement("div",{className:"prepare-game"},r.a.createElement("select",{name:"game-set",onChange:function(t){return e.setGameMode(t.target.value)}},r.a.createElement("option",{value:"start"},"Pick game mode"),t.map(function(e){return r.a.createElement("option",{value:e,key:e}," ",e," ")})),r.a.createElement("input",{type:"text",value:this.state.name,onChange:function(t){return e.setName(t.target.value)},placeholder:"Enter your name"}),r.a.createElement("button",{onClick:function(){return e.onButtonClick()}},this.state.button)),r.a.createElement("div",{className:"game-field"},r.a.createElement("p",{className:"game-info"},s),r.a.createElement("div",{onClick:function(t){return e.onMakeMove(t)}},this.state.gameField.map(function(e,t){return r.a.createElement(r.a.Fragment,{key:200*t},r.a.createElement("span",{key:t,className:e,"data-set":t}),(t+1)%n===0?r.a.createElement("br",{key:200*t}):"")})))),r.a.createElement("div",null,r.a.createElement("h2",null,"Leader Bord"),r.a.createElement("div",{className:"leader-item"},this.state.leaderBoard.map(function(e){return r.a.createElement("div",{key:e.id}," ",r.a.createElement("span",null,e.winner)," ",r.a.createElement("span",null,e.date)," ")}))))}}]),t}(r.a.Component));i.a.render(r.a.createElement(p,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.15e73eb8.chunk.js.map