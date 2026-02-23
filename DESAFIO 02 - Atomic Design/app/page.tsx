// Desenvolvido Por: Gabriel Beledeli Hul; Vinicius Gabriel Buskievicz
import { Card } from "./components/moleculas";
import { FooterFormat } from "./components/organismo";
import { Header } from "./components/organismo";

export default function ComunidadePage() {
  return (
      <div className="min-h-screen bg-gray-900 p-8 text-white">

        <Header Title={"Membros do Grupo"} classNameTitle={"text-3xl font-bold"} classNameHeader={"flex justify-between items-center mb-10"}></Header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card nome={"Ana Silva"} cargo={"Full-stack Developer"} descricao={"Especialista em React e Node.js. Adora café e Docker."}></Card>

          <Card nome={"Bruno Costa"} cargo={"UI/UX Designer"} descricao={"Focado em acessibilidade e design systems escaláveis."}></Card>

          <Card nome={"Carla Dias"} cargo={"DevOps Engineer"} descricao={"Mestre em Kubernetes e automação de pipelines CI/CD."}></Card>

        </main>
      <FooterFormat CopyRight={"© 2026 - Engenharia de Software - Full-Stack Class"} ClassName={"mt-12 text-center text-gray-500 text-xs"}></FooterFormat>
      </div>
  );
}