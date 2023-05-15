import React from 'react'
import { useState } from 'react';

const Files = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/Create/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
        setSelectedFile(null);
      } else {
        alert('Failed to upload image.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while uploading the image.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};


export default Files