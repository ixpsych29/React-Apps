import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Huraira",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -2,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Talha Tariq",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// <-----------------App---------------->
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddForm, setShowAddForm] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddForm() {
    // setShowAddForm(!showAddForm);
    //this actually works 👆
    //but this also works and more amazing I think👇
    setShowAddForm((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddForm(false);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddForm(false);
  }

  function handleSplitBill(value) {
    // console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddForm && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddForm}>
          {showAddForm ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelection }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name} </h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You & {friend.name} are even!</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    //its still submitting while have no entry so that to prevent
    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑🏻‍🤝‍👩🏻Friend name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌃 Image URL </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  //using controlled elements.
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  //for friend expense we use derived state
  const friendExpense = bill ? bill - myExpense : "";
  const [whosPaying, setWhosPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    //if there's no value then prevent it from submitting
    if (!bill || !myExpense) return;
    //now its time to split
    onSplitBill(whosPaying === "user" ? friendExpense : -myExpense);

    //to clear details but see app component now
    // setBill("");
    // setMyExpense("");
    // setWhosPaying("user");
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name} </h2>
      <label>💵Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍🏻Your expense</label>
      <input
        type="text"
        value={myExpense}
        onChange={(e) =>
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
      />

      <label>🧑🏻‍🤝‍👩🏻{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={friendExpense} />

      <label>🤑Who's paying the bill</label>
      <select
        value={whosPaying}
        onChange={(e) => setWhosPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name} </option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
