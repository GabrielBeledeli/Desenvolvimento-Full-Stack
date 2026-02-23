interface CardChildren{
    nome: string;
    cargo: string;
    descricao: string;
}

export function Card({ nome, cargo, descricao }: CardChildren) {
    return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full" />
            <div>
                <h2 className="text-xl font-semibold">{nome}</h2>
                <p className="text-gray-400 text-sm">{cargo}</p>
            </div>
        </div>
        <p className="text-gray-300 text-sm mb-4">{descricao}</p>

        <button className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-md text-sm font-medium">Ver Perfil</button>
    </div>
    )
}