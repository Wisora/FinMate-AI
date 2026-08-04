import React, { useState } from 'react';

function GoalForm({ onAddGoal }) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !target || !deadline) return;
    onAddGoal(title, parseFloat(target), deadline);
    setTitle("");
    setTarget("");
    setDeadline("");
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h4>Add New Goal</h4>
      <input 
        type="text" 
        placeholder="Goal title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        placeholder="Target amount" 
        value={target} 
        onChange={(e) => setTarget(e.target.value)} 
        required 
      />
      <input 
        type="date" 
        value={deadline} 
        onChange={(e) => setDeadline(e.target.value)} 
        required 
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
