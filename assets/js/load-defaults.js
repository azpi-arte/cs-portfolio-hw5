
// --- INITIAL DATA ---
const initialCards = [
  {
    "image-name": "servicenow-logo",
    "title": "Crypto QE CLI",
    "description": "Developed a JavaScript based CLI for automating cybersecurity quality engineering workflow.",
    "link": "./projects/crypto-cli.html"
  },
  {
    "image-name": "sibling-layers",
    "title": "Quantum Research",
    "description": "Created a classical spoofing algorithm for a quantum supremacy benchmark.",
    "link": "./projects/quantum-research.html"
  },
  {
    "image-name": "splagen-modal",
    "title": "Splagen Website",
    "description": "Frontend role for the nonprofit health resource directory Splagen. Agile based team and workflow.",
    "link": "./projects/splagen.html"
  },
  {
    "image-name": "os",
    "title": "Operating System Mutex",
    "description": "Implemented and used software-based mutual exclusion in a prototype operating system.",
    "link": "./projects/splagen.html"
  },
  {
    "image-name": "opengl",
    "title": "Parallel Convolution",
    "description": "Used OpenGL to implement the convolution layer in a neural network.",
    "link": "./projects/matrix-multiply.html"
  }
];

// --- LOCAL STORAGE KEY ---
const CARDS_KEY = 'azpi-cards';

// --- SEED FUNCTION ---
const seedLocalStorage = () => {
  const stored = JSON.parse(localStorage.getItem(CARDS_KEY)) || [];

  // add only cards that aren't already present by title
  initialCards.forEach(card => {
    if (!stored.find(c => c.title === card.title)) {
      stored.push(card);
    }
  });

  localStorage.setItem(CARDS_KEY, JSON.stringify(stored));

  console.log('localStorage seeded with cards:', stored);
};

// --- RUN SEED ---
seedLocalStorage();
