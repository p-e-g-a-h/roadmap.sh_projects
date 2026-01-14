const textarea = document.querySelector("textarea");
const counter = document.querySelector("input");
const maxText = "/225";

textarea.addEventListener("input", (e) => {
  const len = e.target.value.length;
  const isTooLong = len >= 225 ? true : false;
  const color = isTooLong ? "red" : "#1a1a1a";
  textarea.style.border = `2px solid ${color}`;
  counter.style.border = `2px solid ${color}`;
  counter.value = len + maxText;
});
