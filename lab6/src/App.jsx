import { useState, useEffect, useRef } from 'react'
import './App.css'

const imagenes = [
  {url: 'https://i.pinimg.com/originals/18/7a/88/187a88cd5839db1862198ec1cbc2fce4.jpg',
  id: '1'},
  {url: 'https://i.pinimg.com/originals/5a/7d/eb/5a7debf2ef778403d6fc32b5d5178b1a.jpg',
  id: '2'},
  {url: 'https://i.pinimg.com/originals/15/f9/22/15f9224dafad59161dba39cdb43d4436.jpg',
  id: '3'},
  {url: 'https://i.pinimg.com/originals/b8/00/54/b80054fa3bb314aded401e228abd5363.jpg',
  id: '4'},
  {url: 'https://i.pinimg.com/originals/8a/04/f8/8a04f8ee29d8f62d92d6954fbb77abaa.jpg',
  id: '5'},
  {url: 'https://i.pinimg.com/originals/d7/d2/3e/d7d23eda946d12eb7e11dec84b04928a.jpg',
  id: '6'},
  {url: 'https://i.pinimg.com/originals/c9/1a/e9/c91ae94a58fcaf0330de9f321ff30853.jpg',
  id: '7'},
  {url: 'https://i.pinimg.com/originals/5f/4f/5d/5f4f5dca5fb29bc259fd2291b6d2093c.jpg',
  id: '8'},
  {url: 'https://i.pinimg.com/originals/18/7a/88/187a88cd5839db1862198ec1cbc2fce4.jpg',
  id: '1'},
  {url: 'https://i.pinimg.com/originals/5a/7d/eb/5a7debf2ef778403d6fc32b5d5178b1a.jpg',
  id: '2'},
  {url: 'https://i.pinimg.com/originals/15/f9/22/15f9224dafad59161dba39cdb43d4436.jpg',
  id: '3'},
  {url: 'https://i.pinimg.com/originals/b8/00/54/b80054fa3bb314aded401e228abd5363.jpg',
  id: '4'},
  {url: 'https://i.pinimg.com/originals/8a/04/f8/8a04f8ee29d8f62d92d6954fbb77abaa.jpg',
  id: '5'},
  {url: 'https://i.pinimg.com/originals/d7/d2/3e/d7d23eda946d12eb7e11dec84b04928a.jpg',
  id: '6'},
  {url: 'https://i.pinimg.com/originals/c9/1a/e9/c91ae94a58fcaf0330de9f321ff30853.jpg',
  id: '7'},
  {url: 'https://i.pinimg.com/originals/5f/4f/5d/5f4f5dca5fb29bc259fd2291b6d2093c.jpg',
  id: '8'},
]

const Card = ({ tarjeta }) => {
  return (
    <div className='card'>
      <div className='front' style={{backgroundImage:`url(${tarjeta['url']})`}}></div>
      <div className='back' id={tarjeta['id']}></div>
    </div>
  )
}

const WinnerDialog = ({ onClose }) => {
  const diaglogRef = useRef()

  useEffect(() => {
    diaglogRef.current.removeAttribute('open')
    diaglogRef.current.showModal()
  }, [])

  const handleRestart = () => {
    diaglogRef.current.close()
    window.location = '21808/lab6/'
  }

  return (
    <dialog className="winnerDialog" ref={diaglogRef} onClose={onClose}>
      <div className="dialogContainer">
        <h2 className="dialog-title">¡Juego terminado!</h2>
        <img src='https://i.pinimg.com/originals/6d/05/93/6d059323c3770d4b2dbd78b8db3540a1.jpg' alt="trofeo" />
        <button className="restart" onClick={handleRestart}>Reiniciar</button>
      </div>
    </dialog>

)
}

function App() {
  const [tarjetas, setTarjetas] = useState([])
  const [flippedCard, setFlippedCard] = useState(null)
  const [contador, setContador] = useState(0)
  const [terminado, setTerminado] = useState(false)
  
  const shuffleArray = (array) => {
    for(let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  useEffect(() => {
    shuffleArray(imagenes)
    setTarjetas(imagenes)
    console.log(imagenes)
  }, [])

  const handleClick = (event) => {
    const parent = event.target.parentElement
    if(parent.className === 'card'){
      parent.style.transform = 'rotateY(180deg)'
      setFlippedCard(event.target)
      if(flippedCard != null)
        compare(event.target)
        console.log(flippedCard)
    }
  }  

  const compare = (currentCard)=>{
    if(flippedCard.attributes['id'].value === currentCard.attributes['id'].value){
      setContador((old) => old + 1)
      console.log('iguales', contador)
    }else{
      console.log('diferentes')
      setTimeout(() => {
        flippedCard.parentElement.style.transform = 'rotateY(0deg)'
        currentCard.parentElement.style.transform = 'rotateY(0deg)'
      }, 2000)
    }
    setFlippedCard(null)
  }

  useEffect(() => {
    console.log('aqui: ', terminado?.valueOf())
  }, [terminado])

  if(contador === 8) {
    console.log('Juego terminado')
    setTimeout(() => {
      setTerminado(true)
    }, 100);
  }

  const onCloseDialog = () => {
    setTerminado(false)
  }

  return (
    <div className='app'>
      {terminado && <WinnerDialog onClose={onCloseDialog}/>}
      <h1 className='titulo'>KIMETSU NO YAIBA MEMORY</h1>
      <div className='container' onClick={handleClick}>
        {
          tarjetas.map((tarjeta) => (
            <Card tarjeta={tarjeta}/>
          ))
        }
      </div>
    </div>
  )
}

export default App
