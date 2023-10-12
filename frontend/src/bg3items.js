// Load the JSON file
let bg3items = {};

fetch("https://jfelver.github.io/bg3stats")
  .then((response) => response.json())
  .then((data) => {
    bg3items = data;
  })
  .catch((error) => {
    console.error("Error fetching JSON file:", error);
  });
