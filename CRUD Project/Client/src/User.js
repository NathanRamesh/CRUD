import React from "react";
import {useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import Swal from "sweetalert2";

const User = (props) => {
    const[record,setRecord] = useState([])
    const defaultMaterialTheme = createTheme();
    const getData = () =>
    {
        fetch('http://localhost:3003/user')
        .then(resposne=> resposne.json())
        .then(res=>setRecord(res))
    }
  
    useEffect(() => {
       getData();
    },[])

    const columns = [
      {title: "ID", field:"id", editable:false},
      {title: "Name", field:"name"},
      {title: "Gender", field:"gender"},
      {title: "Email", field:"email"},
      {title: "Ph number", field:"phone"},
      {title: "Age", field:"age"},
      
    ]
  const updateAlert = () => {
      Swal.fire({  
          title: 'User Updated Successfully',  
          icon: 'success'
        }); 
  }

  const addAlert = () => {
    Swal.fire({  
        title: 'User Added Successfully',  
        icon: 'success'
      }); 
  }

  const deleteAlert = () => {
    Swal.fire({  
        title: 'User Deleted Successfully',  
        icon: 'success'
      }); 
  }
    return (
    <div class="table-responsive">
                <div style={{ width: '100%', height: '100%' }}>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title="User List"
                        data={record}
                        columns={columns}
                        editable= {{
                          onRowAdd: newRow => new Promise((resolve, reject) => {
                            setTimeout(() => {
                                fetch('http://localhost:3003/user/', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                      id: Math.floor(Math.random()*100),
                                      name: newRow.name,
                                      gender: newRow.gender,
                                      email: newRow.email,
                                      phone: newRow.phone,
                                      age: newRow.age
                                    }),
                                    headers: {
                                      'Content-type': 'application/json',
                                    },
                                  }).then((response) => response.json()).then((result) => {
                                    addAlert();
                                    getData();
                                    props.setRefresh(true);
                                  })
                            resolve()
                            },500)
                            props.setRefresh(false);
                          }),
                          onRowDelete: selectedRow => new Promise((resolve,reject) => {
                            const index = selectedRow.id;
                            setTimeout(() => {
                                fetch('http://localhost:3003/user/' + index, { 
                                    method: 'DELETE' }).then((response) => response.json())
                                .then((result) => {
                                  deleteAlert();
                                  getData();
                                  props.setRefresh(true);
                                })
                              resolve()
                            },500)
                            props.setRefresh(false);
                          }),
                          onRowUpdate: (newData,oldData) => new Promise((resolve,reject) => {
                            const index = oldData.id;
                            setTimeout(() => {
                                fetch('http://localhost:3003/user/' + index, {
                                    method: 'PUT',
                                    body: JSON.stringify({
                                      id: newData.id,
                                      name: newData.name,
                                      gender: newData.gender,
                                      email: newData.email,
                                      phone: newData.phone,
                                      age: newData.age
                                    }),
                                    headers: {
                                      'Content-type': 'application/json',
                                    },
                                  }).then((response) => response.json()).then((result) => {
                                    updateAlert();
                                    getData();
                                    props.setRefresh(true);
                                  })
                              resolve()
                            },500)
                            props.setRefresh(false);
                          })
                        }}
                        options={{
                          actionsColumnIndex:-1, addRowPosition:'first'
                        }}
                    />
                </ThemeProvider>
            </div>
        </div> 
    )
}
export default User