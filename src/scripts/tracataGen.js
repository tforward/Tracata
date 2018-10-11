// TODO

// HERE
// I was trying to find better way to bring this generator code into the rest of the script but I'm finding it difficult to see use case
// as the variables seem to change alot. This tool can still be used for helping to develop good layouts by providing good span numbers to use 
// however for now I'm going to put this project on hold on focus on the front part only, nad just use this tool for again getting good span numbers

// Testing and then hopefully done
// Self span size

// Extra
// max max size
// If span spanSize is Even option to exclude Odd numbers from list
// If span spanSize is Odd option to exclude Even numbers from list
// Patterns

// maxGridSize cannot be a Prime Number greater than or equal to 7
// NOT: 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 etc...
// Minus one will be applyied if you try to enter a prime number
// The max size of the grid and one of the numbers used for calculating the rest of the grid
let maxGridSize = 12;

// The desired spanSize, and any multiples of the spanSize will be added to the grid
// In general an even number of items goes better with an even spanSize and vice versa
const spanSize = 4;

// Either set the number of items manually or
// enter the class name to get the number of items automatically
// const numOfItems = document.getElementsByClassName("span3-col").length;
const numOfItems = 4;

// The min size a span is allowed to go to, note will still hit 1 on the on smallest screens.
// Set two undefined to turn off
const minSpanSize = 2;

// Set how the grid flows can be either FULL, EVEN or ODD, default is FULL
const gridFlow = "FULL";

// If you want to manully set the spanSize on itself to behave differently you can set it here.
// The spanSelf cannot be greater than the spanSize, it will default to the spanSize.
// Note values 1, 2, and only (odd or even) numbers depending if the spanSize is (odd/even) are valid.
// For Example a spanSize of 4 (even) with a spanSelf of 3 (odd) is invalid, and it will default to the spanSize.
// undefined is the default value.
const spanSelf = undefined;
const mulipleList = [];

const isPrime = num => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
  return num !== 1;
};

export function tracataGen() {
  // Grid
  let gridDivisors = getDivisors(maxGridSize);
  const gridNums = getNumsOfNums(spanSize, maxGridSize, 1, mulipleList);
  gridDivisors = addToArrayNoDupes(gridNums, gridDivisors);
  gridDivisors = sortedNumList(gridDivisors);
  gridDivisors = testForPrime(gridDivisors);
  const allSpanArray = getSpanArray(gridDivisors, numOfItems, spanSize);

  // bestSpan = setGridSize(allSpanArray, minSpanSize);
  // console.log("best", bestSpan)
  
  return allSpanArray;
}

tracataGen();

// ==================== Check Inputs

if (isPrime(maxGridSize)) {
  console.log("Max Grid Number cannot be a Prime Number, minuing one", maxGridSize - 1);
  // Minus one from the maxGridSize to make the grid work correctly
  maxGridSize -= 1;
  console.log(maxGridSize);
}

//= ============================= Visual Display it

function setGridSize(spanArray, minSpanSize) {
  const bestSpanArray = spanArray[gridSize];
  let bestSpanSize = getSpan(bestSpanArray);
  bestSpanSize = checkMinSpanSize(bestSpanSize, minSpanSize, bestSpanArray);
  return bestSpanSize;
}

function checkMinSpanSize(bestSpanSize, minSpanSize, bestSpanArray) {
  // If a min span size is set adjust the span size
  // not it may still be one in cases where the min does not work.
  if (bestSpanArray.length === 1) {
    return bestSpanArray[0];
  }
  if (bestSpanSize < minSpanSize) {
    return minSpanSize;
  }
  return bestSpanSize;
}

function getSpan(spanArray) {
  let bestSpanSize;
  let lastNum;
  let secondLastNum;
  lastNum = spanArray[spanArray.length - 1];
  secondLastNum = undefined;
  // 3 is a special case
  // Changing the "3" here changes the num at which the LRG grid activates one the array length
  if (lastNum > 3) {
    secondLastNum = spanArray.length - 2;
  } else {
    secondLastNum = spanArray.length - 1;
  }
  bestSpanSize = spanArray[secondLastNum];
  return bestSpanSize;
}

//= =================================================================================
// NEEDED FOR CALCing the SPAN ARRAY SECTION
// Not needed if you already know or manully set the gridDivisors
//= =================================================================================

