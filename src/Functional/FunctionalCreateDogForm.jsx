import { useState } from "react";
import { dogPictures } from "../dog-pictures";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({ onCreateNewDog, isLoading }) => {
  const [dogNameInput, setDogNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [imageInput, setImageInput] = useState(defaultSelectedImage);

  const clearForm = () => {
    setDogNameInput("");
    setDescriptionInput("");
    setImageInput("");
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        onCreateNewDog({
          name: dogNameInput,
          description: descriptionInput,
          image: imageInput,
        });
        clearForm();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        name="name"
        value={dogNameInput}
        onChange={(e) => {
          setDogNameInput(e.target.value);
        }}
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id=""
        cols={80}
        rows={10}
        value={descriptionInput}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        name="image"
        id="picture-select"
        value={imageInput}
        onChange={(e) => {
          setImageInput(e.target.value);
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
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
