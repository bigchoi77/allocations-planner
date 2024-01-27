import NewAllocation from '../NewAllocation/NewAllocation'

export const QUERY = gql`
  query FindPeopleAndProjects {
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

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ people, projects }) => {
  return <NewAllocation people={people} projects={projects} />
}
