"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createSettlement: function() {
        return createSettlement;
    },
    getGroupSettlements: function() {
        return getGroupSettlements;
    },
    updateSettlement: function() {
        return updateSettlement;
    }
});
var _Settlement = /*#__PURE__*/ _interop_require_default(require("../models/Settlement"));
var _Group = /*#__PURE__*/ _interop_require_default(require("../models/Group"));
var _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var createSettlement = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var _req_body, groupId, payer, payee, amount, group, settlement, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]);
                    _req_body = req.body, groupId = _req_body.groupId, payer = _req_body.payer, payee = _req_body.payee, amount = _req_body.amount;
                    if (!groupId || !payer || !payee || !amount || amount <= 0) {
                        return [
                            2,
                            res.status(400).json({
                                message: "Invalid input values"
                            })
                        ];
                    }
                    if (req.userId !== payer && req.userId !== payee) {
                        return [
                            2,
                            res.status(403).json({
                                message: "Unauthorized to settle this payment"
                            })
                        ];
                    }
                    return [
                        4,
                        _Group.default.findById(groupId)
                    ];
                case 1:
                    group = _state.sent();
                    if (!group) {
                        return [
                            2,
                            res.status(404).json({
                                message: "Group not found"
                            })
                        ];
                    }
                    if (!group.members.includes(payer) || !group.members.includes(payee)) {
                        return [
                            2,
                            res.status(400).json({
                                message: "Payer or Payee is not a member of this group"
                            })
                        ];
                    }
                    settlement = new _Settlement.default({
                        groupId: groupId,
                        payer: payer,
                        payee: payee,
                        amount: amount
                    });
                    return [
                        4,
                        settlement.save()
                    ];
                case 2:
                    _state.sent();
                    res.status(201).json({
                        message: "Settlement created successfully",
                        settlement: settlement
                    });
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    res.status(500).json({
                        message: "Server error",
                        error: error.message
                    });
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function createSettlement(req, res) {
        return _ref.apply(this, arguments);
    };
}();
var getGroupSettlements = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var groupId, userId, userObjectId, group, memberIds, settlements, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]);
                    groupId = req.params.groupId;
                    userId = req.userId;
                    if (!userId) {
                        return [
                            2,
                            res.status(401).json({
                                message: "Unauthorized - No user ID found"
                            })
                        ];
                    }
                    userObjectId = new _mongoose.default.Types.ObjectId(userId);
                    return [
                        4,
                        _Group.default.findById(groupId)
                    ];
                case 1:
                    group = _state.sent();
                    if (!group) {
                        return [
                            2,
                            res.status(404).json({
                                message: "Group not found"
                            })
                        ];
                    }
                    memberIds = group.members.map(function(member) {
                        return member.toString();
                    });
                    if (!memberIds.includes(userObjectId.toString())) {
                        return [
                            2,
                            res.status(403).json({
                                message: "Unauthorized - You are not a member of this group"
                            })
                        ];
                    }
                    return [
                        4,
                        _Settlement.default.find({
                            groupId: groupId
                        }).populate("payer payee", "name email")
                    ];
                case 2:
                    settlements = _state.sent();
                    res.status(200).json(settlements);
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    res.status(500).json({
                        message: "Server error",
                        error: error.message
                    });
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function getGroupSettlements(req, res) {
        return _ref.apply(this, arguments);
    };
}();
var updateSettlement = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var settlementId, status, settlement, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]);
                    settlementId = req.params.settlementId;
                    status = req.body.status;
                    if (!settlementId || !status) {
                        return [
                            2,
                            res.status(400).json({
                                message: "Settlement ID and status are required"
                            })
                        ];
                    }
                    if (![
                        "pending",
                        "completed"
                    ].includes(status)) {
                        return [
                            2,
                            res.status(400).json({
                                message: "Invalid status value"
                            })
                        ];
                    }
                    return [
                        4,
                        _Settlement.default.findById(settlementId)
                    ];
                case 1:
                    settlement = _state.sent();
                    if (!settlement) {
                        return [
                            2,
                            res.status(404).json({
                                message: "Settlement not found"
                            })
                        ];
                    }
                    if (req.userId !== String(settlement.payer) && req.userId !== String(settlement.payee)) {
                        return [
                            2,
                            res.status(403).json({
                                message: "Unauthorized to update this settlement"
                            })
                        ];
                    }
                    if (settlement.status === "completed") {
                        return [
                            2,
                            res.status(400).json({
                                message: "This settlement is already completed"
                            })
                        ];
                    }
                    settlement.status = status;
                    return [
                        4,
                        settlement.save()
                    ];
                case 2:
                    _state.sent();
                    res.status(200).json({
                        message: "Settlement updated successfully",
                        settlement: settlement
                    });
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    res.status(500).json({
                        message: "Server error",
                        error: error.message
                    });
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function updateSettlement(req, res) {
        return _ref.apply(this, arguments);
    };
}();
