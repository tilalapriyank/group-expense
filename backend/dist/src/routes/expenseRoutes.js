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
var _expenseController = require("../controllers/expenseController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var router = _express.default.Router();
router.post("/", _authMiddleware.protect, _expenseController.addExpense);
router.get("/:groupId", _authMiddleware.protect, _expenseController.getGroupExpenses);
router.put("/:expenseId", _authMiddleware.protect, _expenseController.updateExpense);
router.delete("/:expenseId", _authMiddleware.protect, _expenseController.deleteExpense);
var _default = router;
