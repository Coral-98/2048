function showNumberWithAnimation(x, y, number){
    var numbercell = $("#grid-number-cell-"+ x + "-" + y);

    numbercell.css("background-color",getNumberBackgroundColor(number));
    numbercell.css("color",getNumberColor(number));
    numbercell.text(number);

    numbercell.animate({
        width: '100px',
        height: '100px',
        top: getPosTop(x, y),
        left: getPosLeft(x, y)
    }, 50);
}

function showMoveAnimation(fromx, fromy, tox, toy){
    var numbercell = $("#grid-number-cell-" + fromx + "-" + fromy);

    numbercell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200)
}


function showScore(score){
    $("#score").text(score);
}
