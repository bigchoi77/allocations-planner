import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AllocationForm from 'src/components/Allocation/AllocationForm'

const CREATE_ALLOCATION_MUTATION = gql`
  mutation CreateAllocationMutation($input: CreateAllocationInput!) {
    createAllocation(input: $input) {
      id
    }
  }
`

const NewAllocation = ({ people, projects }) => {
  const [createAllocation, { loading, error }] = useMutation(
    CREATE_ALLOCATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Allocation created')
        navigate(routes.allocations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createAllocation({
      variables: {
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
        <h2 className="rw-heading rw-heading-secondary">New Allocation</h2>
      </header>
      <div className="rw-segment-main">
        <AllocationForm
          onSave={onSave}
          loading={loading}
          error={error}
          people={people}
          projects={projects}
        />
      </div>
    </div>
  )
}

export default NewAllocation
