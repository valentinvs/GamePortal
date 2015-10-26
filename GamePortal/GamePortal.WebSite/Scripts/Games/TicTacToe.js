function getMarkedCellsCountBySign(cells, sign) {
    var signCount = 0;

    $(cells).each(function () {
        var className = this.className;

        if (className.indexOf(sign) != -1) {
            signCount++;
        }
    });

    return signCount;
}

function checkIfSignMatchThreeTimes(cells, sign) {
    var signCount = getMarkedCellsCountBySign(cells, sign);

    if (signCount == 3) {
        return true;
    }

    return false;
}

function checkSetOfCellsForWin(cellSet) {
    if (checkIfSignMatchThreeTimes(cellSet, 'x')) {
        alert('Player wins');
        return;
    }

    if (checkIfSignMatchThreeTimes(cellSet, 'o')) {
        alert('Computer wins');
        return;
    }
}

function checkForWin() {
    var row1Cells = $('.r1').children();
    checkSetOfCellsForWin(row1Cells);

    var row2Cells = $('.r2').children();
    checkSetOfCellsForWin(row2Cells);

    var row3Cells = $('.r3').children();
    checkSetOfCellsForWin(row3Cells);

    var column1Cells = $('.c1');
    checkSetOfCellsForWin(column1Cells);

    var column2Cells = $('.c2');
    checkSetOfCellsForWin(column2Cells);

    var column3Cells = $('.c3');
    checkSetOfCellsForWin(column3Cells);

    var upperLeftBottomRight = [];
    upperLeftBottomRight.push(row1Cells[0]);
    upperLeftBottomRight.push(row2Cells[1]);
    upperLeftBottomRight.push(row3Cells[2]);
    checkSetOfCellsForWin(upperLeftBottomRight);

    var upperRightBottomLeft = [];
    upperRightBottomLeft.push(row1Cells[2]);
    upperRightBottomLeft.push(row2Cells[1]);
    upperRightBottomLeft.push(row3Cells[0]);
    checkSetOfCellsForWin(upperRightBottomLeft);
}

var itsXturn = true;
var allCells = $('.cell');
allCells.each(function (index) {
    var that = this;
    $(that).click(function () {
        if (that.className.indexOf('x') != -1 ||
            that.className.indexOf('o') != -1) {
            return;
        }

        if (itsXturn) {
            $(that).toggleClass('x');
            itsXturn = false;
        } else {
            $(that).toggleClass('o');
            itsXturn = true;
        }

        checkForWin();
    });
});