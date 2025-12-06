class CustomFooter extends HTMLElement {
  constructor() {
    super();
    
    const footerHTML = `
    <style>
      footer {
        width: 100%;
        small {
          margin: var(--space-xs);
        }
      }
    </style>

    <footer>
      <hr>
      <small> &copy; 2025 Jesus Azpitarte. Licensed under 
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer">
          CC&nbsp;BY-NC-ND&nbsp;4.0
        </a>. Viewing only.
      </small>
    </footer>
    `

    this.attachShadow({ mode: 'open' }).innerHTML = footerHTML;
  }
}

customElements.define('custom-footer', CustomFooter);
