const emojisPerPage = 1000; // Number of emojis to display per page
const emojiContainer = document.querySelector('.emoji-container');
const paginationContainer = document.querySelector('#pagination');
let emojis = {};
let currentPage = 1;
let totalEmojiPages = 1;

// Function to fetch emoji data from URL
async function fetchEmojiData() {
  try {
    const response = await fetch('https://macrozzz.github.io/discord-emojis/emojis.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    emojis = data;
    totalEmojiPages = Math.ceil(Object.keys(emojis).length / emojisPerPage);
    displayEmojis();
    generatePaginationButtons();
  } catch (error) {
    console.error('Failed to fetch emoji data:', error);
  }
}

// Function to copy the key to clipboard
function copyToClipboard(key) {
  navigator.clipboard.writeText(key)
    .then(() => {
      alert(`Key copied to clipboard: ${key}`);
    })
    .catch((error) => {
      console.error("Unable to copy to clipboard: ", error);
    });
}

// Function to display emojis for the current page
function displayEmojis() {
  const start = (currentPage - 1) * emojisPerPage;
  const end = start + emojisPerPage;
  const emojiKeys = Object.keys(emojis).slice(start, end);

  emojiContainer.innerHTML = ''; // Clear previous emojis

  emojiKeys.forEach((key) => {
    const emojiBox = document.createElement('div');
    emojiBox.classList.add('emoji-box');
    emojiBox.textContent = emojis[key];

    // Add click event listener to copy key to clipboard
    emojiBox.addEventListener('click', () => {
      copyToClipboard(`:${key}:`);
    });

    emojiContainer.appendChild(emojiBox);
  });

  scrollToTop();
}

// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to handle pagination button click
function handlePaginationClick(pageNumber) {
  currentPage = pageNumber;
  displayEmojis();
  updateActivePageButton();
}

// Function to generate pagination buttons
function generatePaginationButtons() {
  paginationContainer.innerHTML = ''; // Clear previous buttons

  for (let i = 1; i <= totalEmojiPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('page-button');
    pageButton.addEventListener('click', () => {
      handlePaginationClick(i);
    });

    paginationContainer.appendChild(pageButton);
  }

  updateActivePageButton();
}

// Function to update the active page button style
function updateActivePageButton() {
  const buttons = paginationContainer.querySelectorAll('.page-button');
  buttons.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Fetch emoji data and initialize display
fetchEmojiData();
console.log('main.js loaded');
