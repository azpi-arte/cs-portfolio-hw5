class ProjectCard extends HTMLElement {
  constructor({ imgName, title, description, link } = {}) {
    super();
    const template = document.getElementById('project-card-template').content;
    this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));

    // Store optional data internally
    if (imgName) this.setAttribute('image', imgName);
    if (title) this._title = title;
    if (description) this._description = description;
    if (link) this._link = link;
  }

  connectedCallback() {
    const imageName = this.getAttribute('image');
    const title = this._title || this.getAttribute('title') || 'untitled';
    const pictureEl = this.shadowRoot.getElementById('picture');
    const imgEl = this.shadowRoot.getElementById('image');

    // --- Image setup ---
    if (imageName) {
      pictureEl.querySelectorAll('source').forEach(s => s.remove());

      const sourceWebp = document.createElement('source');
      sourceWebp.type = 'image/webp';
      sourceWebp.srcset = `./assets/images/${imageName}/${imageName}-800w.webp 2x`;
      pictureEl.prepend(sourceWebp);

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

    // --- Title slot ---
    if (!this.querySelector('[slot="title"]') && title) {
      const titleSlot = document.createElement('span');
      titleSlot.slot = 'title';
      titleSlot.textContent = title;
      this.appendChild(titleSlot);
    }

    // --- Description slot ---
    if (!this.querySelector('[slot="description"]') && this._description) {
      const descSlot = document.createElement('span');
      descSlot.slot = 'description';
      descSlot.textContent = this._description;
      this.appendChild(descSlot);
    }

    // --- Link slot ---
    if (!this.querySelector('[slot="link"]') && this._link) {
      const linkSlot = document.createElement('a');
      linkSlot.slot = 'link';
      linkSlot.href = this._link;
      linkSlot.textContent = 'Explore Project →';
      this.appendChild(linkSlot);
    }
  }
}

customElements.define('project-card', ProjectCard);




