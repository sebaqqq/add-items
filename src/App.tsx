import React, { useState } from "react";
import "./App.css";

type ItemId = `${string}-${string}-${string}-${string}-${string}`;

interface item {
  id: ItemId;
  timestamp: number;
  text: string;
}

const INITIAL_ITEMS: item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "VideoJuegos ",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Libros",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Series",
  },
];

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    const newItem = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    };

    setItems((prevItems) => {
      return [...prevItems, newItem];
    });

    input.value = "";
  };

  const createHandleRemoveItem = (id: ItemId) => () => {
    setItems((prevItems) => {
      return prevItems.filter((currentItem) => currentItem.id !== id);
    });
  };

  return (
    <main>
      <aside>
        <h1>Prueba tecnica de React</h1>
        <h2>Añadir y eliminan elementos de una lista</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Elemento a introducir
            <input name="item" required placeholder="VideoJuegos" />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>
      <section>
        <h2>Lista de elementos</h2>
        {items.length === 0 ? (
          <p>
            <strong>No hay elmentos en la lista</strong>
          </p>
        ) : (
          <ul>
            {items.map((item) => {
              return (
                <li key={item.id}>
                  {item.text}
                  <button onClick={createHandleRemoveItem(item.id)}>
                    Eliminar Elemento
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
