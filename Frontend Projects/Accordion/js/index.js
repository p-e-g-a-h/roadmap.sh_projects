const details = document.querySelectorAll("details");
const box = document.querySelector("#box");

box.addEventListener("click", (e) => {
  const clickedDetail = e.target.closest("details");

  if (clickedDetail) {
    details.forEach((el) => {
      if (el != clickedDetail) {
        el.removeAttribute("open");
      }
    });
  }
});
