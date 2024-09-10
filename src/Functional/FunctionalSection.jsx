import { Link } from "react-router-dom";

export const FunctionalSection = ({
  children,
  favoriteDogsCount,
  unfavoriteDogsCount,
}) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div className={`selector active`} onClick={() => {}}>
            favorited ( {favoriteDogsCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div className={`selector`} onClick={() => {}}>
            unfavorited ( {unfavoriteDogsCount} )
          </div>
          <div className={`selector`} onClick={() => {}}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
