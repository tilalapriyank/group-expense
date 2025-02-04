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
var SettlementSchema = new _mongoose.default.Schema({
    groupId: {
        type: _mongoose.default.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    payer: {
        type: _mongoose.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    payee: {
        type: _mongoose.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [
            "pending",
            "completed"
        ],
        default: "pending"
    }
}, {
    timestamps: true
});
var _default = _mongoose.default.model("Settlement", SettlementSchema);
