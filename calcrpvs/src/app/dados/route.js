

import { NextResponse } from 'next/server'
import buscaDados from "../components/BuscaPJE"
export async function GET() {
  const res = await (buscaDados())
  const data = await res.json()
 
  return NextResponse.json({ data })
}