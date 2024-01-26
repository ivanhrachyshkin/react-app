import { useEffect, useReducer, useState } from "react";
import { FormDataType } from "../../types/FormDataType";
import ModalWindow from "../modals/ModalWindow";

function Profile() {
  const [formData, setFormData] = useState<FormDataType>({} as FormDataType);

  const [isModalShown, dispatch] = useReducer(reducer, false);
  function reducer(isModalShown: boolean, isOpenAction: boolean) {
    return isOpenAction ? true : false;
  }

  useEffect(() => {
    const formDataString = sessionStorage.getItem('formData');
    if (!formDataString) return;
    const newFormData = JSON.parse(formDataString) as FormDataType;
    setFormData(newFormData);
  }, []);


  function handleEdit(change: any) {
    setFormData({
      ...formData,
      gender: change.gender as string,
      dateOfBirth: change.dateOfBirth as Date
    })
    sessionStorage.setItem('formData', JSON.stringify(formData))
    dispatch(false);
  }

  return (
    <div >
      <div style={{ display: "flex", gap: ".25rem", flexDirection: "column" }}>
        <span>Name: {formData?.name ? formData.name : 'Unauthorized'}</span>
        <span>Email: {formData?.email ? formData.email : 'Unauthorized'}</span>
        {formData.gender && <span>Gender: {formData?.gender}</span>}
        {formData.dateOfBirth && <span>Date of Birth: {formData?.dateOfBirth.toString()}</span>}
      </div>
      <button onClick={() => dispatch(true)}>Edit </button>
      {isModalShown && <ModalWindow onSubmitEdit={handleEdit} />}
    </div>
  );
}

export default Profile;
