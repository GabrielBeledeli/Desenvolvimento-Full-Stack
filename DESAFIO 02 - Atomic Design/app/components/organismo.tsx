import {Button, Input} from "./atomos";


interface FooterChildren{
    CopyRight: string;
    ClassName: string;
}

export function FooterFormat({ CopyRight, ClassName  }: FooterChildren) {
    return (
        <footer className={ClassName}>
            <p>{CopyRight}</p>
            <Button text={"Sair do Sistema"} className="mt-2 text-blue-400 hover:underline"></Button>
        </footer>
    )
}

interface HeaderChildren{
    Title: string;
    classNameTitle: string;
    classNameHeader: string;
}

export function Header({ Title, classNameTitle, classNameHeader }: HeaderChildren) {
    return(
        <header className={classNameHeader}>
            <h1 className={classNameTitle}>{Title}</h1>
            <div className="flex gap-2">
                <Input placeholder="Buscar..." />
                <Button text="Buscar" className={"bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all"}/>
            </div>
        </header>
    )
}



