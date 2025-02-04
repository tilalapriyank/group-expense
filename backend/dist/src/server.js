"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _express = /*#__PURE__*/ _interop_require_default(require("express"));
var _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
var _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
var _db = /*#__PURE__*/ _interop_require_default(require("./config/db"));
var _userRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/userRoutes"));
var _groupRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/groupRoutes"));
var _expenseRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/expenseRoutes"));
var _settlementRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/settlementRoutes"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
(0, _db.default)();
var app = (0, _express.default)();
// Middleware
app.use(_express.default.json());
app.use((0, _cors.default)());
// API Routes
app.use("/api/auth", _userRoutes.default);
app.use("/api/groups", _groupRoutes.default);
app.use("/api/expenses", _expenseRoutes.default);
app.use("/api/settlements", _settlementRoutes.default);
// Start Server
var PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    return console.log("✅ Server running on port ".concat(PORT));
});
