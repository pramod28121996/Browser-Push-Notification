self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "Push Codelab";
  const options = {
    body: "Yay it works.",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// this.addEventListener("activate", (event) => {
//   console.log("sw activate");
//   event.waitUntil(self.clients.claim());
// });
// this.addEventListener("push",async  (event) => {
//   debugger
//   if (!(self.Notification && self.Notification.permission === "granted")) {
//     return;
//   }
//   const options = {
//     body: "This is a test notification",
//   };

//   await event.waitUntil(
//     this.registration.showNotification(
//       "New Notification",
//       options
//     )
//   );

//   // notification.addEventListener("click", () => {
//   //   clients.openWindow(
//   //     "https://example.blog.com/2015/03/04/something-new.html"
//   //   );
//   // });
// });

// this.addEventListener("notificationclick", (event) => {
//   console.log("Notification clicked:", event);

//   event.notification.close();

//   event.waitUntil(
//     clients.matchAll({ type: "window" }).then((clients) => {
//       const client = clients.find((c) => c.visibilityState === "visible");

//       if (client) {
//         client.navigate(event.notification.data.url || "/");
//         client.focus();
//       } else {
//         clients.openWindow(event.notification.data.url || "/");
//       }
//     })
//   );
// });
