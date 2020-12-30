"use strict";

let answers = {
    Q1: [],
    Q2: [],
    Q3: [],
    Q4: [],
}

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
        $(".navigation").append("<div class='nav-box'><span>Q " + Number(i + 1) + "</span></div>");
    }

    // Calculates height of nav boxes (depends on the amount of questions)
    let calculatedBoxHeight = 100 / questionAmount + "%";
    $(".nav-box").css("height", calculatedBoxHeight);
}

function toggleSlideTroughNavigation() {

}

// Generates elements which symbolize answers of the quiz
function generateAnswers() {
    let calculatedAnswerAmount = Number(2 + $(".question-box:visible").index());
    for (let j = 0; j < calculatedAnswerAmount; j++) {
        $(".answers").append("<div class='answer'><span>Answer " + Number(j + 1) + "</span></div>");
    }
    
    // Calculates width of answer elements (depends on the question index)
    let answerWidth = 100 / calculatedAnswerAmount + "%";
    $(".answer").css("width", answerWidth);
}

$(document).ready(function () {
    // Initially show only the first question
    $(".question-box").hide();
    $(".question-box:first-of-type()").show().addClass("visible");

    let questionAmount = $(".question-box").length;
    generateNavigation(questionAmount);
    generateAnswers();

    $(".btn-next").on("click", function () {
        // Removes initially set class on first slide
        $(".question-box:first-of-type()").removeClass("visible");
        toggleNextSlide();
        generateAnswers();
    });

    $(".btn-back").on("click", function () {
        togglePreviousSlide();
        generateAnswers();
    });

    $(".nav-box").on("click", toggleSlideTroughNavigation);
});
