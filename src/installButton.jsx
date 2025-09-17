import { useInstallPrompt } from "./useInstallPrompt";

export default function InstallButton() {
  const { canInstall, installApp } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <button onClick={installApp} className="install-btn">
      Install App
    </button>
  );
}
