const District = require("../models/District");

const getProvince1 = () => {
  return District.find({ state: "Province1" });
};

const getProvince2 = () => {
  return District.find({ state: "Province2" });
};

const getProvince3 = () => {
  return District.find({ state: "Province3" });
};

const getProvince4 = () => {
  return District.find({ state: "Province4" });
};

const getProvince5 = () => {
  return District.find({ state: "Province5" });
};

const getProvince6 = () => {
  return District.find({ state: "Province6" });
};

const getProvince7 = () => {
  return District.find({ state: "Province7" });
};

const getDistrictCases = async (req, res) => {
  let response = {
    Province1: {
      districtData: {}
    },
    Province2: {
      districtData: {}
    },
    Province3: {
      districtData: {}
    },
    Province4: {
      districtData: {}
    },
    Province5: {
      districtData: {}
    },
    Province6: {
      districtData: {}
    },
    Province7: {
      districtData: {}
    }
  };

  const [
    Province1,
    Province2,
    Province3,
    Province4,
    Province5,
    Province6,
    Province7
  ] = await Promise.all([
    getProvince1(),
    getProvince2(),
    getProvince3(),
    getProvince4(),
    getProvince5(),
    getProvince6(),
    getProvince7()
  ]);

  Province1.map(district => {
    response.Province1.districtData[district.name] = district;
  });

  Province2.map(district => {
    response.Province2.districtData[district.name] = district;
  });

  Province3.map(district => {
    response.Province3.districtData[district.name] = district;
  });

  Province4.map(district => {
    response.Province4.districtData[district.name] = district;
  });

  Province5.map(district => {
    response.Province5.districtData[district.name] = district;
  });

  Province6.map(district => {
    response.Province6.districtData[district.name] = district;
  });

  Province7.map(district => {
    response.Province7.districtData[district.name] = district;
  });

  res.json(response);
};

const addDistrictCases = (req, res) => {
  const lastupdatedtime = Date.now();

  District.findOne({ name: req.body.name })
    .then(district => {
      if (district === null) {
        const { name, state, active, confirmed, deaths, recovered } = req.body;

        const newDistrict = new District({
          name,
          state,
          active,
          confirmed,
          deaths,
          recovered,
          lastupdatedtime
        });

        newDistrict
          .save()
          .then(district => {
            res.status(200).json({ district });
          })
          .catch(error => {
            res.status(500).json({ error });
          });
        return;
      }

      const {
        name = district.name,
        state = district.state,
        active = district.active,
        confirmed = district.confirmed,
        deaths = district.deaths,
        recovered = district.recovered
      } = req.body;

      District.findOneAndUpdate(
        { name },
        {
          name,
          state,
          active,
          confirmed,
          deaths,
          recovered,
          lastupdatedtime
        },
        { useFindAndModify: false, new: true }
      )
        .then(district => {
          if (district === null) {
            res.status(404).json({
              error: true,
              message: "Couldn't find the district to edit."
            });
            return;
          }
          res.status(200).json({ district });
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = {
  getDistrictCases,
  addDistrictCases
};
