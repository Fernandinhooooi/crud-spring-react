import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProdutoPage() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) navigate('/');
    axios.get('http://localhost:8080/api/produtos', { headers })
      .then(res => setProdutos(res.data))
      .catch(() => alert('Erro ao carregar produtos'));
  }, []);

  const adicionarProduto = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/produtos', { nome, descricao, preco }, { headers });
      window.location.reload();
    } catch (err) {
      alert('Erro ao adicionar produto');
    }
  };

  return (
    <div>
      <h2>Produtos</h2>
      <form onSubmit={adicionarProduto}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {produtos.map(p => (
          <li key={p.id}>{p.nome} - {p.descricao} - R${p.preco}</li>
        ))}
      </ul>
    </div>
  );
}
