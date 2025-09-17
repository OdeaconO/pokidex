// useInstallPrompt.js
import { useEffect, useRef, useState } from "react";

export function useInstallPrompt() {
  const deferredPrompt = useRef(null);
  const [canInstall, setCanInstall] = useState(
    localStorage.getItem("isInstalled") !== "true"
  );

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      localStorage.setItem("isInstalled", "true");
      deferredPrompt.current = null;
      setCanInstall(false);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt.current) return;
    deferredPrompt.current.prompt();
    const { outcome } = await deferredPrompt.current.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem("isInstalled", "true");
      setCanInstall(false);
    }
    deferredPrompt.current = null;
  };

  return { canInstall, installApp };
}
