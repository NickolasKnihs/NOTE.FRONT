import { useRef, useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";

Chart.register(ArcElement, Tooltip, Legend);

function Tarefas() {
    const [listaTarefas, setListarefas] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [descricaoEditada, setDescricaoEditada] = useState("");
    const [indiceEditado, setIndiceEditado] = useState(null);
    const descricaoTarefaInputRef = useRef();

    useEffect(() => {
        const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
        if (tarefasSalvas) {
            setListarefas(tarefasSalvas);
        }
    }, []);

    function adicionaTarefa() {
        if (modoEdicao) {
            const novasTarefas = [...listaTarefas];
            novasTarefas[indiceEditado].descricao = descricaoTarefaInputRef.current.value;
            setListarefas(novasTarefas);
            // salvarTarefas(novasTarefas);
            setModoEdicao(false);
            setDescricaoEditada("");
            setIndiceEditado(null);
        } else {
            const novaTarefa = {
                descricao: descricaoTarefaInputRef.current.value,
            };
            fetch('http://localhost:4300/usuarios', {
                method: 'POST',
                headers: { "Content-type": 'application/json' },
                body: JSON.stringify(novaTarefa)
            }).then(a => a.json())
                .then((a) => {
                    listaTarefas.push(novaTarefa);
                    setListarefas([...listaTarefas]);
                })
                .catch((a) => console.log(a));
        }
    };

    function editarTarefa(indice, descricao) {
        setModoEdicao(true);
        setDescricaoEditada(descricao);
        setIndiceEditado(indice);
        descricaoTarefaInputRef.current.value = descricao;
    }

    function atualizarTarefa(tarefaAtual) {
        const novasTarefas = listaTarefas.map(tarefa => {
            if (tarefa === tarefaAtual) {
                return { ...tarefa, finalizado: !tarefa.finalizado };
            }
            return tarefa;
        });
        setListarefas(novasTarefas);
        salvarTarefas(novasTarefas);
    }

    function excluirTarefa(tarefaExcluir) {
        const novasTarefas = listaTarefas.filter(tarefa => tarefa !== tarefaExcluir);
        setListarefas(novasTarefas);
        salvarTarefas(novasTarefas);
    }

    function pegaEstilo(tarefaAtual) {
        return tarefaAtual.finalizado ? 'line-through' : 'none';
    }

    // function salvarTarefas(tarefas) {
    //     localStorage.setItem("tarefas", JSON.stringify(tarefas));
    // }

    //GRAFICO
    const tarefasFinalizadas = listaTarefas.filter(tarefa => tarefa.finalizado).length;
    const tarefasNaoFinalizadas = listaTarefas.length - tarefasFinalizadas;

    const data = {
        labels: ['Concluídas', 'Não Concluídas'],
        datasets: [
            {
                data: [tarefasFinalizadas, tarefasNaoFinalizadas],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
    };

    return (
        <div style={{ display: 'flex', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ flex: '1', padding: '10px' }}>
                <h2 style={{ fontFamily: 'fantasy', color: 'grey', textAlign: 'center' }}>Cadastrar Tarefa</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <input type="text" ref={descricaoTarefaInputRef} style={{ marginRight: '10px' }} />
                        <button onClick={adicionaTarefa}>{modoEdicao ? "Salvar" : "Cadastrar"}</button>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', width: '100%' }}>
                        {listaTarefas.map((tarefaAtual, index) => (
                            <div key={tarefaAtual.descricao} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                <div style={{ flex: '1', color: 'white', backgroundColor: 'gray', textDecoration: pegaEstilo(tarefaAtual), marginRight: '10px', padding: '5px' }} onClick={() => atualizarTarefa(tarefaAtual)}>
                                    {tarefaAtual.descricao}
                                </div>
                                <button onClick={() => editarTarefa(index, tarefaAtual.descricao)} style={{ marginRight: '5px' }}>Editar</button>
                                <button onClick={() => excluirTarefa(tarefaAtual)}>Excluir</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ flex: '1', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* GRAFICO */}
                <div style={{ width: '80%', height: '300px', marginBottom: '20px' }}>
                    <Pie data={data} options={options} />
                </div>
                {/* Link para voltar */}
                <div style={{ marginTop: '20px' }}>
                    <Link to={'/'}>
                        <input type="button" value="Voltar" className="btn btn-danger" style={{ width: '100px', height: '40px' }} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Tarefas;
