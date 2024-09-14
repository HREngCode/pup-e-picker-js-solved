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
    setAllDogs((prevDogs) =>
      prevDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: !dog.isFavorite } : dog
      )
    );

    setFavoriteDogs((prevDogs) =>
      prevDogs.some((dog) => dog.id === dogId)
        ? prevDogs.filter((dog) => dog.id !== dogId)
        : [...prevDogs, allDogs.find((dog) => dog.id === dogId)]
    );

    setUnfavoriteDogs((prevDogs) =>
      prevDogs.some((dog) => dog.id === dogId)
        ? prevDogs.filter((dog) => dog.id !== dogId)
        : [...prevDogs, allDogs.find((dog) => dog.id === dogId)]
    );
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
        handleTabChange={handleTabChange}
      >
        {(!activeTab || activeTab === "all") && (
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
        {activeTab === "createDog" && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
