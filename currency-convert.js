// http://data.fixer.io/api/latest?access_key=5d22558bf41a6f8a71d16c473512e5d0

const axios = require("axios");

// const getExchangeRate = (from, to) => {
//   return axios
//     .get(
//       "http://data.fixer.io/api/latest?access_key=5d22558bf41a6f8a71d16c473512e5d0"
//     )
//     .then(res => {
//       const euro = 1 / res.data.rates[from];
//       const rate = euro * res.data.rates[to];
//       return rate;
//     });
// };

const getExchangeRate = async (from, to) => {
  try {
    let res = await axios.get(
      "http://data.fixer.io/api/latest?access_key=5d22558bf41a6f8a71d16c473512e5d0"
    );
    const euro = 1 / res.data.rates[from];
    const rate = euro * res.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }
    return rate;
  } catch {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  }
};

// const getCountries = currencyCode => {
//   return axios
//     .get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
//     .then(res => {
//       return res.data.map(country => country.name);
//     });
// };

const getCountries = async currencyCode => {
  try {
    const res = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${currencyCode}`
    );
    return res.data.map(country => country.name);
  } catch {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
};

// const convertCurrency = (from, to, amount) => {
//   let convertedAmount;
//   return getExchangeRate(from, to)
//     .then(rate => {
//       convertedAmount = (amount * rate).toFixed(2);
//       return getCountries(to);
//     })
//     .then(countries => {
//       return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(
//         ", "
//       )}`;
//     });
// };

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  let convertedAmount = (amount * rate).toFixed(2);
  const countries = await getCountries(to);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(
    ", "
  )}`;
};

convertCurrency("USD", "AFN", 15)
  .then(message => {
    console.log(message);
  })
  .catch(e => console.log(e.message));
