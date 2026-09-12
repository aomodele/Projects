import './App.css';
function App() {
  return (
    <div className="container">
      {/* Note: "class" becomes "className" in JSX — "class" is a reserved word in JavaScript */}

      <div className="form-container">

        <div className="form-blob">
          <img src="/thumbnails/logo.png" alt="blob" className="blob-image blob-image--1" />
          <img src="/thumbnails/logo.png" alt="blob" className="blob-image blob-image--2" />
          <img src="/thumbnails/logo.png" alt="blob" className="blob-image blob-image--3" />
          {/* Note: every tag must be "closed" in JSX, even ones that don't need a closing tag in plain HTML.
              <img ...> becomes <img ... /> — the trailing slash is required */}
        </div>

        <div className="form-header">
          <p>Please enter your details</p>
          <h1>Welcome Back</h1>
        </div>

        <form className="form-box">
          <div className="input-group">
            <input type="email" id="email" className="input-field" placeholder=" " required />
            <label htmlFor="email" className="floating-label">Email address</label>
            {/* Note: "for" becomes "htmlFor" in JSX — "for" is also a reserved JS word (used in for-loops) */}
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
            <button className="form-btn form-btn--social">
              <img src="/thumbnails/google-icon.png" className="btn-icon" alt="social-icon" />
            </button>
            <button className="form-btn form-btn--social">
              <img src="/thumbnails/Appleicon-nobg.png" className="btn-icon" alt="social-icon" />
            </button>
            <button className="form-btn form-btn--social">
              <img src="/thumbnails/facebookicon.webp" className="btn-icon" alt="social-icon" />
            </button>
          </div>
          <p>
            Don't have an account?{" "}
            <a href="#" className="form-link go-to-signup">Sign up</a>
            {/* Note: {" "} inserts a plain space — JSX sometimes collapses whitespace between
                lines/tags, so this guarantees a visible space before the link */}
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;