import React from "react";
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';

function Femalecount (props) {
    const defaultMaterialTheme = createTheme();
    const columns = [
        {title: "ID", field:"id", editable:false},
        {title: "Name", field:"name"},
        {title: "Gender", field:"gender"},
        {title: "Email", field:"email"},
        {title: "Ph number", field:"phone"},
        {title: "Age", field:"age"},
      ]
    return (
        <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title="User List"
                        data={props.item}
                        columns={columns}/>
         </ThemeProvider>
    )
}

export default Femalecount;