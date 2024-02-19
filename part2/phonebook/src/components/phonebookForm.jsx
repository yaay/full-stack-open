const PhonebookForm = ({newName, newNumber, handleNameChange, handleNumberChange, addNewPerson}) => {
  return (
    <form>
      <h3>add a new</h3>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addNewPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PhonebookForm