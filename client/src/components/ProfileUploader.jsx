import { useRef, useState } from "react";
import axios from "../services/axiosServices";
import UploadInfo from "./UploadInfo";

export default function ProfileUploader({ user, setUser }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.put("/profile/update", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prevUser) => ({
        ...prevUser,
        imageUrl: data.imageUrl,
      }));
    } catch (error) {
      console.error("Failed to upload image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-4 border-b">
      <UploadInfo />

      <div className="flex items-center gap-3 mt-3">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleUpload}
        />

        <div className="relative">
          <img
            src={user?.imageUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-full object-cover w-12 h-12 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          />
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs rounded-full">
              Uploading...
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-gray-700 font-semibold">
            {user?.username || "Loading..."}
          </span>
          <span className="text-gray-500 text-xs">{user?.role || "User"}</span>
        </div>
      </div>
    </div>
  );
}
