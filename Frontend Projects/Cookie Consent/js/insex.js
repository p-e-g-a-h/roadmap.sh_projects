const acceptBtn = document.querySelector("#accept");
const rejectBtn = document.querySelector("#reject");
const cookieBox = document.querySelector("#cookieBox");

const handleConsent = (status) => {
  cookieBox.style.display = "none";
  localStorage.setItem(
    "cookie-consent",
    JSON.stringify({
      status: status,
      date: new Date().toISOString().split("T")[0],
    })
  );
};

acceptBtn.addEventListener("click", () => handleConsent("accepted"));
rejectBtn.addEventListener("click", () => handleConsent("rejected"));

if (cookieBox && localStorage.getItem("cookie-consent")) {
  cookieBox.style.display = "none";
}
