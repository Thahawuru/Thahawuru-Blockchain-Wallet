const { web3, contract, account } = require('../utils/web3');

const getIdentity = async (req, res) => {
  try {
    const identityNumber = req.params.identityNumber;
    const identity = await contract.methods.getIdentity(identityNumber).call();
    res.status(200).json(identity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getIdentity,
};
