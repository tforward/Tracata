import css_ from "../css/styles.css";
import { loadTracata } from "./tracata";
import tracataCss_ from "../css/tracata.css";

const myApp = Object.create(null);

myApp.main = function main() {
  // Must be the same as below?
  const gridSplits = [1, 2, 4, 6, 8, 12];

  // widthSpan: [colSize, rowSize]
  // If rowSpan is not present will default to what is in the
  // Same goes for other CSS properties you can still custimize in the CSS
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
  loadTracata("grid", 80, 80, gridSplits, gridArrays);
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
