import { Component } from "react";
import { Requests } from "../api";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import toast from "react-hot-toast";

export class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteDogs: [],
      unfavoriteDogs: [],
      allDogs: [],
      activeTab: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    this.refetchDogs();
  }

  refetchDogs = () => {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((dogs) => {
        this.setState({
          allDogs: dogs,
          favoriteDogs: dogs.filter((dog) => dog.isFavorite),
          unfavoriteDogs: dogs.filter((dog) => !dog.isFavorite),
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleFavoriteStatus = (dogId) => {
    this.setState({ isLoading: true });
    this.setState((prevState) => {
      const updatedDogs = prevState.allDogs.map((dog) => {
        if (dog.id === dogId) {
          const updatedDog = { ...dog, isFavorite: !dog.isFavorite };
          Requests.updateDog(updatedDog)
            .then(() => {
              this.setState({
                favoriteDogs: updatedDogs.filter((dog) => dog.isFavorite),
                unfavoriteDogs: updatedDogs.filter((dog) => !dog.isFavorite),
              });
            })
            .catch((error) => {
              console.error("Error updating dog:", error);
            });
          return updatedDog;
        }
        return dog;
      });
      return { allDogs: updatedDogs };
    });
    this.setState({ isLoading: false });
  };

  createNewDog = (dog) => {
    this.setState({ isLoading: true });
    Requests.postDog(dog).then(() => {
      Requests.getAllDogs().then((dogs) => {
        this.setState({
          allDogs: dogs,
          favoriteDogs: dogs.filter((dog) => dog.isFavorite),
          unfavoriteDogs: dogs.filter((dog) => !dog.isFavorite),
        });
        toast.success("Dog Created");
      });
    });
    this.setState({ isLoading: false });
  };

  deleteDog = (dogId) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(dogId)
      .then(() => {
        this.setState((prevState) => ({
          allDogs: prevState.allDogs.filter((dog) => dog.id != dogId),
          favoriteDogs: prevState.favoriteDogs.filter((dog) => dog.id != dogId),
          unfavoriteDogs: prevState.unfavoriteDogs.filter(
            (dog) => dog.id != dogId
          ),
        }));
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleTabChange = (tab) => {
    this.setState((prevState) => ({
      activeTab: tab === prevState.activeTab ? "" : tab,
    }));
  };

  render() {
    const { allDogs, favoriteDogs, unfavoriteDogs, activeTab, isLoading } =
      this.state;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        {/* should be inside of the ClassSection component using react children */}
        <ClassSection
          allDogs={allDogs}
          favoriteDogsCount={favoriteDogs.length}
          unfavoriteDogsCount={unfavoriteDogs.length}
          activeTab={activeTab}
          onHandleTabChange={this.handleTabChange}
        >
          {!activeTab && (
            <ClassDogs
              allDogs={allDogs}
              onToggleFavorite={this.toggleFavoriteStatus}
              onDelete={this.deleteDog}
              isLoading={isLoading}
            />
          )}
          {activeTab === "favorited" && (
            <ClassDogs
              allDogs={favoriteDogs}
              onToggleFavorite={this.toggleFavoriteStatus}
              onDelete={this.deleteDog}
              isLoading={isLoading}
            />
          )}
          {activeTab === "unfavorited" && (
            <ClassDogs
              allDogs={unfavoriteDogs}
              onToggleFavorite={this.toggleFavoriteStatus}
              onDeleteDog={this.deleteDog}
              isLoading={isLoading}
            />
          )}
          {activeTab === "createDog" && (
            <ClassCreateDogForm
              onCreateNewDog={this.createNewDog}
              isLoading={isLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
