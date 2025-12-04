class ProjectCard extends HTMLElement {
  constructor({ image, title, description, link } = {}) {
    super();
    const template = document.getElementById('project-card-template').content;
    this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));

    if (image) this.setAttribute('image', image);
    if (title) this._title = title;
    if (description) this._description = description;
    if (link) this._link = link;
  }

  async connectedCallback() {
    const imageAttr = this.getAttribute('image');
    const title = this._title || this.getAttribute('title') || 'untitled';
    const pictureEl = this.shadowRoot.getElementById('picture');
    const imgEl = this.shadowRoot.getElementById('image');
    const defaultImg = '../assets/svg/no-image-svgrepo-com.svg';

    const isUrl = /^(https?:)?\/\//i;

    const checkExists = async (path) => {
      try {
        const res = await fetch(path, { method: 'HEAD' });
        return res.ok;
      } catch {
        return false;
      }
    };

    const buildImgPath = (name, file) =>
      `./assets/images/${name}/${name}-${file}`;

    let finalSrc = defaultImg;
    let webpSrc = null;
    let jpgSrc = null;

    if (imageAttr) {
      if (isUrl.test(imageAttr)) {
        // treat as a URL
        finalSrc = imageAttr;
      } else {
        // treat as a local image name
        const baseJpg = buildImgPath(imageAttr, '800w.jpg');
        const baseWebp = buildImgPath(imageAttr, '800w.webp');
        const exists = await checkExists(baseJpg);

        if (exists) {
          finalSrc = baseJpg;
          webpSrc = `${baseWebp} 2x`;
          jpgSrc = `${baseJpg} 2x`;
        }
      }
    }

    pictureEl.querySelectorAll('source').forEach(s => s.remove());

    if (webpSrc && jpgSrc) {
      const sWebp = document.createElement('source');
      sWebp.type = 'image/webp';
      sWebp.srcset = webpSrc;
      pictureEl.prepend(sWebp);

      const sJpg = document.createElement('source');
      sJpg.type = 'image/jpeg';
      sJpg.srcset = jpgSrc;
      pictureEl.prepend(sJpg);
    }

    imgEl.src = finalSrc;
    imgEl.alt = `${title} image`;

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
