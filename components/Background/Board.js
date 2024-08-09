'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function Board() {
  const [numRows, setNumRows] = useState(8)
  const [numColumns, setNumColumns] = useState(8)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  useEffect(() => {
    const adjustSize = () => {
      const container = document.getElementById('board-container')
      const containerHeight = container ? container.clientHeight : window.innerHeight
      const containerWidth = container ? container.clientWidth : window.innerWidth
      const rowHeight = 50
      const columnWidth = 50
      setNumRows(Math.ceil(containerHeight / rowHeight))
      setNumColumns(Math.ceil(containerWidth / columnWidth))
    }

    window.addEventListener('resize', adjustSize)
    adjustSize()

    return () => window.removeEventListener('resize', adjustSize)
  }, [])

  const boardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    background: isLight ? '#ffffff' : 'radial-gradient(circle, #223828, #080708)',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
  }

  const lineStyle = {
    display: 'flex',
    flex: 1,
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    flexDirection: 'row',
  }

  const subdivisionStyle = {
    borderBottom: '0.5px solid #1d1e1c',
    borderRight: '0.5px solid #1d1e1c',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    flexGrow: 1,
  }

  return (
    <div id="board-container" style={boardStyle}>
      {!isLight &&
        Array.from({ length: numRows }).map((_, rowIndex) => (
          <div key={rowIndex} style={lineStyle}>
            {Array.from({ length: numColumns }).map((_, colIndex) => (
              <div key={colIndex} style={subdivisionStyle} />
            ))}
          </div>
        ))}
    </div>
  )
}
