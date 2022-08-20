import React from "react";
import {
  useCreateMovieDispatchContext,
  useCreateMovieStateContext,
} from "../contextapi/movieContext";
import "./table.css";
import { Modal } from "bootstrap";
export default function Table(props) {
  const numberOfButtons = Math.ceil(props.moviesData.length / 4);
  const [editId, setEditId] = React.useState();
  const [title, setTitle] = React.useState();
  const [stock, setStock] = React.useState();
  const [genre, setGenre] = React.useState();
  const [rating, setRating] = React.useState();
  let finalContent = props.moviesData.filter((value, index) => {
    if (
      index >= props.selectedPage * 4 - 4 &&
      index <= props.selectedPage * 4 - 1
    ) {
      return true;
    } else {
      return false;
    }
  });

  let buttonArray = [];

  for (let i = 0; i < numberOfButtons; i++) {
    buttonArray = [...buttonArray, i + 1];
  }

  const handlePagination = (pageNumber) => {
    props.setSelectedPage(pageNumber);
  };

  const updateMovies = useCreateMovieDispatchContext();
  const oldMovies = useCreateMovieStateContext();
  const handleEdit = (id) => {
    oldMovies.genreData.forEach((value) => {
      if (value.Movie_ID === id) {
        value.Title = title;
        value.Genre = genre;
        value.Stock = stock;
        value.Rate = rating;
      }
    });
    console.log(title, genre);
    updateMovies(oldMovies.genreData);
    setEditId(undefined);
  };

  const columnNames = ["Title", "Genre", "Stock", "Rate", "Delete", "Edit"];

  return (
    <>
      <div className="tableContainer">
        <table>
          <tbody>
            <tr>
              {columnNames.map((value, index) => {
                return (
                  <th
                    onClick={() => {
                      props.handleSort(value, index);
                    }}
                  >
                    {value}
                  </th>
                );
              })}
            </tr>
            {finalContent.map((value, index) => {
              return (
                <tr>
                  {editId === value.Movie_ID ? (
                    <td>
                      <input
                        type="text"
                        onChange={(event) => {
                          setTitle(event.target.value);
                        }}
                        value={title}
                      ></input>
                    </td>
                  ) : (
                    <td>{value.Title}</td>
                  )}
                  {editId === value.Movie_ID ? (
                    <td>
                      <input
                        type="text"
                        value={genre}
                        onChange={(event) => {
                          setGenre(event.target.value);
                        }}
                      ></input>
                    </td>
                  ) : (
                    <td>{value.Genre}</td>
                  )}
                  {editId === value.Movie_ID ? (
                    <td>
                      <input
                        type="text"
                        value={stock}
                        onChange={(event) => {
                          setStock(event.target.value);
                        }}
                      ></input>
                    </td>
                  ) : (
                    <td>{value.Stock}</td>
                  )}
                  {editId === value.Movie_ID ? (
                    <td>
                      <input
                        type="text"
                        value={rating}
                        onChange={(event) => {
                          setRating(event.target.value);
                        }}
                      ></input>
                    </td>
                  ) : (
                    <td>{value.Rate}</td>
                  )}
                  <td>
                    <button
                      onClick={() => {
                        props.handleDelete(value.Movie_ID);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {editId === value.Movie_ID ? (
                      <button
                        onClick={() => {
                          handleEdit(value.Movie_ID);
                        }}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditId(value.Movie_ID);
                          setTitle(value.Title);
                          setGenre(value.Genre);
                          setStock(value.Stock);
                          setRating(value.Rate);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          {buttonArray.map((value, index) => {
            return (
              <button
                style={{
                  backgroundColor:
                    props.selectedPage === index + 1
                      ? "rgb(13, 110, 253)"
                      : "white",
                  color: props.selectedPage === index + 1 ? "white" : "black",
                }}
                key={value.Movie_ID}
                onClick={() => {
                  handlePagination(value);
                }}
                className="buttons"
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
