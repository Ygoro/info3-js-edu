"use strict";

// Generates the transition between questions
function transition($curr, $next) {
    $curr.css("z-index", 1).fadeOut("fast", function () {
        $next.show().css("z-index", 2);
        $curr.css("z-index", 0);
    });
    $next.css("z-index", 2).fadeIn("slow", function () {
        $curr.hide().css("z-index", 0).removeClass("visible");
        $next.css("z-index", 1).addClass("visible");
    });
}

// Toggles next slide (called on 'next' click)
function toggleNextSlide() {
    let $curr = $(".question-box:visible"),
        $next = $curr.next().length ? $curr.next() : $(".question-box").first();

    transition($curr, $next);
}

// Toggles previous slide (called on 'back' click)
function togglePreviousSlide() {
    let $curr = $(".question-box:visible"),
        $prev = $curr.prev().length ? $curr.prev() : $(".question-box").last();

    transition($curr, $prev);
}

// Dynamically generates quiz sidenavigation boxes
function generateNavigation(questionAmount) {
    for (let i = 0; i < questionAmount; i++) {
        $(".navigation").append("<div class='nav-box box-" + Number(i + 1) + "'><span>Q " + Number(i + 1) + "</span></div>");
    }

    // Calculates height of nav boxes (depends on the amount of questions)
    let calculatedBoxHeight = 100 / questionAmount + "%";
    $(".nav-box").css("height", calculatedBoxHeight);
}

// Toggles jump to selected question
function toggleSlideTroughNavigation(target) {
    let $curr = $(".question-box:visible");

    target[0].localName == "span" ? target = target.parent() : "";
    let slideIndex = target.attr("class").split("box-")[1];
    
    transition($curr, $(".question-box.q" + slideIndex));
}

// Generates elements which symbolize answers of the quiz
function generateAnswers() {
    let calculatedAnswerAmount = Number(2 + $(".question-box:visible").index());
    for (let j = 0; j < calculatedAnswerAmount; j++) {
        $(".answers").append("<div class='answer answ-" + Number(j + 1) + "'><span>Answer " + Number(j + 1) + "</span></div>");
    }
    
    // Calculates width of answer elements (depends on the question index)
    let answerWidth = 100 / calculatedAnswerAmount + "%";
    $(".answer").css("width", answerWidth);
}

// Toggles 'back' and 'next' button visibility on slides
function toggleBtn() {
    let firstSlide = $(".question-box:first-of-type()");
    let lastSlide = $(".question-box:last-of-type()")
    if (firstSlide.hasClass("visible")) {
        $(".btn-back").hide();
        $(".btn-next").show();
        console.log("prvi")
    } else if (lastSlide.hasClass("visible")) {
        $(".btn-back").show();
        $(".btn-next").hide();
        console.log("zadnji")
    } else {
        $(".btn-back").show();
        $(".btn-next").show();
        console.log("sve ostalo")
    }
}

$(document).ready(function () {
    // Initially show only the first question
    $(".question-box").hide();
    $(".question-box:first-of-type()").show().addClass("visible");

    let questionAmount = $(".question-box").length;
    generateNavigation(questionAmount);
    generateAnswers();
    toggleBtn();

    $(".btn-back").on("click", function () {
        togglePreviousSlide();
        generateAnswers();
        toggleBtn();
    });

    $(".btn-next").on("click", function () {
        // Removes initially set class on first slide
        $(".question-box:first-of-type()").removeClass("visible");
        toggleNextSlide();
        generateAnswers();
        toggleBtn();
    });

    $(".nav-box").on("click", function (e) {
        let target = $(e.target);
        toggleSlideTroughNavigation(target)
    });
});
