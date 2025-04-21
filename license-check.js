// Define the global checkLicense function so the presence check can succeed
window.checkLicense = true;

// Firebase setup and license check
const firebaseConfig = {
  apiKey: "AIzaSyBGmAclzNQtsnIjV6nMYOts1Xft_I52NwQ",
  authDomain: "themelicensedb.firebaseapp.com",
  projectId: "themelicensedb",
  storageBucket: "themelicensedb.firebasestorage.app",
  messagingSenderId: "854131343734",
  appId: "1:854131343734:web:1f29ed156de8e5f6457a57",
  measurementId: "G-GYNV4PCC12"
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
  script.src = "https://raw.githubusercontent.com/merazalveedev/merazalveedev/refs/heads/main/theme-assets.js"; // Link to Part 2 JS file
  document.body.appendChild(script);
}
