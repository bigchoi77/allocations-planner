import Navbar from 'src/components/Navbar/Navbar'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container margin--top">{children}</div>
    </>
  )
}

export default DefaultLayout
