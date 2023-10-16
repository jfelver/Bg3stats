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
    document.getElementById('resultsArea').innerHTML = JSON.stringify(queryResults,null, 4);
  }

  function processPartialQuery(){
    processCumulativeQuery();
    processQueryNode(new QueryNode(getNewQueryField().value, getNewQueryString().value));
    document.getElementById('resultsArea').innerHTML = JSON.stringify(queryResults,null, 4);
  }

  function processQueryNode(node){
    if(node.field == "any"){
      queryResults = queryResults.filter(item => Object.values(item).some(val => val.includes(node.queryString)));
      return;
    }
    queryResults = queryResults.filter(item => Object.keys(item).includes(node.field) && item[node.field].includes(node.queryString));
    
  }
  
  function saveNode(node){
    queryNodes.push(node);
  }
  
  function removeQueryNode(){

    // figure out the field of the node to be removed
    // remove the node from the queryNodes array
    // remove the row element from the DOM

  }

  function createSavedQueryDOMRow(field, queryString){
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    const col1 = document.createElement("div");
    col1.setAttribute("class", "col-sm-4");
    const select = document.createElement("select");
    select.setAttribute("class", "form-select mb-3 field disabled");
    const option = document.createElement("option");
    option.setAttribute("value", field);
    option.setAttribute("selected", "selected");
    option.innerHTML = field;
    select.appendChild(option);
    col1.appendChild(select);
    row.appendChild(col1);
    const col2 = document.createElement("div");
    col2.setAttribute("class", "col");
    const textInput = document.createElement("input");
    textInput.setAttribute("type", "text");
    textInput.setAttribute("class", "form-control queryString disabled");
    textInput.setAttribute("value", queryString);
    col2.appendChild(textInput);
    row.appendChild(col2);
    const col3 = document.createElement("div");
    col3.setAttribute("class", "col");
    const button = document.createElement("button");
    button.setAttribute("id", "");
    button.setAttribute("class", "btn btn-outline-danger col-sm-2");
    button.innerHTML = "-";
    col3.appendChild(button);
    row.appendChild(col3);
    const savedQueryRows = document.getElementById("savedQueryRows")
    savedQueryRows.appendChild(row);
  }

  function clearTempQueryDOMRow(){
    getNewQueryField().value = "";
    getNewQueryString().value = "";
  };

  function removeSavedQueryDOMRow(){
    // find event target's field
    // figure out which index it is in the queryNodes array
    // remove it from the queryNodes array
    // remove the row element from the DOM
  }

  function getNewQueryField(){
    return document.getElementById('newQueryField');
  }
  function getNewQueryString(){
    return document.getElementById('newQueryString');
  }

  function plusButtonClicked(){
    let newNode = new QueryNode(getNewQueryField().value, getNewQueryString().value);
    saveNode(newNode);
    processCumulativeQuery();
    for(node of queryNodes){
      availableFields.splice(availableFields.indexOf(node.field),1);
    }
    createSavedQueryDOMRow(newNode.field, newNode.queryString);
    clearTempQueryDOMRow();
  }

