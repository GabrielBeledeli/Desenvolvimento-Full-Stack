"use client";

import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { User, Loader2, AlertCircle, Search } from "lucide-react";

//Contrato

interface UserData {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<UserData[]>([]); //dados do json
  const [loading, setLoading] = useState(true); //carregamento dos dados
  const [error, setError] = useState<string | null>(null); //erro na requisição api
  const [searchTerm, setSearchTerm] = useState(""); //termo de busca em tempo real
  const [debouncedSearch, setDebouncedSearch] = useState(""); //termo de busca com debounce
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null); //usuário selecionado

  //conexão com a api
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users",
        );

        //tratar erro
        if (!response.ok) throw new Error("Falha ao conectar com o servidor");
        // se der certo
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Erro desconhecido");
      } finally {
        setLoading(false); // Este bloco é executado sempre
      }
    };
    fetchUsers();
  }, []);

  // UseEffect para debounce - dispara console.log a cada letra e debounce de 500ms
  useEffect(() => {
    // Console.log em tempo real
    console.log("Letra digitada:", searchTerm);

    // Configura o debounce
    const debounceTimer = setTimeout(() => {
      console.log("Busca finalizada (após 500ms):", searchTerm);
      setDebouncedSearch(searchTerm);
    }, 500);

    // Cleanup para cancelar o timer anterior
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  //filtrar/buscar os dados (usa o termo debouncedizado para aplicar debounce)
  const filtro = users.filter((u) =>
      u.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
      <div className="p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Diretório de Usuários</h1>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Indica se está em debounce */}
            {searchTerm !== debouncedSearch && searchTerm && (
                <span className="text-xs text-yellow-600 font-semibold">
              Procurando...
            </span>
            )}
          </div>
          {searchTerm && (
              <p className="text-sm text-gray-600 mt-2">
                Resultados: {filtro.length}
              </p>
          )}
        </header>
        {/*Renderização Condicional */}
        {loading && (
            <div>
              <Loader2 className="animate-spin" />
              <p>Sincronizando dados...</p>
            </div>
        )}

        {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Lista de nomes */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Usuários</h2>
                <ul className="space-y-2">
                  {filtro.map((user) => (
                      <li key={user.id}>
                        <button
                            onClick={() => setSelectedUser(user)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                selectedUser?.id === user.id
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                          {user.name}
                        </button>
                      </li>
                  ))}
                </ul>
              </div>

              {/* Card do usuário selecionado */}
              <div className="md:col-span-2">
                {selectedUser ? (
                    <Card className="sticky top-4">
                      <div className="p-6">
                        {/* Avatar do usuário */}
                        <div className="flex flex-col items-center mb-6">
                          <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`}
                              alt={selectedUser.name}
                              className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500">
                          </img>
                          <h2 className="text-2xl font-bold text-center">
                            {selectedUser.name}
                          </h2>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-600">
                              Email
                            </h3>
                            <p className="text-lg">{selectedUser.email}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-600">
                              Empresa
                            </h3>
                            <p className="text-lg">{selectedUser.company.name}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                ) : (
                    <div className="text-center text-gray-500 py-12">
                      <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Selecione um usuário para ver os detalhes</p>
                    </div>
                )}
              </div>
            </div>
        )}
      </div>
  );
}