import Layout from '../../components/layout'

import { withProtected } from '../../hooks/route'

function Lessons({ lesson }) {
  return (
    <Layout>
      <h1>As lições vão aqui</h1>
    </Layout>
  )
}

export default withProtected(Lessons)
