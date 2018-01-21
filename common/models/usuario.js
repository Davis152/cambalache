'use strict';

module.exports = function(Usuario) {
    Usuario.validatesUniquenessOf('nombrecompleto', {message: 'el nombre debe ser unico'});
};
