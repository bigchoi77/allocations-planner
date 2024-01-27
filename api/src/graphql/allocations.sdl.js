export const schema = gql`
  type Allocation {
    id: Int!
    person: Person!
    personId: Int!
    project: Project!
    projectId: Int!
    startDate: String!
    endDate: String!
    hoursPerWeek: Float!
    loan: Boolean!
  }

  type Query {
    allocations: [Allocation!]! @requireAuth
    allocation(id: Int!): Allocation @requireAuth
  }

  input CreateAllocationInput {
    personId: Int!
    projectId: Int!
    startDate: String!
    endDate: String!
    hoursPerWeek: Float!
    loan: Boolean!
  }

  input UpdateAllocationInput {
    personId: Int
    projectId: Int
    startDate: String
    endDate: String
    hoursPerWeek: Float
    loan: Boolean
  }

  type Mutation {
    createAllocation(input: CreateAllocationInput!): Allocation! @requireAuth
    updateAllocation(id: Int!, input: UpdateAllocationInput!): Allocation!
      @requireAuth
    deleteAllocation(id: Int!): Allocation! @requireAuth
  }
`
