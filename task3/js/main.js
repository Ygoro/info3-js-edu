"use strict";

let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");

    n > slides.length ? (slideIndex = 1) : "";
    n < 1 ? (slideIndex = slides.length) : "";

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex-1].style.display = "flex";
}

$(document).ready(function () {
    showSlides(slideIndex);
    currentSlide(1);

    $(".prev").on("click", plusSlides(-1));
    $(".next").on("click", plusSlides(1));
});