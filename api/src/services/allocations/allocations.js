import { db } from 'src/lib/db'

export const allocations = () => {
  return db.allocation.findMany()
}

export const allocation = ({ id }) => {
  return db.allocation.findUnique({
    where: { id },
  })
}

export const createAllocation = ({ input }) => {
  return db.allocation.create({
    data: input,
  })
}

export const updateAllocation = ({ id, input }) => {
  return db.allocation.update({
    data: input,
    where: { id },
  })
}

export const deleteAllocation = ({ id }) => {
  return db.allocation.delete({
    where: { id },
  })
}

export const Allocation = {
  person: (_obj, { root }) => {
    return db.allocation.findUnique({ where: { id: root?.id } }).person()
  },
  project: (_obj, { root }) => {
    return db.allocation.findUnique({ where: { id: root?.id } }).project()
  },
}
