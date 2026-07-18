import { useCallback, useId, useState } from 'react'
import './SettingsForm.css'

const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

const DEFAULT_VALUES = {
  fullName: '',
  email: '',
  theme: 'system',
  notifications: true,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateValues(values) {
  const errors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  const email = values.email.trim()
  if (!email) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  return errors
}

function SettingsForm({ initialValues = {}, onSubmit }) {
  const formId = useId()
  const [values, setValues] = useState({ ...DEFAULT_VALUES, ...initialValues })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const fieldIds = {
    fullName: `${formId}-full-name`,
    email: `${formId}-email`,
    theme: `${formId}-theme`,
    notifications: `${formId}-notifications`,
  }

  const errorIds = {
    fullName: `${formId}-full-name-error`,
    email: `${formId}-email-error`,
  }

  const showError = (field) => Boolean(touched[field] && errors[field])

  const applyFieldValidation = useCallback((name, nextValues) => {
    if (name !== 'fullName' && name !== 'email') {
      return
    }

    const fieldErrors = validateValues(nextValues)
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name],
    }))
  }, [])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setValues((prev) => {
      const nextValues = { ...prev, [name]: nextValue }

      if (touched[name]) {
        applyFieldValidation(name, nextValues)
      }

      return nextValues
    })
  }

  const handleBlur = (event) => {
    const { name, value } = event.target

    setTouched((prev) => ({ ...prev, [name]: true }))
    applyFieldValidation(name, { ...values, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateValues(values)
    setErrors(nextErrors)
    setTouched({
      fullName: true,
      email: true,
      theme: true,
      notifications: true,
    })

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSubmit?.({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      theme: values.theme,
      notifications: values.notifications,
    })
  }

  return (
    <section className="settings-form-card" aria-labelledby={`${formId}-title`}>
      <form className="settings-form" onSubmit={handleSubmit} noValidate>
        <header className="settings-form__header">
          <h2 id={`${formId}-title`} className="settings-form__title">
            Settings
          </h2>
          <p className="settings-form__subtitle">
            Update your profile and preferences.
          </p>
        </header>

        <div
          className={`settings-form__field${showError('fullName') ? ' settings-form__field--invalid' : ''}`}
        >
          <label htmlFor={fieldIds.fullName}>
            Full Name <span className="settings-form__required">*</span>
          </label>
          <input
            id={fieldIds.fullName}
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            placeholder="Jane Doe"
            aria-required="true"
            aria-invalid={showError('fullName')}
            aria-describedby={showError('fullName') ? errorIds.fullName : undefined}
          />
          {showError('fullName') && (
            <p id={errorIds.fullName} className="settings-form__error" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        <div
          className={`settings-form__field${showError('email') ? ' settings-form__field--invalid' : ''}`}
        >
          <label htmlFor={fieldIds.email}>
            Email <span className="settings-form__required">*</span>
          </label>
          <input
            id={fieldIds.email}
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            inputMode="email"
            placeholder="jane@example.com"
            aria-required="true"
            aria-invalid={showError('email')}
            aria-describedby={showError('email') ? errorIds.email : undefined}
          />
          {showError('email') && (
            <p id={errorIds.email} className="settings-form__error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="settings-form__field">
          <label htmlFor={fieldIds.theme}>Theme</label>
          <select
            id={fieldIds.theme}
            name="theme"
            value={values.theme}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {THEME_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="settings-form__field settings-form__field--checkbox">
          <input
            id={fieldIds.notifications}
            name="notifications"
            type="checkbox"
            checked={values.notifications}
            onChange={handleChange}
          />
          <label htmlFor={fieldIds.notifications}>Enable Notifications</label>
        </div>

        <button type="submit" className="settings-form__submit">
          Save Settings
        </button>
      </form>
    </section>
  )
}

export default SettingsForm
