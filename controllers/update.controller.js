const service = require("../updateService");

const getUpdates = async (req, res) => {
  const updates = await service.getData();

  const { district, start } = req.query;

  const hospitals = updates.filter(
    hospital => hospital.district.toUpperCase() === district.toUpperCase()
  );

  const response = hospitals.slice((start - 1) * 5);

  res.status(200).json({ length: response.length, hospitals: response });
};

module.exports = {
  getUpdates
};
