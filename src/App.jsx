import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import json from "./data.json";
import { useEffect, useState } from "react";

const List = ({ list, handleAdd, handleDlt }) => {
  const [show, setShow] = useState({});

  useEffect(() => {
    console.log("Type of array: ", Array.isArray(list));
    console.log(list);
  });

  return (
    <div className="sideBar">
      {list.map((i) => {
        return (
          <div className="Bar" key={i.id}>
            <div className="heading">
              {i.isFolder && (
                <span
                  className="name"
                  onClick={() => {
                    setShow((prev) => ({
                      ...prev,
                      [i.name]: !prev[i.name],
                    }));
                  }}
                >
                  {show?.[i.name] ? "- " : "+ "}
                </span>
              )}
              {i.name}
              {i?.isFolder && (
                <span
                  onClick={() => {
                    handleAdd(i.id);
                  }}
                  className="Add"
                >
                  [Add]
                </span>
              )}
              <span
                onClick={() => {
                  handleDlt(i.id);
                }}
                className="Dlt"
              >
                [Dlt]
              </span>
            </div>
            {show?.[i.name] && i?.component && (
              <List
                list={i.component}
                handleAdd={handleAdd}
                handleDlt={handleDlt}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(json);

  const handleAdd = (parentId) => {
    const Name = prompt("Folder Name");
    const updateList = (List) => {
      return List.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            component: [
              ...node.component,
              {
                id: Date.now(),
                name: Name,
                isFolder: true,
                component: [],
              },
            ],
          };
        }
        if (node.component) {
          return { ...node, component: updateList(node.component) };
        }
        return node;
      });
    };

    setData((prev) => updateList(prev));
  };

  const handleDlt = (Id) => {
    //update the list node
    console.log("itme deleted ");
    const updateDltList = (list) => {
      return list
        .filter((node) => node.id !== Id)
        .map((item) => {
          if (item.component) {
            return { ...item, component: updateDltList(item.component) };
          }
          return item;
        });
    };
    setData((prev) => updateDltList(prev));
  };

  return (
    <div className="App">
      <h1>File Explorer</h1>
      <div className="container">
        <List list={data} handleAdd={handleAdd} handleDlt={handleDlt} />
      </div>
    </div>
  );
}