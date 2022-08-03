"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Contact = _interopRequireDefault(require("../Contact"));

var _contactFactory = _interopRequireDefault(require("../contactFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// если адрес не найден, выводится сообщение trow ...
var getContactByAddress = function getContactByAddress(address) {
  var contactAddress, contact, telegram, discord, desc;
  return regeneratorRuntime.async(function getContactByAddress$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_contactFactory["default"].ownerToContact(address));

        case 2:
          contactAddress = _context.sent;

          if (!(contactAddress === "0x0000000000000000000000000000000000000000")) {
            _context.next = 5;
            break;
          }

          throw new Error("Такой адрес не найден");

        case 5:
          contact = (0, _Contact["default"])(contactAddress);
          _context.next = 8;
          return regeneratorRuntime.awrap(contact.telegram());

        case 8:
          telegram = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(contact.discord());

        case 11:
          discord = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(contact.desc());

        case 14:
          desc = _context.sent;
          return _context.abrupt("return", {
            telegram: telegram,
            discord: discord,
            desc: desc
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = getContactByAddress;
exports["default"] = _default;