function cellsMatchingSignCount(cells, sign) {
    var cellsMatchingCount = 0;

    $(cells).each(function () {
        var className = this.className;

        if (className.indexOf(sign) != -1) {
            cellsMatchingCount++;
        }
    });

    return cellsMatchingCount;
}

function checkSetOfCellsForWin(cellSet) {
    if (cellsMatchingSignCount(cellSet, 'x') == 3) {
        alert('Player wins');
        return true;
    }

    if (cellsMatchingSignCount(cellSet, 'o') == 3) {
        alert('Computer wins');
        return true;
    }

    return false;
}

function checkForWin() {
    var row1Cells = $('.r1').children();
    if (checkSetOfCellsForWin(row1Cells)) return true;

    var row2Cells = $('.r2').children();
    if (checkSetOfCellsForWin(row2Cells)) return true;

    var row3Cells = $('.r3').children();
    if (checkSetOfCellsForWin(row3Cells)) return true;

    var column1Cells = $('.c1');
    if (checkSetOfCellsForWin(column1Cells)) return true;

    var column2Cells = $('.c2');
    if (checkSetOfCellsForWin(column2Cells)) return true;

    var column3Cells = $('.c3');
    if (checkSetOfCellsForWin(column3Cells)) return true;

    var upperLeftBottomRight = [];
    upperLeftBottomRight.push(row1Cells[0]);
    upperLeftBottomRight.push(row2Cells[1]);
    upperLeftBottomRight.push(row3Cells[2]);
    if (checkSetOfCellsForWin(upperLeftBottomRight)) return true;

    var upperRightBottomLeft = [];
    upperRightBottomLeft.push(row1Cells[2]);
    upperRightBottomLeft.push(row2Cells[1]);
    upperRightBottomLeft.push(row3Cells[0]);
    if (checkSetOfCellsForWin(upperRightBottomLeft)) return true;
}

function setSignToCell(cell) {
    if (cell.className.indexOf('x') != -1 ||
            cell.className.indexOf('o') != -1) {
        return;
    }

    if (ItsXturn) {
        $(cell).toggleClass('x');
        ItsXturn = false;
    } else {
        $(cell).toggleClass('o');
        ItsXturn = true;
    }
}

function resetGame() {
    var cells = $('.cell');

    cells.each(function () {
        $(this).removeClass('x');
        $(this).removeClass('o');
    });

    ItsXturn = true;
}

function renderBoard() {
    var row1 = $("<div>", { class: "r1" });
    row1.append($('<div>', { class: "cell c1" }), $('<div>', { class: "cell c2" }), $('<div>', { class: "cell c3" }))

    var row2 = $("<div>", { class: "r2" });
    row2.append($('<div>', { class: "cell c1" }), $('<div>', { class: "cell c2" }), $('<div>', { class: "cell c3" }))

    var row3 = $("<div>", { class: "r3" });
    row3.append($('<div>', { class: "cell c1" }), $('<div>', { class: "cell c2" }), $('<div>', { class: "cell c3" }))

    GameContainer.append(row1,row2,row3);
}

var ItsXturn = true;
var GameContainer = $('#GameContainer');

function startGame() {
    renderBoard();
    
    var allCells = $('.cell');

    allCells.each(function (index) {
        var that = this;
        $(that).click(function () {
            setSignToCell(that);
            if (checkForWin()) {
                resetGame();
                return false;
            }
        });
    });
}

startGame();