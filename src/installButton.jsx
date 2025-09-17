import { useEffect, useRef, useState } from "react";

export default function InstallButton() {
  const deferredPrompt = useRef(null); // stays alive across navigations
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
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
      console.log("App installed");
    }
    deferredPrompt.current = null;
    setCanInstall(false);
  };

  if (!canInstall) return null;

  return (
    <button onClick={installApp} className="install-btn">
      Install App
    </button>
  );
}
