// KagiScreen Web: empfängt Erinnerungen (Web Push) und öffnet beim Antippen die Übung.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "KagiScreen", {
    body: d.body || "", icon: "icon-180.png", badge: "icon-180.png", tag: "kagiscreen-reminder", renotify: true
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) if (c.url.includes("/quiz/") && "focus" in c) return c.focus();
    return self.clients.openWindow("./");
  }));
});
