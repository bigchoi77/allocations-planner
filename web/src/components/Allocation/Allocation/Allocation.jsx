import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag } from 'src/lib/formatters'
import { getPersonById, getProjectById } from 'src/lib/functions'

const DELETE_ALLOCATION_MUTATION = gql`
  mutation DeleteAllocationMutation($id: Int!) {
    deleteAllocation(id: $id) {
      id
    }
  }
`

const Allocation = ({ allocation, people, projects }) => {
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
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Person</th>
              <td>{getPersonById(allocation.personId, people).name}</td>
            </tr>
            <tr>
              <th>Project</th>
              <td>{getProjectById(allocation.projectId, projects).name}</td>
            </tr>
            <tr>
              <th>Start date</th>
              <td>
                {new Date(allocation.startDate).toLocaleDateString('en-SG')}
              </td>
            </tr>
            <tr>
              <th>End date</th>
              <td>
                {new Date(allocation.endDate).toLocaleDateString('en-SG')}
              </td>
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
