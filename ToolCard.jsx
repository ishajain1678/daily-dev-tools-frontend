import axios from 'axios';

function ToolCard({ tool, onToolDeleted, onToolEdited }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tools/${tool._id}`);
      onToolDeleted(tool._id);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = () => {
    onToolEdited(tool); // You can open a modal or form with this
  };

  return (
    <div className="card">
      <h2>{tool.name}</h2>
      <p>{tool.description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
