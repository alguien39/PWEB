const path = require('path');

module.exports = {
    //Modificacion del parametro Entry
    entry: './src/index.js',
    output:{
        path : path.resolve( __dirname, 'dist' ),
        filename:'miPrimerEnpaquetado.js',
    },
    mode: 'production',
};