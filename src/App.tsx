import { useState, useRef } from "react";
import './App.css';

function App() {
  type InputField = {
    name: string,
    type: string,
    label: string
  }

  type FormData = {
    name: string,
    email: string,
    password: string,
    isAccepted: boolean
  }

  const inputFields: InputField[] = [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password' },
  ];

  const refs = useRef(inputFields.map(() => useRef<HTMLInputElement>(null)));
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    isAccepted: false
  });

  const [errors, setErrors] = useState<Map<number, string>>(new Map);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type == 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: fieldValue,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    validateForm()
  };

  const validateForm = () => {
    const newErrors: Map<number, string> = new Map;

    if (!formData.name.trim()) {
      refs.current[0].current?.focus();
      newErrors.set(0, 'Name is required')
    }

    if (formData.email.length < 6) {
      if (!newErrors.size) refs.current[1].current?.focus();
      newErrors.set(1, 'Email must be at least 6 characters long')
    }

    if (formData.password.length < 6) {
      if (!newErrors.size) refs.current[2].current?.focus();
      newErrors.set(2, 'Password must be at least 6 characters long');
    }

    setErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputFields.map((field, index) => (
        <div key={index}>
          <label>{field.label}:</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name as keyof typeof formData] as string}
            onChange={handleChange}
            ref={refs.current[index]}
          />
          {errors.get(index) && <span>{errors.get(index)}</span>}
        </div>
      ))}

      <div>
        <label>
          <input
            type="checkbox"
            name="isAccepted"
            checked={formData.isAccepted}
            onChange={handleChange}
          />
          Accept Terms and Conditions
        </label>
      </div>

      <button type="submit" disabled={!formData.isAccepted}> Submit</button>
    </form>
  );
}

export default App;
