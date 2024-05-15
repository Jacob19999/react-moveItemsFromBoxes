import "./styles.css";
import React, { useState, useEffect } from "react";

type ItemsState = { [key: string]: boolean };

type Item = {
  name: string;
  boxLeft: boolean;
  checked: boolean;
};

export default function App() {
  const ItemsInitial: Item[] = [
    { name: "Item A", boxLeft: false, checked: true },
    { name: "Item B", boxLeft: true, checked: true },
    { name: "Item C", boxLeft: true, checked: false },
    { name: "Item D", boxLeft: false, checked: true },
    { name: "Item E", boxLeft: true, checked: false },
    { name: "Item F", boxLeft: true, checked: true },
    { name: "Item G", boxLeft: true, checked: false },
    { name: "Item H", boxLeft: false, checked: true },
  ];

  const [items, setItems] = useState<Item[]>(ItemsInitial);

  useEffect(() => {}, []);

  const handleUpdateItem = (_items: Item[]) => {
    setItems(_items);
  };

  const handleCheckboxChange = (_item: Item) => {
    const index = items.findIndex((item) => item.name === _item.name);
    if (index !== -1) {
      const newItems = [...items];
      console.log(newItems[index].name, newItems[index].checked);
      newItems[index].checked = !newItems[index].checked;
      setItems(newItems);
    }
  };

  return (
    <div className="App">
      <ListInterface
        items={items}
        handleUpdateItem={handleUpdateItem}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}

function MoveItem(items: Item[], _moveSide: string, handleUpdateItem: any) {
  const moveSide = (side: string) => {
    const newItems = [...items];
    for (let i = 0; i < items.length; i++) {
      if (!newItems[i].boxLeft && newItems[i].checked && side === "moveLeft") {
        newItems[i].boxLeft = !newItems[i].boxLeft;
        newItems[i].checked = !newItems[i].checked;
      }
      if (newItems[i].boxLeft && newItems[i].checked && side === "moveRight") {
        newItems[i].boxLeft = !newItems[i].boxLeft;
        newItems[i].checked = !newItems[i].checked;
      }
    }
    return newItems;
  };

  return handleUpdateItem(moveSide(_moveSide));
}

function RenderList({
  items,
  side,
  handleCheckboxChange,
}: {
  items: Item[];
  side: string;
  handleCheckboxChange: any;
}) {
  function RenderListItem({ item, index }: { item: Item; index: number }) {
    return (
      <div key={index} className="itemCheckBox boxItem">
        <input
          type="checkbox"
          id={item.name}
          checked={item.checked}
          onChange={() => handleCheckboxChange(item)}
        />
        <label>{item.name}</label>
      </div>
    );
  }

  return (
    <div className="boxItems">
      {items.map((item, index) =>
        side === "left" ? (
          item.boxLeft ? (
            <RenderListItem item={item} index={index} />
          ) : null
        ) : side === "right" ? (
          !item.boxLeft ? (
            <RenderListItem item={item} index={index} />
          ) : null
        ) : null
      )}
    </div>
  );
}

function ListInterface({
  items,
  handleUpdateItem,
  handleCheckboxChange,
}: {
  items: Item[];
  handleUpdateItem: any;
  handleCheckboxChange: any;
}) {
  return (
    <div className="boxcontainer">
      <div className="box">
        <RenderList
          items={items}
          side="left"
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>

      <div className="flexCenter">
        <button
          onClick={() => MoveItem(items, "moveRight", handleUpdateItem)}
          className="moveButton"
        >
          Move Right
        </button>
        <button
          onClick={() => MoveItem(items, "moveLeft", handleUpdateItem)}
          className="moveButton"
        >
          Move Left
        </button>
      </div>
      <div className="box">
        <RenderList
          items={items}
          side="right"
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}
