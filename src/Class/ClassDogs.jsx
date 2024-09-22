import { DogCard } from "../Shared/DogCard";
import { Component } from "react";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component {
  render() {
    const { allDogs, onToggleFavorite, onDeleteDog } = this.props;

    return (
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
                onTrashIconClick={() => onDeleteDog(dog.id)}
                onHeartClick={() => onToggleFavorite(dog.id)}
                onEmptyHeartClick={() => onToggleFavorite(dog.id)}
                isLoading={false}
              />
            </div>
          </li>
        ))}
      </>
    );
  }
}
