"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "protect", {
    enumerable: true,
    get: function() {
        return protect;
    }
});
var _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var protect = function(req, res, next) {
    try {
        var _req_header;
        var token = (_req_header = req.header("Authorization")) === null || _req_header === void 0 ? void 0 : _req_header.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided"
            });
        }
        var decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized - Invalid token"
        });
    }
};
