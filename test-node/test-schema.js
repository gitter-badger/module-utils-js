var U = require('../utils/base');

var SchemaOne = U.Schema(function(attr, attrError, attrPrepare, attrValidate, func, funcError) {
    attr('name', String);
    attrValidate(function(v, typeMatch) {
        return typeMatch && !!v;
    });
    attrError('Parameter "name" is missing or has incorrect format.');
    attrError(U.lan.SK, 'Paremeter "name" chýba alebo má nesprávny formát.');
    attrError(U.lan.CZ, 'Parametr "name" chybí nebo má špatný formát.');
    attr('surname', String); // If you want to apply prepare and validate function, last parameter must be true.
    attrError('Parameter "surname" has incorrect format.');
    attrPrepare(function(v) {
        return v || null; // When we prepare with bad type, validation will contain error.
    });
    attrValidate(function(v, typeMatch, actualType, ruleType) {
        if (v === null) {
            return true;
        }
        return typeMatch;
    });
    attr('projects', Array);
    attrError('Parameter "projects" has to be array of at least one item.');
    attrValidate(function(arr, typeMatch, actualType, ruleType) {
        if (!arr) {
            return false;
        }
        return typeMatch && arr.length > 0;
    });
    func('getName');
    funcError('Function "getName" is missing.');
    funcError(U.lan.SK, 'Chýba funkcia "getName".');
});
var obj = {
    name: 'Tomas',
    // surname: undefined,
    projects: ['TodoList'],
    // getName: function() {}
};
var errors = SchemaOne.prepareAndValidate(obj, U.lan.SK);
U.log('errors default sk locale: ', errors);
if (errors.hasError()) {
    // errors.throwFirst();
}
U.log('before normalize: ', obj);
var norm = SchemaOne.normalize(obj);
U.log('normalized: ', norm);
