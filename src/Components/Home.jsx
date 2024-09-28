import './estilos.css';

const nomeJogo = ['A', 'N', 'A', 'G', 'R', 'A', 'M', 'A'];


const Home = ( {iniciarJogo} ) => {


  return (
    <div className='pagina-principal'>

      <h1 className='titulo'>LETRIX</h1>

      <div className='container'>
      {nomeJogo.map( (letra, i) => (
         
        <div className='box-letras' key={i}>
          <span className='letra'>{letra}</span>        
        </div>
      ) )}
      </div>
      
      <h2 className='subtitulo'>Desembaralhe as letras antes que o tempo termine</h2>

      <button className='botao' onClick={iniciarJogo}>JOGAR</button>
    </div>
  )
}

export default Home
