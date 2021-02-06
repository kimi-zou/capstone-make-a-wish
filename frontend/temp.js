// From: TopNav
/*
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../../Home/LoginFormModal';

  const sessionUser = useSelector(state => state.session.user);

let sessionLinks;
if (sessionUser) {
  sessionLinks = (
    <ProfileButton user={sessionUser} />
  );
} else {
  sessionLinks = (
    <>
      <LoginFormModal />
      <NavLink to="/signup">Sign Up</NavLink>
    </>
  );
}
 {isLoaded && sessionLinks} */

//  Image Upload and Preview:
/*
// Preview wish images
const readUrl = (e) => {
  if (e.target.files) {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return (new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          resolve(event.target.result);
        });
        reader.addEventListener('error', reject);
        reader.readAsDataURL(file);
      }));
    }))
      .then(images => {
// Once all promises are resolved, update state with image URI array
          setImages(images);
        }, error => {
          console.error(error);
        });
    }
  };

<div className='wish-images--display'>
    {images && images.map((image, idx) => {
      return (
        <img
          className='wish-images__image'
          src={image}
          alt=''
          key={idx}
        />
      );
    })}
  </div>
  <div>
    <label>Upload Image</label>
    <input
      type='file'
      accept='.png,.jpg,.jpeg'
      multiple
      onChange={(e) => { handleUploadWishImage(e); readUrl(e); }}
    />
  </div>
*/
