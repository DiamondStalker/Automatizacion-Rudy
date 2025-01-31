const notifier = require('node-notifier');
var console = require('../Components/logger');


function mostrarNotificacion(msg) {
    // Configuración de la notificación
    const notificationOptions = {
        title: 'Error Detectado',
        message: msg,
        icon: 'https://static.vecteezy.com/system/resources/previews/020/906/042/non_2x/alert-warning-free-download-free-png.png',
        appID: 'playWrite Automation',
        sound: true,
        wait: true,
        timeout: 10, // Tiempo en segundos antes de que la notificación se cierre automáticamente
        // actions: ['Reiniciar', 'Detalles'], // Acciones personalizadas para la notificación
        // dropdownLabel: 'Acciones adicionales', // Etiqueta para el menú desplegable de acciones
        // reply: true, // Habilitar respuesta a la notificación
    };

    // Mostrar la notificación
    notifier.notify(notificationOptions, function (err, response) {
        if (err) {
            console.error('\nError al mostrar la notificación:', err);
        } else {
            console.log('\nNotificación mostrada correctamente');
        }
    });
}

module.exports = mostrarNotificacion;
