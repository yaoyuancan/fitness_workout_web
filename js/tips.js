document.addEventListener("DOMContentLoaded", function () {
  const readMoreButtons = document.querySelectorAll(".read-more");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.previousElementSibling;

      content.classList.toggle("active");
      this.classList.toggle("active");

      this.textContent =
        this.textContent === "Read More" ? "Read Less" : "Read More";
    });
  });
});

let selected = 0;
let reviewData = [];

fetch("./reviewData.json")
  .then((response) => response.json())
  .then((data) => {
    reviewData = data.reviewData;
    updateReview();
  });

function updateReview() {
  if (reviewData.length === 0) return;

  const review = reviewData[selected];
  document.getElementById("review-text").textContent = review.review;
  document.getElementById("reviewer-name").textContent = review.name;
  document.getElementById("reviewer-status").textContent = review.status;
  document.getElementById("review-image").src = review.image;
}

document.getElementById("left-arrow").addEventListener("click", () => {
  selected = selected === 0 ? reviewData.length - 1 : selected - 1;
  updateReview();
});

document.getElementById("right-arrow").addEventListener("click", () => {
  selected = selected === reviewData.length - 1 ? 0 : selected + 1;
  updateReview();
});
