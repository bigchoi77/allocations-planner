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
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Allocation not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ allocation }) => {
  return <Allocation allocation={allocation} />
}
