import { useEffect, useState } from "react";
import { Requests } from "../api";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalSection } from "./FunctionalSection";
import { FunctionalDogs } from "./FunctionalDogs";

export function FunctionalApp() {
  const [count, setCount] = useState(0);
  const [allDogs, setAllDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refetchDogs();
  }, []);

  const refetchDogs = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
      })
      .finally(() => setIsLoading(false));
  };

  const toggleFavoriteStatus = (dogId) => {
    setAllDogs((prevDogs) =>
      prevDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: !dog.isFavorite } : dog
      )
    );
  };

  const favoriteDogsCount = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoriteDogsCount = allDogs.filter((dog) => !dog.isFavorite).length;

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        favoriteDogsCount={favoriteDogsCount}
        unfavoriteDogsCount={unfavoriteDogsCount}
      >
        <FunctionalDogs
          allDogs={allDogs}
          onToggleFavorite={toggleFavoriteStatus}
        />
        <FunctionalCreateDogForm />
      </FunctionalSection>
    </div>
  );
}
