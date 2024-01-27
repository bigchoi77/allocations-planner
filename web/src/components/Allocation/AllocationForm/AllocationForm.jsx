import {
  Form,
  FormError,
  FieldError,
  Label,
  DateField,
  NumberField,
  CheckboxField,
  SelectField,
  Submit,
} from '@redwoodjs/forms'

import { getFormattedDate } from 'src/lib/formatters'

const AllocationForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.allocation?.id)
  }
  const people = props?.people
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))

  const projects = props?.projects
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="personId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Person
        </Label>

        <SelectField
          name="personId"
          defaultValue={props.allocation?.personId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            validate: {
              matchesInitialValue: (value) => {
                return value !== 'Please select a person' || 'Select Person'
              },
            },
          }}
        >
          <option>Select Person</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </SelectField>
        <FieldError name="personId" className="rw-field-error" />

        <Label
          name="projectId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Project
        </Label>

        <SelectField
          name="projectId"
          defaultValue={props.allocation?.projectId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            validate: {
              matchesInitialValue: (value) => {
                return value !== 'Please select a project' || 'Select Project'
              },
            },
          }}
        >
          <option>Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </SelectField>

        <FieldError name="projectId" className="rw-field-error" />

        <Label
          name="startDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start date
        </Label>

        <DateField
          name="startDate"
          defaultValue={getFormattedDate(props.allocation?.startDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startDate" className="rw-field-error" />

        <Label
          name="endDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End date
        </Label>

        <DateField
          name="endDate"
          defaultValue={getFormattedDate(props.allocation?.endDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endDate" className="rw-field-error" />

        <Label
          name="hoursPerWeek"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hours per week
        </Label>

        <NumberField
          name="hoursPerWeek"
          defaultValue={props.allocation?.hoursPerWeek}
          className="rw-input"
          min="0"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="hoursPerWeek" className="rw-field-error" />

        <Label
          name="loan"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Loan
        </Label>

        <CheckboxField
          name="loan"
          defaultChecked={props.allocation?.loan}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="loan" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AllocationForm
