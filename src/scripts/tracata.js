export function loadTracata(gridId, spanRowSize, spanColSize, gridDivisors, gridArrays, defaultRowSize) {
  const gridElem = document.getElementById(gridId);
  // Return an array of the first item of grid list
  const gridSplits = gridDivisors;

  // On Load
  grids(gridElem, spanColSize, gridArrays, defaultRowSize, gridSplits);
  document.documentElement.style.setProperty("--spanRowPixelSize", `${spanRowSize}px`);

  // On Resize
  window.addEventListener("resize", event => {
    grids(gridElem, spanColSize, gridArrays, defaultRowSize, gridSplits);
  });
}

function grids(grid, spanColSize, gridArrays, defaultRowSize, gridDivisors) {
  const gridSize = getGridMax(grid, spanColSize, "--maxSpan", gridDivisors);
  setGridArray(gridArrays, defaultRowSize, gridSize);
}

function setGridArray(gridArrays, defaultRowSize, gridSize) {
  const gridEntries = Object.entries(gridArrays);

  gridEntries.forEach(grid => {
    setGrid(grid[1]["values"], defaultRowSize, gridSize, grid[1]["rowName"], grid[1]["colName"]);
  });
}

function setGrid(spanArray, defaultRowSize, gridSize, rowName, colName) {
  const colRowSize = setGridSize(gridSize, spanArray, defaultRowSize);
  renderGrid(colRowSize, colName, rowName);
}

function getGridMax(grid, gridMin, spanName, gridDivisors) {
  const getGridWidth = grid.getBoundingClientRect().width - gridMin;
  const gridColNum = Math.round(getGridWidth / gridMin);
  const gridSize = getGridSize(gridColNum, -1, gridDivisors);
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
  const [colSize, rowSize] = colRowSize;
  document.documentElement.style.setProperty(colName, colSize);
  document.documentElement.style.setProperty(rowName, rowSize);
}

function getGridSize(num, i, gridDivisors) {
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
  return getGridSize(num, (i += 1), gridDivisors);
}

function getLastGridFitting(gridDivisors, i) {
  return gridDivisors[gridDivisors.length - i];
}
