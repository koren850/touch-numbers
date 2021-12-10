'use strict'


var gNums = [];
var gCurrNum = 1;
var gInterval;
var gseconds = 0;
var gtens = 0;
var gBoardSize;

function init(num) {
    gCurrNum = 1
    gBoardSize = num;
    createBoard(num);
    renderBoard(num);
    clearTimer();
    if (num === 16) document.querySelector('.num').innerText = 'Next:' + gCurrNum;
    else document.querySelector('.num').innerText = 'X';
}

function createBoard(num) {
    for (var i = 0; i < num; i++) {
        gNums[i] = (i + 1)
    }
    shuffle(gNums);
}
function renderBoard() {
    var row = Math.sqrt(gNums.length);
    var strHTML = '';
    for (var i = 0; i < row; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < row; j++) {
            var currNum = gNums.pop();
            strHTML += `<td onclick="play(this)" data-value="${currNum}">${currNum}</td > `;
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('tbody');
    elBoard.innerHTML = strHTML;
}
function startTimer() {
    var elTens = document.getElementById("tens")
    var elSeconds = document.getElementById("seconds")
    gtens++;
    if (gtens <= 9) {
        elTens.innerHTML = "0" + gtens;
    }
    if (gtens > 9) {
        elTens.innerHTML = gtens;
    }
    if (gtens > 99) {
        gseconds++;
        elSeconds.innerHTML = "0" + gseconds;
        gtens = 0;
        elTens.innerHTML = "0" + 0;
    }
    if (gseconds > 9) {
        elSeconds.innerHTML = gseconds;
    }
}
function clearTimer() {
    clearInterval(gInterval);
    //update model
    gtens = 0;
    gseconds = 0;
    //update dom
    var elTens = document.getElementById("tens")
    var elSeconds = document.getElementById("seconds")
    elTens.innerHTML = "00";
    elSeconds.innerHTML = "00";

}
function play(elNum) {
    if (elNum) {
        var data = elNum.dataset.value;
        if (+data !== gCurrNum) return;
        if (+data === 1) gInterval = setInterval(startTimer, 10);
        if (+data === gBoardSize) {
            clearInterval(gInterval);
        }
        gCurrNum++;
        if (+data < gBoardSize) document.querySelector('.num').innerText = gCurrNum
        elNum.style.background = 'linear-gradient(-45deg, #640909, #1b0202, #6d0b0b, #220505)';

    }
}