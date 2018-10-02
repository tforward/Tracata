// The size in pixels of a single span
const spanPixelSize = 60;
const defaultRowSize = 2;

// You can change this directly in CSS if you wish
document.documentElement.style.setProperty("--spanPixelSize", `${80}px`);

// Grid
// widthSpan: [colSize, rowSize]
// If rowSpan is not present will default to the defaultRowSize
const gridArrays = {
  headerSpan: { 1: [1], 2: [2], 4: [4, 2], 6: [6, 3], 8: [8, 3], 12: [12, 6] },
  subHeader: { 1: [1], 2: [2], 4: [2, 2], 6: [3, 3], 8: [4, 3], 12: [6, 3] },
  spanArray: { 1: [1], 2: [2], 4: [2], 6: [2, 2], 8: [4], 12: [3, 3] },
  smSpans: { 1: [1, 1], 2: [1, 1], 4: [1, 1], 6: [2, 2], 8: [2], 12: [2, 2] }
};

const gridDivisors = Object.keys(gridArrays["spanArray"]);

function grids(grid, spanPixelSize, gridArrays, defaultRowSize) {
  const gridSize = setGridMax(grid, spanPixelSize, "--maxSpan");
  setGrid(gridArrays["headerSpan"], defaultRowSize, gridSize, "--maxSpanCol", "--maxSpanRow");
  setGrid(gridArrays["subHeader"], defaultRowSize, gridSize, "--subHeadSpanCol", "--subHeadSpanRow");
  setGrid(gridArrays["spanArray"], defaultRowSize, gridSize, "--spanX3-col", "--spanX3-row");
  setGrid(gridArrays["smSpans"], defaultRowSize, gridSize, "--smSpanCol", "--smSpanRow");
}

// On Load
const grid = document.getElementById("grid");
grids(grid, spanPixelSize, gridArrays, defaultRowSize);

// On Resize
window.addEventListener("resize", event => {
  grids(grid, spanPixelSize, gridArrays, defaultRowSize);
});

function setGrid(spanArray, defaultRowSize, gridSize, colName, rowName) {
  const colRowSize = setGridSize(gridSize, spanArray, defaultRowSize);
  renderGrid(colRowSize, colName, rowName);
}

function setGridMax(grid, gridMin, spanName) {
  const getGridWidth = grid.getBoundingClientRect().width - gridMin;
  const gridColNum = Math.round(getGridWidth / gridMin);
  const gridSize = getGridSize(gridColNum, -1);

  console.log({ gridSize });
  document.documentElement.style.setProperty(spanName, gridSize);
  return gridSize;
}

function setGridSize(gridSize, spanArray, defaultRowSize) {
  const spanColSize = spanArray[gridSize][0];
  let spanRowSize = defaultRowSize;
  if (spanArray[gridSize][1] !== undefined) {
    spanRowSize = spanArray[gridSize][1];
  }
  return [spanColSize, spanRowSize];
}

function renderGrid(colRowSize, colName, rowName) {
  document.documentElement.style.setProperty(colName, colRowSize[0]);
  document.documentElement.style.setProperty(rowName, colRowSize[1]);
}

function getGridSize(num, i) {
  // Recursize Function
  // Can't be less than 1
  if (num < 1) {
    return 1;
  }
  // Less than 2
  if (num <= 2) {
    return num;
  }
  const lastDivNum = getLastGridFitting(gridDivisors, i);
  if (lastDivNum < num) {
    return lastDivNum;
  }
  return getGridSize(num, (i += 1));
}

function getLastGridFitting(gridDivisors, i) {
  return gridDivisors[gridDivisors.length - i];
}
