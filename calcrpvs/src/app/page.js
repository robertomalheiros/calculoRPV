"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
//import BuscaDados from "./components/BuscaDados";
import { Datepicker } from "flowbite-react";

export default function Home() {
  const [form, setForm] = useState({
    total: "",
    valorAnterior: 0,
    valorAtual: 0,
    parcelasAnteriores: 0,
    parcelasAtuais: 0,
    dataAnt: "",
    dataAtua: "",
  });
  const [formProc, setFormProc] = useState({
    processo: "",
    usuario: "",
    password: "",
  });

  function handleValores(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleProc(e) {
    setFormProc({ ...formProc, [e.target.name]: e.target.value });
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

    const {
      total,
      valorAnterior,
      valorAtual,
      parcelasAnteriores,
      parcelasAtuais,
    } = form;

    const vtotal = parseFloat(total.replace(/\./g, "").replace(",", "."));
    const vAnterior = parseFloat(valorAnterior);
    const vAtual = parseFloat(valorAtual);
    const pAnteriores = parseInt(parcelasAnteriores);
    const pAtuais = parseInt(parcelasAtuais);

    const totalAnterior = parseFloat(
      (vtotal / (pAtuais + pAnteriores)) * pAnteriores
    );
    const totalvAtual = parseFloat(
      (vtotal / (pAtuais + pAnteriores)) * pAtuais
    );

    console.log(vtotal);

    setForm({
      ...form,
      valorAnterior: totalAnterior.toFixed(2),
      valorAtual: totalvAtual.toFixed(2),
    });
  }

  return (
    <main className="flex min-h-screen flex-rol items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex-col items-center md:gap-6">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            Cálculo Rural
          </p>
          <br></br>
          <br></br>
          <br></br>
          <form>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
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
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Total
                </label>
              </div>
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
                <p className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Em construção
                </p>
                <Datepicker
                  onChange={handleValores}
                  labelClearButton="Limpar"
                  labelTodayButton="Hoje"
                  language="pt-BR"
                  name="dataAnt"
                />
                <p className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Em construção
                </p>
                <Datepicker
                  onChange={handleValores}
                  labelClearButton="Limpar"
                  labelTodayButton="Hoje"
                  language="pt-BR"
                  name="dataAtua"
                />
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
            </div>
            <button
              type="submit"
              onClick={handleCalcular}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Calcular
            </button>
          </form>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div className="w-full max-w-xs">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            CONSULTAR DADOS DO PROCESSO:
          </p>
          <p className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Em construção
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
      </div>
    </main>
  );
}
