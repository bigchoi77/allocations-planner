import { useState } from 'react'

import { useAuth } from 'src/auth'

const Navbar = () => {
  const { isAuthenticated, logIn } = useAuth()
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
        {isAuthenticated && (
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
        )}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isAuthenticated && (
                <button className="button is-light" onClick={logIn}>
                  Log in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
