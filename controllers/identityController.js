const { web3, contract, account } = require('../utils/web3');

const getIdentity = async (req, res) => {
  try {
    const address = req.params.address;
    const identity = await contract.methods.getIdentity(address).call();
    res.status(200).json(identity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setIdentity = async (req, res) => {
  try {
    const {
      issuedDate,
      identityNumber,
      name,
      otherNames,
      birthDate,
      birthPlace,
      job,
      livingAddress,
      document
    } = req.body;

    const receipt = await contract.methods.setIdentity(
      issuedDate,
      identityNumber,
      name,
      otherNames,
      birthDate,
      birthPlace,
      job,
      livingAddress,
      document
    ).send({ from: account.address });

    res.status(201).json({ receipt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIdentity = async (req, res) => {
  try {
    const {
      issuedDate,
      identityNumber,
      name,
      otherNames,
      birthDate,
      birthPlace,
      job,
      livingAddress,
      document
    } = req.body;

    const receipt = await contract.methods.updateIdentity(
      issuedDate,
      identityNumber,
      name,
      otherNames,
      birthDate,
      birthPlace,
      job,
      livingAddress,
      document
    ).send({ from: account.address });

    res.status(200).json({ receipt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getIdentity,
  setIdentity,
  updateIdentity
};
