export const schema = gql`
  type Person {
    id: Int!
    role: String!
    name: String!
    timeOff: String
    maxHoursPerWeek: Float!
    allocations: [Allocation]!
    photo: String
    isOnVisa: Boolean
    isOnTransition: Boolean
  }

  type Query {
    people: [Person!]! @requireAuth
    person(id: Int!): Person @requireAuth
  }

  input CreatePersonInput {
    role: String!
    name: String!
    timeOff: String
    maxHoursPerWeek: Float!
    photo: String
    isOnVisa: Boolean
    isOnTransition: Boolean
  }

  input UpdatePersonInput {
    role: String
    name: String
    timeOff: String
    maxHoursPerWeek: Float
    photo: String
    isOnVisa: Boolean
    isOnTransition: Boolean
  }

  type Mutation {
    createPerson(input: CreatePersonInput!): Person! @requireAuth
    updatePerson(id: Int!, input: UpdatePersonInput!): Person! @requireAuth
    deletePerson(id: Int!): Person! @requireAuth
  }
`
