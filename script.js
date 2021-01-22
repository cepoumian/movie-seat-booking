// DATA
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
let ticketPrice = +movieSelect.value;

// FUNCTIONS
function toggleSeat(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCount();
  }
}

function resetSelectedSeats() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  selectedSeats.forEach((seat) => {
    if (seat.classList.contains("selected")) {
      seat.classList.toggle("selected");
    }
  });
  count.innerText = 0;
  total.innerText = 0;
}

function updateCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function updatePrice(e) {
  resetSelectedSeats();
  ticketPrice = +e.target.value;
  // updateCount();
}

// EVENT LISTENERS

// Seat selection event
container.addEventListener("click", (e) => {
  toggleSeat(e);
});

// Movie selection event
movieSelect.addEventListener("change", (e) => {
  updatePrice(e);
});
