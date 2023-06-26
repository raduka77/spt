import fs from 'fs';
import fetch from 'node-fetch';

const url = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=EUR&want=USD&amount=1`;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'QN1wpQCBhemshcAaSwQxq9ykvMyOp1zD8hVjsnWO6NJDhNzFxI',
    'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com',
  },
};

const result = await fetch(url, options);
const json = await result.json();

const x = {
  rate: json.new_amount,
};

fs.writeFileSync(
  `../json_tennis/rate.json`,
  JSON.stringify(x, null, 2),
  'utf-8'
);
