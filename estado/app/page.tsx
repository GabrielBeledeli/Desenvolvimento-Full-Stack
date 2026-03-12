'use client';

import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader } from './components/ui/card';
import { User, Image as ImageIcon, Save } from 'lucide-react';

interface UserProfile {
    name: string;
    role: string;
    avatarUrl: string;
}

export default function PerfilPage(){
    const [profile, setProfile] = useState<UserProfile>({
        name: 'Gabriel Hul',
        role: 'DBA',
        avatarUrl: 'https://avatars.githubusercontent.com/u/125688042?s=400&u=9577cb383ce89eb3d32316172e5fb9d5e2bcce93&v=4'
    });

    //Handler Genérico
    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const {name, value} = e.target;
        setProfile((prevState)=>(
            {
                ...prevState, //Copia tudo que já existia
                [name]: value // Sobrescreve apenas o campo que mudou
            }
        ));
    };
    const handleSubmit = (e: React.FormEvent)=> {
        e.preventDefault();
        alert("Perfil atualizado com sucesso!")
    }
    return (
      <div>
          <Card>
              <CardHeader title={'Editor de Perfil'} description={'Altere as informações a baixo.'}></CardHeader>
              <CardContent>
                  <form onSubmit={handleSubmit}>
                      <label>Name Completo</label>
                      <input name={'name'} value={profile.name} onChange={handlerChange} type={'text'}/>

                      <label>Cargo/Função</label>
                      <input name={'role'} value={profile.role} onChange={handlerChange} type={'text'}/>

                      <label>URL da Foto</label>
                      <input name={'avatarUrl'} value={profile.avatarUrl} onChange={handlerChange} type={'text'}/>

                      <Button type={'submit'}>Salvar Perfil</Button>
                  </form>
              </CardContent>
          </Card>
      </div>
    );
}