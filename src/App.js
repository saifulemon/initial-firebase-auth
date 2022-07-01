import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import initializeAuth from './Firebase/firebase.initilize';
import './App.css'
import { useState } from 'react';

initializeAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();

function App() {

  const [user, SetUser] = useState({});   

  const handleGoogleSignIN = () => {
      signInWithPopup(auth, googleProvider)
      .then(result =>  {
        const {displayName, email, photoURL}  = result.user;
        const logedInUser = {
          name: displayName,
          email: email,
          img: photoURL
        };
        SetUser(logedInUser)
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleGithubSignIN = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const {displayName, email, photoURL}  = result.user;
        const logedInUser = {
          name: displayName,
          email: email,
          img: photoURL
        };
        SetUser(logedInUser)
    })
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIN}>Google Sign In</button>
      <button onClick={handleGithubSignIN}>Github Sign In</button>
      <br />
      {
        user && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.img} alt="userPhoto" />
        </div>
      }
    </div>
  );
}

export default App;
