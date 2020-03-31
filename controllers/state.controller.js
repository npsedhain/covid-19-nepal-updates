const State = require("../models/State");

const getTotalStates = states => {
  let active = 0,
    confirmed = 0,
    deaths = 0,
    recovered = 0;

  states.map(state => {
    active += state.active;
    confirmed += state.confirmed;
    deaths += state.deaths;
    recovered += state.recovered;
  });
  const delta = {
    active: active - states[7].active,
    confirmed: confirmed - states[7].confirmed,
    deaths: deaths - states[7].deaths,
    recovered: recovered - states[7].recovered
  };
  const lastupdatedtime = states[7].lastupdatedtime;
  const state = "Total";

  return {
    state,
    active,
    confirmed,
    deaths,
    recovered,
    delta,
    lastupdatedtime
  };
};

const getStateCases = async (req, res) => {
  const response = await State.find().sort({ state: 1 });
  let statewise = response.slice(0, 7);
  const total = getTotalStates(response);
  statewise = [total, ...statewise];

  const key_values = [
    {
      confirmeddelta: total.delta.confirmed,
      deceaseddelta: total.delta.deaths,
      recovered: total.delta.recovered,
      lastupdatedtime: total.lastupdatedtime
    }
  ];

  res.status(200).json({ key_values, statewise });
};

const updateStateCases = async (req, res) => {
  const oldState = await State.findOne({ state: req.body.state });

  if (oldState === null) {
    const { state, active, confirmed, deaths, recovered } = req.body;
    const delta = {
      active: 0,
      confirmed: 0,
      deaths: 0,
      recovered: 0
    };
    const lastupdatedtime = Date.now();

    const newState = new State({
      state,
      active,
      confirmed,
      deaths,
      recovered,
      delta,
      lastupdatedtime
    });

    newState
      .save()
      .then(state => {
        res.status(200).json({ state });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
    return;
  }

  const {
    state = oldState.state,
    active = oldState.active,
    confirmed = oldState.confirmed,
    deaths = oldState.deaths,
    recovered = oldState.recovered
  } = req.body;

  const delta = {
    active: active - oldState.active,
    confirmed: confirmed - oldState.confirmed,
    deaths: deaths - oldState.deaths,
    recovered: recovered - oldState.recovered
  };

  const lastupdatedtime = Date.now();

  State.findOneAndUpdate(
    { state },
    {
      state,
      active,
      confirmed,
      deaths,
      recovered,
      delta,
      lastupdatedtime
    },
    { useFindAndModify: false, new: true }
  )
    .then(state => {
      if (state === null) {
        res.status(404).json({
          error: true,
          message: "Couldn't find the state to edit."
        });
        return;
      }
      res.status(200).json({ state });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = { getStateCases, updateStateCases };
