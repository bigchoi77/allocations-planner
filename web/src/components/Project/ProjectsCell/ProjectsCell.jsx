import { Link, routes } from '@redwoodjs/router'

import Projects from 'src/components/Project/Projects'

export const QUERY = gql`
  query FindProjects {
    projects {
      id
      name
      confidence
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No projects yet. '}
      <Link to={routes.newProject()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ projects }) => {
  return <Projects projects={projects} />
}
