import Link from "next/link";
import Head from 'next/head'

export default function Courses() {
  return (
    <>
      <Head>
        <title>Lista de Cursos</title>
      </Head>
      <h1 className="text-3xl font-bold underline">
        Lista de Cursos2!
      </h1>

      <h2>
        <Link href="/">
          <a>Voltar para home</a>
        </Link>
      </h2>
    </>
  );
}
