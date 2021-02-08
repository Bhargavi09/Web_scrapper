const puppeteer = require("puppeteer");
(async () => {

    let appUrl = 'https://www.apptrace.com/app/363590051';
    //launch the browser
    let browser = await puppeteer.launch({headless: true});
    //open up a new page
    let page = await browser.newPage();
    //direct to the specific url and tells the browser to wait until it is loaded
    await page.goto(appUrl, {waitUntil: 'networkidle2'});
    //evaluates the current page
    let info = await page.evaluate(()=>{
        let age = document.querySelector('div[id="roundup_infobox_age"]>p[class="data"]').innerText;
        let Overall_Ratings = document.querySelector('div[id="roundup_infobox_rating"]>p[class="data"]').innerText;
        let Global_Rank = document.querySelector('div[id="roundup_infobox_ranking"]>p[class="data"]').innerText;
        let Description = document.querySelector('div[itemprop="description"]').innerText;
        let image_urls = new Array;
        let images = document.getElementsByTagName("img");
        for(q = 0; q < images.length; q++){
            image_urls.push(images[q].src);
        }
    return{
        age,
        Overall_Ratings,
        Global_Rank,
        Description,
        image_urls
    }

    });
console.log(info);
await browser.close();

})();
