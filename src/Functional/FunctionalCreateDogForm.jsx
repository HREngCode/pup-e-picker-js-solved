import { useState } from "react";
import { dogPictures } from "../dog-pictures";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = () => {
  const [dogName, setDogName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(defaultSelectedImage);

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={dogName}
        onChange={(e) => {
          setDogName(e.target.value);
        }}
        disabled={false}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        disabled={false}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture-select"
        value={picture}
        onChange={(e) => {
          setPicture(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
