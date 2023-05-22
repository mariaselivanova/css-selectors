(()=>{"use strict";var e="",t=".subtext",i=".board",n=".click-counter",r=".timer",s="div",a="button",o="p",l="option",u="tile",c="default-cursor",h="three",d="four",f="five",m="seven",v="eight",y="game-size-option",b="unknown",p="mine",k="number",g="right-clicked",S="Game over. Try again",C="flags left: ",w="Hooray! You found all mines in ",L=" seconds and ",T=" second and ",x=" moves",M=" move",O="mines: ",E="--size",I="dark-theme";function G(e){return G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},G(e)}function D(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==G(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,"string");if("object"!==G(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===G(r)?r:String(r)),n)}var r}var j=function(){function e(t,i,n,r,s,a,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.x=t,this.y=i,this.el=n,this.isMine=r,this.isUnknown=s,this.isRightClicked=a,this.number=null,this.setRightClicked(),this.setIsNum(o)}var t,i;return t=e,(i=[{key:"setIsNum",value:function(e){if(!this.isUnknown&&!this.isMine&&!this.isRightClicked)switch(this.el.dataset.type=k,this.el.textContent=e,this.number=e,0===e&&(this.el.textContent=""),e){case 1:this.el.classList.add("one");break;case 2:this.el.classList.add("two");break;case 3:this.el.classList.add(h);break;case 4:this.el.classList.add(d);break;case 5:this.el.classList.add(f);break;case 6:this.el.classList.add("six");break;case 7:this.el.classList.add(m);break;case 8:this.el.classList.add(v)}}},{key:"setRightClicked",value:function(){this.isRightClicked&&(this.el.dataset.type=g)}},{key:"reveal",value:function(e){if(this.isUnknown&&!this.isRightClicked){if(this.isUnknown=!1,this.isMine)return this.el.dataset.type=p,void(this.el.textContent="");switch(this.el.dataset.type=k,this.el.textContent=e,this.number=e,0===e&&(this.el.textContent=""),e){case 1:this.el.classList.add("one");break;case 2:this.el.classList.add("two");break;case 3:this.el.classList.add(h);break;case 4:this.el.classList.add(d);break;case 5:this.el.classList.add(f);break;case 6:this.el.classList.add("six");break;case 7:this.el.classList.add(m);break;case 8:this.el.classList.add(v)}}}},{key:"toggleMark",value:function(){this.isUnknown&&(this.isRightClicked=!this.isRightClicked,this.isRightClicked?this.el.dataset.type=g:this.el.dataset.type=b)}}])&&D(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function P(e){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(e)}function z(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==P(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,"string");if("object"!==P(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===P(r)?r:String(r)),n)}var r}var B=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.timer=null,this.elapsedTime=0,this.timerElement=document.querySelector(r),this.saveCallback=t}var t,i;return t=e,(i=[{key:"start",value:function(){var e=this,t=Date.now();this.timer=setInterval((function(){return e.updateTimer(t)}),1e3)}},{key:"continue",value:function(){var e=this,t=Date.now()-1e3*this.elapsedTime;this.timer=setInterval((function(){var i=Date.now();e.elapsedTime=Math.floor((i-t)/1e3),e.updateDisplay(),e.saveCallback()}),1e3)}},{key:"updateTimer",value:function(e){this.elapsedTime=Math.floor((Date.now()-e)/1e3),this.updateDisplay(),this.saveCallback()}},{key:"stop",value:function(){clearInterval(this.timer),this.timer=null}},{key:"reset",value:function(){this.stop(),this.elapsedTime=0,this.updateDisplay()}},{key:"updateDisplay",value:function(){this.timerElement.textContent="time: "+this.elapsedTime+"s"}}])&&z(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function q(e){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(e)}function R(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==q(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,"string");if("object"!==q(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===q(r)?r:String(r)),n)}var r}var U=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.audio=new Audio,this.audio.src=t,this.muted=!1,this.soundBtn=document.querySelector(".change-sound-btn"),this._loadSoundState()}var t,i;return t=e,(i=[{key:"_loadSoundState",value:function(){var e=localStorage.getItem("sound");e&&"on"!==e?(this.muted=!0,this.soundBtn.classList.add("sound-off")):(this.muted=!1,this.soundBtn.classList.remove("sound-off")),this.audio.muted=this.muted}},{key:"play",value:function(){this.muted||(this.audio.pause(),this.audio.currentTime=0,this.audio.play())}},{key:"toggleMute",value:function(){this.muted=!this.muted,this.audio.muted=this.muted,this.muted?localStorage.setItem("sound","off"):localStorage.setItem("sound","on")}}])&&R(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();const N=e+"assets/Retro8.ogg",A=e+"assets/Retro3.ogg",W=e+"assets/Retro10.ogg",F=e+"assets/Modern13.ogg";function J(e){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},J(e)}function _(e,t){var i="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!i){if(Array.isArray(e)||(i=function(e,t){if(e){if("string"==typeof e)return H(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?H(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0,r=function(){};return{s:r,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,o=!1;return{s:function(){i=i.call(e)},n:function(){var e=i.next();return a=e.done,e},e:function(e){o=!0,s=e},f:function(){try{a||null==i.return||i.return()}finally{if(o)throw s}}}}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function Y(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==J(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,"string");if("object"!==J(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===J(r)?r:String(r)),n)}var r}var $=function(){function e(r,s){var a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.size=r,this.numberOfMines=s,this.board=[],this.timer=new B((function(){return a.saveGame()})),this.clickCount=0,this.firstMove=!0,this.isGameOver=!1,this.subtext=document.querySelector(t),this.boardElement=document.querySelector(i),this.clickCountElement=document.querySelector(n),this.isDarkTheme=!1,this.leftClickSound=new U(N),this.rightClickSound=new U(A),this.winSound=new U(W),this.loseSound=new U(F)}var r,a;return r=e,a=[{key:"toggleSound",value:function(){this.leftClickSound.toggleMute(),this.rightClickSound.toggleMute(),this.winSound.toggleMute(),this.loseSound.toggleMute()}},{key:"checkForOpenedMine",value:function(){var e,t=_(this.board);try{for(t.s();!(e=t.n()).done;){var i,n=_(e.value);try{for(n.s();!(i=n.n()).done;){var r=i.value;if(!r.isUnknown&&r.isMine)return!0}}catch(e){n.e(e)}finally{n.f()}}}catch(e){t.e(e)}finally{t.f()}return!1}},{key:"checkforWinLoad",value:function(){var e,t=_(this.board);try{for(t.s();!(e=t.n()).done;){var i,n=_(e.value);try{for(n.s();!(i=n.n()).done;){var r=i.value;if(r.isUnknown&&!r.isMine)return}}catch(e){n.e(e)}finally{n.f()}}}catch(e){t.e(e)}finally{t.f()}this.handlGameOver(),this.subtext.textContent=w+this.timer.elapsedTime+(1===this.timer.elapsedTime?T:L)+this.clickCount+(1===this.clickCount?M:x)}},{key:"loadGame",value:function(){var e=this,t=localStorage.getItem("gameState");if(t){var i=JSON.parse(t),n=i.size,r=i.numberOfMines,a=i.timerElapsed,o=i.clickCount,l=i.firstMove,c=i.isGameOver,h=i.board;this.size=n,this.numberOfMines=r,this.timer.elapsedTime=a,this.clickCount=o,this.firstMove=l,this.isGameOver=c,this.updateClickCountDisplay();var d=0;this.board=Array.from(h,(function(t){return t.map((function(t){var i=document.createElement(s);t.isUnknown?i.dataset.type=b:t.isMine?i.dataset.type=p:i.dataset.type=k,t.isRightClicked&&d++,i.classList.add(u);var n=new j(t.x,t.y,i,t.isMine,t.isUnknown,t.isRightClicked,t.number);return i.addEventListener("contextmenu",(function(t){t.preventDefault(),e.handleRightClick(n)})),i.addEventListener("click",(function(){e.handleLeftClick(n,i)})),n}))})),this.isGameOver||(this.subtext.textContent=C+(this.numberOfMines-d)),this.checkForOpenedMine()&&(this.handlGameOver(),this.subtext.textContent=S,this.board.flat().filter((function(e){return e.isMine})).forEach((function(e){e.el.dataset.type=p,e.el.textContent=""}))),this.checkforWinLoad(),this.timer.updateDisplay(),0===a||this.isGameOver||this.timer.continue()}return this.board}},{key:"saveGame",value:function(){var e={size:this.size,numberOfMines:this.numberOfMines,timerElapsed:this.timer.elapsedTime,clickCount:this.clickCount,firstMove:this.firstMove,isGameOver:this.isGameOver,board:this.board};localStorage.setItem("gameState",JSON.stringify(e))}},{key:"checkifTimer",value:function(){this.timer.timer||this.timer.start()}},{key:"checkIfMines",value:function(e,t,i){return e.some((function(e){return e.x===t&&e.y===i}))}},{key:"updateClickCountDisplay",value:function(){this.clickCountElement.textContent="clicks: "+this.clickCount}},{key:"clearBoard",value:function(){for(;this.boardElement.firstChild;)this.boardElement.removeChild(this.boardElement.firstChild);this.board=[]}},{key:"openTile",value:function(e,t){var i=this;if(t.isUnknown){var n=this.findNeighbourTiles(e,t),r=n.filter((function(e){return e.isMine}));t.isMine?t.reveal(r.length):(t.reveal(r.length),0===r.length&&n.forEach((function(t){t.isUnknown&&!t.isRightClicked&&i.openTile(e,t)})))}}},{key:"createBoard",value:function(){for(var e=this,t=0;t<this.size;t++){for(var i=[],n=function(){var n=document.createElement(s);n.classList.add(u),n.dataset.type=b;var a=new j(t,r,n,!1,!0,!1);n.addEventListener("contextmenu",(function(t){t.preventDefault(),e.handleRightClick(a)})),n.addEventListener("click",(function(){e.handleLeftClick(a,n)})),i.push(a)},r=0;r<this.size;r++)n();this.board.push(i)}return this.board}},{key:"handleRightClick",value:function(e){!this.isGameOver&&e.isUnknown&&(this.rightClickSound.play(),e.toggleMark(),this.updateMinesLeft(),this.saveGame())}},{key:"handleFirstMove",value:function(e){this.firstMove=!1,this.createMines(this.size,this.numberOfMines,e.x,e.y)}},{key:"handleLeftClick",value:function(e,t){this.isGameOver||(this.firstMove&&this.handleFirstMove(e),e.isUnknown&&!e.isRightClicked&&(this.checkifTimer(),this.clickCount++,this.updateClickCountDisplay(),this.openTile(this.board,e),this.checkIfWin(),this.checkIfLose(t),this.saveGame(),this.isGameOver||this.leftClickSound.play()))}},{key:"findNeighbourTiles",value:function(e,t){for(var i=[],n=-1;n<=1;n++)for(var r=-1;r<=1;r++)if(0!==n||0!==r){var s=t.x+n,a=t.y+r;if(s>=0&&s<this.size&&a>=0&&a<this.size){var o=e[s][a];i.push(o)}}return i}},{key:"createMines",value:function(e,t,i,n){for(var r=this,s=this.board.flat().find((function(e){return e.x===i&&e.y===n})),a=[],o=0;o<e;o++)for(var l=0;l<e;l++)o===s.x&&l===s.y||a.push({x:o,y:l});for(var u=a.length-1;u>0;u--){var c=Math.floor(Math.random()*(u+1)),h=[a[c],a[u]];a[u]=h[0],a[c]=h[1]}var d=a.slice(0,t);return d.forEach((function(e){var t=e.x,i=e.y;r.board[t][i].isMine=!0})),d}},{key:"updateMinesLeft",value:function(){var e=this.board.flat().filter((function(e){return e.isRightClicked})),t=this.numberOfMines-e.length;this.subtext.textContent=C+t}},{key:"checkIfLose",value:function(e){e.dataset.type===p&&this.handleLose()}},{key:"checkIfWin",value:function(){var e,t=_(this.board);try{for(t.s();!(e=t.n()).done;){var i,n=_(e.value);try{for(n.s();!(i=n.n()).done;){var r=i.value;if(r.isUnknown&&!r.isMine)return}}catch(e){n.e(e)}finally{n.f()}}}catch(e){t.e(e)}finally{t.f()}this.handleWin()}},{key:"resetGame",value:function(){localStorage.removeItem("gameState"),this.isGameOver=!1,this.clickCount=0,this.firstMove=!0,this.updateClickCountDisplay(),this.timer.reset(),this.clearBoard()}},{key:"handleWin",value:function(){this.handlGameOver(),this.subtext.textContent=w+this.timer.elapsedTime+(1===this.timer.elapsedTime?T:L)+this.clickCount+(1===this.clickCount?M:x),this.addScore("WIN 🏆",this.clickCount,this.timer.elapsedTime,this.size,this.numberOfMines),this.winSound.play()}},{key:"handleLose",value:function(){this.handlGameOver(),this.loseSound.play(),this.subtext.textContent=S,this.board.flat().filter((function(e){return e.isMine})).forEach((function(e){e.el.dataset.type=p,e.el.textContent=""}))}},{key:"handlGameOver",value:function(){this.isGameOver=!0,this.timer.stop(),document.querySelectorAll('.tile[data-type="unknown"]').forEach((function(e){e.classList.add(c)}))}},{key:"addScore",value:function(e,t,i,n,r){var s=JSON.parse(localStorage.getItem("lastTenScores"));s||(s=[]);var a={gameStatus:e,numOfClicks:t,elapsedTime:"".concat(i,"s"),boardSizeFormat:"".concat(n," x ").concat(n),numberOfMines:r};s.push(a);var o=s.slice(-10);localStorage.setItem("lastTenScores",JSON.stringify(o))}}],a&&Y(r.prototype,a),Object.defineProperty(r,"prototype",{writable:!1}),e}();const K=e+"79c31918aa11245859eb.svg",Q=e+"a8a966a1d4aa65edadc0.svg";function V(e){return V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},V(e)}function X(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==V(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,"string");if("object"!==V(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===V(r)?r:String(r)),n)}var r}var Z=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.page=document.querySelector(".body"),this.header=document.querySelector(".header"),this.themeBtn=document.querySelector(".change-theme-btn"),this.subtext=document.querySelector(t),this.gameSizeText=document.querySelector(".game-size-options-text"),this.timer=document.querySelector(r),this.title=document.querySelector(".title"),this.clickCounter=document.querySelector(n),this.board=document.querySelector(i),this.resultsBtn=document.querySelector(".check-results-btn"),this.newGameBtn=document.querySelector(".new-game-btn"),this.resultTable=document.querySelector(".results-table"),this.changeThemeBtn=document.querySelector(".change-theme-btn"),this.changeSoundBtn=document.querySelector(".change-sound-btn"),this.isDarkTheme=!1,this.loadTheme()}var s,a;return s=e,a=[{key:"addDarkTheme",value:function(){this.page.classList.add(I),this.header.classList.add(I),this.subtext.classList.add(I),this.gameSizeText.classList.add(I),this.timer.classList.add(I),this.clickCounter.classList.add(I),this.title.classList.add(I),this.board.classList.add("board-dark"),this.resultsBtn.classList.add("check-results-btn-dark"),this.newGameBtn.classList.add("new-game-btn-dark"),this.resultTable.classList.add("results-table-dark"),this.changeThemeBtn.classList.add("change-theme-btn-dark"),this.changeSoundBtn.classList.add("change-sound-btn-dark"),this.themeBtn.style.backgroundImage="url(".concat(Q,")")}},{key:"removeDarkTheme",value:function(){this.page.classList.remove(I),this.header.classList.remove(I),this.subtext.classList.remove(I),this.gameSizeText.classList.remove(I),this.timer.classList.remove(I),this.clickCounter.classList.remove(I),this.title.classList.remove(I),this.board.classList.remove("board-dark"),this.resultsBtn.classList.remove("check-results-btn-dark"),this.newGameBtn.classList.remove("new-game-btn-dark"),this.resultTable.classList.remove("results-table-dark"),this.changeThemeBtn.classList.remove("change-theme-btn-dark"),this.changeSoundBtn.classList.remove("change-sound-btn-dark"),this.themeBtn.style.backgroundImage="url(".concat(K,")")}},{key:"loadTheme",value:function(){var e=localStorage.getItem("theme");"dark"===e?(this.addDarkTheme(),this.isDarkTheme=!0):e&&"light"!==e||(this.removeDarkTheme(),this.isDarkTheme=!1)}},{key:"toggleTheme",value:function(){this.isDarkTheme=!this.isDarkTheme,this.isDarkTheme?(localStorage.setItem("theme","dark"),this.addDarkTheme()):(localStorage.setItem("theme","light"),this.removeDarkTheme())}}],a&&X(s.prototype,a),Object.defineProperty(s,"prototype",{writable:!1}),e}();function ee(e){return ee="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ee(e)}function te(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==ee(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,"string");if("object"!==ee(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===ee(r)?r:String(r)),n)}var r}var ie=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i;return t=e,i=[{key:"getResults",value:function(){var e=localStorage.getItem("lastTenScores");return e?JSON.parse(e):[]}}],i&&te(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}(),ne=function(e,t,i){var n=document.createElement(e);return n.classList.add(i),t.appendChild(n),n};function re(e){e.createBoard().forEach((function(e){e.forEach((function(e){document.querySelector(i).append(e.el)}))}))}function se(e){e.getResults().forEach((function(e){var t=ne("tr",de,"tr");[e.gameStatus,e.numOfClicks,e.elapsedTime,e.boardSizeFormat,e.numberOfMines].forEach((function(e){ne("td",t,"td").textContent=e}))}))}var ae=ne("header",document.body,"header");ne("h1",ae,"title").textContent="minesweeper";var oe=ne("main",document.body,"main"),le=ne(s,oe,"score-section"),ue=ne("TABLE",le,"results-table"),ce=ne("thead",ue,"thead"),he=ne("tr",ce,"tr");["result","clicks","time","size","mines"].forEach((function(e){ne("th",he,"th").textContent=e}));var de=ne("tbody",ue,"table_body"),fe=ne(s,oe,"board-section"),me=ne(o,fe,"subtext"),ve=ne(s,fe,"slider-wrapper"),ye=ne("input",ve,"mine-count-slider");ye.type="range",ye.min="10",ye.max="99";var be=ne(o,ve,"slider-text"),pe=ne(s,fe,"board"),ke=ne(s,fe,"options-wrapper"),ge=ne(s,ke,"size-wrapper");ne(o,ge,"game-size-options-text").textContent="size:";var Se=ne("select",ge,"game-size-options"),Ce=ne(l,Se,y),we=ne(l,Se,y),Le=ne(l,Se,y);Ce.textContent="10 x 10",we.textContent="15 x 15",Le.textContent="25 x 25",Ce.value=10,we.value=15,Le.value=25;var Te=ne(a,ke,"change-theme-btn"),xe=ne(a,ke,"change-sound-btn"),Me=ne(s,fe,"wrapper"),Oe=ne(s,Me,"btn-wrapper"),Ee=ne(a,Oe,"new-game-btn");Ee.textContent="start over";var Ie=ne(a,Oe,"check-results-btn");Ie.textContent="show results";var Ge=ne(s,Me,"counter-wrapper"),De=ne(o,Ge,"timer"),je=ne(o,Ge,"click-counter");De.textContent="time: 0s",je.textContent="clicks: 0";var Pe,ze=localStorage.getItem("gameState");if(ze){var Be=JSON.parse(ze),qe=Be.size,Re=Be.numberOfMines;Pe=new $(qe,Re),pe.style.setProperty(E,qe),ye.value=Re,10==qe?Ce.selected=!0:15==qe?we.selected=!0:25==qe&&(Le.selected=!0),Pe.loadGame().forEach((function(e){e.forEach((function(e){document.querySelector(i).append(e.el),e.isUnknown&&Pe.isGameOver&&e.el.classList.add(c)}))})),be.textContent=O+Re}else{ye.value="10",Ce.selected=!0;var Ue=parseInt(Se.value),Ne=parseInt(ye.value);re(Pe=new $(Ue,Ne)),pe.style.setProperty(E,Se.value),me.textContent="flags left: 10",be.textContent="mines: 10"}var Ae=new ie,We=new Z;Te.addEventListener("click",(function(){We.toggleTheme()}));var Fe,Je=function(){Pe.resetGame();var e=parseInt(Se.value),t=parseInt(ye.value);Pe.size=e,Pe.numberOfMines=t,pe.style.setProperty(E,e),re(Pe),me.textContent=C+ye.value,be.textContent=O+ye.value,Pe.saveGame(),de.innerHTML="",se(Ae)};se(Ae),Ie.addEventListener("click",(function(){ue.classList.toggle("table-visible"),Fe=!Fe,Ie.textContent=Fe?"hide results":"show results"})),xe.addEventListener("click",(function(){Pe.toggleSound(),xe.classList.toggle("sound-off")})),Ee.addEventListener("click",Je),Se.addEventListener("change",Je),ye.addEventListener("input",Je)})();