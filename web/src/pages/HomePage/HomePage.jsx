// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import AllocationsCell from 'src/components/Allocation/AllocationsCell'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <AllocationsCell />
    </>
  )

  // return (
  //   <>
  //     <Metadata title="Home" description="Home page" />

  //     <div className="box margin--top">I&apos;m in a box.</div>
  //   </>
  // )
}

export default HomePage
