// Load the JSON file
let bg3items = {};

fetch("json_output.json")
  .then((response) => response.json())
  .then((data) => {
    bg3items = data;
  })
  .catch((error) => {
    console.error("Error fetching JSON file:", error);
  });
