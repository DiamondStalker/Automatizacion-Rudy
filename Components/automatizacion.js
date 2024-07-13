const { chromium } = require('playwright');
const mostrarNotificacion = require('./notificationModule');
const cliProgress = require("cli-progress");


const Auto = {
    async run(lista) {
        const browser = await chromium.launchPersistentContext('./Cache', {
            headless: false, // Cambia a true si deseas ejecutar en modo headless
            executablePath: "C://Program Files//Google//Chrome//Application//chrome.exe", // Ruta al ejecutable de Chrome
            args: ['--ignore-certificate-errors'], // Opcional: argumentos adicionales
        }); // set headless: true si no quieres ver el navegador

        const page = await browser.newPage();

        // Configurar la página para evitar el desafío de Cloudflare
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        await page.goto('https://app.contractorlevelup.com/v2/location/7gcRvmSzndyAWZHzYU01/dashboard', { waitUntil: 'load' });


        try {
            await page.waitForSelector('[class="login-card-heading"]', { state: 'attached' });
        } catch (error) { }

        // Valida si abrio con el loggin
        let loggin = await page.evaluate(async () => {
            let search = document.querySelector('[class="login-card-heading"]');
            if (search) {
                return true
            } else { return false }
        });

        if (loggin == true) {
            await console.log("Requiere loggin");
            await mostrarNotificacion("Requiere Loggin para continuar");
        } else {

            const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            progressBar.start(lista.length, 0);

            for (let elem of lista) {

                await page.keyboard.down('Control');
                await page.keyboard.press('KeyK');
                await page.keyboard.up('Control');

                await page.waitForTimeout(500);

                console.log(elem.Telefono);

                await page.fill('[id="global-search-input"]', elem.Telefono.toString());

                await page.waitForTimeout(500);

                await page.click('[role="listitem"]:nth-child(2) > div');

                await page.waitForTimeout(250);

                await page.fill('[id="text-message"]', elem.Mensaje);
                await page.waitForTimeout(250);

                //await page.click('[role="listitem"]:nth-child(2) > div');

                // Stop progressBar
                progressBar.increment();
            }
            progressBar.stop();
        }

        // Optionally, take a screenshot of the results page
        await page.screenshot({ path: 'search_results.png' });

        // Close browser
        await browser.close();
    },
};

module.exports = Auto;
