import React, { useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './styles/ImageUpload.css';

const ImageEdit = (props) => {
  const { files, setFiles } = props;

  // Create drop zone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: useCallback((acceptedFiles) => {
      const total = 4;
      const acceptFiles = [];
      acceptedFiles.forEach((file, index) => {
        if (index < total - files.length) {
          acceptFiles.push(file);
        }
      });
      setFiles(
        [...files, ...acceptFiles].map((file, index) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }, [files, setFiles])
  });

  // Remove image
  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // Preview uploaded images
  const thumbs = files.map((file, index) =>
    <div className='thumb' key={file.name}>
      <div className='thumb__inner'>
        <img src={file.preview} className='thumb__img' alt='' />
      </div>
      <i
        className='thumb__delete fas fa-minus-circle'
        onClick={() => removeImage(index)}
      />
    </div>
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {
          isDragActive
            ? <p>Drop the files here ...</p>
            : <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <aside className='thumbsContainer'>{thumbs}</aside>
    </section>
  );
};

export default ImageEdit;
