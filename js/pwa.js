/**
 * Ummath APP - PWA Registration & Installation Banner
 */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then((reg) => console.log("ServiceWorker registered successfully:", reg.scope))
      .catch((err) => console.log("ServiceWorker registration failed:", err));
  });
}

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const pwaBtn = document.getElementById("pwa-install-btn");
  if (pwaBtn) {
    pwaBtn.classList.remove("hidden");
    pwaBtn.addEventListener("click", () => {
      pwaBtn.classList.add("hidden");
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA install prompt");
        }
        deferredPrompt = null;
      });
    });
  }
});
