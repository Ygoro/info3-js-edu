'use strict';

var userChoice = {
    gridSize: 16,
    cellColor: '#ffffff'
}

// Generates random hex color
function getRandomColor() {
    const hexChars = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
    }

    return color;
}

// Sets randomly generated color
function setRandomColor() {
    $('#color').val(getRandomColor());
}

// Fills cell with random color on hover
function drawRandomColor() {
    $('cell').hover(function() {
        row.css('backgroundColor', getRandomColor());
    });
}

// Generates blank table of defined size
function generateTable(size) {
    let table = $('<table>').addClass('grid-table');

    for (let i = 0; i < size; i++) {
        let column = $('<tr>');
        for (let j = 0; j < size; j++) {
            let row = $('<td></td>').addClass('cell');
            column.append(row);
        }

        column.append('</tr>');
        table.append(column);
    }
    table.append('</table>');

    $('.drawing-panel').append(table);
}

function determineColor() {

}

$(document).ready(function() {
    $('#reset').hide();

    $('#generate').on('click', function() {
        $('.controls').hide();
        $('#generate').hide();
        $('#reset').show();

        userChoice.gridSize = $('#grid').val();
        userChoice.cellColor = $('#color').val();

        generateTable(userChoice.gridSize);
    });

    $('.cell').mouseenter(function() {
        $(this).css('backgroundColor', userChoice.cellColor);
    })

    $('#reset').on('click', function() {
        location.reload();
        $('.controls').show();
        $('#generate').show();
        $('.drawing-panel').hide();
    });
});
