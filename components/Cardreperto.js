import React from "react"

type RepertoProps = {
  nome: string
  descrizione: string
  onClick?: () => void
}

export default function CardReperto({ nome, descrizione, onClick }: RepertoProps) {
  return (
    <div
      onClick={onClick}
      className="border rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-all bg-white"
    >
      <h3 className="font-bold text-lg">{nome}</h3>
      <p className="text-sm text-gray-600 mt-1">{descrizione}</p>
    </div>
  )
}
