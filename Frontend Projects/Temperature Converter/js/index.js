const main = document.querySelector("main");
const convertBtn = document.querySelector("button");
const input = document.querySelector("input");
const selectFrom = document.querySelector("#from");
const selectTo = document.querySelector("#to");
const result = document.querySelector("p");

main.addEventListener("change", () => {
  if (input.value && selectFrom.value && selectTo.value) {
    convertBtn.disabled = false;
  } else {
    convertBtn.disabled = true;
  }
});

convertBtn.addEventListener("click", (e) => {
  if (selectFrom.value === "fahrenheit" && selectTo.value === "celsius") {
    result.textContent =
      "Result: " + Number((input.value - 32) * (5 / 9)).toFixed(1);
  } else if (
    selectFrom.value === "celsius" &&
    selectTo.value === "fahrenheit"
  ) {
    result.textContent =
      "Result: " + Number(input.value * (9 / 5) + 32).toFixed(1);
  }
});
