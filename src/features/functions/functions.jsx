import React from "react";

function functionsSpace(arr) {
  const array = [];
  let i = 0;
  for (i; i < arr?.length; i++) {
    if (i > 0) {
      array.push(" - ");
    }
    array.push(arr[i]);
  }
  return array;
}

export default functionsSpace;
