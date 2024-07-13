/**
 * Componente que se encargara de trabajar todos los archivos
 */

const fs = require('fs').promises;

const File = {
    /**
     * @author DiamondStalker
     * Funcion que se encarga de leer un archivo .xlsx 
     */
    async lecturaExcel() {
        const XLSX = require('xlsx');
        const workbook = XLSX.readFile('./Read/Datos.xlsx');

        // Trae todas las hojas del excel
        //const sheet_name_list = workbook.SheetNames; 

        // Convierte la informacion de una hoja en espesifico por posicion o por el nombre sheet_name_list[0]
        let temp = (XLSX.utils.sheet_to_json(workbook.Sheets["Informacion"])); 

        await this.crearJson(temp);

    },

    /**
     * 
     * @author DiamondStalker
     * @param {JSON} informacion 
     * 
     * Funcion que se encargara de crear un archivo tipo json
     */
    async crearJson(informacion){
        await fs.writeFile(`./Read/Conversion.json`,JSON.stringify(informacion,null,2))
    },
    
    /**
     * @param {String} File
     * @returns Lista del archivo de Conversion.json
     */
    async leerLista (){
        const data = JSON.parse(await fs.readFile("./Read/Conversion.json", 'utf8'));
        return data;
    }

}

module.exports = File