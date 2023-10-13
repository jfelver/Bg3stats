// Load the JSON file
let bg3items = {};
let availableFields = [];
let queryNodes = [];
let cumulativeQuery = [];

class QueryNode {
  constructor(field, queryString) {
    this.field = field;
    this.queryString = queryString;
  }
}

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
    let field1 = document.getElementById('field1');
    for(item in availableFields){
      let option = document.createElement("option");
      option.value = availableFields[item];
      option.innerHTML = availableFields[item];
      field1.appendChild(option);
    }
    queryResults = bg3items;
  })
  .catch((error) => {
    console.error("Error fetching JSON file:", error);
  });

  function processCumulativeQuery(){
    // document.getElementById('resultsArea').innerHTML = JSON.stringify(queryResults,availableFields, 4);
    console.log(cumulativeQuery);
    
  }
  
  function addQueryNode(event){
    let queryRow = event.target.id.slice(-1);
    let field = document.getElementById('field'+queryRow).value;
    let queryString = document.getElementById('queryString'+queryRow).value;
    cumulativeQuery.push(new QueryNode(field, queryString));
    processCumulativeQuery();

    // <div>
    //   <div class="row" id="queryRow1">
    //     <div class="col-sm-4">
    //       <select id="field1" class="form-select mb-3 field">
    //         <option value="none" selected>Select a Field</option>
    //         <option value="allFields">All Fields</option>
    //       </select>
    //     </div>
    //     <div class="col">
    //       <input id="queryString1" type="text" class="form-control"  placeholder="eg: DoesDamage">
    //     </div>
    //     <div class="col">
    //       <button id="addFilterButton1" class="btn btn-outline-success col-sm-2" onclick="addQueryNode(event)">+</button>
    //       <!-- <button id="addFilterButton1" class="btn btn-outline-primary col-sm-2">-</button> -->
    //     </div>
    //   </div>
    // </div>


  }
  
  function removeQueryNode(event){
    cumulativeQuery.pop();
    processCumulativeQuery();
  }


