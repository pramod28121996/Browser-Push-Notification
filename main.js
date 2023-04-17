var swRegistration = "";
const applicationServerPublicKey =
  "BHe2WU6oPciuiunMohxwZrLSVi3mlbYALRx5YxzELHb2WZzbb0agFd0FV3zeO3IgZV1FUjmacF7FmCYyH9tsIHs";

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker and Push are supported");

  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service worker registered:", registration);
      swRegistration = registration;
      initializeUI();
    })
    .catch(function (error) {
      console.error("Service Worker Error", error);
    });
} else {
  console.warn("Push messaging is not supported");
}

function initializeUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription().then((subscription) => {
    const isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log("User IS subscribed.");
    } else {
      subscribeUser();
    }

    //updateBtn();
  });
}
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    })
    .then(function (subscription) {
      console.log("User is subscribed.");
      console.log(JSON.stringify(subscription));
    })
    .catch(function (error) {
      console.error("Failed to subscribe the user: ", error);
    });
}
