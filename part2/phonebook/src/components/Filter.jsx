const Filter = (props) => {
  return (
    <span>
      filter shown with
      <input onChange={props.handleSearchChange} />
    </span>
  );
};

export default Filter