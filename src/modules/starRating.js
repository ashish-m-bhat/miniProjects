const starsArray = []; // wrapperDiv, star1, star2, star3, star4, star5
let currentSelectedStar=0; // To keep track of the current rating. So that when un hovered, the selected rating persists

const wrapperDiv = document.querySelector("#wrapperDiv");
starsArray.push(wrapperDiv); // Just to use 1-indexing

createStars();
// Function to create 5 stars intitally
function createStars() {
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("div");
      star.setAttribute("id", i);
      star.setAttribute("class", "fa fa-star-o fa-5x");
      wrapperDiv.appendChild(star);
      starsArray.push(star);
    }
  }


// onclick listener for stars
wrapperDiv.addEventListener('click', (event)=>{
    const selectedStar = event.target;
    if(!selectedStar.classList.contains('fa')) // If somewhere else is clicked in the wrapperDiv
        return;
    paintStars(selectedStar.id);
    currentSelectedStar = selectedStar;
    document.querySelector('#displaySection').innerHTML = selectedStar.id;
});

// When user hovers over a star
wrapperDiv.addEventListener('mouseover', (event) =>{
    const selectedStar = event.target;
    if(!selectedStar.classList.contains('fa'))
        return;
    paintStars(selectedStar.id);
});

// When user un-hovers over a star
wrapperDiv.addEventListener('mouseout', (event) =>{
    paintStars(currentSelectedStar.id);
});

// Function To paint Stars
function paintStars(idOfStar) {
    if(!idOfStar)
        idOfStar = 0;
  const id = +idOfStar;

  // IIFE that highlights all the preceeding stars including the current star
  (function paintYellow() {
    for (let i = id; i >= 1; i--) {
      starsArray[i].classList.add("fa-star");
      starsArray[i].classList.remove("fa-star-o");
    }
  })();

  // IIFE that un-highlights all the succeeding stars
  (function paintWhite() {
    for (let i = id + 1; i <= 5; i++) {
      starsArray[i].classList.add("fa-star-o");
      starsArray[i].classList.remove("fa-star");
    }
  })();
}



