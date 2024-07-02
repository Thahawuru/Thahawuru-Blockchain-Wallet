const { web3, contract, account } = require('../utils/web3');

const getLicense = async (req, res) => {
  try {
    const address = req.params.address;
    const license = await contract.methods.getLicense(address).call();
    res.status(200).json(license);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setLicense = async (req, res) => {
  try {
    const {
      licenseNumber,
      identityNumber,
      name,
      livingAddress,
      birthDate,
      issuedDate,
      expiryDate,
      bloodGroup,
      vehiclesAllowed,
      document
    } = req.body;

    const receipt = await contract.methods.setLicense(
      licenseNumber,
      identityNumber,
      name,
      livingAddress,
      birthDate,
      issuedDate,
      expiryDate,
      bloodGroup,
      vehiclesAllowed,
      document
    ).send({ from: account.address });

    res.status(201).json({ receipt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLicense = async (req, res) => {
  try {
    const {
      licenseNumber,
      identityNumber,
      name,
      livingAddress,
      birthDate,
      issuedDate,
      expiryDate,
      bloodGroup,
      vehiclesAllowed,
      document
    } = req.body;

    const receipt = await contract.methods.updateLicense(
      licenseNumber,
      identityNumber,
      name,
      livingAddress,
      birthDate,
      issuedDate,
      expiryDate,
      bloodGroup,
      vehiclesAllowed,
      document
    ).send({ from: account.address });

    res.status(200).json({ receipt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getLicense,
  setLicense,
  updateLicense
};
