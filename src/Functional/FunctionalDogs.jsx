import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
// import { dogPictures } from "../dog-pictures";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({ allDogs, onToggleFavorite }) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {allDogs.map((dog) => (
        <li key={dog.id}>
          <div>
            <DogCard
              dog={{
                image: dog.image,
                description: dog.description,
                isFavorite: dog.isFavorite,
                name: dog.name,
              }}
              onTrashIconClick={() => {
                alert("clicked trash");
              }}
              onHeartClick={() => onToggleFavorite(dog.id)}
              onEmptyHeartClick={() => onToggleFavorite(dog.id)}
              isLoading={false}
            />
          </div>
        </li>
      ))}
    </>
  );
};
