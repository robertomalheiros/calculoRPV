import { NextResponse } from "next/server";
import buscaDados from "../components/BuscaPJE";

export async function POST(request, response) {
  try {
    const { processo, usuario, password } = await request.json();

    const Dados = await buscaDados(usuario, password, processo);

    const DadosJson = JSON.stringify(Dados);
    return NextResponse.json({ message: "OK", DadosJson }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
