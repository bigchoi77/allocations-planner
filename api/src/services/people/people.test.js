import {
  people,
  person,
  createPerson,
  updatePerson,
  deletePerson,
} from './people'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('people', () => {
  scenario('returns all people', async (scenario) => {
    const result = await people()

    expect(result.length).toEqual(Object.keys(scenario.person).length)
  })

  scenario('returns a single person', async (scenario) => {
    const result = await person({ id: scenario.person.one.id })

    expect(result).toEqual(scenario.person.one)
  })

  scenario('creates a person', async () => {
    const result = await createPerson({
      input: {
        role: 'String',
        name: 'String',
        maxHoursPerWeek: 1417701.7543264348,
      },
    })

    expect(result.role).toEqual('String')
    expect(result.name).toEqual('String')
    expect(result.maxHoursPerWeek).toEqual(1417701.7543264348)
  })

  scenario('updates a person', async (scenario) => {
    const original = await person({ id: scenario.person.one.id })
    const result = await updatePerson({
      id: original.id,
      input: { role: 'String2' },
    })

    expect(result.role).toEqual('String2')
  })

  scenario('deletes a person', async (scenario) => {
    const original = await deletePerson({
      id: scenario.person.one.id,
    })
    const result = await person({ id: original.id })

    expect(result).toEqual(null)
  })
})
