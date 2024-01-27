import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  SelectField,
  TextField,
  UrlField,
  Submit,
} from '@redwoodjs/forms'

const PersonForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.person?.id)
  }

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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.person?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="role"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Role
        </Label>

        <SelectField
          name="role"
          defaultValue={props.person?.role}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            validate: {
              matchesInitialValue: (value) => {
                return value !== 'Please select a role' || 'Select Role'
              },
            },
          }}
        >
          <option>Select Role</option>
          <option value="delivery-lead">Delivery Lead</option>
          <option value="designer">Designer</option>
          <option value="engineer">Engineer</option>
          <option value="pm">Product Manager</option>
        </SelectField>
        <FieldError name="role" className="rw-field-error" />

        {/* <Label
          name="timeOff"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Time off
        </Label>

        <TextField
          name="timeOff"
          defaultValue={props.person?.timeOff}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="timeOff" className="rw-field-error" /> */}

        <Label
          name="maxHoursPerWeek"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max hours per week
        </Label>

        <NumberField
          name="maxHoursPerWeek"
          defaultValue={props.person?.maxHoursPerWeek}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          min="0"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="maxHoursPerWeek" className="rw-field-error" />

        <Label
          name="photo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Photo (URL)
        </Label>

        <UrlField
          name="photo"
          defaultValue={props.person?.photo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="photo" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PersonForm
