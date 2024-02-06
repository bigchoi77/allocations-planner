import Project from 'src/components/Project/Project'

export const QUERY = gql`
  query FindProjectById($id: Int!) {
    project: project(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Project not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ project }) => {
  return <Project project={project} />
}
