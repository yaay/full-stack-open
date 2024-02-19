import { useEffect, useState } from "react";
import "./App.css";
import PhonebookForm from "./components/phonebookForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notifications from "./components/Notifications";
import phonebookService from "./services/phonebook";

function App() {
  const [persons, setPersons] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((initialAddresses) => {
      setPersons(initialAddresses.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchFilter([]);
    if (searchValue != "") {
      setSearch(true);
      const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchFilter(filteredPersons);
    } else {
      setSearch(false);
    }
  };

  const findPerson = (persons, name) => {
    return persons.find((person) => person.name === name);
  };

  const findNumber = (persons, number) => {
    return persons.find((person) => person.number === number);
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    if (newName !== "") {
      if (findPerson(persons, newName) != undefined) {
        alert(
          newName +
            " is already added to the phonebook, replace the old number with new one?"
        );
        const person = findPerson(persons, newName);
        const updatedPerson = { ...person, number: newNumber };
        phonebookService
          .update(person.id, { ...person, number: updatedPerson })
          .then(
            setPersons(
              persons.map((x) =>
                x.id !== updatedPerson.id ? x : updatedPerson
              )
            )
          );
      } else {
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons[persons.length - 1].id + 1,
        };

        phonebookService.add(personObject).then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setMessageType("success");
          setMessage(`${response.data.name} is added to your phonebook`);
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        });
      }
    }
  };

  const deletePerson = (person) => {
    if (
      window.confirm(
        `Do you really want to delete ${[person.name]} from the phonebook?`
      )
    ) {
      phonebookService
        .deleteAddress(person.id)
        .then((response) => {
          setPersons(
            persons.map((deletedPerson) =>
              deletedPerson.id != person.id ? deletedPerson : response.data
            )
          );
        })
        .catch((error) => {
          setMessageType("error");
          setMessage(`${person.name} is not on the server.`);
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <br />
      <Notifications message={message} type={messageType} />
      <br />
      <Filter handleSearchChange={handleSearchChange} />
      <PhonebookForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}
      />
      <Persons
        db={persons}
        search={search}
        searchFilter={searchFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
}

export default App;
