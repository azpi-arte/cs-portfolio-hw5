// --- BUTTON HANDLES ---
const postButton = document.getElementById('post-card-button');
const putButton = document.getElementById('put-card-button');
const deleteButton = document.getElementById('delete-card-button');

const cardForm = document.getElementById('card-form');
const CARDS_KEY = 'azpi-cards';

// --- HELPERS ---

// get cards from localStorage or default to one empty card
const getCards = () => JSON.parse(localStorage.getItem(CARDS_KEY)) || [{}];

// save cards array to localStorage
const saveCards = (cards) => localStorage.setItem(CARDS_KEY, JSON.stringify(cards));

// convert form to card object
const formToCard = (form) => {
  const data = {};

  for (const [key, value] of new FormData(form).entries()) {
    data[key] = value;
  }

  return data;
};

// find index of card by title
const findCardIndex = (cards, title) => cards.findIndex(c => c.title === title);

// POST
postButton.addEventListener('click', () => {
  const cards = getCards();
  const newCard = formToCard(cardForm);

  if (findCardIndex(cards, newCard.title) !== -1) return alert('Title already exists'); // prevent duplicates

  cards.push(newCard); // update cards with new card

  saveCards(cards);
  console.log(cards);
});

// PUT
putButton.addEventListener('click', (e) => {
  e.preventDefault(); // prevent default form submission

  const cards = getCards();
  const updatedCard = formToCard(cardForm);

  const idx = findCardIndex(cards, updatedCard.title);

  if (idx === -1) return alert('Card not found for update');

  const existingCard = cards[idx];

  // only overwrite fields with non-empty values
  for (const key in updatedCard) {
    if (updatedCard[key].trim() !== '') {
      existingCard[key] = updatedCard[key];
    }
  }

  cards[idx] = existingCard; // update card

  saveCards(cards);
  console.log(cards);
});

// DELETE 
deleteButton.addEventListener('click', (e) => {
  e.preventDefault();

  let cards = getCards();
  const title = cardForm.title.value;

  if (cards.length === 1) return alert('Must have at least one card');

  const idx = findCardIndex(cards, title);

  if (idx === -1) return alert('Card not found for deletion');

  cards.splice(idx, 1); // remove card

  saveCards(cards);
  console.log(cards);
});
