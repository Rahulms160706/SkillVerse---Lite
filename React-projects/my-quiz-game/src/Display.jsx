function Display({ ques, selected, onSelect }) {
  return (
    <div className="question-container">
      <h3 className="question">{ques.que}</h3>

      {Object.entries(ques.opts).map(([key, value]) => (
        // Object.entries() converts object into an array of [key,value] pair
        // ([key, value]) is destructuring of array
        <label key={key} className="options">
          <input type="radio" name="option" checked={selected === key} onChange={() => onSelect(key)} />
          <span>{value}</span>
        </label>
      ))}
    </div>
  );
}

export default Display;
