const { contract, account } = require('../utils/web3');

exports.setIdentity = async (req, res) => {
  const { issuedDate, identityNumber, name, otherNames, birthDate, birthPlace, job, livingAddress, document } = req.body;

  try {
    const tx = await contract.methods
      .setIdentity(issuedDate, identityNumber, name, otherNames, birthDate, birthPlace, job, livingAddress, document)
      .send({ from: account.address, gas: 3000000 });

    res.json({ status: 'Identity set successfully', tx });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIdentity = async (req, res) => {
  const { address } = req.params;

  try {
    const identity = await contract.methods.getIdentity(address).call();
    res.json(identity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIdentity = async (req, res) => {
  const { issuedDate, identityNumber, name, otherNames, birthDate, birthPlace, job, livingAddress, document } = req.body;

  try {
    const tx = await contract.methods
      .updateIdentity(issuedDate, identityNumber, name, otherNames, birthDate, birthPlace, job, livingAddress, document)
      .send({ from: account.address, gas: 3000000 });

    res.json({ status: 'Identity updated successfully', tx });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
