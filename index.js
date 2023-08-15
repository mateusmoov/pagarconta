import puppeteer from 'puppeteer';
import 'dotenv/config';

let qrCodeSpanText = null;

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    executablePath: '/usr/bin/google-chrome',
    headless: false,
  });

  const page = await browser.newPage();

  try {
    await page.goto('https://www.caesb.df.gov.br/portal-servicos/app/login?execution=e2s1');

    await page.waitForSelector('input[id="form1:cpfCnpjId"]');
    await page.click('input[id="form1:cpfCnpjId"]'); 
    await page.keyboard.type(process.env.CAESB_CPF);

    await page.waitForSelector('input[id="form1:j_idt38"]'); 
    await page.click('input[id="form1:j_idt38"]');
    await page.keyboard.type(process.env.CAESB_PASSWORD);

    await page.click('button[id="form1:btnEntrar"]')


    await page.waitForNavigation();

    await page.goto('https://www.caesb.df.gov.br/portal-servicos/app/segundaviaconta?execution=e2s1');
    await page.waitForSelector('button[id="form1:tabView1:tableInscricao:0:j_idt37"]')

    await page.click('button[id="form1:tabView1:tableInscricao:0:j_idt37"]')


    await page.waitForSelector('button[id="form2:tableContas:0:j_idt98"]')
    await page.click('button[id="form2:tableContas:0:j_idt98"]')

    await page.waitForSelector('span[id="dlgFormQrCode:idQrCode"]')

    qrCodeSpanText = await page.evaluate(() => {
      const spanElement = document.querySelector('span[id="dlgFormQrCode:idQrCode"]');
      return spanElement.textContent;
    });
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await page.close();
    await browser.close();
  }
})();

export { qrCodeSpanText };

