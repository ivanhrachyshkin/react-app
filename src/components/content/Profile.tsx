import { useEffect, useState } from "react";
import { FormDataType } from "../../types/FormDataType";

function Profile() {

  const [formData, setFormData] = useState<FormDataType>({} as FormDataType);

  useEffect(() => {
    const formDataString = sessionStorage.getItem('formData');
    if (!formDataString) return;
    const newFormData = JSON.parse(formDataString) as FormDataType;
    setFormData(newFormData);
  }, []);

  function applyNameChange(event: any) {
    event.preventDefault();
    const newName = new FormData(event.target);
    const newNameObject = Object.fromEntries(newName);

    setFormData({
      ...formData,
      name: newNameObject.name as string,
    });
    event.target.reset();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <span>Name: {formData?.name ? formData.name : 'Unauthorized'}</span>
        <form onSubmit={applyNameChange}>
          <input name="name" type="text" required />
          <button>Submit</button>
        </form>
      </div>
      <div>
        <span>Email: {formData?.email ? formData.email : 'Unauthorized'}</span>
      </div>
    </div>
  );
}

export default Profile;
