// Load the JSON file
let bg3items = {};

fetch("https://jfelver.github.io/Bg3stats/src/stats.json")
  .then((response) => response.json())
  .then((data) => {
    bg3items = data;
  })
  .catch((error) => {
    console.error("Error fetching JSON file:", error);
  });
