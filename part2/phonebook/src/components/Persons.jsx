const Persons = (props) => {
  if (props.search) {
    return (
      <>
        <h2>Numbers</h2>
        {props.searchFilter.map((person) => (
          <div key={person.id} style={{ marginBlockEnd: 15 }}>
            <p style={{ display: "inline", marginRight: 15 }}>
              {person.name} {person.number}
            </p>
            <button onClick={props.deletePerson(person)}>delete</button>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        <h2>Numbers</h2>
        {props.db.map((person) => (
          <div key={person.id} style={{ marginBlockEnd: 15 }}>
            <p style={{ display: "inline", marginRight: 15 }}>
              {person.name} {person.number}
            </p>
            <button onClick={() => {props.deletePerson(person)}}>delete</button>
          </div>
        ))}
      </>
    );
  }
};

export default Persons;
