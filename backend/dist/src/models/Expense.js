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
var _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var ExpenseSchema = new _mongoose.default.Schema({
    groupId: {
        type: _mongoose.default.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    paidBy: {
        type: _mongoose.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    splitType: {
        type: String,
        enum: [
            "equal",
            "percentage",
            "custom"
        ],
        required: true
    },
    splitDetails: [
        {
            userId: {
                type: _mongoose.default.Schema.Types.ObjectId,
                ref: "User"
            },
            shareAmount: {
                type: Number,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});
var _default = _mongoose.default.model("Expense", ExpenseSchema);
