import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/22.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '' ) {
      return
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)

  }

  return (
    <div id="page-auth">
      <aside>
      <img 
        src={illustrationImg} 
        alt="Ilustração simbolizando perfuntas e respostas" 
      />
      <strong>Crie suas salas ao-vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeaks" />
           <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"  
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link> </p>
        </div>
      </main>
    </div>
  )
}