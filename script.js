"use strict";
// DATA
// - Selectors -
// Container. Contains the screen and the rows with seats (All divs)
const container = document.querySelector(".container");
// All seats (divs) stored in a node list
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
// count (span element insise paragraph)
const count = document.getElementById("count");
// total (span element insise paragraph)
const total = document.getElementById("total");
// selector element that conatins option elements with the movies
const movieSelect = document.getElementById("movie");
// value attribute of the option elements

// - Variables -
let ticketPrice = 0;

// LOGIC
// - Functions -

// Toggle a seat when clicked
function toggleSeat(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSeatCountAndTotal();
  }
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSeatCountAndTotal() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsIndices = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndices));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Initialize
function initialize() {
  populateUi();
  ticketPrice = +movieSelect.value;
  updateSeatCountAndTotal();
}

initialize();

// - Event Listeners -

// Seat selection event
container.addEventListener("click", (e) => {
  toggleSeat(e);
});

// Movie selection event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSeatCountAndTotal();
});
