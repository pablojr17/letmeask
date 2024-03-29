import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/22.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

export function Home() {
  const [roomCode, setRoomCode] = useState('')
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();
  
  async function handleCreateRoom() {
    if(!user) {
     await signInWithGoogle()
    }
      history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
      event.preventDefault();
  
      if (roomCode.trim() === '' ) {
        return;
      }
  
      const roomRef = await database.ref(`rooms/${roomCode}`).get();
      
      if (!roomRef.exists()){
        alert('Room does not exists');
        return
      }

      if(roomRef.val().endedAt) {
        alert('Room already closed');
        return
      }
  
      history.push(`/rooms/${roomCode}`)
  
    }
  

  return (
    <div id="page-auth">
      <aside>
      <img src={illustrationImg} alt="Ilustração simbolizando perfuntas e respostas" />
      <p>São as dúvidas que tornam as pessoas sábias.</p>
      <span>Entre numa sala e tire suas duvidas em tempo real...</span>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeaks" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala" 
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}