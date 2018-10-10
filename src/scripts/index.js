import css_ from "../css/styles.css";
import { loadTracata } from "./tracata";
import { tracataGen } from "./tracataGen";
import tracataCss_ from "../css/tracata.css";

const myApp = Object.create(null);
// ======================================================================
// App
// ======================================================================

// TODO
// There are some sections within the Visual Display it section I think I can use
// have to build interface for building the grid>?
//    i think dropdown or buttons of the options and inputs were needed
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
    header: {
      rowName: "--header-row",
      colName: "--header-col",
      values: { 1: [1], 2: [2], 4: [4, 2], 6: [6, 3], 8: [8, 3], 12: [12, 5] }
    },
    subHeader: {
      rowName: "--subHeader-row",
      colName: "--subHeader-col",
      values: {
        1: [1],
        2: [2],
        4: [2, 2],
        6: [3, 3],
        8: [4, 3],
        12: [6, 4]
      }
    },
    medSpan: {
      rowName: "--med-row",
      colName: "--med-col",
      values: { 1: [1], 2: [2], 4: [2, 2], 6: [2, 2], 8: [4, 2], 12: [3, 3] }
    },
    smSpan: {
      rowName: "--sm-row",
      colName: "--sm-col",
      values: { 1: [1, 1], 2: [1, 1], 4: [1, 1], 6: [2, 2], 8: [2], 12: [2, 2] }
    }
  };

  const generatedArrays = tracataGen();

  // Must be the same as above?
  const gridSplits = [1, 2, 4, 6, 12];

  // These are the options for a given size
  console.log(generatedArrays["FULL"]);

  console.log(gridArrays["medSpan"]["values"]);

  // gridArrays["medSpan"]["values"] = generatedArrays["FULL"];

  loadTracata("grid", 80, 80, gridSplits, gridArrays, 2);
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
