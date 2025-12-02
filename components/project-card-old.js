// Project Card
customElements.define(
  "project-card",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("project-card-template").content;
      const shadow_root = this.attachShadow({mode: "open"});
      shadow_root.appendChild(template.cloneNode(true));
    }
  }
)

/*
Problems:
multiple custom components, in order to render custom componenets, i need to extract content from a template tag
and stuff it in the shadow DOM of a registsered custom element, 

there will be componenets i need to use univserally, its propbably better to put these in a script and inject them into a page 
so that they're accessible. so i just need a script that 
*/