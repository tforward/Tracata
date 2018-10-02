import css_ from "../css/styles.css";
import tracata_ from "./tracata";
import tracataCss_ from "../css/tracata.css";

const myApp = Object.create(null);
// ======================================================================
// App
// ======================================================================

// TODO

// Config tracata better

myApp.main = function main() {};

myApp.initApplication = function init() {
  myApp.main();
};

// Handler when the DOM is fully loaded
document.onreadystatechange = function onreadystatechange() {
  if (document.readyState === "complete") {
    myApp.initApplication(document.readyState);
  } else {
    // Do something during loading [opitional]
  }
};

// ======================================================================
