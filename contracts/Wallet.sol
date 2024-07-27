// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Wallet {
    struct Identity {
        uint256 issuedDate;
        string identityNumber;
        string name;
        string otherNames;
        uint256 birthDate;
        string birthPlace;
        string job;
        string livingAddress;
        string document;
    }

    struct License {
        string licenseNumber;
        string identityNumber;
        string name;
        string livingAddress;
        uint256 birthDate;
        uint256 issuedDate;
        uint256 expiryDate;
        string bloodGroup;
        string[] vehiclesAllowed;
        string document;
    }

    mapping(address => Identity) private identities;
    mapping(address => License) private licenses;

    mapping(string => address) private identityToAddress;
    mapping(string => address) private licenseToAddress;

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

    function setIdentity(
        uint256 _issuedDate,
        string memory _identityNumber,
        string memory _name,
        string memory _otherNames,
        uint256 _birthDate,
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
        identityToAddress[_identityNumber] = msg.sender;
        emit IdentityAdded(msg.sender, _name, _identityNumber);
    }

    function getIdentity(
        string memory _identityNumber
    )
        public
        view
        returns (
            uint256 issuedDate,
            string memory identityNumber,
            string memory name,
            string memory otherNames,
            uint256 birthDate,
            string memory birthPlace,
            string memory job,
            string memory livingAddress,
            string memory document
        )
    {
        address user = identityToAddress[_identityNumber];
        Identity storage identity = identities[user];
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

    function updateIdentity(
        uint256 _issuedDate,
        string memory _identityNumber,
        string memory _name,
        string memory _otherNames,
        uint256 _birthDate,
        string memory _birthPlace,
        string memory _job,
        string memory _livingAddress,
        string memory _document
    ) public {
        address user = identityToAddress[_identityNumber];
        require(user != address(0), "Identity does not exist");
        identities[user] = Identity(
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
        emit IdentityUpdated(user, _name, _identityNumber);
    }

    function setLicense(
        string memory _licenseNumber,
        string memory _identityNumber,
        string memory _name,
        string memory _livingAddress,
        uint256 _birthDate,
        uint256 _issuedDate,
        uint256 _expiryDate,
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
        licenseToAddress[_licenseNumber] = msg.sender;
        emit LicenseAdded(msg.sender, _licenseNumber, _identityNumber);
    }

    function getLicense(
        string memory _licenseNumber
    )
        public
        view
        returns (
            string memory licenseNumber,
            string memory identityNumber,
            string memory name,
            string memory livingAddress,
            uint256 birthDate,
            uint256 issuedDate,
            uint256 expiryDate,
            string memory bloodGroup,
            string[] memory vehiclesAllowed,
            string memory document
        )
    {
        address user = licenseToAddress[_licenseNumber];
        License storage license = licenses[user];
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

    function updateLicense(
        string memory _licenseNumber,
        string memory _identityNumber,
        string memory _name,
        string memory _livingAddress,
        uint256 _birthDate,
        uint256 _issuedDate,
        uint256 _expiryDate,
        string memory _bloodGroup,
        string[] memory _vehiclesAllowed,
        string memory _document
    ) public {
        address user = licenseToAddress[_licenseNumber];
        require(user != address(0), "License does not exist");
        licenses[user] = License(
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
        emit LicenseUpdated(user, _licenseNumber, _identityNumber);
    }
}
