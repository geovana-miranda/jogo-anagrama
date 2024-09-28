import { useState, useRef } from 'react';
import './estilos.css';

const Game = ( {rounds, letrasEmbaralhadas, pontuacao, verificarPalpite, cronometro, contadorPalavras} ) => {
  const [palavraPalpite, setPalavraPalpite ] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verificarPalpite(palavraPalpite);
    setPalavraPalpite('');
    inputRef.current.focus();
  }
    
  return (
    <div className='pagina-game'>

      <div className="cabecalho">
        <p>ROUND: <span>{contadorPalavras}/{rounds}</span> </p>
        <p>PONTOS: <span>{pontuacao}</span></p>
        <p>TEMPO: <span>{cronometro}</span> segundos</p>
      </div>

      <div className="container">
        {letrasEmbaralhadas.map((letra, i) =>(
          <div className='box-letras'  key={i}>
            <span className='letra'>{letra}</span>
          </div>
        ) )}  
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          <input
          type="text"
          name="letra"
          required
          onChange={ (e) => setPalavraPalpite(e.target.value) }
          value={palavraPalpite}
          ref={inputRef}
          placeholder='A palavra é...'/>          
        </label>
        <button >OK!</button>
      </form>


    </div>
  )
}

export default Game
