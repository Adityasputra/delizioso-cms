import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function UploadInfo() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded-lg flex items-start gap-3 text-sm relative">
      <p>
        Click on the profile picture to upload a new photo. Make sure the file
        format is <strong>JPG, PNG, or GIF</strong> and the size is no more than{" "}
        <strong>2MB</strong>.
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
        aria-label="Close"
      >
        <IoMdClose />
      </button>
    </div>
  );
}
