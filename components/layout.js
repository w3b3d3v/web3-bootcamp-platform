import Footer from './Footer';
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <>
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  )
}
