const puppeteer = require('puppeteer');
const config = require('dotenv').config();


(async () => {

  headless = ( config.parsed.BROWSER_HEADLESS === 'true')

  const browser = await puppeteer.launch({
    headless: headless,
  });

  const page = await browser.newPage();

  await page.goto(config.parsed.URL_LOGIN);
  await page.type('#login',config.parsed.ACCOUNT_LOGIN);
  await page.type('#person_session_password',config.parsed.ACCOUNT_PASSWORD);

  await page.click('#s_login');

  await page.waitForSelector('.client-space-menu-booking-link');

  const bookingButton = await page.$$('.js-booking-button')

  bookElement = await bookingButton[0].getProperty("href")

  bookURL = bookElement['_remoteObject'].value

  await page.goto(bookURL)

  await page.click('.Select__wrapper.js-select-wrapper');

  listDaysElements = await page.$$('.Select__list__link.js-list-link')

  await listDaysElements[1].click();

  await page.waitForSelector('.Card__item__column.Card__item__column--spaced.Card__item__column--button')

  listHoursButtton = await page.$$('.Card__item__column.Card__item__column--spaced.Card__item__column--button')

  lastHour = listHoursButtton[listHoursButtton.length - 1]

  lastHour.click()

})();