const { web3, contract, account } = require("../utils/web3");

async function setIdentitiesToBlockchain(identities) {
  try {
    if (!Array.isArray(identities)) {
      throw new Error("Identities must be an array");
    }

    for (const identity of identities) {
      if (!identity.issuedDate || !identity.identityNumber || !identity.name) {
        throw new Error("Invalid identity data");
      }

      const issuedDateTimestamp =
        new Date(identity.issuedDate).getTime() / 1000;
      const birthDateTimestamp = new Date(identity.birthDate).getTime() / 1000;

      const gasEstimate = await contract.methods
        .setIdentity(
          issuedDateTimestamp,
          identity.identityNumber,
          identity.name,
          identity.otherNames,
          birthDateTimestamp,
          identity.birthPlace,
          identity.job,
          identity.livingAddress,
          identity.document
        )
        .estimateGas({ from: account.address });

      const receipt = await contract.methods
        .setIdentity(
          issuedDateTimestamp,
          identity.identityNumber,
          identity.name,
          identity.otherNames,
          birthDateTimestamp,
          identity.birthPlace,
          identity.job,
          identity.livingAddress,
          identity.document
        )
        .send({ from: account.address, gas: gasEstimate });

      console.log("Identity added to blockchain successfully:", receipt);
    }
    console.log("Identities added to blockchain successfully");
  } catch (error) {
    console.error("Error setting identities to blockchain:", error);
  }
}

async function updateIdentityOnBlockchain(identities) {
  try {
    if (!Array.isArray(identities)) {
      throw new Error("Identities must be an array");
    }

    for (const identity of identities) {
      if (
        !identity.issuedDate ||
        !identity.identityNumber ||
        !identity.name ||
        !identity.birthDate ||
        !identity.birthPlace ||
        !identity.job ||
        !identity.livingAddress ||
        !identity.document
      ) {
        throw new Error("Invalid identity data: Missing required fields");
      }

      const issuedDateTimestamp =
        new Date(identity.issuedDate).getTime() / 1000;
      const birthDateTimestamp = new Date(identity.birthDate).getTime() / 1000;

      const gasEstimate = await contract.methods
        .updateIdentity(
          issuedDateTimestamp,
          identity.identityNumber,
          identity.name,
          identity.otherNames,
          birthDateTimestamp,
          identity.birthPlace,
          identity.job,
          identity.livingAddress,
          identity.document
        )
        .estimateGas({ from: account.address });

      const receipt = await contract.methods
        .updateIdentity(
          issuedDateTimestamp,
          identity.identityNumber,
          identity.name,
          identity.otherNames,
          birthDateTimestamp,
          identity.birthPlace,
          identity.job,
          identity.livingAddress,
          identity.document
        )
        .send({ from: account.address, gas: gasEstimate });

      console.log("Identity updated successfully on blockchain:", receipt);
    }
  } catch (error) {
    console.error("Error updating identity on blockchain:", error);
  }
}

async function setLicensesToBlockchain(licenses) {
  try {
    if (!Array.isArray(licenses)) {
      throw new Error("Licenses must be an array");
    }

    for (const license of licenses) {
      if (
        !license.licenseNumber ||
        !license.identityNumber ||
        !license.name ||
        !license.livingAddress ||
        !license.birthDate ||
        !license.issuedDate ||
        !license.expiryDate ||
        !license.bloodGroup ||
        !license.vehiclesAllowed ||
        !license.document
      ) {
        throw new Error("Invalid license data: Missing required fields");
      }

      // Validate dates
      const issuedDateTimestamp = new Date(license.issuedDate).getTime() / 1000;
      const birthDateTimestamp = new Date(license.birthDate).getTime() / 1000;
      const expiryDateTimestamp = new Date(license.expiryDate).getTime() / 1000;

      // Validate vehiclesAllowed
      if (!Array.isArray(license.vehiclesAllowed)) {
        throw new Error(
          "Invalid license data: vehiclesAllowed must be an array"
        );
      }

      const gasEstimate = await contract.methods
        .setLicense(
          license.licenseNumber,
          license.identityNumber,
          license.name,
          license.livingAddress,
          birthDateTimestamp,
          issuedDateTimestamp,
          expiryDateTimestamp,
          license.bloodGroup,
          license.vehiclesAllowed,
          license.document
        )
        .estimateGas({ from: account.address });

      const reciept = await contract.methods
        .setLicense(
          license.licenseNumber,
          license.identityNumber,
          license.name,
          license.livingAddress,
          birthDateTimestamp,
          issuedDateTimestamp,
          expiryDateTimestamp,
          license.bloodGroup,
          license.vehiclesAllowed,
          license.document
        )
        .send({ from: account.address, gas: gasEstimate });

      console.log("License added to blockchain successfully:", reciept);
    }
    console.log("Licenses added to blockchain successfully");
  } catch (error) {
    console.error("Error setting licenses to blockchain:", error);
  }
}

async function updateLicenseOnBlockchain(licenses) {
  try {
    if (!Array.isArray(licenses)) {
      throw new Error("Licenses must be an array");
    }

    for (const license of licenses) {
      if (
        !license.licenseNumber ||
        !license.identityNumber ||
        !license.name ||
        !license.livingAddress ||
        !license.birthDate ||
        !license.issuedDate ||
        !license.expiryDate ||
        !license.bloodGroup ||
        !license.vehiclesAllowed ||
        !license.document
      ) {
        throw new Error("Invalid license data: Missing required fields");
      }

      // Validate dates
      const issuedDateTimestamp = new Date(license.issuedDate).getTime() / 1000;
      const birthDateTimestamp = new Date(license.birthDate).getTime() / 1000;
      const expiryDateTimestamp = new Date(license.expiryDate).getTime() / 1000;

      // Validate vehiclesAllowed
      if (!Array.isArray(license.vehiclesAllowed)) {
        throw new Error(
          "Invalid license data: vehiclesAllowed must be an array"
        );
      }

      const gasEstimate = await contract.methods
        .updateLicense(
          license.licenseNumber,
          license.identityNumber,
          license.name,
          license.livingAddress,
          birthDateTimestamp,
          issuedDateTimestamp,
          expiryDateTimestamp,
          license.bloodGroup,
          license.vehiclesAllowed,
          license.document
        )
        .estimateGas({ from: account.address });

      const receipt = await contract.methods
        .updateLicense(
          license.licenseNumber,
          license.identityNumber,
          license.name,
          license.livingAddress,
          birthDateTimestamp,
          issuedDateTimestamp,
          expiryDateTimestamp,
          license.bloodGroup,
          license.vehiclesAllowed,
          license.document
        )
        .send({ from: account.address, gas: gasEstimate });

      console.log("License updated successfully on blockchain:", receipt);
    }
    console.log("License updated successfully on blockchain:", receipt);
  } catch (error) {
    console.error("Error updating license on blockchain:", error);
  }
}

module.exports = {
  setIdentitiesToBlockchain,
  updateIdentityOnBlockchain,
  setLicensesToBlockchain,
  updateLicenseOnBlockchain,
};
