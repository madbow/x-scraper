import puppeteer from "puppeteer-extra"
import StealthPlugin from "puppeteer-extra-plugin-stealth"

import autoScroll from './utils/autoScroll.js';
import saveData from './utils/saveData.js';
import scrapData from "./utils/scrapData.js";
import scrapDataTok from "./utils/scrapDataTok.js";

puppeteer.use(StealthPlugin())

const main = (url) => {
    headlessBrowser(url)
}

const headlessBrowser = (url) => {
    const regex = /\/\/www\.(.*?)\./
    const website = url.match(regex)[1]
    const scrapDataNew = website !== 'tokopedia' ? scrapData : scrapDataTok
    
    puppeteer.launch({headless: false}).then(async browser => {
        console.log('Running puppeteer...')
        const page = await browser.newPage()
        await page.goto(`${url}`)
        console.log('Waiting for page to load..')
        await page.waitForTimeout(4000)
        console.log('Auto scroll..')
        await autoScroll(page);
        console.log('Scrapping..')
        const html = await page.content()
        const data = await scrapDataNew(html)
        console.log('Total data:', data?.length)
        saveData(data, website)
        await browser.close()
        console.log(`All done. ✨`)
    })
}

// main('https://www.ruparupa.com/jual/meja?itm_source=search&itm_campaign=direct_search&itm_term=meja&itm_device=desktop&keyword=meja&query=meja&searchMethod=typing&searchMethodLocation=home')
main('https://www.tokopedia.com/p/rumah-tangga/furniture/kursi-kantor')