import puppeteer, { Page } from "puppeteer";

const chromeExecPaths = {
  win32: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  linux: "/usr/bin/google-chrome",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};
const exePath = chromeExecPaths[process.platform];

const options = {
  args: [],
  executablePath: exePath,
  headless: false,
};

let _page = Page | null;

async function getPage() {
  if (_page) {
    return _page;
  } else {
    const browser = await puppeteer.launch(options);
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
  await senha.type("B&r&sh!t1406");
  const entrar = await iframe.$("#kc-login");
  await entrar.click();
  await page.waitForNavigation();
  await page.waitForTimeout(3000);
  await page.click(
    "#divBas > div.col-sm-12.mb-20 > div.col-md-12.pt-20.pb-10.text-center > a"
  );
  await page.goto(
    "https://pje1g.trf1.jus.br/pje/Processo/ConsultaProcesso/listView.seam",
    { waitUntil: "networkidle0" }
  );
  await page.waitForTimeout(3000);
  //const input = await page.$$('div > div.value.col-sm-12 > div > input')

  //await page.type('div > div.value.col-sm-12 > div > input', "1014070-07.2023.4.01.3307");

  const inputs = await page.$$("input");
  let inputProc = "";
  for (const input of inputs) {

      await input.evaluate((node) =>
        node.getAttribute("onblur") === "apenasNumeros(this)"
          ? node.type("B&r&sh!t1406")
          : null

    );
  }
  await page.click(inputProc)
  /*
    //await page.type("input", "1014070-07.2023.4.01.3307");
    //await page.waitForTimeout(5000);
    //await page.click("#fPP\:searchProcessos");
    
    await page.evaluate(() => {
      //Extrai os detalhes básicos de cada diario
      let inputs = document.querySelector("input");
  
      let listaInputs = Array.from(inputs.children);
    
      console.log(listaInputs);
    })
   
  
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
