export const schema = gql`
  type Project {
    id: Int!
    name: String!
    confidence: Int
    allocations: [Allocation]!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: Int!): Project @requireAuth
  }

  input CreateProjectInput {
    name: String!
    confidence: Int
  }

  input UpdateProjectInput {
    name: String
    confidence: Int
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: Int!, input: UpdateProjectInput!): Project! @requireAuth
    deleteProject(id: Int!): Project! @requireAuth
  }
`
