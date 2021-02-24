import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageUpload.css';

const ImageEdit = (props) => {
  const { files, setFiles } = props;
  const [errors, setErrors] = useState([]);
  const [preview, setPreview] = useState([]);

  // Create drop zone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (dropfiles) => {
      // limit to 4 images
      const total = 4;
      const acceptFiles = [];
      dropfiles.forEach((file, index) => {
        if (index < total - files.length) {
          acceptFiles.push(file);
        }
      });
      setFiles([...files, ...acceptFiles]);

      // Set preview
      Promise.all([...files, ...acceptFiles].map(file => {
        return (new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = (e) => resolve(e.target.result);
          fileReader.onerror = reject;
          fileReader.readAsDataURL(file);
        }));
      }))
        .then(urls => setPreview([...urls]))
        .catch(err => setErrors(err));
    }
  });

  // Remove image
  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    const updatedPreview = [...preview];
    updatedPreview.splice(index, 1);
    setPreview(updatedPreview);
  };

  // Preview uploaded images
  const thumbs = files.map((file, index) =>
    <div className='thumb' key={file.name}>
      <div className='thumb__inner'>
        <img src={preview[index]} className='thumb__img' alt='' />
      </div>
      <i
        className='thumb__delete fas fa-minus-circle'
        onClick={() => removeImage(index)}
      />
    </div>
  );

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {
          isDragActive
            ? <p>Drop the images here ...</p>
            : <p>Drag and drop <br />or click to upload images</p>
        }
      </div>
      <aside className='thumbsContainer'>{thumbs}</aside>
    </section>
  );
};

export default ImageEdit;
