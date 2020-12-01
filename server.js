const puppeteer = require('puppeteer');
const j2c=require("json2csv").Parser;
const fs=require("fs");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.imdb.com/title/tt1729637/');
  //await page.screenshot({path: 'example.png'}); 
  const result = await page.evaluate(()=>{
    
    var moviename=document.querySelector(".title_wrapper>h1").innerText;
    var relesedate=document.querySelector("a[title='See more release dates']").innerText
var rating=document.querySelector("span[itemprop='ratingValue']").innerText
   return (
     {moviename,relesedate,rating}
   );

  })
const j22c= new j2c()
const csv=j22c.parse(result)
fs.writeFileSync("./imdb.csv",csv,"utf-8");

  console.log(result)
  
  await browser.close();
})();

