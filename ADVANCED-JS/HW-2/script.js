const books = [
  {
    author: "Lucy Foley",
    name: "List of Invitees",
    price: 70,
  },
  {
    author: "Susanna Clarke",
    name: "Jonathan Strange & Mr Norrell",
  },
  {
    name: "Design. A Book for Non-Designers.",
    price: 70,
  },
  {
    author: "Alan Moore",
    name: "Neonomicon",
    price: 70,
  },
  {
    author: "Terry Pratchett",
    name: "Moving Pictures",
    price: 40,
  },
  {
    author: "Angus Hyland",
    name: "Cats in Art",
  },
];

function showBooks() {
  const root = document.getElementById("root");
  const ul = document.createElement("ul");

  books.forEach((book) => {
    if (book.author && book.name && book.price) {
      const li = document.createElement("li");
      li.innerHTML = `${book.author}: <i>${book.name}</i> -- <strong>$${book.price}</strong>`;
      ul.appendChild(li);
    } else {
      const missing = [];
      if (!book.author) missing.push("author");
      if (!book.name) missing.push("name");
      if (!book.price) missing.push("price");
      console.error(`Problematic Object: ${JSON.stringify(book)}. Missing property: ${missing}`);
    }
  });

  root.appendChild(ul);
}

showBooks();
