import './estilos.css';

const GameOver = ( {reiniciarJogo, win, pontuacao, record} ) => {
  return (
    <div className='pagina-game'>     
      
      {win && <h1 className='titulo'>PARABÉNS</h1>}
      {!win && <h1 className='titulo'>GAME OVER</h1>}

      <h2 className='pontuacao'>Sua pontuação foi de: <span>{pontuacao} pontos</span>!</h2>
      <h2 className='pontuacao'>O recorde é de: <span>{record} pontos</span>!</h2>

      <button onClick={reiniciarJogo}  className='botao'>REINICIAR</button>

    </div>
  )
}

export default GameOver
