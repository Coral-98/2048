var board = new Array;
var score = 0;

$(document).ready(function(){
    NewGame();
})

function NewGame(){
    //初始化棋盘
    init();
    //随机赋值
    generateOneNumber();
    generateOneNumber();
}

function init(){
    var gridcell;
    score = 0;
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            gridcell = $("#grid-cell-"+i+"-"+j);
            gridcell.css("top",getPosTop(i, j));
            gridcell.css("left",getPosLeft(i, j));
        }
    }

    for(var i = 0; i < 4; i++){
        board[i] = new Array;
        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
        }
    }

    updateBoradView();

}


function updateBoradView(){
    var numbercell;
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            $("#grid-container").append('<div class="number-cell" id="grid-number-cell-'+i+'-'+j+'"></div>')
            numbercell = $("#grid-number-cell-"+i+"-"+j);

            if( board[i][j] == 0){
                numbercell.css("width", "0px");
                numbercell.css("height", "0px");
                numbercell.css("top",getPosTop(i, j) + 50);
                numbercell.css("left",getPosLeft(i, j) + 50);
            }
            else{
                numbercell.css("width", "100px");
                numbercell.css("height", "100px");
                numbercell.css("top",getPosTop(i, j));
                numbercell.css("left",getPosLeft(i, j));
                numbercell.css("background-color",getNumberBackgroundColor(board[i][j]));
                numbercell.css("color",getNumberColor(board[i][j]));
                numbercell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber(){
    var randx;
    var randy;
    var randnumber;

    if(nospace(board)){
        return false;
    }

    //随机位置
    var times = 0;
    while(times < 50){
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        if(board[randx][randy] == 0)
            break;
    }
    if(times == 50 ){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                    break;
                }
            }
        }
    }
    //随机数
    randnumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数
    board[randx][randy] = randnumber;
    showNumberWithAnimation(randx, randy, randnumber);
    return true;
}

$(document).keydown(function( event ){
    switch( event.keyCode ){
        case 37: {//left
            if( moveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",250);
            }
            break;
        }
        case 38: {//up
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",250);
            }
            break;
        }
        case 39: {//right
            if( moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",250);
            }
            break;
        }
        case 40: {//down
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",250);
            }
            break;
        }
        default: {
            break;
        }
    }
})

function moveLeft(){
    var flag = [0, 0, 0, 0];
    if( !canMoveLeft(board) ){
        return false;
    }
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            if(board[i][j] != 0){
                for(var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
                        //移动
                        showMoveAnimation(i, j, i, k);
                        //更新数组
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && flag[k] == 0){
                        //移动
                        showMoveAnimation(i, j, i, k);
                        //更新数组
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        showScore(score);
                        flag[k] = 1;
                    }
                }
            }
        }
        flag = [0, 0, 0, 0];
    }
    setTimeout("updateBoradView()",210);
    return true;
}

function moveUp(){
    var flag = [0, 0, 0, 0];
    if( !canMoveUp(board) ){
        return false;
    }
    for(var j = 0; j < 4; j++){
        for(var i = 1; i < 4; i++){
            if(board[i][j] != 0){
                for(var k = 0; k < i; k++){
                    if(board[k][j] == 0 && noBlockVertical(i, k, j, board)){
                        //移动
                        showMoveAnimation(i, j, k, j);
                        //更新数组
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(i, k, j, board) && flag[k] == 0){
                        //移动
                        //更新数组
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        showScore(score);
                        flag[k] = 1;
                        continue;
                    }
                }
            }
        }
        flag = [0, 0, 0, 0];
    }
    setTimeout("updateBoradView()",210);
    return true;
}

function moveRight(){
    var flag = [0, 0, 0, 0];
    if( !canMoveRight(board) ){
        return false;
    }
    for(var i = 0; i < 4; i++){
        for(var j = 2; j >=0; j--){
            if(board[i][j] != 0){
                for(var k = 3; k > j; k--){
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        //移动
                        showMoveAnimation(i, j, i, k);
                        //更新数组
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && flag[k] == 0){
                        //移动
                        //更新数组
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        showScore(score);
                        flag[k] = 1;
                        continue;
                    }
                }
            }
        }
        flag = [0, 0, 0, 0];
    }
    setTimeout("updateBoradView()",210);
    return true;
}

function moveDown(){
    var flag = [0, 0, 0, 0];
    if( !canMoveDown(board) ){
        return false;
    }
    for(var j = 0; j < 4; j++){
        for(var i = 2; i >= 0; i--){
            if(board[i][j] != 0){
                for(var k = 3; k > i; k--){
                    if(board[k][j] == 0 && noBlockVertical(k, i, j, board)){
                        //移动
                        showMoveAnimation(i, j, k, j);
                        //更新数组
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(k, i, j, board) && flag[k] == 0){
                        //移动
                        //更新数组
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        showScore(score);
                        flag[k] = 1;
                        continue;
                    }
                }
            }
        }
        flag = [0, 0, 0, 0];
    }
    setTimeout("updateBoradView()",210);
    return true;
}

function isGameOver(){
    if(noMove(board) && nospace(board)){
        gameOver();
    }
}

function gameOver(){
    alert("GameOver!");
}