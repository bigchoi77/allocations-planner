import { db } from 'src/lib/db'

export const people = () => {
  return db.person.findMany()
}

export const person = ({ id }) => {
  return db.person.findUnique({
    where: { id },
  })
}

export const createPerson = ({ input }) => {
  return db.person.create({
    data: input,
  })
}

export const updatePerson = ({ id, input }) => {
  return db.person.update({
    data: input,
    where: { id },
  })
}

export const deletePerson = async ({ id }) => {
  // delete all allocations for person
  await db.allocation.deleteMany({
    where: { personId: id },
  })

  return db.person.delete({
    where: { id },
  })
}

export const Person = {
  allocations: (_obj, { root }) => {
    return db.person.findUnique({ where: { id: root?.id } }).allocations()
  },
}
