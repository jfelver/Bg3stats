// Load the JSON file
let bg3items = {};
let availableFields = [];

fetch("https://jfelver.github.io/Bg3stats/src/stats.json")
  .then((response) => response.json())
  .then((data) => {
    bg3items = data;
    for(item in bg3items) {
      for(field in bg3items[item]) {
        if(!availableFields.includes(field)) {
          availableFields.push(field);
        }
      }
    }
    availableFields.sort();
    for(item in availableFields){
      let option = document.createElement("option");
      option.value = availableFields[item];
      document.getElementById("availableFields").appendChild(option);
    }
  })
  .catch((error) => {
    console.error("Error fetching JSON file:", error);
  });


