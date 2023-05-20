import fs from 'fs';

let arr2 = [];
const arr = JSON.parse(
  fs.readFileSync(`../slugs/soccer-teams-slugs.json`, 'utf8')
);

arr.forEach(el => {
  arr2.push(el.slug);
});

const findDuplicates = arr => {
  let sorted_arr = arr.slice().sort(); // You can define the comparing function here.

  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
};

console.log(`The duplicates are ${findDuplicates(arr2)}`);
