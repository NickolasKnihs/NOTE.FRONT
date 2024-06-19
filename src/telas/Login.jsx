import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importando Link
import axios from 'axios';
import './Style.css'; // Importando o arquivo de estilos CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log("Login attempt with", { email, password });
      const response = await axios.post('http://localhost:4300/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful');
        navigate('/tarefas');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ fontFamily: 'fantasy', color: 'grey' }}>
        Login
      </h2>
      <form onSubmit={handleLogin} className="mb-4" style={{ fontFamily: 'fantasy', color: 'grey' }}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            name="senha"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-end mt-4">
        <Link to={'/'} className="btn btn-danger">Voltar</Link>
      </div>
    </div>
  );
};

export default Login;
