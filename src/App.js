import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import initializeAuth from './Firebase/firebase.initilize';
import './App.css'
import { useState } from 'react';

initializeAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, SetUser] = useState({});

  const handleGoogleSignIN = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
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
        const { displayName, email, photoURL } = result.user;
        const logedInUser = {
          name: displayName,
          email: email,
          img: photoURL
        };
        SetUser(logedInUser)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        SetUser({});
      })
  }

  const handleRegister = e => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
    })
    e.preventDefault();
  }

  const handleEmail = e => {
      setEmail(e.target.value);
  }

  const handlePassword = e => {
    setPassword(e.target.value);
}

  return (
    <div className="mx-5">
      <br />
      <h3 className="text-primary">Please Register</h3>
      <form onSubmit={handleRegister}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" onBlur={handleEmail} className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" onBlur={handlePassword} className="form-control" id="inputPassword3" required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck1" required />
                <label className="form-check-label" htmlFor="gridCheck1">
                  Example checkbox
                </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-success">Sign in</button>
      </form>


      <br /><br /><br /><br /><br />
      <button onClick={handleGoogleSignIN}>Google Sign In</button>
      <button onClick={handleGithubSignIN}>Github Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>

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
