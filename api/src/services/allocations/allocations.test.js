import {
  allocations,
  allocation,
  createAllocation,
  updateAllocation,
  deleteAllocation,
} from './allocations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('allocations', () => {
  scenario('returns all allocations', async (scenario) => {
    const result = await allocations()

    expect(result.length).toEqual(Object.keys(scenario.allocation).length)
  })

  scenario('returns a single allocation', async (scenario) => {
    const result = await allocation({ id: scenario.allocation.one.id })

    expect(result).toEqual(scenario.allocation.one)
  })

  scenario('creates a allocation', async (scenario) => {
    const result = await createAllocation({
      input: {
        personId: scenario.allocation.two.personId,
        projectId: scenario.allocation.two.projectId,
        startDate: 'String',
        endDate: 'String',
        hoursPerWeek: 8821052.925420627,
        loan: true,
      },
    })

    expect(result.personId).toEqual(scenario.allocation.two.personId)
    expect(result.projectId).toEqual(scenario.allocation.two.projectId)
    expect(result.startDate).toEqual('String')
    expect(result.endDate).toEqual('String')
    expect(result.hoursPerWeek).toEqual(8821052.925420627)
    expect(result.loan).toEqual(true)
  })

  scenario('updates a allocation', async (scenario) => {
    const original = await allocation({
      id: scenario.allocation.one.id,
    })
    const result = await updateAllocation({
      id: original.id,
      input: { startDate: 'String2' },
    })

    expect(result.startDate).toEqual('String2')
  })

  scenario('deletes a allocation', async (scenario) => {
    const original = await deleteAllocation({
      id: scenario.allocation.one.id,
    })
    const result = await allocation({ id: original.id })

    expect(result).toEqual(null)
  })
})
