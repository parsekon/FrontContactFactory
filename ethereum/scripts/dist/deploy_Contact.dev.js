"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
var _require = require("hardhat"),
    ethers = _require.ethers;

function main() {
  var _ref, _ref2, deployer, ContactFactory, contactFactory;

  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ethers.getSigners());

        case 2:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          deployer = _ref2[0];
          console.log("Deploying contracts with the account:", deployer.address);
          _context.next = 8;
          return regeneratorRuntime.awrap(ethers.getContractFactory("ContactFactory"));

        case 8:
          ContactFactory = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(ContactFactory.deploy());

        case 11:
          contactFactory = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(contactFactory.deployed());

        case 14:
          console.log("contactFactory:", contactFactory.address);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
} // We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.


main()["catch"](function (error) {
  console.error(error);
  process.exitCode = 1;
});