import React from "react";


const BirthdayForm = ( props ) => {
  const { birthday, setBirthday, setShowBirthday } = props;

  return (
    <>
      <div>Please tell us your birthday</div>
      <div>
        <i className="fa-lg fas fa-birthday-cake" />
        <input 
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}  
        />
      </div>
      <button type="submit">Confirm</button>
      <div>
        <button onClick={() => setShowBirthday(false)}>Back</button>
        <button type="submit">Later</button>
      </div>
    </>
  )
}

export default BirthdayForm;