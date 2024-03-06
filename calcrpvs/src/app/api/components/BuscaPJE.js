import { PT_Mono } from "next/font/google";

import * as dotenv from "dotenv";
import { NextResponse } from "next/server";

let puppeteer;
let browser;
dotenv.config();

async function launchBrowser() {
  console.log(`Variável de ambiente: ${process.env.AWS_LAMBDA_FUNCTION_VERSION}`)
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        // AWS Lambda
        const chromium = require("@sparticuz/chromium")
        puppeteer = require("puppeteer-core");
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });
        console.log("AWS");
    } else if (process.env.DOCKER) {
        // Docker
        puppeteer = require("puppeteer");
        browser = await puppeteer.launch({
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
            executablePath:
                process.env.NODE_ENV === "production"
                    ? process.env.PUPPETEER_EXECUTABLE_PATH
                    : puppeteer.executablePath(),
        });
        console.log("Docker");
    } else {
        // Local development
        puppeteer = require("puppeteer");
        browser = await puppeteer.launch(
          {
            headless: false,
        }
        );
        console.log("Local");
    }
}



async function buscaDados(usuario, password, processo) {
  console.log(`Processo: ${processo}`);

  let dadosFecht = {
    sentenca: [],
    contestacao: [],
    DIB: "",
    DIP: "",
    valor: "",
  };
  try {
    await launchBrowser().catch(console.error);
    const page = await browser.newPage();
    const url = "https://pje1g.trf1.jus.br/pje/login.seam";
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.setViewport({ width: 1080, height: 1024 });
    console.log(`2-Abrindo Página: ${url}`);
    await page.waitForTimeout(3000);
    const iframeHandle = await page.$("#ssoFrame");
    const iframe = await iframeHandle.contentFrame();
    const username = await iframe.$("#username");

    await username.type(usuario);
    const senha = await iframe.$("#password");
    await senha.type(password);
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
    const proc = processo.replace(/[-.]/g, "");

    let numeroSequencial = proc.substring(0, 7);
    let numeroDigitoVerificador = proc.substring(7, 9);
    let ano = proc.substring(9, 13);

    await page.waitForTimeout(1000);
    await page.type(
      "#fPP\\:numeroProcesso\\:numeroSequencial",
      numeroSequencial
    );
    await page.waitForTimeout(30);
    await page.type(
      "#fPP\\:numeroProcesso\\:numeroDigitoVerificador",
      numeroDigitoVerificador
    );
    await page.waitForTimeout(30);
    await page.type("#fPP\\:numeroProcesso\\:Ano", ano);
    await page.waitForTimeout(30);
    //await page.type("#fPP\\:numeroProcesso\\:ramoJustica", "4");
    //await page.waitForTimeout(30);
    //await page.type("#fPP\\:numeroProcesso\\:respectivoTribunal", "01");
    //await page.waitForTimeout(30);
    await page.type("#fPP\\:numeroProcesso\\:NumeroOrgaoJustica", "3307");
    await page.waitForTimeout(30);
    await page.click("#fPP\\:searchProcessos");
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      //Extrai os detalhes básicos de cada
      let listaLinks = document.querySelector("#fPP\\:processosTable");

      //console.log(listaLinks)
      let linksArray = Array.from(listaLinks.children);

      // Percorra cada e obtenha seus detalhes
      let linksInfo = linksArray.map((link) => {
        let td = link.querySelector("td > a");

        if (td) {
          // Ative o evento onclick simulando um clique
          td.click();
        } else {
          console.error(
            "Elemento não encontrado ou não possui evento onclick."
          );
        }
      });
    });

    console.log("Entrando na página do processo");
    await page.waitForTimeout(3000);
    const paginas = await browser.pages();
    const pagProcesso = paginas[paginas.length - 1];
    await pagProcesso.waitForTimeout(1000);
    const anteriorPagina = paginas[paginas.length - 2];
    await pagProcesso.waitForTimeout(1000);
    const pagAbout = paginas[0];
    await pagProcesso.waitForTimeout(2000);
    await pagAbout.close();
    await pagProcesso.waitForTimeout(1000);
    await anteriorPagina.close();

    console.log("Página do processo aberta");
    await pagProcesso.waitForTimeout(2000);
    let documentos = [];
    async function buscaDocs(pagProcesso, doc) {
      const tituloDoc = await pagProcesso.$$eval(
        ".anexos > a",
        (options, doc) => {
          titulo = "";
          options.find((option) => {
            if (option.textContent.includes(doc)) {
              // Ative o evento onclick simulando um clique
              option.click();
              console.log(`${option.textContent.split("-")[1]} Aberta!`);
              titulo = `${option.textContent.split("-")[1]}`;
            }
          });
          return titulo.trim();
        },
        doc
      );
      await pagProcesso.waitForTimeout(3000);
      const frame =
        doc.toLowerCase() === "contestação"
          ? pagProcesso
              .frames()
              .find((frame) => frame.name() === "frameBinario")
          : pagProcesso.frames().find((frame) => frame.name() === "frameHtml");

      const seletor =
        doc.toLowerCase() === "contestação"
          ? "table > tbody > tr > td"
          : "body > p > span";

      const conteudoDoc = await frame.$$eval(
        seletor,
        (element, doc) => {
          let conteudo = "";
          const paragrafos = element.map((el) => {
            return el.textContent;
          });
          //console.log(paragrafos)

          const grupos = [];
          let grupo = [];

          for (let i = 0; i < paragrafos.length; i++) {
            grupo.push(paragrafos[i]);
            if (grupo.length === 2) {
              grupos.push(grupo);
              grupo = [];
            }
          }
          if (grupo.length > 0) {
            grupos.push(grupo);
          }

          //console.log(grupos)
          conteudo = doc.toLowerCase() === "contestação" ? grupos : paragrafos;
          //console.log(`Conteudo dentro do evalFrame: ${conteudo}`);
          return conteudo;
        },
        doc
      );
      documentos.push({ titulo: tituloDoc, conteudo: conteudoDoc });

      return { titulo: tituloDoc, conteudo: conteudoDoc };
    }

    const contestacao = await buscaDocs(pagProcesso, "Contestação");
    const sentenca = await buscaDocs(pagProcesso, "Sentença");

    if (sentenca.titulo === "Sentença Tipo B") {
      dadosFecht.sentenca = sentenca;
      dadosFecht.contestacao = contestacao;
      const contestFiltro = contestacao.conteudo.filter((cont) =>
        cont[0].includes("DIB") ||
        cont[0].includes("DIP") ||
        cont[0].includes("VALORES ATRASADOS")
          ? cont
          : null
      );

      contestFiltro.forEach((cont) => {
        if (cont[0].includes("DIB")) {
          const dib = cont[1].trim().split("(")[0];
          dadosFecht.DIB = dib;
        } else if (cont[0].includes("DIP")) {
          const dip = cont[1].trim().split("(")[0];
          dadosFecht.DIP = dip;
        } else if (cont[0].includes("VALORES ATRASADOS")) {
          const regex = /\d{1,3}(?:\.\d{3})*(?:,\d{2})/g;
          const correspondencias = cont[1].match(regex);
          dadosFecht.valor = correspondencias[0];
        }
      });
    }
    //await console.log(dadosFecht)

    //console.log(sentenca, contestacao);

    //COMO PASSAR ARGUMENTOS PARA O EVAL
    //const three = await page.evaluate((a, b) => {return 1 + 2;}, 1, 2);

    console.log("Fechando o browser");

    await pagProcesso.close();
    return dadosFecht;
  } catch (error) {
    console.log(error);
  }
}

export default buscaDados;
