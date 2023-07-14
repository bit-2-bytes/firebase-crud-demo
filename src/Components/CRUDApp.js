import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { db } from '../firebase';
import { collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import uuid from 'react-uuid';
import 'primeicons/primeicons.css';
import './CRUDApp.css'


function CRUDApp() {
  const [userName, setuserName] = useState('');
  const [userRole, setuserRole] = useState('');
  const [allUserData, setallUserData] = useState([]);


  /// to fetch data from firestore db
  const fetchDbData = async () => {
    await getDocs(collection(db, "Freelancers"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setallUserData(newData);
      })
  }

  useEffect(() => {
    fetchDbData();
  }, [])

  /// to add data to firestore db
  const addDataToDb = async () => {
    const newData = {
      Name: userName,
      Role: userRole,
      Id: uuid()
    };
    await setDoc(doc(db, "Freelancers", uuid()), newData);
    setuserName("");
    setuserRole("");
    fetchDbData();
  }

    /// to edit data in firestore db
  const editObj = async (rowData) => {
    const data = {
      Role: ""
    };

    await updateDoc(doc(db, "Freelancers", rowData), data)
    fetchDbData();
  };

    /// to delete data in firestore db
  const deleteObj = async (rowData) => {
    await deleteDoc(doc(db, "Freelancers", rowData));
    fetchDbData();
  };

  const deleteButtonTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-danger"
        onClick={() => deleteObj(rowData.id)}
      />
    );
  };

  const editButtonTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-file-edit"
        className="p-button-primary"
        onClick={() => editObj(rowData.id)}
      />
    );
  };

  return (
    <div className="CRUD-App">
      <span className="p-float-label">
        <InputText id="username" value={userName} onChange={(e) => setuserName(e.target.value)} />
        <label htmlFor="username">Username</label>
      </span>
      <br />
      <span className="p-float-label">
        <InputText id="userrole" value={userRole} onChange={(e) => setuserRole(e.target.value)} />
        <label htmlFor="userrole">Role</label>
      </span>
      <br />
      <Button label="Submit" severity="warning" onClick={addDataToDb} />
      <br />
      <div className="card">
        <DataTable value={allUserData} tableStyle={{ minWidth: '50rem' }} >
          <Column field="Name" header="Name" ></Column>
          <Column field="Role" header="Role"></Column>
          <Column header="Remove role" body={editButtonTemplate} ></Column>
          <Column header="Delete" body={deleteButtonTemplate} ></Column>
        </DataTable>
      </div>
    </div>
  )
}

export default CRUDApp;