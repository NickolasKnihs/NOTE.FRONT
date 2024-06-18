import React, { useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Cadastrar = () => {
    const nomeInputRef = useRef();
    const idadeInputRef = useRef();
    const emailInputRef = useRef();
    const senhaInputRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const novoUsuario = {
            nome: nomeInputRef.current.value,
            idade: idadeInputRef.current.value,
            email: emailInputRef.current.value,
            senha: senhaInputRef.current.value
        };

        try {
            const response = await fetch('http://localhost:4300/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoUsuario)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário.');
            }

            // Limpar os campos após o cadastro
            nomeInputRef.current.value = '';
            idadeInputRef.current.value = '';
            emailInputRef.current.value = '';
            senhaInputRef.current.value = '';

            // Pode-se fazer algo após o cadastro, como atualizar uma lista ou redirecionar

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ fontFamily: 'fantasy', color: 'grey' }}>Cadastrar</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Nome:</label>
                    <input type="text" ref={nomeInputRef} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Idade:</label>
                    <input type="number" ref={idadeInputRef} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" ref={emailInputRef} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha:</label>
                    <input type="password" ref={senhaInputRef} className="form-control" required />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                    {/* <Link to={'/'} className="btn btn-danger">Voltar</Link> */}
                </div>
            </form>

            <div className="d-flex justify-content-end mb-4">
                <Link to={'/login'} className="mx-2">
                    <button className="btn btn-secondary" style={{ width: '100px', height: '40px' }}>Login</button>
                </Link>

                <Link to={'/'}>
                    <button className="btn btn-danger" style={{ width: '100px', height: '40px' }}>Voltar</button>
                </Link>
            </div>

            <Outlet />
        </div>
    );
};

export default Cadastrar;
