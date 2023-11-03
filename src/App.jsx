import React, { useEffect, useState } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

function App() {
  const [item, setItem] = useState("");
  const [packList, setPackList] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(packList));
  }, [packList]);

  const addItem = () => {
    setPackList([...packList, { id: crypto.randomUUID(), name: item, isPacked: false }]);
    setItem('');
  };

  const deleteItem = (id) => {
    setPackList(packList.filter(todo => todo.id !== id));
  };

  function toggle(id, isPacked) {
    setPackList(packList.map(todo => {
      if (todo.id === id) {
        return { ...todo, isPacked };
      }
      return todo;
    }));
  }
  return (
    <div className="container p-5  boo">
      <div className="row justify-content-center align-content-center">
        <div className="col-md-6">
          <div className="card p-4" >
            <div className="addItem">
              <input className="form-control mb-3" type="text" placeholder="Enter item" value={item} onChange={(e) => setItem(e.target.value)} />
              <button className="btn btn-secondary btn-block" onClick={addItem}>Add Item</button>
            </div>
            {packList.map((task) => (
              <div key={task.id} className="d-flex justify-content-between align-items-center mt-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={task.isPacked} onChange={(e) => toggle(task.id, e.target.checked)} />
                  <label className="form-check-label ml-2">{task.isPacked ? <del>{task.name}</del> : task.name}</label>
                </div>
                <button className="btn btn-danger" onClick={() => deleteItem(task.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
