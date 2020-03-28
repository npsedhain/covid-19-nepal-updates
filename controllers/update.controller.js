const service = require("../updateService");

const getUpdates = async (req, res) => {
  const updates = await service.getData();

  const { district, covidTest } = req.query;

  let hospitals = updates;

  if (district) {
    hospitals = hospitals.filter(
      hospital => hospital.district.toUpperCase() === district.toUpperCase()
    );
  }

  if (covidTest) {
    hospitals = hospitals.filter(hospital => hospital.covidTest);
  }

  res.status(200).json({ length: hospitals.length, hospitals });
};

module.exports = {
  getUpdates
};
