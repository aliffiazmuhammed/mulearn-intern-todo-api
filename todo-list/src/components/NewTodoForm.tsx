import  { useState, ChangeEvent, FormEvent } from 'react';

interface NewTodoFormProps {
  onSubmit: (title: string, expiryDate: string) => void;
}

export function NewTodoForm({ onSubmit }: NewTodoFormProps) {
  const [newItem, setNewItem] = useState("");
  const [expiryDate, setExpiryDate] = useState('');

  const handleChangeExpiryDate = (e: ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newItem === "" || expiryDate === "") return;

    onSubmit(newItem, expiryDate); // Pass both title and expiryDate to onSubmit
    setNewItem("");
    setExpiryDate(""); // Clear expiryDate after submission
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          onChange={handleChange}
          type="text"
          id="item"
        />
      </div>
      <div className="form-row">
        <label htmlFor="expiryDate">Expiry Date</label>
        <input
          type="datetime-local"
          value={expiryDate}
          onChange={handleChangeExpiryDate}
          id="expiryDate"
        />
      </div>
      <button type="submit" className="btn">Add</button>
    </form>
  );
}
