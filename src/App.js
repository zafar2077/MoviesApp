import React, { useEffect } from "react";
import Leftbar from "./Components/Leftbar";
import Table from "./Components/Table";
import {
  useCreateMovieDispatchContext,
  useCreateMovieStateContext,
} from "./contextapi/movieContext";
import "./App.css";
import Modal from "react-modal";

function App() {
  const [selectedGenre, setSelectedGenre] = React.useState("All Movies");
  const [sortedMovies, setSortedMovies] = React.useState();
  const [selectSortColumn, setSelectedSortColumn] = React.useState();
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState();
  const [deleteId, setDeleteId] = React.useState();
  const [add, setAdd] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const [newGenre, setNewGenre] = React.useState("");
  const [newStock, setNewStock] = React.useState("");
  const [newRate, setNewRate] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [deleteModalIsOpen, setDeletIsOpen] = React.useState(false);
  const [rememberUser, setRememberUser] = React.useState(false);

  let subtitle;
  const handleSelectedGenre = (selectedGenre) => {
    setSelectedGenre(selectedGenre);
  };

  const [checkValue, setCheckValue] = React.useState(false);
  const [tempId, setTempId] = React.useState();

  const movieData = useCreateMovieStateContext();

  const handleSort = (value) => {
    setPage(1);
    setSelectedSortColumn(value);
  };

  let tempArray =
    selectedGenre === "All Movies"
      ? movieData.genreData
      : movieData.genreData.filter((movie) => {
          return movie.Genre === selectedGenre ? true : false;
        });

  let sortedArray = !selectSortColumn
    ? [...tempArray]
    : [...tempArray].sort((a, b) => {
        if (a[selectSortColumn] > b[selectSortColumn]) {
          return 1;
        } else return -1;
      });

  const setMovieArray = useCreateMovieDispatchContext();

  React.useEffect(() => {
    const updatedArray = !deleteId
      ? [...movieData.genreData]
      : [...movieData.genreData].filter((value, index) => {
          if (value.Movie_ID === deleteId) {
            return false;
          } else {
            return true;
          }
        });

    setMovieArray(updatedArray);
  }, [deleteId]);

  const handleDelete = (id) => {
    if (rememberUser) {
      setDeleteId(id);
    } else {
      openDeleteModal();
      setTempId(id);
    }
  };

  sortedArray = !searchTerm
    ? [...sortedArray]
    : [...sortedArray].filter((value) => {
        if (value.Title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });

  const handleAdd = () => {
    const newArray = [
      {
        Movie_ID: movieData.genreData.length + 1,
        Title: newTitle,
        Genre: newGenre,
        Stock: newStock,
        Rate: newRate,
      },
      ...movieData.genreData,
    ];

    setMovieArray(newArray);
    setAdd(false);
    closeModal();
    setNewTitle("");
    setNewGenre("");
    setNewStock("");
    setNewRate("");
  };

  function openModal() {
    setIsOpen(true);
  }

  function openDeleteModal() {
    setDeletIsOpen(true);
  }

  function closeDeleteModal() {
    setDeletIsOpen(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleChange = (e) => {
    setRememberUser(e.target.checked);
  };
  return (
    <div className="appContainer">
      <h4>Showing {sortedArray.length} movies in Database</h4>
      <div className="searchContainer">
        <span>
          <i class="fa fa-search"></i>
          <input
            type="text"
            className="input-field"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="search"
          ></input>
        </span>
        <button
          onClick={() => {
            openModal();
          }}
          style={{ marginLeft: "100px" }}
        >
          Add A New Movie
        </button>
      </div>
      <div className="App">
        <Leftbar
          selectedGenre={selectedGenre}
          handleSelectedGenre={handleSelectedGenre}
          setSelectedPage={setPage}
        />
        <div className="outerTable">
          {
            <Table
              moviesData={sortedArray}
              selectedGenre={selectedGenre}
              selectedPage={page}
              setSelectedPage={setPage}
              sortedMovies={sortedMovies}
              setSortedMovies={setSortedMovies}
              handleSort={handleSort}
              handleDelete={handleDelete}
            />
          }
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="addContainer">
          <h3>Add A Movie</h3>

          <div className="fieldContainer">
            Title{" "}
            <input
              className="input3"
              value={newTitle}
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
            ></input>
          </div>
          <div className="fieldContainer">
            Genre{" "}
            <input
              className="input3"
              value={newGenre}
              onChange={(event) => {
                setNewGenre(event.target.value);
              }}
            ></input>
          </div>
          <div className="fieldContainer">
            Stock{" "}
            <input
              className="input3"
              value={newStock}
              onChange={(event) => {
                setNewStock(event.target.value);
              }}
            ></input>
          </div>
          <div className="fieldContainer">
            Rate{" "}
            <input
              className="input3"
              value={newRate}
              onChange={(event) => {
                setNewRate(event.target.value);
              }}
            ></input>
          </div>
          <button
            onClick={() => {
              handleAdd();
            }}
          >
            Add
          </button>
        </div>
      </Modal>
      {!checkValue ? (
        <Modal
          isOpen={deleteModalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeDeleteModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="addModalContainer">
            <h2>Do you really want to delete?</h2>
            <span>
              Remember My Choice{" "}
              <input
                type="checkbox"
                onChange={(e) => {
                  handleChange(e);
                }}
              ></input>
            </span>
            <button
              onClick={() => {
                closeDeleteModal();
                setDeleteId(tempId);
                setCheckValue(rememberUser);
              }}
              style={{ marginTop: "20px" }}
            >
              Confirm
            </button>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
