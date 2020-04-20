import * as _ from 'lodash';
import { IExecutableSchemaDefinition } from 'apollo-server';

function withArraysConcatination(objValue, srcValue) {
  // if an array, concat it
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  // use the normal lodash merge functionality
}

// allows us to merge schemas
export const mergeRawSchemas = (...schemas: IExecutableSchemaDefinition[]):
    IExecutableSchemaDefinition => {
  return _.mergeWith({}, ...schemas, withArraysConcatination);
};
