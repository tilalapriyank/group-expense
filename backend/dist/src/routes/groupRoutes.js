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
var _groupController = require("../controllers/groupController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var router = _express.default.Router();
router.post("/", _authMiddleware.protect, _groupController.createGroup);
router.get("/", _authMiddleware.protect, _groupController.getUserGroups);
router.get("/:groupId", _authMiddleware.protect, _groupController.getGroupDetails);
router.put("/:groupId", _authMiddleware.protect, _groupController.updateGroup);
router.delete("/:groupId", _authMiddleware.protect, _groupController.deleteGroup);
var _default = router;
