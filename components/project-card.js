 class ProjectCard extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById('project-card-template').content;
      this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));
    }

    connectedCallback() {
      const imageName = this.getAttribute('image');
      const title = this.getAttribute('title') || 'untitled';
      const pictureEl = this.shadowRoot.getElementById('picture');
      const imgEl = this.shadowRoot.getElementById('image');

      if (imageName) {
        // Clear any previous <source> elements
        pictureEl.querySelectorAll('source').forEach(s => s.remove());

        // Add webp sources
        const source1 = document.createElement('source');
        source1.type = 'image/webp';
        source1.srcset = `./assets/images/${imageName}/${imageName}-400w.webp`;
        pictureEl.prepend(source1);

        const source2 = document.createElement('source');
        source2.type = 'image/webp';
        source2.srcset = `./assets/images/${imageName}/${imageName}-800w.webp 2x`;
        pictureEl.prepend(source2);

        // Add fallback jpeg source
        const sourceJpg = document.createElement('source');
        sourceJpg.type = 'image/jpeg';
        sourceJpg.srcset = `./assets/images/${imageName}/${imageName}-800w.jpg 2x`;
        pictureEl.prepend(sourceJpg);

        imgEl.src = `./assets/images/${imageName}/${imageName}-800w.jpg`;
        imgEl.alt = `${title} image`;
      } else {
        imgEl.src = '../assets/svg/no-image-svgrepo-com.svg';
        imgEl.alt = 'No image available';
      }
    }
  }

  customElements.define('project-card', ProjectCard);
