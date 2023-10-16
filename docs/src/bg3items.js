// Load the JSON file
let bg3items = {};
let allFields = [];
let availableFields = [];
let queryNodes = [];
let queryResults = [];

class QueryNode {

  field = "";
  queryString = "";

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
        if(!allFields.includes(field)) {
          allFields.push(field);
        }
      }
    }

    availableFields = allFields;

    let field0 = getNewQueryField();
    for(item in availableFields){
      let option = document.createElement("option");
      option.value = availableFields[item];
      option.innerHTML = availableFields[item];
      field0.appendChild(option);
    }
  })
  .catch((error) => {
    console.error("Error fetching JSON file:", error);
  });

  function processCumulativeQuery(){
    queryResults = bg3items;
    for(node of queryNodes){
      processQueryNode(node);
    }
    document.getElementById('resultsArea').innerHTML = JSON.stringify(queryResults,allFields, 4);
  }

  function processPartialQuery(){
    processCumulativeQuery();
    processQueryNode(new QueryNode(getNewQueryField().value, getNewQueryString().value));
    document.getElementById('resultsArea').innerHTML = JSON.stringify(queryResults,allFields, 4);
  }

  function processQueryNode(node){
    queryResults = queryResults.filter(item => item[node.field].includes(node.queryString));
  }
  
  function saveNode(){
    queryNodes.push(new QueryNode(getNewQueryField().value, getNewQueryString().value));
  }
  
  function removeQueryNode(){

    // figure out the field of the node to be removed
    // remove the node from the queryNodes array
    // remove the row element from the DOM

  }

  function createSavedQueryDOMRow(){

    //TODO: update the query row html
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

  function removeSavedQueryDOMRow(){

  }

  function getNewQueryField(){
    return document.getElementById('newQueryField');
  }
  function getNewQueryString(){
    return document.getElementById('newQueryString');
  }

