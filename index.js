const console = require('./Components/logger');
const File = require('./Components/files');
const Auto = require('./Components/automatizacion');
const mostrarNotificacion = require('./Components/notificationModule');

const cliProgress = require("cli-progress");
const { chromium } = require("playwright");


(async () => {
    //SECTION Lectura y creacion del json
    /* -------------------------------------------------------------------------- */
    /*                  Fragmento de lectura y creacion del json                  */
    /* -------------------------------------------------------------------------- */
    //NOTE - Leer archivo excel y crear json
    await File.lecturaExcel();
    //NOTE - Leer y almacenar el json en una variable
    const lista = await File.leerLista();
    //!SECTION 

    await Auto.run(lista);

})();
