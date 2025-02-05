import { AlertTriangle } from "lucide-react";

export default function WarningDesktopOnly() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-600 px-6">
      <AlertTriangle size={64} className="mb-4 animate-bounce" />
      <h1 className="text-2xl font-semibold">Desktop Mode Required</h1>
      <p className="text-center text-lg mt-2 max-w-md">
        Please use a device with a larger screen for a better experience.
      </p>
    </div>
  );
}
