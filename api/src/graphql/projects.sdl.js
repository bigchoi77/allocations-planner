export const schema = gql`
  type Project {
    id: Int!
    name: String!
    startDate: String!
    endDate: String!
    allocations: [Allocation]!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: Int!): Project @requireAuth
  }

  input CreateProjectInput {
    name: String!
    startDate: String!
    endDate: String!
  }

  input UpdateProjectInput {
    name: String
    startDate: String
    endDate: String
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: Int!, input: UpdateProjectInput!): Project! @requireAuth
    deleteProject(id: Int!): Project! @requireAuth
  }
`
