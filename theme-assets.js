// Firebase asset loading (Part 2)
const db = firebase.database();

// Get assets for the current domain
db.ref("assets/" + currentDomain).once("value").then((snap) => {
  const assets = snap.val();

  if (assets) {
    // Load CSS
    if (assets.css) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = assets.css;
      document.head.appendChild(link);
    }

    // Load JS
    if (assets.js) {
      const script = document.createElement("script");
      script.src = assets.js;
      document.body.appendChild(script);
    }
  } else {
    // No assets found, blank page
    document.body.innerHTML = "";
  }
});
