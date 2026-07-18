import { useState } from 'react'
import './SettingsForm.css'

const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

function SettingsForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    theme: 'system',
    notifications: true,
  })

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Replace with API call or localStorage persistence
    console.log('Saved settings:', form)
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h2>Settings</h2>

      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          autoComplete="name"
        />
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="form-field">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          name="theme"
          value={form.theme}
          onChange={handleChange}
        >
          {THEME_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field form-field--checkbox">
        <label htmlFor="notifications">
          <input
            id="notifications"
            name="notifications"
            type="checkbox"
            checked={form.notifications}
            onChange={handleChange}
          />
          Enable notifications
        </label>
      </div>

      <button type="submit" className="settings-form__save">
        Save
      </button>
    </form>
  )
}

export default SettingsForm