import { useState } from 'react';
import './App.css';

function App() {
  // This one value replaces both your old document.querySelector toggle AND the CSS display:none rule.
  // true = show sign-in form, false = show sign-up form
  const [showSignIn, setShowSignIn] = useState(true);

  // Runs when a social button is clicked. "provider" is passed in from each button below.
  function handleSocialClick(provider) {
    alert(`Thank you for testing the ${provider} button! (This is just a test, no real login yet.) #lizdev`);
  }

  return (
    <>
      {/* <>...</> is a "Fragment" — lets us return two top-level elements (container + s-container)
          without wrapping them in an extra <div> that would mess up your original CSS layout */}

      {/* --- SIGN IN FORM --- */}
      {/* Only renders when showSignIn is true. This replaces your old .style.display = 'none' logic entirely */}
      {showSignIn && (
        <div className="container">
          <div className="form-container">

            <div className="form-blob">
              <img src={`${import.meta.env.BASE_URL}thumbnails/logo.png`}alt="blob" className="blob-image blob-image--1" />
              <img src={`${import.meta.env.BASE_URL}thumbnails/logo.png`} alt="blob" className="blob-image blob-image--2" />
              <img src={`${import.meta.env.BASE_URL}thumbnails/logo.png`} alt="blob" className="blob-image blob-image--3" />
            </div>

            <div className="form-header">
              <p>Please enter your details</p>
              <h1>Welcome Back</h1>
            </div>

            <form className="form-box">
              <div className="input-group">
                <input type="email" id="email" className="input-field" placeholder=" " required />
                <label htmlFor="email" className="floating-label">Email address</label>
              </div>

              <div className="input-group">
                <input type="password" id="password" className="input-field" placeholder=" " required />
                <label htmlFor="password" className="floating-label">Password</label>
              </div>

              <div className="checkbox-group">
                <div className="form-col remember-me">
                  <input type="checkbox" id="remember-me-checkbox" className="checkbox-field" />
                  <label htmlFor="remember-me-checkbox">Remember me</label>
                </div>
                <div className="form-col">
                  <a href="#" className="form-link">Forgot password?</a>
                </div>
              </div>

              <button type="submit" className="signinbtn">Sign in</button>
            </form>

            <div className="form-divider">
              <p>Or</p>
            </div>

            <div className="form-bottom">
              <div className="form-social">
                {/* onClick calls our function directly - no addEventListener or querySelector needed */}
                <button className="form-btn form-btn--social" onClick={() => handleSocialClick('Google')}>
                  <img src={`${import.meta.env.BASE_URL}thumbnails/google-icon.png`} className="btn-icon" alt="social-icon" />
                </button>
                <button className="form-btn form-btn--social" onClick={() => handleSocialClick('Apple')}>
                  <img src={`${import.meta.env.BASE_URL}thumbnails/Appleicon-nobg.png`} className="btn-icon" alt="social-icon" />
                </button>
                <button className="form-btn form-btn--social" onClick={() => handleSocialClick('Facebook')}>
                  <img src={`${import.meta.env.BASE_URL}thumbnails/facebookicon.webp`}  className="btn-icon" alt="social-icon" />
                </button>
              </div>
              <p>
                Don't have an account?{" "}
                {/* Instead of e.preventDefault() + querySelector, we just call setShowSignIn(false) directly.
                    React re-renders automatically the instant this state changes */}
                <a href="#" className="form-link" onClick={(e) => { e.preventDefault(); setShowSignIn(false); }}>
                  Sign up
                </a>
              </p>
            </div>

          </div>
        </div>
      )}

      {/* --- SIGN UP FORM --- */}
      {/* Only renders when showSignIn is false */}
      {!showSignIn && (
        <div className="s-container">
          <div className="form-container">

            <div className="form-blob">
              <img src={`${import.meta.env.BASE_URL}thumbnails/logo.png`}  alt="blob" className="blob-image blob-image--1" />
              <img src={`${import.meta.env.BASE_URL}thumbnails/logo.png`}  alt="blob" className="blob-image blob-image--2" />
              <img src={`${import.meta.env.BASE_URL}thumbnails/logo.png`}  alt="blob" className="blob-image blob-image--3" />
            </div>

            <div className="form-header">
              <p>Please enter your details</p>
              <h1>Welcome</h1>
            </div>

            <form className="form-box">
              <div className="input-group">
                <input type="text" id="fullname" className="input-field" placeholder=" " required />
                <label htmlFor="fullname" className="floating-label">Full name</label>
              </div>

              <div className="input-group">
                <input type="email" id="signup-email" className="input-field" placeholder=" " required />
                <label htmlFor="signup-email" className="floating-label">Email address</label>
              </div>

              <div className="input-group">
                <input type="password" id="signup-password" className="input-field" placeholder=" " required />
                <label htmlFor="signup-password" className="floating-label">Password</label>
              </div>

              <button type="submit" className="signupbtn" id="signupbtn">Sign up</button>
            </form>

            <div className="form-divider">
              <p>Or</p>
            </div>

            <div className="form-bottom">
              <div className="form-social">
                <button className="form-btn form-btn--social" onClick={() => handleSocialClick('Google')}>
                  <img src={`${import.meta.env.BASE_URL}thumbnails/google-icon.png`} className="btn-icon" alt="social-icon" />
                </button>
                <button className="form-btn form-btn--social" onClick={() => handleSocialClick('Apple')}>
                  <img src={`${import.meta.env.BASE_URL}thumbnails/Appleicon-nobg.png`} className="btn-icon" alt="social-icon" />
                </button>
                <button className="form-btn form-btn--social" onClick={() => handleSocialClick('Facebook')}>
                  <img src={`${import.meta.env.BASE_URL}thumbnails/facebookicon.webp`} className="btn-icon" alt="social-icon" />
                </button>
              </div>
              <p>
                Have an account?{" "}
                <a href="#" className="s-form-link" id="s-form-link" onClick={(e) => { e.preventDefault(); setShowSignIn(true); }}>
                  Sign in
                </a>
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default App;