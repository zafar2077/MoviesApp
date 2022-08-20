import React from "react";

const CreateMovieStateContext = React.createContext(undefined);
const CreateMovieDispatchContext = React.createContext(undefined);

function MovieProvider({ children }) {
  const [movieData, setMovieData] = React.useState([
    {
      Movie_ID: 1,
      Title: "Parasite",
      Genre: "Action",
      Stock: 7,
      Rate: 4.7,
      Description:
        "A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.",
    },
    {
      Movie_ID: 2,
      Title: "The Favourite",
      Genre: "Thriller",
      Stock: 2,
      Rate: 1.4,
      Description:
        "In early 18th century England, a frail Queen Anne occupies the throne and her close friend, Lady Sarah, governs the country in her stead. When a new servant, Abigail, arrives, her charm endears her to Sarah.",
    },
    {
      Movie_ID: 3,
      Title: "The Farewell I",
      Genre: "Comedy",
      Stock: 1,
      Rate: 12.0,
      Description:
        "A Chinese family discovers their grandmother has only a short while left to live and decide to keep her in the dark, scheduling a wedding to gather before she dies.",
    },
    {
      Movie_ID: 4,
      Title: "Marriage Story",
      Genre: "Thriller",
      Stock: 9,
      Rate: 2.3,
      Description:
        "Noah Baumbach's incisive and compassionate look at a marriage breaking up and a family staying together.",
    },
    {
      Movie_ID: 5,
      Title: "Booksmart",
      Genre: "Action",
      Stock: 12,
      Rate: 1.0,
      Description:
        "On the eve of their high school graduation, two academic superstars and best friends realize they should have worked less and played more. Determined not to fall short of their peers, the girls try to cram four years of fun into one night.",
    },
    {
      Movie_ID: 6,
      Title: "Interstellar",
      Genre: "Thriller",
      Stock: 3,
      Rate: 7.1,
      Description:
        "On the eve of their high school graduation, two academic superstars and best friends realize they should have worked less and played more. Determined not to fall short of their peers, the girls try to cram four years of fun into one night.",
    },
    {
      Movie_ID: 7,
      Title: "Jason Bourne",
      Genre: "Thriller",
      Stock: 8,
      Rate: 4.5,
      Description:
        "On the eve of their high school graduation, two academic superstars and best friends realize they should have worked less and played more. Determined not to fall short of their peers, the girls try to cram four years of fun into one night.",
    },
    {
      Movie_ID: 8,
      Title: "The Dictator",
      Genre: "Comedy",
      Stock: 3,
      Rate: 1.0,
      Description:
        "On the eve of their high school graduation, two academic superstars and best friends realize they should have worked less and played more. Determined not to fall short of their peers, the girls try to cram four years of fun into one night.",
    },
    {
      Movie_ID: 9,
      Title: "The Conjuring",
      Genre: "Thriller",
      Stock: 1,
      Rate: 1.0,
    },
    {
      Movie_ID: 10,
      Title: "Die Hard",
      Genre: "Action",
      Stock: 15,
      Rate: 5.2,
    },
    {
      Movie_ID: 11,
      Title: "The Hangover",
      Genre: "Comedy",
      Stock: 9,
      Rate: 3.0,
    },
    {
      Movie_ID: 12,
      Title: "Pixels",
      Genre: "Comedy",
      Stock: 3,
      Rate: 1.0,
    },
    {
      Movie_ID: 13,
      Title: "The Scary Movie",
      Genre: "Comedy",
      Stock: 2,
      Rate: 7.0,
    },
  ]);
  const [genreData, setGenreData] = React.useState(movieData);
  const handleGenreDataChange = (temp) => {
    setGenreData(temp);
  };

  return (
    <CreateMovieStateContext.Provider value={{ movieData, genreData }}>
      <CreateMovieDispatchContext.Provider value={handleGenreDataChange}>
        {children}
      </CreateMovieDispatchContext.Provider>
    </CreateMovieStateContext.Provider>
  );
}

const useCreateMovieStateContext = () => {
  const context = React.useContext(CreateMovieStateContext);

  if (context === undefined) {
    throw Error("useUserContext must be inside userProvider");
  }

  return context;
};

const useCreateMovieDispatchContext = () => {
  const context = React.useContext(CreateMovieDispatchContext);

  if (context === undefined) {
    throw Error("useUserContext must be inside userProvider");
  }

  return context;
};

export {
  MovieProvider,
  useCreateMovieStateContext,
  useCreateMovieDispatchContext,
};
