'use strict';

module.exports = function(Cuenta) {
    
    Cuenta.validatesPresenceOf('cuenta_usuarioid', {message: 'bla bla bla'});
    Cuenta.validatesUniquenessOf('cuenta_usuarioid', {message: 'el usuario ya posee una cuenta'});
    Cuenta.observe('before save', function verifyForeignKeys(ctx, next) {
        if (ctx.instance) { // for single model update
            // check ctx.instance.fkField
            var s = ctx.instance;
            var id = s.__data.cuenta_usuarioid;            

            //Get the Application object which the model attached to, and we do what ever we want
            Cuenta.getApp(function (err, app) {
                //App object returned in the callback
                //PersistedModel.exists(id, callback ((err, exists)))
                app.models.Usuario.exists(id, function (err, exists) {
                    if (err) throw err;
                    if (!exists)
                        return next(new Error('Bad foreign key.'));
                });
            });
            next();
        }});
};
