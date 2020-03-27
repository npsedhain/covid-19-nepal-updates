const service = require("../updateService");

const getUpdates = async (req, res) => {
  const updates = await service.getData();

  const { district, start } = req.query;

  if (district) {
    const hospitals = updates.filter(
      hospital => hospital.district.toUpperCase() === district.toUpperCase()
    );

    if (start) {
      const response = hospitals.slice((start - 1) * 5);

      res.status(200).json({ length: response.length, hospitals: response });
      return;
    }

    res.status(200).json({ length: hospitals.length, hospitals });
    return;
  }
  res.status(200).json({ length: updates.length, hospitals: updates });
};

module.exports = {
  getUpdates
};
