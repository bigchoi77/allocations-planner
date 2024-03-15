import Person from 'src/components/Person/Person'

export const QUERY = gql`
  query FindPersonById($id: Int!) {
    person: person(id: $id) {
      id
      role
      name
      timeOff
      maxHoursPerWeek
      photo
      isOnVisa
      isOnTransition
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Person not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ person }) => {
  return <Person person={person} />
}
