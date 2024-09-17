"use client"

import React, { useState, FormEvent } from 'react';

class Funcionario {
    nome: string;
    data_de_nascimento: string;

    constructor(nome: string, data_de_nascimento: string) {
        this.nome = nome;
        this.data_de_nascimento = data_de_nascimento;
    }

    calcularIdade(): number {
        const hoje = new Date();
        const nascimento = new Date(this.data_de_nascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    calcularDiasParaAniversario(): number {
        const hoje = new Date();
        const aniversario = new Date(hoje.getFullYear(), new Date(this.data_de_nascimento).getMonth(), new Date(this.data_de_nascimento).getDate());

        if (aniversario < hoje) {
            aniversario.setFullYear(hoje.getFullYear() + 1);
        }

        const diff = aniversario.getTime() - hoje.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    formatarData(): string {
        const data = new Date(this.data_de_nascimento);
        const dia = String(data.getDate() + 1).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
}

const Home = () => {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');


    const adicionarFuncionario = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const novoFuncionario = new Funcionario(nome, dataNascimento);
        setFuncionarios([...funcionarios, novoFuncionario]);
        setNome('');
        setDataNascimento('');
    };

    return (
        <>
        <div>
            <form onSubmit={adicionarFuncionario}>
                <h1 className="text-2xl mb-4">Cadastro de Funcionários</h1>
                <div>
                    <label>Nome:</label>
                    <input
                        className="m-2 border border-gray-400 focus:border-blue-500"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Data de Nascimento:</label>
                    <input
                        className="m-2 p-2 border border-gray-400 focus:border-blue-500"
                        type="date"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                    />
                </div>
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit">Cadastrar</button>
            </form>
        </div>
        <h1 className="mt-8 font-bold">Funcionários</h1>
        <div>
            {funcionarios
                .sort((a, b) => a.calcularDiasParaAniversario() - b.calcularDiasParaAniversario())
                .map((funcionario, index) => (
                    <div className="mt-4" key={index}>
                        <h2>Nome: {funcionario.nome}</h2>
                        <p>
                        {funcionario.formatarData()} ({funcionario.calcularIdade()} anos; faltando {funcionario.calcularDiasParaAniversario()} dias para o aniversário)
                        </p>
                        <hr />
                    </div>
                ))}
        </div>
        </>
    );
};

export default Home;
