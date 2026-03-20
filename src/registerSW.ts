export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/edu-app/sw.js')
        .then((reg) => {
          console.log('SW registered:', reg.scope);
        })
        .catch((err) => {
          console.log('SW registration failed:', err);
        });
    });
  }
}
