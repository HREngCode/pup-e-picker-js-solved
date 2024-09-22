import { Component } from "react";
import { dogPictures } from "../dog-pictures";

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogNameInput: "",
      descriptionInput: "",
      imageInput: defaultSelectedImage,
    };
  }

  handleNameChange = (e) => {
    this.setState({ dogNameInput: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ descriptionInput: e.target.value });
  };

  handleImageChange = (e) => {
    this.setState({ imageInput: e.target.value });
  };

  clearForm = () => {
    this.setState({
      dogNameInput: "",
      descriptionInput: "",
      imageInput: defaultSelectedImage,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onCreateNewDog } = this.props;
    const { dogNameInput, descriptionInput, imageInput } = this.state;

    onCreateNewDog({
      name: dogNameInput,
      description: descriptionInput,
      image: imageInput,
    });
    this.clearForm();
  };

  render() {
    const { dogNameInput, descriptionInput, imageInput } = this.state;
    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          name="name"
          value={dogNameInput}
          onChange={this.handleNameChange}
          disabled={false}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id=""
          cols={80}
          rows={10}
          value={descriptionInput}
          onChange={this.handleDescriptionChange}
          disabled={false}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          name="image"
          id="picture-select"
          value={imageInput}
          onChange={this.handleImageChange}
          disabled={false}
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
  }
}
