import Layout from '../../../components/layout'
import { withProtected } from '../../../hooks/route'

function Lessons({ course }) {
  return (
    <Layout>
      <div className="relative z-10 my-8 w-full rounded-lg bg-white-100 p-8 shadow-xl dark:bg-black-200">
        {course &&
          course?.lessons.map((l) => {
            return (
              <div key={l?.section + l?.lesson}>
                <h2>{l?.section}</h2>
                <h3>{l?.lesson}</h3>
                <ReactMarkdown>{l?.markdown}</ReactMarkdown>
              </div>
            )
          })}
      </div>
    </Layout>
  )
}

export default Lessons
