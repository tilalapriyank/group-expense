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
    addExpense: function() {
        return addExpense;
    },
    deleteExpense: function() {
        return deleteExpense;
    },
    getGroupExpenses: function() {
        return getGroupExpenses;
    },
    updateExpense: function() {
        return updateExpense;
    }
});
var _Expense = /*#__PURE__*/ _interop_require_default(require("../models/Expense"));
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
var addExpense = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var _req_body, groupId, paidBy, amount, description, splitType, splitDetails, group, expense, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        4,
                        ,
                        5
                    ]);
                    _req_body = req.body, groupId = _req_body.groupId, paidBy = _req_body.paidBy, amount = _req_body.amount, description = _req_body.description, splitType = _req_body.splitType, splitDetails = _req_body.splitDetails;
                    if (!groupId || !paidBy || !amount || amount <= 0 || !description || !splitType || !splitDetails) {
                        return [
                            2,
                            res.status(400).json({
                                message: "Invalid input values"
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
                    if (!group.members.includes(paidBy)) {
                        return [
                            2,
                            res.status(403).json({
                                message: "User is not a member of this group"
                            })
                        ];
                    }
                    expense = new _Expense.default({
                        groupId: groupId,
                        paidBy: paidBy,
                        amount: amount,
                        description: description,
                        splitType: splitType,
                        splitDetails: splitDetails
                    });
                    return [
                        4,
                        expense.save()
                    ];
                case 2:
                    _state.sent();
                    return [
                        4,
                        _Group.default.findByIdAndUpdate(groupId, {
                            $push: {
                                expenses: expense._id
                            }
                        })
                    ];
                case 3:
                    _state.sent();
                    res.status(201).json({
                        message: "Expense added successfully",
                        expense: expense
                    });
                    return [
                        3,
                        5
                    ];
                case 4:
                    error = _state.sent();
                    res.status(500).json({
                        message: "Server error",
                        error: error.message
                    });
                    return [
                        3,
                        5
                    ];
                case 5:
                    return [
                        2
                    ];
            }
        });
    });
    return function addExpense(req, res) {
        return _ref.apply(this, arguments);
    };
}();
var getGroupExpenses = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var groupId, userId, userObjectId, group, memberIds, expenses, error;
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
                        _Expense.default.find({
                            groupId: groupId
                        }).populate("paidBy", "name email")
                    ];
                case 2:
                    expenses = _state.sent();
                    res.status(200).json(expenses);
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
    return function getGroupExpenses(req, res) {
        return _ref.apply(this, arguments);
    };
}();
var updateExpense = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var expenseId, _req_body, amount, description, splitType, splitDetails, expense, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]);
                    expenseId = req.params.expenseId;
                    _req_body = req.body, amount = _req_body.amount, description = _req_body.description, splitType = _req_body.splitType, splitDetails = _req_body.splitDetails;
                    if (!expenseId || !amount || amount <= 0 || !description || !splitType || !splitDetails) {
                        return [
                            2,
                            res.status(400).json({
                                message: "Invalid input values"
                            })
                        ];
                    }
                    return [
                        4,
                        _Expense.default.findById(expenseId)
                    ];
                case 1:
                    expense = _state.sent();
                    if (!expense) {
                        return [
                            2,
                            res.status(404).json({
                                message: "Expense not found"
                            })
                        ];
                    }
                    if (req.userId !== String(expense.paidBy)) {
                        return [
                            2,
                            res.status(403).json({
                                message: "Unauthorized to edit this expense"
                            })
                        ];
                    }
                    expense.amount = amount;
                    expense.description = description;
                    expense.splitType = splitType;
                    expense.splitDetails = splitDetails;
                    return [
                        4,
                        expense.save()
                    ];
                case 2:
                    _state.sent();
                    res.status(200).json({
                        message: "Expense updated successfully",
                        expense: expense
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
    return function updateExpense(req, res) {
        return _ref.apply(this, arguments);
    };
}();
var deleteExpense = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var expenseId, expense, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        4,
                        ,
                        5
                    ]);
                    expenseId = req.params.expenseId;
                    return [
                        4,
                        _Expense.default.findById(expenseId)
                    ];
                case 1:
                    expense = _state.sent();
                    if (!expense) {
                        return [
                            2,
                            res.status(404).json({
                                message: "Expense not found"
                            })
                        ];
                    }
                    if (req.userId !== String(expense.paidBy)) {
                        return [
                            2,
                            res.status(403).json({
                                message: "Unauthorized to delete this expense"
                            })
                        ];
                    }
                    return [
                        4,
                        expense.deleteOne()
                    ];
                case 2:
                    _state.sent();
                    return [
                        4,
                        _Group.default.findByIdAndUpdate(expense.groupId, {
                            $pull: {
                                expenses: expenseId
                            }
                        })
                    ];
                case 3:
                    _state.sent();
                    res.status(200).json({
                        message: "Expense deleted successfully"
                    });
                    return [
                        3,
                        5
                    ];
                case 4:
                    error = _state.sent();
                    res.status(500).json({
                        message: "Server error",
                        error: error.message
                    });
                    return [
                        3,
                        5
                    ];
                case 5:
                    return [
                        2
                    ];
            }
        });
    });
    return function deleteExpense(req, res) {
        return _ref.apply(this, arguments);
    };
}();
