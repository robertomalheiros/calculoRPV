import buscaDados from "../components/BuscaPJE"
import { NextResponse } from "next/server";


export async function GET(request) {
    const response = await buscaDados()
    return NextResponse.json(response)
}