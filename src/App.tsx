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

  // We can put these two handles into its own component
  // Handles SetItem update.
  const handleUpdateItem = (_items: Item[]) => {
    setItems(_items);
  };

  // Handles the Checked state for each item.
  const handleCheckboxChange = (_item: Item) => {
    const index = items.findIndex((item) => item.name === _item.name);
    if (index !== -1) {
      const newItems = [...items];
      console.log(newItems[index].name, newItems[index].checked);
      newItems[index].checked = !newItems[index].checked;
      setItems(newItems);
    }
  };

  //////////////////////////////////////////////////////

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

///////////////////////// BoxManager Component /////////////////////////////////
// Main function of the component
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
      <div className="box" key="Left_Box">
        Left Box
        <RenderList
          items={items}
          side="left"
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>

      <div className="flexCenter" key="move_Buttons">
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

      <div className="box" key="Right_Box">
        Right Box
        <RenderList
          items={items}
          side="right"
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}

// Move items left to right or right to left based on the move side string.
function MoveItem(items: Item[], _moveSide: string, handleUpdateItem: any) {
  // Move items left to right or right to left based on the move side string.
  const moveSide = (side: string) => {
    const newItems = [...items];

    // Loop through each item
    // if item is not on left box and checked and desired move direction is left, then move left.
    // if item is on left box and checked and desired move direction is left, then move right.
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

  // Updates item state through handler
  return handleUpdateItem(moveSide(_moveSide));
}

// Manages rendering of each item in the list, handle check box change passed into here
function RenderList({
  items,
  side,
  handleCheckboxChange,
}: {
  items: Item[];
  side: string;
  handleCheckboxChange: any;
}) {
  function RenderListItem({ item }: { item: Item }) {
    return (
      <li className="itemCheckBox boxItem" key={item.name} id={item.name}>
        <label>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheckboxChange(item)}
          />
          {item.name}
        </label>
      </li>
    );
  }

  return (
    // If the side is left and leftbox is true, then render, else dont.
    // if item is not on left box and checked and desired move direction is left, then move left.
    <div className="boxItems">
      {items.map((item) =>
        side === "left" ? (
          item.boxLeft ? (
            <RenderListItem item={item} />
          ) : null
        ) : side === "right" ? (
          !item.boxLeft ? (
            <RenderListItem item={item} />
          ) : null
        ) : null,
      )}
    </div>
  );
}

