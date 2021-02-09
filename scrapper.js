const puppeteer = require("puppeteer");
(async () => {
    const readline = require('readline-sync');
    var userinput = 0;
    userinput = readline.question(`Enter the url\n`);
    let appUrl = userinput;
    //launch the browser
    let browser = await puppeteer.launch({headless: true});
    //open up a new page
    let page = await browser.newPage();
    //direct to the specific url and tells the browser to wait until it is loaded
    await page.goto(appUrl, {waitUntil: 'networkidle2'});
    //evaluates the current page
    let info = await page.evaluate(()=>{
        let age = document.querySelector('div[id="roundup_infobox_age"]>p[class="data"]').innerText;
        let overallRatings = document.querySelector('div[id="roundup_infobox_rating"]>p[class="data"]').innerText;
        let globalRank = document.querySelector('div[id="roundup_infobox_ranking"]>p[class="data"]').innerText;
        let description = document.querySelector('div[itemprop="description"]').innerText;
        let imageUrls = [];
        let images = document.getElementsByTagName("img");
        for(q = 0; q < images.length; q++){
            imageUrls.push(images[q].src);
        }
    return{
        age,
        overallRatings,
        globalRank,
        description,
        imageUrls
    }

    });
console.log(info);
await browser.close();

})();
