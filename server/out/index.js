"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var app_2 = require("./app");
var PORT = 3000;
app_1.default.listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
});
app_1.default.use(app_2.express.static('../client'));
app_1.default.all('*', function (req, res) {
    res.redirect('/');
});
//# sourceMappingURL=index.js.map