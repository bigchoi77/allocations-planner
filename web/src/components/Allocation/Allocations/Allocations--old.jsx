import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Allocation/AllocationsCell'
import { checkboxInputTag, truncate } from 'src/lib/formatters'

const DELETE_ALLOCATION_MUTATION = gql`
  mutation DeleteAllocationMutation($id: Int!) {
    deleteAllocation(id: $id) {
      id
    }
  }
`

const AllocationsList = ({ allocations, people, projects }) => {
  const getPersonById = (id) => {
    return people.filter((person) => person.id === id)[0]
  }
  const getProjectById = (id) => {
    return projects.filter((project) => project.id === id)[0]
  }
  const [deleteAllocation] = useMutation(DELETE_ALLOCATION_MUTATION, {
    onCompleted: () => {
      toast.success('Allocation deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete allocation ' + id + '?')) {
      deleteAllocation({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Person</th>
            <th>Role</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Hours per week</th>
            <th>Loan</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map((allocation) => (
            <tr key={allocation.id}>
              <td>{truncate(getProjectById(allocation.projectId).name)}</td>
              <td>{truncate(getPersonById(allocation.personId).name)}</td>
              <td>{truncate(getPersonById(allocation.personId).role)}</td>
              <td>
                {truncate(
                  new Date(allocation.startDate).toLocaleDateString('en-SG')
                )}
              </td>
              <td>
                {truncate(
                  new Date(allocation.endDate).toLocaleDateString('en-SG')
                )}
              </td>
              <td>{truncate(allocation.hoursPerWeek)}</td>
              <td>{checkboxInputTag(allocation.loan)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.allocation({ id: allocation.id })}
                    title={'Show allocation ' + allocation.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAllocation({ id: allocation.id })}
                    title={'Edit allocation ' + allocation.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete allocation ' + allocation.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(allocation.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllocationsList
