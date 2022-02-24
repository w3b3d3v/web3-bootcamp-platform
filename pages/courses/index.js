import Link from "next/link";
import Image from "next/image";
import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllCourses } from '../../lib/courses'

export default function Courses({ allCourses }) {
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

      <ul className="grid">
        {allCourses.map((c) => {
          return (
            <li key={c.id} className="card">
              <Link href={"/courses/" + c.id}>
                <a>
                  {c.title}
                </a>
              </Link>
              <p><Image src={c.image_url} width="200%" height="200%"></Image></p>
            </li>
          )
        })}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const allCourses = await getAllCourses()
  return {
    props: {
      allCourses
    }
  }
}

