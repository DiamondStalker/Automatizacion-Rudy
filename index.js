const console = require('./Components/logger');
const File = require('./Components/files');
const Auto = require('./Components/automatizacion');
const mostrarNotificacion = require('./Components/notificationModule');

const cliProgress = require("cli-progress");
const { chromium } = require("playwright");


(async () => {
    try {
        //SECTION Lectura y creacion del json
        /* -------------------------------------------------------------------------- */
        /*                  Fragmento de lectura y creacion del json                  */
        /* -------------------------------------------------------------------------- */
        //NOTE - Leer archivo excel y crear json

        console.log('Se esta leyendo el archivo excel');
        await File.lecturaExcel();
        //NOTE - Leer y almacenar el json en una variable
        const lista = await File.leerLista();
        console.log(`Se leyo la excel y se recuperaron ${lista.length} datos`);
        //!SECTION 

        await Auto.run(lista);
    } catch (e) {
        console.log(e)
    }
})();