function getSpanArray(gridDivisors, numOfItems, spanSize) {
  const spanArrays = {};
  const oddSpanArrays = {};
  const allSpanArrays = {};

  // Build out the spanArray which dictates the spanSize at a give grid number
  gridDivisors.forEach(gridIndex => {
    const initialItemSpans = getInitialItemSpans(gridIndex, numOfItems);
    const getSpanItems = getValidSpanOnSpans(initialItemSpans, spanSize);
    let spanItems = addToArrayNoDupes(initialItemSpans, getSpanItems);
    spanItems = sortedNumList(spanItems);
    const oddSpanItems = getOddSpans(gridIndex, spanItems, spanSize);
    let allSpanItems = spanItems.concat(oddSpanItems);
    const uniqueAllSpanItems = uniq(allSpanItems);
    allSpanItems = sortedNumList(uniqueAllSpanItems);
    spanArrays[gridIndex] = spanItems;
    oddSpanArrays[gridIndex] = oddSpanItems;
    allSpanArrays[gridIndex] = allSpanItems;
  });

  return { EVEN: spanArrays, ODD: oddSpanArrays, FULL: allSpanArrays };
}

function uniq(a) {
  // Return array with only uniques
  return a.sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1]);
}

function getOddSpans(gridIndex, spanItems, spanSize) {
  // Will always be at least one
  let oddItems = [1];
  if (gridIndex > 1) {
    const indexDivisors = getDivisors(gridIndex);
    oddItems = newArrayNoDupes(indexDivisors, spanItems, spanSize);
    // Always add the max item to the list
    oddItems.push(gridIndex);
  }

  return oddItems;
}

function newArrayNoDupes(items, fromArray, spanSize) {
  // Add item to array if does not already exist
  const toArray = [1];
  items.forEach(i => {
    // if gridIndex / spanSize = spanSize then add it, if not already present
    if (i / spanSize === spanSize) {
      toArray.push(spanSize);
    }
    if (fromArray.indexOf(i) === -1) {
      toArray.push(i);
    }
  });
  return toArray;
}

function getValidSpanOnSpans(initialItemSpans, spanSize) {
  const spanOnSpans = [];
  initialItemSpans.forEach(i => {
    if (isInteger(i / spanSize)) {
      spanOnSpans.push(i / spanSize);
    }
  });
  return spanOnSpans;
}

function getInitialItemSpans(gridIndex, numOfItems) {
  // Will always be at least one
  const initialSpanArray = [1];

  for (let i = 2; i <= gridIndex; i += 1) {
    const isInteger = rowIsInteger(i, numOfItems, gridIndex);
    if (isInteger && isValidNum(gridIndex, i)) {
      initialSpanArray.push(i);
    }
  }
  return initialSpanArray;
}

function isValidNum(gridIndex, num) {
  return isInteger(gridIndex / num);
}

function rowIsInteger(span, itemNum, index) {
  return isInteger((span * itemNum) / index);
}

// ===========================================================================
// NEEDED FOR GRID DIVISORS SECTION
// ===========================================================================

function testForPrime(grid) {
  // Test for prime numbers greather than 7 and fixes them
  const newGrid = [];
  for (let i = 0; i < grid.length; i += 1) {
    newGrid.push(grid[i]);
    if (grid[i] >= 7) {
      if (isPrime(grid[i])) {
        const index = newGrid.indexOf(grid[i]);
        newGrid[index] = grid[i] - 1;
      }
    }
  }
  return newGrid;
}

function addToArrayNoDupes(items, toArray) {
  // Add item to array if does not already exist
  items.forEach(i => {
    if (toArray.indexOf(i) === -1) {
      toArray.push(i);
    }
  });
  return toArray;
}

function sortedNumList(theList) {
  return theList.sort(sortNumber);
}

function sortNumber(a, b) {
  return a - b;
}

function isInteger(num) {
  return Number.isInteger(num);
}

function getDivisors(num) {
  // Returns a list of divisors for a given number
  const results1 = [];
  const results2 = [];
  const stopNum = Math.floor(Math.sqrt(num));
  if (num <= 1) return [1];
  for (let i = 1; i <= stopNum; i += 1) {
    if (num % i === 0) {
      results1.push(i);
      if (i * i !== num) {
        results2.push(num / i);
      }
    }
  }
  return results1.concat(results2.reverse());
}

function getNumsOfNums(num1, max, i, mulipleList) {
  // Recursive function that returns a list of muliples of a numbers For Example: 1x3 2x3 3x3 etc.
  const muliple = num1 * i;

  if (muliple < max) {
    mulipleList.push(muliple);
    i += 1;
    getNumsOfNums(num1, max, i, mulipleList);
  }
  return mulipleList;
}
