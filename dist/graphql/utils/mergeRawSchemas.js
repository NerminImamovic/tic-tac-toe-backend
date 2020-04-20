"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function withArraysConcatination(objValue, srcValue) {
    // if an array, concat it
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
    // use the normal lodash merge functionality
}
// allows us to merge schemas
exports.mergeRawSchemas = (...schemas) => {
    return _.mergeWith({}, ...schemas, withArraysConcatination);
};
//# sourceMappingURL=mergeRawSchemas.js.map