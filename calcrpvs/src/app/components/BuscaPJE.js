import puppeteer, { Page } from 'puppeteer'
//import chromiumOptions from './chromiumOptions'

const chromeExecPaths = {
  win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
};
const exePath = chromeExecPaths[process.platform];

const options = {
  args: [],
  executablePath: exePath,
  headless: false,
};

let _page = Page | null 


async function getPage() {
    if (_page) {
        return _page
    } else {

        const browser = await puppeteer.launch(options)
        _page = await browser.newPage()
        return _page
    }

}



async function buscaDados() {

    const page = await getPage()
    const url = "https://pje1g.trf1.jus.br/pje/login.seam";
    await page.goto(url, { waitUntil: "networkidle2" });
    console.log(`2-Abrindo Página: ${url}`);

    const usuario = "#username";
    //await page.waitForSelector(usuario);
    const senha = "#password";
   //await page.waitForSelector(senha);
    await page.type(usuario, "02806488559");
    await page.type(senha, "B&r&sh!t13");

    //const selecionar = "#selOrgao";
    //await page.waitForSelector(selecionar);
    //await page.click(selecionar);
    //await page.type("#selOrgao", "SJBA");
     const acessar = "#btnEntrar";
   await page.waitForSelector(acessar);
    await page.click("#btnEntrar");

    console.log("Entrei no PJE");
  /*
    let dou_detalhes = await page.evaluate(() => {
      //Extrai os detalhes básicos de cada diario
      let listaDOU = document.querySelector(".lista-de-dou");
  
      let diarios = Array.from(listaDOU.children);
  
      // Percorra cada diario e obtenha seus detalhes
      let diario_info = diarios.map((diarios) => {
        let titulo = diarios.querySelector(".title").innerHTML;
        let orgao = diarios.querySelector(".tag").textContent;
        let imagem = diarios.querySelector(".col-2 > a > img").src;
        let pdf = diarios.querySelector(".col-2 > a").href;
        let dataPublicacao = diarios.querySelector(".date").textContent;
  
        return { titulo, orgao, imagem, pdf, dataPublicacao };
      });
      return diario_info;
    }); */
}



export default buscaDados;