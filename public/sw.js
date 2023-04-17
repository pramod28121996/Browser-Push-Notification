self.addEventListener("activate", (event) => {
  console.log("sw activate");
  event.waitUntil(self.clients.claim());
});
self.addEventListener("push", (event) => {  
  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }
  const options = {
    body: "This is a test notification",
  };

  event.waitUntil(
    self.registration.showNotification(
      "New Notification",
      options
    )
  );

  // notification.addEventListener("click", () => {
  //   clients.openWindow(
  //     "https://example.blog.com/2015/03/04/something-new.html"
  //   );
  // });
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event);

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clients) => {
      const client = clients.find((c) => c.visibilityState === "visible");

      if (client) {
        client.navigate(event.notification.data.url || "/");
        client.focus();
      } else {
        clients.openWindow(event.notification.data.url || "/");
      }
    })
  );
});
