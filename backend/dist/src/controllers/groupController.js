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
    createGroup: function() {
        return createGroup;
    },
    deleteGroup: function() {
        return deleteGroup;
    },
    getGroupDetails: function() {
        return getGroupDetails;
    },
    getUserGroups: function() {
        return getUserGroups;
    },
    updateGroup: function() {
        return updateGroup;
    }
});
var _Group = /*#__PURE__*/ _interop_require_default(require("../models/Group"));
var _User = /*#__PURE__*/ _interop_require_default(require("../models/User"));
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
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
var createGroup = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var _req_body, groupName, members, createdBy, group, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]);
                    _req_body = req.body, groupName = _req_body.groupName, members = _req_body.members;
                    createdBy = req.userId;
                    if (!createdBy) {
                        return [
                            2,
                            res.status(401).json({
                                message: "Unauthorized"
                            })
                        ];
                    }
                    if (!groupName || !Array.isArray(members)) {
                        return [
                            2,
                            res.status(400).json({
                                message: "Invalid input values"
                            })
                        ];
                    }
                    group = new _Group.default({
                        groupName: groupName,
                        createdBy: createdBy,
                        members: [
                            createdBy
                        ].concat(_to_consumable_array(members))
                    });
                    return [
                        4,
                        group.save()
                    ];
                case 1:
                    _state.sent();
                    return [
                        4,
                        _User.default.updateMany({
                            _id: {
                                $in: [
                                    createdBy
                                ].concat(_to_consumable_array(members))
                            }
                        }, {
                            $push: {
                                groups: group._id
                            }
                        })
                    ];
                case 2:
                    _state.sent();
                    res.status(201).json({
                        message: "Group created successfully",
                        group: group
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
    return function createGroup(req, res) {
        return _ref.apply(this, arguments);
    };
}();
var getUserGroups = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var userId, groups, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]);
                    userId = req.userId;
                    if (!userId) {
                        return [
                            2,
                            res.status(401).json({
                                message: "Unauthorized"
                            })
                        ];
                    }
                    return [
                        4,
                        _Group.default.find({
                            members: userId
                        })
                    ];
                case 1:
                    groups = _state.sent();
                    res.status(200).json(groups);
                    return [
                        3,
                        3
                    ];
                case 2:
                    error = _state.sent();
                    res.status(500).json({
                        message: "Server error",
                        error: error.message
                    });
                    return [
                        3,
                        3
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    });
    return function getUserGroups(req, res) {
        return _ref.apply(this, arguments);
    };
}();
var getGroupDetails = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var groupId, group, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]);
                    groupId = req.params.groupId;
                    return [
                        4,
                        _Group.default.findById(groupId).populate("members", "name email")
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
                    res.status(200).json(group);
                    return [
                        3,
                        3
                    ];
                case 2:
                    error = _state.sent();
                    res.status(500).json({
                        message: "Server error",
                        error: error.message
                    });
                    return [
                        3,
                        3
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    });
    return function getGroupDetails(req, res) {
        return _ref.apply(this, arguments);
    };
}();
var updateGroup = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var groupId, groupName, group, error;
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
                    groupName = req.body.groupName;
                    if (!groupName) {
                        return [
                            2,
                            res.status(400).json({
                                message: "Group name is required"
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
                    if (req.userId !== String(group.createdBy)) {
                        return [
                            2,
                            res.status(403).json({
                                message: "Only the group creator can update this group"
                            })
                        ];
                    }
                    group.groupName = groupName;
                    return [
                        4,
                        group.save()
                    ];
                case 2:
                    _state.sent();
                    res.status(200).json({
                        message: "Group updated successfully",
                        group: group
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
    return function updateGroup(req, res) {
        return _ref.apply(this, arguments);
    };
}();
var deleteGroup = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(req, res) {
        var groupId, group, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        4,
                        ,
                        5
                    ]);
                    groupId = req.params.groupId;
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
                    if (req.userId !== String(group.createdBy)) {
                        return [
                            2,
                            res.status(403).json({
                                message: "Only the group creator can delete this group"
                            })
                        ];
                    }
                    return [
                        4,
                        group.deleteOne()
                    ];
                case 2:
                    _state.sent();
                    return [
                        4,
                        _User.default.updateMany({
                            groups: groupId
                        }, {
                            $pull: {
                                groups: groupId
                            }
                        })
                    ];
                case 3:
                    _state.sent();
                    res.status(200).json({
                        message: "Group deleted successfully"
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
    return function deleteGroup(req, res) {
        return _ref.apply(this, arguments);
    };
}();
