import Allocation from 'src/components/Allocation/Allocation'

export const QUERY = gql`
  query FindAllocationById($id: Int!) {
    allocation: allocation(id: $id) {
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
      confidence
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Allocation not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ allocation, people, projects }) => {
  return (
    <Allocation allocation={allocation} people={people} projects={projects} />
  )
}
