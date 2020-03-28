const service = require("../updateService");

const getUpdates = async (req, res) => {
  const updates = await service.getData();

  const { district, covidTest, start } = req.query;

  let hospitals = updates;

  if (district) {
    hospitals = hospitals.filter(
      hospital => hospital.district.toUpperCase() === district.toUpperCase()
    );
  }

  if (covidTest) {
    hospitals = hospitals.filter(hospital => hospital.covidTest);
  }

  let reduced = hospitals;
  let length = hospitals.length;

  if (start && !covidTest) {
    const from = (start - 1) * 10;
    const to = from + 10;
    reduced = hospitals.slice(from, to);
    length = length - start * 10;
  }

  res.status(200).json({ length, hospitals: reduced });
};

module.exports = {
  getUpdates
};
