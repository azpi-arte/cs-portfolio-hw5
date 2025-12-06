class Navbar extends HTMLElement {
  constructor() {
    super();
    const headerHTML = `
    <style>
      /* navbar container */
      nav {
        display: flex;
        position: sticky;
        top: 0;
        justify-content: space-between;
        align-items: center;
        background-color: var(--background-color);
        padding: 10px 0;
        width: 100%;
        box-shadow: 
          0px 3px 20px rgb(0,0,0,0.0),
          0px 10px 30px rgb(0,0,0,0.01);
        view-transition-name: navbar;
        view-transition-group: none;

        img {
          filter: brightness(0.8);
        }
      }

      nav > * {
        margin: 0 var(--space-xs);
        }

        /* logo */
        #logo {
        color: var(--logo-color);
      }

      @media (max-width: 600px) {
        nav #settings-button:not(img), #logo {
          display:none;
        }
        
        nav-links {
          font-size: 1rem;
        }
      }

      /* nav-links */
      nav-links {
        display: flex;
        gap: 1rem;
      }

      nav-links a {
        color: var(--text-color);
        text-decoration: none;
      }

      nav-links a:hover {
        font-weight: bold;
        text-decoration: underline;
        text-decoration-color: var(--primary-color);
        text-underline-offset: 5px;
      }


      /* hamburger menu & toggle (hidden by default) */
      #hamburger,
      #menu-toggle {
        display: none;
      }

      /* side navigation menu */
      side-nav {
        position: fixed;
        display: flex;
        gap: var(--space-m);
        flex-direction: column;
        top: 200px;
        inset: 0 0 0 0;
        width: 80%;
        background: var(--background-color);
        transition: 0.3s;
        padding: 1rem;
        transform: translateX(-100vw);
      }

      side-nav ul {
        line-height: 2rem;
      }

      side-nav li {
        list-style-type: none;
      }

      side-nav a {
        text-decoration: none;
      }

      /* toggle checked state opens side nav */
      #menu-toggle:checked ~ side-nav {
        transform: translateX(0);
      }

      /* responsive styles */
      @media (max-width: 420px) {
        #menu-toggle,
        #hamburger {
          display: flex;
        }

        #menu-toggle {
          transform: translateY(-100vh);
        }

        nav > :not(side-nav) {
          display: none;
        }

        nav {
          background-color: transparent;
          box-shadow: none;
        }
      }

      #settings-button {
        display: flex;
        gap: 0.2rem;
        justify-content: center;
        margin: 0 var(--space-xs);
      }

      /* settings dialog */
      dialog#settings-dialog {
        --fade-duration: 0.3s;
        padding: var(--space-m);
        border-radius: var(--border-round-med);
        background: var(--background-color);
        color: var(--text-color);
        border: 1px solid var(--primary-color);
        margin: auto;
      }

      settings-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
      }

      /* button inside navbar */
      button {
        background: var(--accent-color);
        color: white;
        padding: 10px 15px;
        border-radius: var(--border-round-small);
        border: none;
        font-family: "Varela", Arial, sans-serif;
        font-size: var(--step--1);
        transition: background 0.3s;
      }

      button:focus {
        outline: 3px solid var(--background-tertiary);
        outline-offset: 5px;
      }

      button:hover {
        background: var(--primary-color);
        cursor: pointer;
      }

      button[class="secondary-button"] {
        background-color: transparent;
        color: var(--text-color);
        border: var(--fluid-tiny) solid var(--accent-color);
      }

      button[class="secondary-button"]:hover {
        background-color: var(--background-tertiary);
      }

    </style>
  
    <nav>
      <a href="./index/html"> <img src="assets/svg/infiniti.svg" alt="" id="logo"> </a>
      
      <nav-links>
        <a href="index.html"> Home </a>
        <a href="about.html"> About Me </a>
        <a href="portfolio.html"> Portfolio </a>
        <a href="contact.html"> Contact </a>
      </nav-links>

      <button aria-label="Open settings" command="show-modal" commandfor="settings-dialog" id="settings-button">
        Settings <img src="./assets/svg/settings-svgrepo-com.svg" width="20px" alt=""> 
      </button>

      <dialog id="settings-dialog">
        <settings-content>
          <span> <input type="checkbox" id="dark-mode"> <label> Dark Mode </label> </span>
          <button command="close" commandfor="settings-dialog"> Close Settings </button>  
          <noscript>
            <p style="color: red; font-size: 0.9rem;">
              Dark mode toggle will not be remembered because JavaScript is disabled.
            </p>
          </noscript>
        </settings-content>
      </dialog>

      <input type="checkbox" id="menu-toggle">
      <label for="menu-toggle" id="hamburger"> &#9776; </label>

      <side-nav>
        <label for="menu-toggle" id="close">&#10005;</label>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Me</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </side-nav>
    </nav>
    `
    this.attachShadow({ mode: 'open' }).innerHTML = headerHTML;
  }  
}

customElements.define('nav-bar', Navbar);