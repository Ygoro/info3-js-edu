"use strict";

// User choice object with default values
var userChoice = {
    gridSize: 16,
    cellColor: "#ffffff",
};

// Generates random hex color
function getRandomColor() {
    const hexChars = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
    }

    return color;
}

// Generates blank table of defined size
function generateTable(size) {
    let table = $("<table>").addClass("grid-table");

    for (let i = 0; i < size; i++) {
        let column = $("<tr>");
        for (let j = 0; j < size; j++) {
            let row = $("<td></td>").addClass("cell");
            column.append(row);
        }

        column.append("</tr>");
        table.append(column);
    }
    table.append("</table>");

    $(".drawing-panel").append(table);
}

$(document).ready(function () {
    $("#reset").hide();
    $("#color").hide();

    // Generate button event
    $("#generate").on("click", function () {
        userChoice.gridSize = $("#grid").val();

        if (userChoice.gridSize >= 16 && userChoice.gridSize <= 64) {
            $("#generate").prop("disabled", false);
            $(".controls").hide();
            $("#generate").hide();
            $("#reset").show();

            generateTable(userChoice.gridSize);

            if ($("#color-needed").is(":checked")) {
                userChoice.cellColor = $("#color").val();
                $(".cell").hover(function () {
                    $(this).css("backgroundColor", userChoice.cellColor);
                });
            } else {
                userChoice.cellColor = getRandomColor();
                $(".cell").each(function () {
                    $(this).hover(function () {
                        $(this).css("backgroundColor", getRandomColor());
                    });
                });
            }
        } else {
            alert("Grid size must be between 16 and 64");
        }
    });

    // Reset button event
    $("#reset").on("click", function () {
        location.reload();
        $(".controls").show();
        $("#generate").show();
        $(".drawing-panel").hide();
    });

    // Hide/show color selection content
    $("#color-needed").on("click", function () {
        if ($(this).is(":checked")) {
            $(".random").hide();
            $("#color").show();
        } else {
            $(".random").show();
            $("#color").hide();
        }
    });
});
