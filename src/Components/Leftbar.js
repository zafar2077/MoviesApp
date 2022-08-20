import React from "react";
import "./leftbar.css";

export default function Leftbar({
  selectedGenre,
  handleSelectedGenre,
  setSelectedPage,
}) {
  return (
    <>
      <div className="barContainer">
        <p
          onClick={() => {
            handleSelectedGenre("All Movies");
            setSelectedPage(1);
          }}
          className="leftBarText"
          style={{
            backgroundColor:
              selectedGenre === "All Movies" ? "rgb(13, 110, 253)" : "white",
            color: selectedGenre === "All Movies" ? "white" : "black",
          }}
        >
          All Movies
        </p>
        <p
          onClick={() => {
            handleSelectedGenre("Action");
            setSelectedPage(1);
          }}
          className="leftBarText"
          style={{
            backgroundColor:
              selectedGenre === "Action" ? "rgb(13, 110, 253)" : "white",
            color: selectedGenre === "Action" ? "white" : "black",
          }}
        >
          Action
        </p>
        <p
          onClick={() => {
            handleSelectedGenre("Comedy");
            setSelectedPage(1);
          }}
          className="leftBarText"
          style={{
            backgroundColor:
              selectedGenre === "Comedy" ? "rgb(13, 110, 253)" : "white",
            color: selectedGenre === "Comedy" ? "white" : "black",
          }}
        >
          Comedy
        </p>
        <p
          onClick={() => {
            handleSelectedGenre("Thriller");
            setSelectedPage(1);
          }}
          className="leftBarText"
          style={{
            backgroundColor:
              selectedGenre === "Thriller" ? "rgb(13, 110, 253)" : "white",
            color: selectedGenre === "Thriller" ? "white" : "black",
          }}
        >
          Thriller
        </p>
      </div>
      ;
    </>
  );
}
