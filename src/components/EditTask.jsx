export default function EditTask({ task, onSave }) {
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  function handleSave() {
    onSave({ ...task, title: newTitle, description: newDescription });
  }

  return (
    <div>
      <h2>Edit Task</h2>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

