import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const toggleState = (e) => {
    e.preventDefault()
    setOpen(!isOpen)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className={isOpen ? 'navbar-burger is-active' : 'navbar-burger'}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
          href="/"
          onClick={toggleState}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbar"
        className={isOpen ? 'navbar-menu is-active' : 'navbar-menu'}
      >
        <div className="navbar-start">
          <a className="navbar-item" href="/allocations">
            Allocations
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" href="/people">
              People
            </a>

            <div className="navbar-dropdown">
              <a className="navbar-item" href="/people/new">
                Add someone
              </a>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" href="/projects">
              Projects
            </a>

            <div className="navbar-dropdown">
              <a className="navbar-item" href="/projects/new">
                Create a project
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
