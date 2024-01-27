import { Link, routes } from '@redwoodjs/router'

import People from 'src/components/Person/People'

export const QUERY = gql`
  query FindPeople {
    people {
      id
      role
      name
      timeOff
      maxHoursPerWeek
      photo
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No people yet. '}
      <Link to={routes.newPerson()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ people }) => {
  return <People people={people} />
}
