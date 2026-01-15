const mainBox = document.querySelector("#box p");
const innerBox = document.querySelector("#innerBox");

mainBox.addEventListener("click", () => {
  innerBox.style.display =
    innerBox.style.display === "block" ? "none" : "block";
});

let lastClickedItem;

innerBox.addEventListener("click", (e) => {
  const clickedItem = e.target.closest("p");

  if (clickedItem) {
    if (lastClickedItem) {
      lastClickedItem.style.color = "#f0f0f0";
    }

    clickedItem.style.color = "#822659";
    lastClickedItem = clickedItem;
    mainBox.textContent = clickedItem.textContent;
    innerBox.style.display = "none";
  }
});
