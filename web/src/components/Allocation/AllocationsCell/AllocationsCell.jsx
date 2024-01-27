import { Link, routes } from '@redwoodjs/router'

import Allocations from 'src/components/Allocation/Allocations'

export const QUERY = gql`
  query FindAllocations {
    allocations: allocations {
      id
      personId
      projectId
      startDate
      endDate
      hoursPerWeek
      loan
    }
    people: people {
      id
      role
      name
      timeOff
      maxHoursPerWeek
      photo
    }
    projects: projects {
      id
      name
      startDate
      endDate
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No allocations yet. '}
      <Link to={routes.newAllocation()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ allocations, people, projects }) => {
  return (
    <Allocations
      allocations={allocations}
      people={people}
      projects={projects}
    />
  )
}
