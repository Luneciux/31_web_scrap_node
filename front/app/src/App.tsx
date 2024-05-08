import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [url, setUrl] = useState('');
    const [keyword, setKeyword] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3001/scrape?url=${encodeURIComponent(url)}&keyword=${encodeURIComponent(keyword)}`);
            setResult(response.data.found ? 'A palavra-chave foi encontrada.' : 'A palavra-chave não foi encontrada.');
        } catch (error) {
            console.error('Erro ao fazer requisição:', error);
            setResult('Erro ao fazer requisição.');
        }
    };

    return (
        <div>
            <h1>Web Scraping na Amazon</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                <input type="text" placeholder="Palavra-chave" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                <button type="submit">Scrape</button>
            </form>
            <p>{result}</p>
        </div>
    );
}

export default App;