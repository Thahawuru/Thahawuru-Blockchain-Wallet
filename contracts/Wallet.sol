// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Wallet {
    // Structure to hold identity details
    struct Identity {
        uint issuedDate;
        string identityNumber;
        string name;
        string otherNames;
        uint birthDate;
        string birthPlace;
        string job;
        string livingAddress;
        string document;
    }

    // Structure to hold license details
    struct License {
        string licenseNumber;
        string identityNumber;
        string name;
        string livingAddress;
        uint birthDate;
        uint issuedDate;
        uint expiryDate;
        string bloodGroup;
        string[] vehiclesAllowed;
        string document;
    }

    // Mapping from user address to their identity and licenses
    mapping(address => Identity) private identities;
    mapping(address => License) private licenses;

    // Events to emit when identities or licenses are added or updated
    event IdentityAdded(
        address indexed user,
        string name,
        string identityNumber
    );
    event IdentityUpdated(
        address indexed user,
        string name,
        string identityNumber
    );
    event LicenseAdded(
        address indexed user,
        string licenseNumber,
        string identityNumber
    );
    event LicenseUpdated(
        address indexed user,
        string licenseNumber,
        string identityNumber
    );

    // Function to add or update identity
    function setIdentity(
        uint _issuedDate,
        string memory _identityNumber,
        string memory _name,
        string memory _otherNames,
        uint _birthDate,
        string memory _birthPlace,
        string memory _job,
        string memory _livingAddress,
        string memory _document
    ) public {
        identities[msg.sender] = Identity(
            _issuedDate,
            _identityNumber,
            _name,
            _otherNames,
            _birthDate,
            _birthPlace,
            _job,
            _livingAddress,
            _document
        );
        emit IdentityAdded(msg.sender, _name, _identityNumber);
    }

    // Function to retrieve identity details
    function getIdentity(
        address _user
    )
        public
        view
        returns (
            uint issuedDate,
            string memory identityNumber,
            string memory name,
            string memory otherNames,
            uint birthDate,
            string memory birthPlace,
            string memory job,
            string memory livingAddress,
            string memory document
        )
    {
        Identity storage identity = identities[_user];
        return (
            identity.issuedDate,
            identity.identityNumber,
            identity.name,
            identity.otherNames,
            identity.birthDate,
            identity.birthPlace,
            identity.job,
            identity.livingAddress,
            identity.document
        );
    }

    // Function to update identity details
    function updateIdentity(
        uint _issuedDate,
        string memory _identityNumber,
        string memory _name,
        string memory _otherNames,
        uint _birthDate,
        string memory _birthPlace,
        string memory _job,
        string memory _livingAddress,
        string memory _document
    ) public {
        require(
            bytes(identities[msg.sender].identityNumber).length != 0,
            "Identity does not exist"
        );
        identities[msg.sender] = Identity(
            _issuedDate,
            _identityNumber,
            _name,
            _otherNames,
            _birthDate,
            _birthPlace,
            _job,
            _livingAddress,
            _document
        );
        emit IdentityUpdated(msg.sender, _name, _identityNumber);
    }

    // Function to add or update license
    function setLicense(
        string memory _licenseNumber,
        string memory _identityNumber,
        string memory _name,
        string memory _livingAddress,
        uint _birthDate,
        uint _issuedDate,
        uint _expiryDate,
        string memory _bloodGroup,
        string[] memory _vehiclesAllowed,
        string memory _document
    ) public {
        licenses[msg.sender] = License(
            _licenseNumber,
            _identityNumber,
            _name,
            _livingAddress,
            _birthDate,
            _issuedDate,
            _expiryDate,
            _bloodGroup,
            _vehiclesAllowed,
            _document
        );
        emit LicenseAdded(msg.sender, _licenseNumber, _identityNumber);
    }

    // Function to retrieve license details
    function getLicense(
        address _user
    )
        public
        view
        returns (
            string memory licenseNumber,
            string memory identityNumber,
            string memory name,
            string memory livingAddress,
            uint birthDate,
            uint issuedDate,
            uint expiryDate,
            string memory bloodGroup,
            string[] memory vehiclesAllowed,
            string memory document
        )
    {
        License storage license = licenses[_user];
        return (
            license.licenseNumber,
            license.identityNumber,
            license.name,
            license.livingAddress,
            license.birthDate,
            license.issuedDate,
            license.expiryDate,
            license.bloodGroup,
            license.vehiclesAllowed,
            license.document
        );
    }

    // Function to update license details
    function updateLicense(
        string memory _licenseNumber,
        string memory _identityNumber,
        string memory _name,
        string memory _livingAddress,
        uint _birthDate,
        uint _issuedDate,
        uint _expiryDate,
        string memory _bloodGroup,
        string[] memory _vehiclesAllowed,
        string memory _document
    ) public {
        require(
            bytes(licenses[msg.sender].licenseNumber).length != 0,
            "License does not exist"
        );
        licenses[msg.sender] = License(
            _licenseNumber,
            _identityNumber,
            _name,
            _livingAddress,
            _birthDate,
            _issuedDate,
            _expiryDate,
            _bloodGroup,
            _vehiclesAllowed,
            _document
        );
        emit LicenseUpdated(msg.sender, _licenseNumber, _identityNumber);
    }
}
