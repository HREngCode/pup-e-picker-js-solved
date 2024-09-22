import { useEffect, useState } from "react";
import { Requests } from "../api";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalSection } from "./FunctionalSection";
import { FunctionalDogs } from "./FunctionalDogs";

export function FunctionalApp() {
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const [unfavoriteDogs, setUnfavoriteDogs] = useState([]);
  const [allDogs, setAllDogs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refetchDogs();
  }, []);

  const refetchDogs = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
        setFavoriteDogs(dogs.filter((dog) => dog.isFavorite));
        setUnfavoriteDogs(dogs.filter((dog) => !dog.isFavorite));
      })

      .finally(() => setIsLoading(false));
  };

  const toggleFavoriteStatus = (dogId) => {
    setIsLoading(true);
    setAllDogs((prevDogs) => {
      const updatedDogs = prevDogs.map((dog) => {
        if (dog.id === dogId) {
          const updatedDog = { ...dog, isFavorite: !dog.isFavorite };
          Requests.updateDog(updatedDog)
            .then(() => {
              setFavoriteDogs(updatedDogs.filter((dog) => dog.isFavorite));
              setUnfavoriteDogs(updatedDogs.filter((dog) => !dog.isFavorite));
            })
            .catch((error) => {
              console.error("Error updating dog:", error);
            });
          return updatedDog;
        }

        return dog;
      });
      return updatedDogs;
    });
    setIsLoading(false);
  };

  const createNewDog = (dog) => {
    setIsLoading(true);
    Requests.postDog(dog).then(() => {
      Requests.getAllDogs().then((dogs) => {
        setAllDogs(dogs);
        setFavoriteDogs(dogs.filter((dog) => dog.isFavorite));
        setUnfavoriteDogs(dogs.filter((dog) => !dog.isFavorite));
      });
    });
    setIsLoading(false);
  };

  const deleteDog = (dogId) => {
    setIsLoading(true);
    Requests.deleteDog(dogId)
      .then(() => {
        setAllDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== dogId));
        setFavoriteDogs((prevDogs) =>
          prevDogs.filter((dog) => dog.id !== dogId)
        );
        setUnfavoriteDogs((prevDogs) =>
          prevDogs.filter((dog) => dog.id !== dogId)
        );
      })
      .finally(() => setIsLoading(false));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab == activeTab ? "" : tab);
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        favoriteDogsCount={favoriteDogs.length}
        unfavoriteDogsCount={unfavoriteDogs.length}
        activeTab={activeTab}
        onHandleTabChange={handleTabChange}
      >
        {!activeTab && (
          <FunctionalDogs
            allDogs={allDogs}
            onToggleFavorite={toggleFavoriteStatus}
            onDeleteDog={deleteDog}
          />
        )}
        {activeTab === "favorited" && (
          <FunctionalDogs
            allDogs={favoriteDogs}
            onToggleFavorite={toggleFavoriteStatus}
            onDeleteDog={deleteDog}
          />
        )}
        {activeTab === "unfavorited" && (
          <FunctionalDogs
            allDogs={unfavoriteDogs}
            onToggleFavorite={toggleFavoriteStatus}
            onDeleteDog={deleteDog}
          />
        )}
        {activeTab === "createDog" && (
          <FunctionalCreateDogForm onCreateNewDog={createNewDog} />
        )}
      </FunctionalSection>
    </div>
  );
}
