// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Crud {
    struct User {
        uint id;
        string name;
    }

    User[] public users;
    uint nextId = 1;

    function createUser(string memory name) public {
        users.push(User(nextId, name));
        nextId++;
    }

    function read(uint id) public view returns(uint, string memory) {
        uint userId;
        string memory name;
        uint i = find(id);
        userId = users[i].id;
        name = users[i].name;
        return(userId, name);
    }

    function update(uint id, string memory _newName) public {
        uint i = find(id);
        users[i].name = _newName;
    }

    function deleteUser(uint id) public {
        uint i = find(id);
        delete users[i];
    }

    function find(uint id) public view returns(uint) {
        for(uint i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                return i;
            }
        }

        revert("User does not exist");
    }
}