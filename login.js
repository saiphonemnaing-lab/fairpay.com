const message = document.querySelector("#authMessage");
const params = new URLSearchParams(window.location.search);

const errorMessages = {
  "google-not-configured": "Google login needs GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI in Render.",
  "google-state": "Google login expired. Try again.",
  "google-failed": "Google login could not finish. Try again."
};

if (errorMessages[params.get("error")]) {
  message.hidden = false;
  message.textContent = errorMessages[params.get("error")];
}
