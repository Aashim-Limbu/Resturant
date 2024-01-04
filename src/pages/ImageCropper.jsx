import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropUtils"; // You need to implement this function (explained below)

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
        setShowCrop(true); // Show the crop screen when an image is selected
      };
    }
  };

  const onCropComplete = async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    setCroppedImage(croppedImage);
  };

  const handleSendImage = async () => {
    if (croppedImage) {
      // Log croppedImage blob before appending to FormData
      console.log("croppedImage blob:", croppedImage);

      const formData = new FormData();
      formData.append("croppedImage", croppedImage, "cropped_image.jpg"); // Set a filename

      // Log formData before sending the request
      console.log("formData:", formData);

      // Send formData to your backend using fetch or any other method
      // Example:
      // fetch('your-backend-endpoint', {
      //   method: 'POST',
      //   body: formData,
      // })
      // .then(response => response.json())
      // .then(data => {
      //   // Handle response from backend
      // })
      // .catch(error => {
      //   // Handle error
      // });
    }
    setShowCrop(false);
  };

  const displayCroppedImage = () => {
    if (croppedImage) {
      const imageUrl = URL.createObjectURL(croppedImage);
      return (
        <div>
          <img src={imageUrl} alt="Cropped Image" />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {showCrop && image && (
        <div>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <button
            className="btn btn-primary fixed-bottom"
            onClick={handleSendImage}
          >
            Send Cropped Image & Close
          </button>
        </div>
      )}

      {/* Display cropped image */}
      {displayCroppedImage()}
    </div>
  );
};

export default ImageCropper;
