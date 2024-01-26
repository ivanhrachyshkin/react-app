import "./ModalWindow.css";


function ModalWindow(props: any) {

  function applyEdit(event: any) {
    event.preventDefault();
    const newName = new FormData(event.target);
    const change = Object.fromEntries(newName);

    props.onSubmitEdit(change);
    event.target.reset();
  }

  return (
    <div className="window">
      <div className="container">
        <form className="form" onSubmit={applyEdit}>
          <label>
            Gender
            <input name="gender" type="text" required />
          </label>
          <label>
            Date of Birth
            <input name="dateOfBirth" type="date" required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWindow;
