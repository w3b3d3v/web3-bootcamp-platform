"use client"

import Linha from "./Linha"
import { useState, useEffect } from "react"
import styles from "./Tabuleiro.module.css"
import { useTheme } from 'next-themes'

export default function Tabuleiro() {
    const [numLinhas, setNumLinhas] = useState(8) // Número padrão de linhas
    const [numColunas, setNumColunas] = useState(8) // Número padrão de colunas
    
      const { theme } = useTheme()
  const isLight = theme === 'light'

    useEffect(() => {
        const ajustarTamanho = () => {
            const alturaJanela = window.innerHeight
            const larguraJanela = window.innerWidth
            const alturaLinha = 30 // Altura presumida de cada linha
            const larguraColuna = 50 // Largura presumida de cada coluna
            setNumLinhas(Math.floor(alturaJanela / alturaLinha))
            setNumColunas(Math.floor(larguraJanela / larguraColuna))
        }

        window.addEventListener("resize", ajustarTamanho)
        ajustarTamanho() // Chama ao carregar o componente

        return () => window.removeEventListener("resize", ajustarTamanho)
    }, [])

    return (
        <div className={styles.tabuleiro} 
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            zIndex: 1,
            background: isLight ? '#ffffff' : 'radial-gradient(circle, #223828, #080708)'
        }}>
            
            {!isLight && Array.from({ length: numLinhas }).map((_, linhaIndex) => (
        <Linha key={linhaIndex} numColunas={numColunas} />
      ))}
        </div>
    )
}
