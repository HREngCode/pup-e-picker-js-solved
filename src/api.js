export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () =>
    fetch(`${baseUrl}/dogs`).then((response) => response.json()),
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  createDog: (dog) => {
    return fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },

  // should delete a dog from the database
  deleteDog: (dogId) => {
    return fetch(`${baseUrl}/dogs/${dogId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete the dog");
      }
    });
  },

  updateDog: () => {},

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
