"use strict";

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides((slideIndex += n));
}

// Thumbnail image controls
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
}

$(document).ready(function () {
    $(".prev").on("click", plusSlides(-1));
    $(".next").on("click", plusSlides(1));
});