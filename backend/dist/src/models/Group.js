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
var GroupSchema = new _mongoose.default.Schema({
    groupName: {
        type: String,
        required: true
    },
    createdBy: {
        type: _mongoose.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [
        {
            type: _mongoose.default.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    expenses: [
        {
            type: _mongoose.default.Schema.Types.ObjectId,
            ref: "Expense"
        }
    ]
}, {
    timestamps: true
});
var _default = _mongoose.default.model("Group", GroupSchema);
