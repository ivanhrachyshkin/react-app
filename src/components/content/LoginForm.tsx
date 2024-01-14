import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormDataType } from "../../types/FormDataType";
import { InputFieldType } from "../../types/InputFieldType";

function LoginForm() {

  const inputFields: InputFieldType[] = [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password' },
  ];

  const navigate = useNavigate();
  const refs = useRef(inputFields.map(() => useRef<HTMLInputElement>(null)));
  const [errors, setErrors] = useState<Map<number, string>>(new Map);
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
    isAccepted: false
  });

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
    const isValid = validateForm()
    if (!isValid) return;
    sessionStorage.setItem('formData', JSON.stringify(formData));
    navigate('/profile')
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
    return newErrors.size ? false : true;
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

export default LoginForm;
