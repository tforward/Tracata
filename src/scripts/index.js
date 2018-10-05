import css_ from "../css/styles.css";
import { loadTracata } from "./tracata";
import { tracataGen } from "./tracataGen";
import tracataCss_ from "../css/tracata.css";

const myApp = Object.create(null);
// ======================================================================
// App
// ======================================================================

// TODO

// Need to combine the two, I'm currently working with the arrays
// There are some sections within the Visual Display it section I think I can use
// have to build interface for building the grid>?
//    i think dropdown of the options and inputs were needed
// useing the Full, Odd Even and the values in the array as the options possible to pick from
// as for the 2nd span for the row leave manual for now.

// Finish Config tracata better
// The auto-mode as seperate module
// Write-up

myApp.main = function main() {
  // The size in pixels of a single span
  // Grid
  // widthSpan: [colSize, rowSize]
  // If rowSpan is not present will default to the defaultRowSize
  const gridArrays = {
    header: { 1: [1], 2: [2], 4: [4, 2], 6: [6, 3], 8: [8, 3], 12: [12, 5] },
    subHeader: { 1: [1], 2: [2], 4: [2, 2], 6: [3, 3], 8: [4, 3], 12: [6, 4] },
    medSpan: { 1: [1], 2: [2], 4: [2], 6: [2, 2], 8: [4], 12: [3, 3] },
    smSpan: { 1: [1, 1], 2: [1, 1], 4: [1, 1], 6: [2, 2], 8: [2], 12: [2, 2] }
  };

  const gridSplits = [1, 2, 4, 6, 8, 12];

  console.log(gridArrays);

  const cssGridNames = {
    header: ["--header-row", "--header-col"],
    subHeader: ["--subHeader-row", "--subHeader-col"],
    medSpan: ["--med-row", "--med-col"],
    smSpan: ["--sm-row", "--sm-col"]
  };

  loadTracata("grid", 60, 80, gridSplits, gridArrays, cssGridNames, 2);
};

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
