var U = require('../utils/base');

var SchemaOne = U.Schema(function(attr, attrError, attrValidate, func, funcError) {
    attr('name', String, true);
    attrError('Parameter "name" is missing or has incorrect format.');
    attrError(U.lan.SK, 'Paremeter "name" chýba alebo má nesprávny formát.');
    attrError(U.lan.CZ, 'Parametr "name" chybí nebo má špatný formát.');
    attr('surname', String, false);
    attrError('Parameter "surname" has incorrect format.');
    attr('projects', Array, true);
    attrError('Parameter "projects" has to be array of at least one item.');
    attrValidate(function(arr) {
        return arr.length > 0;
    });
    func('getName');
    funcError('Function "getName" is missing.');
    funcError(U.lan.SK, 'Chýba funkcia "getName".');
});
var obj = {
    name: 'Tomas',
    projects: ['TodoList'],
    // getName: function() {}
};
var errors = SchemaOne.validate(obj);
console.log('errors default locale: ', errors);
var errors = SchemaOne.validate(obj, U.lan.SK);
console.log('errors default sk locale: ', errors);
if (errors.hasError()) {
    // errors.throwFirst();
}
var norm = SchemaOne.normalize(obj);
console.log('normalized: ', norm);
