import { assert } from "console";

const Crud = artifacts.require("./Crud");

contract("Crud", () => {
  let crud = null;
  before(async () => {
    crud = await Crud.deployed();
  });

  it("create users and save to users array", async () => {
    // We are only creating a user. Is there a way to verify a function that doesnt return anything?
    await crud.createUser("Ade");
    let user = await crud.read(1);
    assert(user[0].toNumber() == 1, "user id is equal to one");
    assert(user[1] == "Ade", "user name is equal to Ade");
  });

  it("updates users name", async () => {
    await crud.update(1, "Olu");
    let user = await crud.read(1);
    assert(user[1] == "Olu", "user name is equal to Olu");
  });

  it("throws an error when id is not found", async () => {
    try {
      await crud.update(2, "Marvelous");
    } catch (err) {
      assert(
        err.message.includes("User does not exist"),
        "User does not exist"
      );
      return;
    }
  });
  // in case my smart contract doesnt throw an error, 
    //   then this should throw an error to let me know my code is buggy
  assert(false);
});
