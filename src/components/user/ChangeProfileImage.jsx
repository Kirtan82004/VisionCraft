import { useState } from "react";
import { UploadCloud, ImagePlus, Trash2 } from "lucide-react";
import { updateProfileImage } from "../../services/user/authService";

const UpdateAccountImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed!");
        return;
      }

      setError("");
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Image Remove
  const removeImage = () => {
    setImage(null);
    setPreview(null);
    setError("");
  };

  // Handle Form Submit
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!image) {
      setError("Please select an image!");
      return;
    }

    setError(""); // Clear Errors
    try {
        await updateProfileImage(image);
        alert("Profile image updated successfully!");
    } catch (error) {
        console.log(error.message)
    }
   
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <ImagePlus size={24} className="mr-2" /> Update Profile Picture
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Image Upload Section */}
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded p-4">
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-32 h-32 rounded-full object-cover shadow" />
            <button
              onClick={removeImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center">
            <UploadCloud size={40} className="text-gray-500" />
            <span className="text-gray-700 mt-2">Click or Drag to Upload</span>
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4 flex items-center justify-center hover:bg-blue-600"
      >
        <UploadCloud size={20} className="mr-2" /> Upload Image
      </button>
    </div>
  );
};

export default UpdateAccountImage;
