import { useEffect, useState } from "react";
import { Requests } from "../api";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalSection } from "./FunctionalSection";

export function FunctionalApp() {
  const [activeDog, setActiveDog] = useState(null);
  const [allDogs, setAllDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refetchDogs();
  }, []);

  const refetchDogs = () => {
    Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection allDogs={allDogs} />
      <FunctionalCreateDogForm />
    </div>
  );
}
