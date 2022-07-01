import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import initializeAuth from './Firebase/firebase.initilize';
import './App.css'
import { useState } from 'react';

initializeAuth();
const provider = new GoogleAuthProvider();

function App() {

  const [user, SetUser] = useState({});   

  const handleGoogleSignIN = () => {
      const auth = getAuth();
      signInWithPopup(auth, provider)
      .then(result =>  {
        const {displayName, email, photoURL}  = result.user;
        const logedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        SetUser(logedInUser)
      })
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIN}>Sign In</button>
      <br />
      {
        user.email && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
        </div>
      }
    </div>
  );
}

export default App;
