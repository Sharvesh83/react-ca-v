import { useState } from 'react';
import '../styles/RegistrationForm.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
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

    if (!nameError && !emailError && !passwordError && !repeatPasswordError) {
      alert('Registered successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
      });
    }
  };

  const validateName = (name) => {
    if (name.length < 3 || name.length > 30) {
      return true;
    }
    return false;
  };

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      return true;
    }
    return false;
  };

  const validatePassword = (password) => {
    if (password.length < 10 || !/[!@#$%^&*()_+{}[\]:;<>,.?~=-]/.test(password)) {
      return true;
    }
    return false;
  };

  const validateRepeatPassword = (password, repeatPassword) => {
    if (password !== repeatPassword) {
      return true;
    }
    return false;
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} />
        
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} />
        
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        
        <input type="password" name="repeatPassword" placeholder="Repeat Password" value={formData.repeatPassword} onChange={handleInputChange} />
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
