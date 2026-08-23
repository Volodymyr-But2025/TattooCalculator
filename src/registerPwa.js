import { registerSW } from "virtual:pwa-register";

export function registerPwa() {
  const toast = document.getElementById("pwa-update-toast");
  const button = document.getElementById("pwa-refresh-btn");

  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      if (!toast || !button) return;

      toast.style.display = "flex";
      button.onclick = () => {
        toast.style.display = "none";
        updateSW(true);
      };
    },
  });
}
