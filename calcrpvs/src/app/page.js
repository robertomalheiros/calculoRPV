"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
//import BuscaDados from "./components/BuscaDados";
//import Datepicker from "react-tailwindcss-datepicker";

export default function Home() {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const [form, setForm] = useState({
    total: "",
    valorAnterior: 0,
    valorAtual: 0,
    parcelasAnteriores: 0,
    parcelasAtuais: 0,
    DIB: "",
    DIP: "",
    principal: "",
    percentual: "",
    juros: "",
    tjuros: "",
    vAdvogado: "",
    vAutor: "",
    jurosAutor: "",
    jurosAdvogado: "",
  });
  const [formProc, setFormProc] = useState({
    processo: "",
    usuario: "",
    password: "",
  });

  /* const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
 
    
}*/

  function handleValores(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleProc(e) {
    setFormProc({ ...formProc, [e.target.name]: e.target.value });
  }

  function handleLimpar(e) {
    setForm({
      total: "",
      valorAnterior: 0,
      valorAtual: 0,
      parcelasAnteriores: 0,
      parcelasAtuais: 0,
      DIB: "",
      DIP: "",
      principal: "",
      percentual: "",
      juros: "",
      vAdvogado: "",
      vAutor: "",
      jurosAutor: "",
      jurosAdvogado: "",
      vtotal: "",
    });
  }
  async function handleBuscaDados(e) {
    e.preventDefault();
    let dados = "";
    try {
      // dados = await BuscaDados(formProc)
    } catch (error) {
      console.log("Erro ao buscar os dados!");
    }
  }

  function handleCalcular(e) {
    e.preventDefault();

    const { total, DIB, DIP } = form;

    let valorPrincAutor = 0;
    let valorPrincAdv = 0;
    let valorJurosAutor = 0;
    let valorJurosAdv = 0;
    let valorTotal = 0;
    let tPrincipal = parseFloat(
      form.principal.trim().replace(/\./g, "").replace(",", ".")
    );
    let tPercentual = parseInt(form.percentual.trim());

    let tJuros = parseFloat(
      form.juros.trim().replace(/\./g, "").replace(",", ".")
    );

    if (tPrincipal !== " " && tPercentual !== " " && tJuros !== " ") {
      valorPrincAutor = tPrincipal * (1 - tPercentual / 100);
      valorPrincAdv = (tPercentual / 100) * tPrincipal;
      valorJurosAutor = tJuros * (1 - tPercentual / 100);
      valorJurosAdv = (tPercentual / 100) * tJuros;
      valorTotal =tPrincipal+ tJuros;
    }

    const dataAtual = new Date().toISOString().substring(0, 10);
    const lDataAtual = dataAtual.trim().split("-");
    const lDIB = DIB.trim().split("/");
    const lDIP = DIP.trim().split("/");
    let exerDIP =
      lDIP[2] < lDataAtual[0]
        ? (parseInt(lDIP[lDIP.length - 1]) - lDIB[lDIB.length - 1]) * 13 +
          (parseInt(lDIP[1]) - 13)
        : parseInt(lDIP[1]);

    let exerDIB =
      lDIB[2] < lDataAtual[0]
        ? (parseInt(lDIP[lDIP.length - 1]) - lDIB[lDIB.length - 1]) * 13 + 1
        : parseInt(lDIP[1]);
    const vtotal = parseFloat(total.replace(/\./g, "").replace(",", "."));
    let pAnteriores = 0;
    let pAtuais = 0;

    if (lDIB[2] < lDataAtual[0] && lDIP[2] < lDataAtual[0]) {
      pAnteriores = exerDIB + exerDIP;
      pAtuais = 0;
    } else if (lDIB[2] >= lDataAtual[0] && lDIP[2] >= lDataAtual[0]) {
      pAnteriores = 0;
      pAtuais = parseInt(lDIP[1]) - parseInt(lDIB[1]) + 1;
    } else if (lDIB[2] < lDataAtual[0] && lDIP[2] >= lDataAtual[0]) {
      pAnteriores = exerDIB - parseInt(lDIB[1]);
      pAtuais = exerDIP;
    }

    const totalAnterior = parseFloat(
      (vtotal / (pAtuais + pAnteriores)) * pAnteriores
    );
    const totalvAtual = parseFloat(
      (vtotal / (pAtuais + pAnteriores)) * pAtuais
    );

    setForm({
      ...form,
      parcelasAnteriores: pAnteriores,
      parcelasAtuais: pAtuais,
      valorAnterior: totalAnterior.toFixed(2),
      valorAtual: totalvAtual.toFixed(2),
      vAutor: valorPrincAutor.toFixed(2),
      vAdvogado: valorPrincAdv.toFixed(2),
      jurosAutor: valorJurosAutor.toFixed(2),
      jurosAdvogado: valorJurosAdv.toFixed(2),
      vtotal: valorTotal.toFixed(2),
    });
    //console.log(form);
  }

  return (
    <main className="flex min-h-screen flex-rol items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex-col items-center md:gap-6">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            CÁLCULO RPVs
          </p>
          <br></br>

          <form>
            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  DIB:
                </p>
                <input
                  type="text"
                  value={form.DIB}
                  onChange={handleValores}
                  name="DIB"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  DIP:
                </p>
                <input
                  type="text"
                  value={form.DIP}
                  onChange={handleValores}
                  name="DIP"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Total:{" "}
                </p>

                <input
                  type="text"
                  value={form.total}
                  onChange={handleValores}
                  name="total"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            </div>
            <br></br>
            <p className="block text-gray-700 text-sm font-bold mb-2">
              CÁLCULO DOS HONORÁRIOS{" "}
            </p>
            <br></br>
            <div className="grid md:grid-cols-4 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                {/* CÓDIGO PARA INSERIR OS DADOS DE DESTAQUE DE HONORÁRIOS////////////////////////////////////////////////////////////////////////////*/}
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Principal:
                </p>
                <input
                  type="text"
                  value={form.principal}
                  onChange={handleValores}
                  name="principal"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Honorários %:
                </p>
                <input
                  type="text"
                  value={form.percentual}
                  onChange={handleValores}
                  name="percentual"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Juros:
                </p>
                <input
                  type="text"
                  value={form.juros}
                  onChange={handleValores}
                  name="juros"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Total:{" "}
                </p>

                <input
                  type="text"
                  value={form.vtotal}
                  onChange={handleValores}
                  name="vtotal"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />

                {/* PREENCHIMENTO DO RRA///////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
              </div>
            </div>{" "}
            <br></br>
            <p className="block text-gray-700 text-sm font-bold mb-2">
              Preenchimento da RRA:
            </p>
            <br></br>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  value={form.valorAnterior}
                  onChange={handleValores}
                  name="valorAnterior"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Valor Anterior
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  value={form.parcelasAnteriores}
                  onChange={handleValores}
                  name="parcelasAnteriores"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Parcelas anteriores
                </label>
              </div>{" "}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  value={form.valorAtual}
                  onChange={handleValores}
                  name="valorAtual"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Valor Atual
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  value={form.parcelasAtuais}
                  onChange={handleValores}
                  name="parcelasAtuais"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Parcelas atuais
                </label>
              </div>
              {/* PREENCHIMENTO DO BENEFICIÁRIO /////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
              <p className="block text-gray-700 text-sm font-bold mb-2">
                Preenchimento Beneficiário:
              </p>
              <br></br>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  value={form.vAutor}
                  onChange={handleValores}
                  name="vAutor"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Valor principal do autor
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  value={form.jurosAutor}
                  onChange={handleValores}
                  name="juAutor"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Juros Autor
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  value={form.vAdvogado}
                  onChange={handleValores}
                  name="vAdvogado"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Valor principal do advogado
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  value={form.jurosAdvogado}
                  onChange={handleValores}
                  name="jurosAdvogado"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Juros Advogados
                </label>
              </div>
            </div>{" "}
            {/* <div className="relative z-0 w-full mb-6 group">
   
            <Datepicker
                value={value}
                onChange={handleValueChange}
            />
</div>*/}
            <div className="gap-x-10">
              <button
                type="submit"
                onClick={handleCalcular}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Calcular
              </button>{" "}
              <button
                type="submit"
                onClick={handleLimpar}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Limpar
              </button>
            </div>
          </form>

          <br></br>
          <br></br>

          {/* CÓDIGO DA CONSULTA AO PJE /////////////////////////////////////////////////////////////////////////////////////////////*/}
        </div>
      </div>
      <div className="w-full max-w-xs">
        <p className="block text-gray-700 text-sm font-bold mb-2">
          CONSULTAR DADOS DO PROCESSO:
        </p>

        <br></br>

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="processo"
            >
              Processo:
            </label>
            <input
              value={formProc.processo}
              onChange={handleProc}
              name="processo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="processo"
              type="text"
              placeholder="Processo"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="usuario"
            >
              Usuário do PJE
            </label>
            <input
              value={formProc.usuario}
              onChange={handleProc}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="usuario"
              type="text"
              name="usuario"
              placeholder="Usuário"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              name="password"
              value={formProc.password}
              onChange={handleProc}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Senha"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={handleBuscaDados}
            >
              Consultar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
