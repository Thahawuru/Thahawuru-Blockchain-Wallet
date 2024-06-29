const { contract, account } = require('../utils/web3');

exports.setLicense = async (req, res) => {
  const { licenseNumber, identityNumber, name, livingAddress, birthDate, issuedDate, expiryDate, bloodGroup, vehiclesAllowed, document } = req.body;

  try {
    const tx = await contract.methods
      .setLicense(licenseNumber, identityNumber, name, livingAddress, birthDate, issuedDate, expiryDate, bloodGroup, vehiclesAllowed, document)
      .send({ from: account.address, gas: 3000000 });

    res.json({ status: 'License set successfully', tx });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLicense = async (req, res) => {
  const { address } = req.params;

  try {
    const license = await contract.methods.getLicense(address).call();
    res.json(license);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLicense = async (req, res) => {
  const { licenseNumber, identityNumber, name, livingAddress, birthDate, issuedDate, expiryDate, bloodGroup, vehiclesAllowed, document } = req.body;

  try {
    const tx = await contract.methods
      .updateLicense(licenseNumber, identityNumber, name, livingAddress, birthDate, issuedDate, expiryDate, bloodGroup, vehiclesAllowed, document)
      .send({ from: account.address, gas: 3000000 });

    res.json({ status: 'License updated successfully', tx });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
