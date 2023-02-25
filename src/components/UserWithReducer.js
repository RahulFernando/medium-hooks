import React, { useReducer } from "react";
import { faker } from "@faker-js/faker";

import classes from "./Users.module.css";

const initialState = {
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        users: [...state.users, action.payload],
      };
    case "DELETE":
      return {
        users: [...state.users.filter((user) => user.id !== action.payload)],
      };

    default:
      return state;
  }
};

const UserWithReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addHandler = () =>
    dispatch({
      type: "ADD",
      payload: { id: faker.random.numeric(10), name: faker.name.firstName() },
    });

  const deleteHandler = (id) => dispatch({ type: "DELETE", payload: id });

  return (
    <div className={classes.container}>
      <button className={classes.float} onClick={addHandler}>
        Add
      </button>

      <ul className={classes.users}>
        {state.users.map((user) => (
          <li className={classes["list-item"]} key={user.id}>
            {user.name}
            <button
              className={classes["delete-btn"]}
              onClick={deleteHandler.bind(null, user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserWithReducer;
