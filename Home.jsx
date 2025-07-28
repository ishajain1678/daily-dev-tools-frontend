import React, { useState, useEffect } from 'react';
import ToolCard from '../components/ToolCard';
import axios from 'axios';

function Home() {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    axios.get('/api/tools')
      .then((res) => setTools(res.data));
  }, []);

  const filteredTools = tools
    .filter(tool => tool.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === 'name'
      ? a.name.localeCompare(b.name)
      : new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search tools..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-2 py-1 rounded mr-4"
      />
      <select onChange={(e) => setSortBy(e.target.value)} className="border px-2 py-1 rounded">
        <option value="name">Sort by Name</option>
        <option value="date">Sort by Date</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {filteredTools.map((tool) => (
          <ToolCard key={tool._id} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export default Home;
