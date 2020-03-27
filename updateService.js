const fetch = require("node-fetch");

const getData = () => {
  return fetch(process.env.DATAURI)
    .then(res => res.json())
    .then(json => json);
};

module.exports = { getData };
