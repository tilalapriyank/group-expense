"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _express = /*#__PURE__*/ _interop_require_default(require("express"));
var _authMiddleware = require("../middlewares/authMiddleware");
var _settlementController = require("../controllers/settlementController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var router = _express.default.Router();
router.post("/", _authMiddleware.protect, _settlementController.createSettlement);
router.get("/:groupId", _authMiddleware.protect, _settlementController.getGroupSettlements);
router.put("/:settlementId", _authMiddleware.protect, _settlementController.updateSettlement);
var _default = router;
