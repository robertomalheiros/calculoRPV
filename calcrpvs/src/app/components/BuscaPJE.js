import puppeteer, { Page } from "puppeteer";

const chromeExecPaths = {
  win32: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  linux: "/usr/bin/chromium",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};
const exePath = chromeExecPaths[process.platform];

const options = {
  args: [],
  executablePath: exePath,
  headless: true,
};

let _page = Page | null;

let browser = null;

async function getPage() {
  if (_page) {
    return _page;
  } else {
    browser = await puppeteer.launch(options);
    _page = await browser.newPage();
    return _page;
  }
}

async function buscaDados() {
  const page = await getPage();
  const url = "https://pje1g.trf1.jus.br/pje/login.seam";
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.setViewport({ width: 1080, height: 1024 });
  console.log(`2-Abrindo Página: ${url}`);
  await page.waitForTimeout(3000);
  const iframeHandle = await page.$("#ssoFrame");
  const iframe = await iframeHandle.contentFrame();
  const username = await iframe.$("#username");
  await username.type("02806488559");
  const senha = await iframe.$("#password");
  await senha.type("B&r&sh!t13");
  const entrar = await iframe.$("#kc-login");
  await entrar.click();
  await page.waitForNavigation();
  await page.waitForTimeout(1000);
  await page.click(
    "#divBas > div.col-sm-12.mb-20 > div.col-md-12.pt-20.pb-10.text-center > a"
  );
  await page.goto(
    "https://pje1g.trf1.jus.br/pje/Processo/ConsultaProcesso/listView.seam",
    { waitUntil: "networkidle0" }
  );
  await page.waitForTimeout(1000);
  await page.type("#fPP\\:numeroProcesso\\:numeroSequencial", "1004358");
  await page.waitForTimeout(30);
  await page.type("#fPP\\:numeroProcesso\\:numeroDigitoVerificador", "90");
  await page.waitForTimeout(30);
  await page.type("#fPP\\:numeroProcesso\\:Ano", "2023");
  await page.waitForTimeout(30);
  //await page.type("#fPP\\:numeroProcesso\\:ramoJustica", "4");
  //await page.waitForTimeout(30);
  //await page.type("#fPP\\:numeroProcesso\\:respectivoTribunal", "01");
  //await page.waitForTimeout(30);
  await page.type("#fPP\\:numeroProcesso\\:NumeroOrgaoJustica", "3307");
  await page.waitForTimeout(30);
  await page.click("#fPP\\:searchProcessos");

  await page.waitForTimeout(2000);

  /*
     await page.evaluate(() => {
      //Extrai os detalhes básicos de cada diario
      let inputs = document.querySelector("input");
       let listaInputs = Array.from(inputs.children);
       console.log(listaInputs);
    })*/

  await page.evaluate(() => {
    //Extrai os detalhes básicos de cada diario
    let listaLinks = document.querySelector("#fPP\\:processosTable");

    //console.log(listaLinks)
    let linksArray = Array.from(listaLinks.children);

    // Percorra cada diario e obtenha seus detalhes
    let linksInfo = linksArray.map((link) => {
      let td = link.querySelector("td > a");

      if (td) {
        // Ative o evento onclick simulando um clique
        td.click();
      } else {
        console.error("Elemento não encontrado ou não possui evento onclick.");
      }
    });
  });


  console.log("Entrando na página do processo")
  const paginas = await browser.pages();
  const novaPagina = paginas[paginas.length - 1];


  await page.evaluate(() => {
    //Extrai os detalhes básicos de cada diario
    let listaLinks = document.querySelector("divTimeLine");

    //console.log(listaLinks)
    let linksArray = Array.from(listaLinks.children);

    // Percorra cada diario e obtenha seus detalhes
    let linksInfo = linksArray.map((link) => {

      document.querySelector("");
      console.log(link)

    });
  });

 

  // Capture o HTML da nova página
  const html = await novaPagina.content();

  // Agora você tem o HTML da nova página na variável 'html'
  //console.log(html);
}

export default buscaDados;
