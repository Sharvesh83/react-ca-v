import { useState } from 'react';
import '../styles/RegistrationForm.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const repeatPasswordError = validateRepeatPassword(formData.password, formData.repeatPassword);

    if (nameError || emailError || passwordError || repeatPasswordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        repeatPassword: repeatPasswordError
      });
    } else {
      setErrors({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
      });
      alert('Registered successfully!');
    }
  };

  const validateName = (name) => {
    if (name.length < 3) {
      return 'Name should be at least 3 characters long.';
    }
    if (name.length > 30) {
      return 'Name should not be greater than 30 characters.';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 10) {
      return 'Password should be at least 10 characters long.';
    }
    if (!/[!@#$%^&*()_+{}[\]:;<>,.?~=-]/.test(password)) {
      return 'Password should contain at least one special character.';
    }
    return '';
  };

  const validateRepeatPassword = (password, repeatPassword) => {
    if (password !== repeatPassword) {
      return 'Passwords do not match.';
    }
    return '';
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} />
        {errors.name && <div className="error">{errors.name}</div>}
        
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} />
        {errors.email && <div className="error">{errors.email}</div>}
        
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        {errors.password && <div className="error">{errors.password}</div>}
        
        <input type="password" name="repeatPassword" placeholder="Repeat Password" value={formData.repeatPassword} onChange={handleInputChange} />
        {errors.repeatPassword && <div className="error">{errors.repeatPassword}</div>}
        
        <button type="submit" disabled={Object.values(errors).some(error => error !== '')}>Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
