document.head.insertAdjacentHTML("beforeend", `
<style>
  .zs-toast {
    position: fixed;
    right: 20px;
    bottom: -60px;
    opacity: 0;
    padding: 12px 18px;
    margin-top: 10px;
    font-family: sans-serif;
    border-radius: 8px;
    color: white;
    transition: all .3s ease;
    z-index: 999999;
    box-shadow: 0 4px 15px rgba(0,0,0,.25);
    pointer-events: none;
  }

  .zs-toast.show {
    bottom: 20px;
    opacity: 1;
  }

  .zs-toast-default { background: #007bff; }
  .zs-toast-success { background: #28a745; }
  .zs-toast-error   { background: #dc3545; }
  .zs-toast-warn    { background: #ffc107; color: black; }
  .zs-toast-light   { background: #f8f9fa; color: black; }
  .zs-toast-dark    { background: #343a40; }
  .zs-toast-brown   { background: #8B4513; }
</style>
`);

(function () {
  function show(message, type = "default", duration = 2500) {
    const toast = document.createElement("div");
    toast.className = `zs-toast zs-toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Global API
  window.zsToast = {
    default: (msg, d) => show(msg, "default", d),
    success: (msg, d) => show(msg, "success", d),
    error:   (msg, d) => show(msg, "error", d),
    warn:    (msg, d) => show(msg, "warn", d),
    light:   (msg, d) => show(msg, "light", d),
    dark:    (msg, d) => show(msg, "dark", d),
    brown:   (msg, d) => show(msg, "brown", d),
  };
})();
