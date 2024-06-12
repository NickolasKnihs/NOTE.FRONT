import React from 'react'
import { Link, Outlet } from "react-router-dom";

const Cadastrar = () => {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ fontFamily: 'fantasy', color: 'grey' }}>Cadastrar</h2>

            <form style={{ fontFamily: 'fantasy', color: 'grey' }} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Nome:</label>
                    <input type="text" name="nome" className="form-control" />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Idade:</label>
                    <input type="number" name="idade" className="form-control" />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" name="email" className="form-control" />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Senha:</label>
                    <input type="password" id="senha" className="form-control" />
                </div>
                
                <div className="d-flex justify-content-between">
                    <Link to={'/'}>
                        <input type="submit" value="enviar" className="btn btn-primary" />
                    </Link>
                </div>
            </form>

            <div className="d-flex justify-content-end mb-4">
                <Link to={'/login'} className="mx-2">
                    <input type="button" value="login" className="btn btn-secondary" style={{ width: '100px', height: '40px' }} />
                </Link>

                <Link to={'/'}>
                    <input type="button" value="voltar" className="btn btn-danger" style={{ width: '100px', height: '40px' }} />
                </Link>
            </div>

            <Outlet />
        </div>
    )
}

export default Cadastrar;
