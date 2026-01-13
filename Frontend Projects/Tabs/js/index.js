const ul = document.querySelector("ul");
const tabs = ul.querySelectorAll("li");
const sections = document.querySelectorAll("section");

// default selected tab
let lastClickedIndex = 0;
tabs[lastClickedIndex].style.color = "#f0f0f0";
tabs[lastClickedIndex].style.backgroundColor = "#822659";
sections[lastClickedIndex].style.display = "block";

ul.addEventListener("click", (event) => {
  const clickedTab = event.target.closest("li");

  if (clickedTab) {
    const index = [...tabs].indexOf(clickedTab);

    tabs[lastClickedIndex].style.color = "#004d61";
    tabs[lastClickedIndex].style.backgroundColor = "#f0f0f0";
    sections[lastClickedIndex].style.display = "none";

    lastClickedIndex = index;

    tabs[index].style.color = "#f0f0f0";
    tabs[index].style.backgroundColor = "#822659";
    sections[index].style.display = "block";
  }
});
