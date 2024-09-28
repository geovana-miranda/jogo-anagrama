import { listaPalavras } from './Palavras/palavras';
import { useEffect, useState } from 'react';
import Home from './Components/Home';
import Game from './Components/Game';
import GameOver from './Components/GameOver';

const paginas = [
  {id: 1, nome: 'home'},
  {id: 2, nome: 'game'},
  {id: 3, nome: 'gameover'}
]

function App() {
  const tempo = 15;
  
  const [paginaJogo, setPaginaJogo] = useState(paginas[0].nome);
  const [palavras] = useState(listaPalavras);
  const [palavraSorteada, setPalavraSorteada] = useState('');
  const [letrasEmbaralhadas, setLetrasEmbaralhadas] = useState([]);
  const [pontuacao, setPontuacao] = useState(0);
  const [palavrasJaSorteadas, setPalavrasJaSorteadas] = useState([]);
  const [cronometro, setCronometro] = useState(tempo);
  const [contadorPalavras, setContadorPalavras] = useState(1);
  const [win, setWin] = useState(false);
  const rounds = palavras.length;
  const pontoMax = rounds * 10;

  const [record, setRecord] = useState(0);


  useEffect(() => {

    if (letrasEmbaralhadas.length > 0) {

      const interval = setInterval(() => {
        setCronometro((actualCronometro) => {
          if (actualCronometro > 0) {
            return actualCronometro - 1;
          } else {
            clearInterval(interval); 
            gameOver();
            return 0;
          }
        });
      }, 1000);
    
      return () => clearInterval(interval); 
    }
    

  }, [letrasEmbaralhadas]);
  
  useEffect ( () => {
    if (win) {
      gameOver();
    }    
  }, [win])

  useEffect ( () => {
    if (pontuacao > record) {
      setRecord(pontuacao);
    }
  },[pontuacao] )

  const sortearPalavra = () => {
    let palavra = '';

    if (palavrasJaSorteadas.length < palavras.length) {
      do {

        palavra = palavras[Math.floor(Math.random() * palavras.length)];
      } while (palavrasJaSorteadas.includes(palavra));
  
        setPalavrasJaSorteadas( (prevPalavras => [...prevPalavras, palavra]) );
      
      return palavra;
    } 

  }

  const embaralharLetras = (lista) =>{
    let indice = lista.length;

    while (indice) {
      const indiceAleatorio = Math.floor(Math.random() * indice--);
      [lista[indice], lista[indiceAleatorio]] = 
          [lista[indiceAleatorio], lista[indice]];
    }
  }

  const iniciarJogo = () => {
    setWin(false);
    const palavra = sortearPalavra();

    const palavraMaiuscula = palavra.toUpperCase();
    let letrasPalavra = palavraMaiuscula.split('');

    setCronometro(tempo);
    embaralharLetras(letrasPalavra);  
    setPalavraSorteada(palavraMaiuscula);
    setLetrasEmbaralhadas(letrasPalavra);

    setPaginaJogo(paginas[1].nome);   
  }

  const gameOver = () => {
    setPaginaJogo(paginas[2].nome);
    limparStates();
  }

  const limparStates = () => {
    setContadorPalavras(1);
    setPalavraSorteada('');
    setLetrasEmbaralhadas([]);
    setPalavrasJaSorteadas([]);
  }


  const reiniciarJogo = () => {
    setPontuacao(0);
    setPaginaJogo(paginas[0].nome);
  }

  const verificarPalpite = (palavraPalpite) => {

    palavraPalpite = palavraPalpite.toUpperCase();

    if (palavraPalpite === palavraSorteada) {

        setPontuacao( (actualPontuacao) => actualPontuacao + 10 );
        setContadorPalavras( (actualContadorPalavras) => actualContadorPalavras + 1)
              
        if (palavrasJaSorteadas.length === palavras.length) {
          setWin(true);
        } else {        
        iniciarJogo();     
        }
    
    } else {
      alert("Hmmm, acho que não é essa. Tente novamente.");
    }
  }


  return (
    <div>
      {paginaJogo === 'home' && <Home iniciarJogo={iniciarJogo}/>}
      {paginaJogo === 'game' && <Game
      rounds={rounds}
      letrasEmbaralhadas={letrasEmbaralhadas}
      pontuacao={pontuacao}
      verificarPalpite={verificarPalpite}
      cronometro={cronometro}
      contadorPalavras={contadorPalavras}
      />}
      {paginaJogo === 'gameover' && <GameOver
      reiniciarJogo={reiniciarJogo}
      win={win}
      pontuacao={pontuacao}
      record={record}
      />}
    </div>

  )
}

export default App
