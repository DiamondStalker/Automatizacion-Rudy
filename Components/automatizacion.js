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

                await page.fill('[id="text-message"]', elem.Mensaje.toString().trim());
                await page.waitForTimeout(250);


                //await page.click('[role="listitem"]:nth-child(2) > div');

                //Whatsapp

                await page.click('[id="whatsapp-tab"]');
                await page.waitForTimeout(250);

                await page.click('[class="flex items-center h-10 py-2 text-sm border-t"] a');
                await page.waitForTimeout(1000);

                await page.fill('[aria-labelledby="vs4__combobox"]', elem["Template What"].toString().trim());
                await page.waitForTimeout(500);

                await page.keyboard.press('Enter');

                //await page.click('#contact-details > div > div.hl_contact-details-center > div.modal.fade.hl_sms-template--modal.show > div > div > div.modal-footer > div > button.hl-btn.inline-flex.items-center.px-4.py-2.border.border-transparent.text-sm.font-medium.rounded.shadow-sm.text-white.bg-apple-500.hover\:bg-apple-600.focus\:outline-none.focus\:ring-2.focus\:ring-offset-2.focus\:ring-apple-500');
                await page.waitForTimeout(250);


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
