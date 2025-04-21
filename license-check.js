// Define the global checkLicense function so the presence check can succeed
window.checkLicense = true;

// Firebase setup and license check
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "YOUR-MESSAGING-ID",
  appId: "YOUR-APP-ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

// Get current domain
const currentDomain = window.location.hostname.replace("www.", "");

db.ref("licenses/" + currentDomain).once("value").then((snap) => {
  const license = snap.val();
  
  if (license && license.status === "active") {
    // Proceed to Part 2 (only if Part 1 license check passes)
    loadPart2();
  } else {
    // Invalid or missing license - show blank page
    document.body.innerHTML = "";
  }
}).catch(() => {
  // In case of error, remove content or show error
  document.body.innerHTML = "";
});

function loadPart2() {
  const script = document.createElement("script");
  script.src = "https://yourcdn.com/theme-assets.js"; // Link to Part 2 JS file
  document.body.appendChild(script);
}
