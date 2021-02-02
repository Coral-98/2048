function getPosTop(i, j){
    return 20 + 120 * i;
}

function getPosLeft(i, j){
    return 20 + 120 * j;
}

function getNumberBackgroundColor(n) {
    switch(n) {
        case 2 : return "#eee4da"; break;
        case 4 : return "#ede0c8"; break;
        case 8 : return "#f2b179"; break;
        case 16 : return "#f59563"; break;
        case 32 : return "#f67c5f"; break;
        case 64 : return "#f65e3b"; break;
        case 128 : return "#edcf72"; break;
        case 256 : return "#edcc61"; break;
        case 512 : return "#9c0"; break;
        case 1024 : return "#33b5e5"; break;
        case 2048 : return "#09c"; break;
        case 4096 : return "#a6c"; break;
        case 8192 : return "#93c"; break;
    }
    return "black";
}

function getNumberColor(n){
    if(n <= 4){
        return "#776e65";
    }
    else{
        return "white";
    }
}

function nospace(a){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(a[i][j] == 0)
                return false;
        }
    }
    return true;
}

function canMoveLeft(a){
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            if(a[i][j - 1] == 0 || a[i][j] == a[i][j - 1])
                return true;
        }
    }
    return false;
}

function canMoveUp(a){
    for(var i = 1; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(a[i - 1][j] == 0 || a[i][j] == a[i - 1][j])
                return true;
        }
    }
    return false;
}

function canMoveRight(a){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 3; j++){
            if(a[i][j + 1] == 0 || a[i][j] == a[i][j + 1])
                return true;
        }
    }
    return false;
}

function canMoveDown(a){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 4; j++){
            if(a[i + 1][j] == 0 || a[i][j] == a[i + 1][j])
                return true;
        }
    }
    return false;
}

function noBlockVertical(row1, row2, col, a){
    for(var i = row2 + 1; i < row1; i++){
        if(a[i][col] != 0 ){
            return false;
        }
    }
    return true;
}

function noBlockHorizontal(row, col1, col2, a){
    for(var j = col2 + 1; j < col1; j++){
        if(a[row][j] != 0 ){
            return false;
        }
    }
    return true;
}

function noMove(board){
    if(canMoveUp(board) || 
    canMoveLeft(board) ||
    canMoveDown(board) ||
    canMoveRight(board)){
        return false;
    }
    return true;
}