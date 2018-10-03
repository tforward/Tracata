export function loadTracata(gridId, spanRowSize, spanColSize, gridArrays, cssGridNames, defaultRowSize) {
  const gridElem = document.getElementById(gridId);
  const baseline = gridArrays[0];
  // Return an array of the first item of grid list
  const gridDivisors = Object.keys(baseline[Object.keys(baseline)[0]]);

  // On Load
  grids(gridElem, spanColSize, gridArrays, cssGridNames, defaultRowSize, gridDivisors);
  document.documentElement.style.setProperty("--spanRowPixelSize", `${spanRowSize}px`);

  // On Resize
  window.addEventListener("resize", event => {
    grids(gridElem, spanColSize, gridArrays, cssGridNames, defaultRowSize, gridDivisors);
  });
}

function grids(grid, spanPixelSize, gridArrays, cssGridNames, defaultRowSize, gridDivisors) {
  const gridSize = getGridMax(grid, spanPixelSize, "--maxSpan", gridDivisors);
  setGridArray(gridArrays, cssGridNames, defaultRowSize, gridSize);
}

function setGridArray(gridArrays, cssGridNames, defaultRowSize, gridSize) {
  gridArrays.forEach(grid => {
    const gridName = Object.keys(grid)[0];
    const rowName = cssGridNames[gridName][0];
    const colName = cssGridNames[gridName][1];
    const gridValues = Object.values(grid)[0];
    setGrid(gridValues, defaultRowSize, gridSize, rowName, colName);
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
  document.documentElement.style.setProperty(colName, colRowSize[0]);
  document.documentElement.style.setProperty(rowName, colRowSize[1]);
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
