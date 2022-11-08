

const randomUseragent = require('random-useragent');

    //Enable stealth mode
    const puppeteer = require('puppeteer-extra')
    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(StealthPlugin());
    const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';

let cpfconsultado = '459.729.040-04'// informe o cpf, com todos os caracteres

const consultaCpf = async (cpf)=>{

    const browser = await puppeteer.launch({
        headless:false
    });
    const userAgent = randomUseragent.getRandom();
  
    const page = await browser.newPage();
    const UA = userAgent || USER_AGENT;
    await page.setUserAgent(UA);
    await page.goto("https://www.situacao-cadastral.com/");
    await page.waitFor('input[name="doc"]');
    await page.type('input[name="doc"]',cpf,{delay: 500});//ira digitar automatico
    await page.keyboard.press('Enter');
    await page.waitFor('#corpo > tbody > tr:nth-child(2) >td > span > a')
    //await page.screenshot({path:'consultaCPF-${cpf}.png'});
   
    let nameel = await page.$(' #resultado > span.dados.nome');
    const existsname = await page.$eval(' #resultado > span.dados.nome', () => true).catch(() => false);
    let stateel = await page.$('#resultado > span.dados.situacao > span');
   let name = '#####';
    if(existsname) {

         name = await nameel.evaluate(el => el.textContent);
   
    }
    
    
    let state = await stateel.evaluate(el => el.textContent);
    state = state.replace("Situação:","");
    console.log(name,state);


    await browser.close();
    return {'Nome' : name, 'CPF': cpf, 'Status': state};// fecha navegador
}

module.exports = {consultaCpf};
