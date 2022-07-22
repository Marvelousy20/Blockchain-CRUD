import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Crud from "./contracts/Crud.json";

export default function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [updateUserId, setUpadteUserId] = useState("");
  const [updateUserName, setUpadteUserName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [crud, setCrud] = useState({});
  const [account, setAccount] = useState("");
  console.log(account);

  let web3;

  // Inititate web3 with providers
  async function loadWeb3() {
    // checks if new version of metamask is installed
    if (typeof window.ethereum !== "undefined") {
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (typeof window.web3 !== "undefined") {
      // New
      web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Sorry, metamask not detected, please install metamask.");
    }
  }

  // Initiate Web3 contract instance
  async function loadCrudInstance() {
    let crud;
    let accounts;
    // get network ID i.e ropsten networkId or ganache or mainnet
    let id = await web3.eth.net.getId();
    console.log(id)

    // connect web3 contract instance
    crud = new web3.eth.Contract(Crud.abi, Crud.networks[id].address);
    setCrud(crud);

    // get web3 accounts from metamask
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  }

  // run the functions on app load
  useEffect(() => {
    async function loadData() {
      await loadWeb3();
      await loadCrudInstance();
    }

    loadData();
  }, []);

  // use smart contract instance to run contract functions.

  // createUser
  function handleName(e) {
    setName(e.target.value);
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    let result = document.getElementById("name_result");
    try {
      let user = await crud.methods.createUser(name).send({ from: account });
      result.innerHTML = `new user with name ${name} created successfully!`;
    } catch (error) {
      console.log(error);
      result.innerHTML = `oops! there was an error creating the user, please try again.`;
    }
  }

  // read user
  function handleReadId(e) {
    setId(e.target.value);
  }

  async function handleReadUser(e) {
    e.preventDefault();
    let result = document.getElementById("read_result");
    try {
      let user = await crud.methods.read(id).call();
      let userName = user[0];
      let userId = user[1];
      result.innerHTML = `userId: ${userId}, userName: ${userName}`;
    } catch (error) {
      console.log(error);
      result.innerHTML = `oops! there was an error creating the user, please try again.`;
    }
  }

  // Update result

  function handleUserIdUpdate(e) {
    setUpadteUserId(e.target.value);
  }

  function handleUserNameUpdate(e) {
    setUpadteUserName(e.target.value);
  }

  async function handleUpdateUser(e) {
    e.preventDefault();
    let update_result = document.getElementById("update_result");

    try {
      let updatedUser = await crud.methods
        .update(updateUserId, updateUserName)
        .send({ from: account });
      update_result.innerHTML = `user with userId: ${updateUserId} 's name has been updated to ${updateUserName} successfully!`;
    } catch (error) {
      console.log(error);
      update_result.innerHTML = `oops! an error occured while updating user, please try again!`;
    }
  }

  // Delete user

  function handleDeleteId(e) {
    setDeleteId(e.target.value);
  }

  async function handleDeleteUser(e) {
    e.preventDefault();
    let delete_result = document.getElementById("delete_result");
    try {
      await crud.methods.delete(deleteId).send({ from: account });
      delete_result.innerHTML = `User ${deleteId} deleted successfully`;
    } catch (error) {
      console.log(error);
      delete_result.innerHTML = `Ooops! Can not delete user at this time. Please try again.`;
    }
  }

  return (
    <div className="App">
      {/* Create User */}
      <form onSubmit={handleCreateUser}>
        <div>
          <h3>Create User</h3>
          <label htmlFor="name">Create</label> <br />
          <input
            type="text"
            placeholder="Enter user's name"
            id="name"
            onChange={handleName}
          />
          <button type="submit">Create User</button>
        </div>

        <div id="name_result"></div>
      </form>

      {/* Update User */}
      <form onSubmit={handleUpdateUser}>
        <h3>Update User</h3>
        <div>
          <div>
            <label htmlFor="update_id">User ID</label> <br />
            <input
              type="number"
              placeholder="Enter user's ID"
              id="update_id"
              onChange={handleUserIdUpdate}
            />
          </div>
          <div>
            <label htmlFor="update_name">Name</label> <br />
            <input
              type="text"
              placeholder="Enter user's new name"
              id="update_name"
              onChange={handleUserNameUpdate}
            />
            <button type="submit">Update User</button>
          </div>
        </div>
        <div id="update_result"></div>
      </form>

      {/* Read User */}
      <form onSubmit={handleReadUser}>
        <h3>Read User</h3>
        <div>
          <label htmlFor="read">Create</label> <br />
          <input
            type="number"
            placeholder="Enter user's ID"
            id="read"
            onChange={handleReadId}
          />
          <button type="submit">Read</button>
        </div>
        <div id="read_result"></div>
      </form>

      {/* Delete User */}
      <form onSubmit={handleDeleteUser}>
        <h3>Delete User</h3>
        <div>
          <label htmlFor="read">Delete</label> <br />
          <input
            type="number"
            placeholder="Enter user's ID"
            id="delete"
            onChange={handleDeleteId}
          />
          <button type="submit" className="delete">
            Delete
          </button>
        </div>
        <div id="delete_result"></div>
      </form>
    </div>
  );
}
