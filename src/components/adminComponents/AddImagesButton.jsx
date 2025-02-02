import axios from "axios";
import { useRef, useState } from "react";
import { Button, useNotify, useRecordContext, useRefresh } from "react-admin";

const AddProductImagesButton = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const notify = useNotify();
  const refresh = useRefresh();
  const record = useRecordContext();
  const fileUpload = useRef();

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleAddImages = async () => {
    if (selectedFiles.length === 0) {
      notify("Please select images to upload", { type: "warning" });
      return;
    }

    if (!record || !record._id) {
      notify("Product ID is missing", { type: "warning" });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append("images", file);
      });

      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_IMAGES_UPLOADER_URL}`,
        formData
      );

      const uploadedImages = uploadResponse.data.fileInfos;

      if (uploadedImages) {
        console.log("Images uploaded succesfully");
      }

      const addImagesResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_IMAGES_URL}`,
        {
          id: record._id,
          images: uploadedImages,
        }
      );

      notify("Images added successfully!", { type: "success" });
      fileUpload.current.value = "";
      refresh();
    } catch (error) {
      notify(`Error: ${error.message}`, { type: "warning" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={loading}
        ref={fileUpload}
      />
      <Button
        label="Add Images From Local Storage"
        onClick={handleAddImages}
        disabled={loading}
      />
    </div>
  );
};

export default AddProductImagesButton;
