import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AllocationForm from 'src/components/Allocation/AllocationForm'

export const QUERY = gql`
  query EditAllocationById($id: Int!) {
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
const UPDATE_ALLOCATION_MUTATION = gql`
  mutation UpdateAllocationMutation($id: Int!, $input: UpdateAllocationInput!) {
    updateAllocation(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ allocation, people, projects }) => {
  const [updateAllocation, { loading, error }] = useMutation(
    UPDATE_ALLOCATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Allocation updated')
        navigate(routes.allocations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateAllocation({
      variables: {
        id,
        input: {
          endDate: input.endDate,
          hoursPerWeek: input.hoursPerWeek,
          loan: input.loan,
          personId: parseInt(input.personId),
          projectId: parseInt(input.projectId),
          startDate: input.startDate,
        },
      },
    })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Allocation {allocation?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <AllocationForm
          allocation={allocation}
          onSave={onSave}
          error={error}
          people={people}
          projects={projects}
          loading={loading}
        />
      </div>
    </div>
  )
}
