// constants
const BIN_ID = "692f697dae596e708f7f6b96";

// handlers
const loadRemoteButton = document.getElementById("load-remote");
const projectContainer = document.querySelector("projects");

/**
 * Retrieves project card data from a JSONBin endpoint.
 *
 * @function requestProjectCards
 * @returns {void} Performs a synchronous HTTP request; the parsed record
 *   is returned from the internal `onreadystatechange` handler.
 *
 * @description
 * Initiates a synchronous GET request to the JSONBin API using the
 * provided BIN_ID and masterKey. When the request completes, the
 * response text is parsed and its `record` field is returned from
 * the ready-state callback.
 */
function requestProjectCards () {
  let req = new XMLHttpRequest();
  req.open("GET", `https://api.jsonbin.io/v3/b/${BIN_ID}`, false); 
  req.send();
  const record = JSON.parse(req.responseText)["record"];
  return record; 
}

/**
 * Populates a container node with project cards.
 *
 * This function retrieves project card data via `requestProjectCards()`, clears the
 * given container node, and appends a new `ProjectCard` element for each data entry.
 *
 * @param {HTMLElement} containerNode - The DOM element that will hold the project cards.
 */
function populateProjectCards (containerNode) {
  let cardData = requestProjectCards();

  containerNode.innerHTML = "";

  cardData.forEach(c => {
    const card = new ProjectCard({ imgName: c["image-name"], title: c["title"], description: c["description"], link: c["link"]});
    containerNode.appendChild(card);
  });
}

function onLoadRemoteClick() {
  populateProjectCards(projectContainer)
}

loadRemoteButton.addEventListener("click", onLoadRemoteClick);