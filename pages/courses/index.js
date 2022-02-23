import Link from "next/link";
import Head from 'next/head'
import Layout from '../../components/layout'

export default function Courses() {
  return (
    <Layout>
      <Head>
        <title>Lista de Cursos</title>
      </Head>
      <h1 className="text-3xl font-bold underline">
        Lista de Cursos2!
      </h1>

      <h2 className="text-2xl font-bold">
        <Link href="/">
          <a>Voltar para home</a>
        </Link>
      </h2>
    </Layout>
  );
}
