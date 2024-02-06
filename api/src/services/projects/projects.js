import { db } from 'src/lib/db'

export const projects = () => {
  return db.project.findMany()
}

export const project = ({ id }) => {
  return db.project.findUnique({
    where: { id },
  })
}

export const createProject = ({ input }) => {
  return db.project.create({
    data: input,
  })
}

export const updateProject = ({ id, input }) => {
  return db.project.update({
    data: input,
    where: { id },
  })
}

export const deleteProject = async ({ id }) => {
  // delete all allocations for project
  await db.allocation.deleteMany({
    where: { projectId: id },
  })

  return db.project.delete({
    where: { id },
  })
}

export const Project = {
  allocations: (_obj, { root }) => {
    return db.project.findUnique({ where: { id: root?.id } }).allocations()
  },
}
