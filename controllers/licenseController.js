const { web3, contract, account } = require('../utils/web3');

const getLicense = async (req, res) => {
  try {
    const identityNumber = req.params.identityNumber;
    const license = await contract.methods.getLicense(identityNumber).call();
    res.status(200).json(license);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getLicense,
};
