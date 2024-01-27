import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag } from 'src/lib/formatters'

const DELETE_ALLOCATION_MUTATION = gql`
  mutation DeleteAllocationMutation($id: Int!) {
    deleteAllocation(id: $id) {
      id
    }
  }
`

const Allocation = ({ allocation }) => {
  const [deleteAllocation] = useMutation(DELETE_ALLOCATION_MUTATION, {
    onCompleted: () => {
      toast.success('Allocation deleted')
      navigate(routes.allocations())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete allocation ' + id + '?')) {
      deleteAllocation({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Allocation {allocation.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{allocation.id}</td>
            </tr>
            <tr>
              <th>Person id</th>
              <td>{allocation.personId}</td>
            </tr>
            <tr>
              <th>Project id</th>
              <td>{allocation.projectId}</td>
            </tr>
            <tr>
              <th>Start date</th>
              <td>{allocation.startDate}</td>
            </tr>
            <tr>
              <th>End date</th>
              <td>{allocation.endDate}</td>
            </tr>
            <tr>
              <th>Hours per week</th>
              <td>{allocation.hoursPerWeek}</td>
            </tr>
            <tr>
              <th>Loan</th>
              <td>{checkboxInputTag(allocation.loan)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAllocation({ id: allocation.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(allocation.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Allocation
