export const dataGridClassNames = 
"border border-stroke-dark bg-[#1d1f21] shadow text-gray-200";

export const dataGridSxStyles = () => {
    return {
        backgroundColor: "#1d1f21",
        color: "#fff",
        border: 0,
       
       
            "& .MuiDataGrid-columnHeaders": {
            color: "#e5e7eb",
            '& [role="row"] > *': {
                backgroundColor: "#1d1f21",
                borderColor: "#fff",
            },
            },
             '& .MuiCheckbox-root svg': {
                                width: 16,
                                height: 16,
                                backgroundColor: 'transparent',
                                border: '1px solid #d9d9d9',
                                
                                },

            '& .MuiDataGrid-cell': {
            backgroundColor: "#1d1f21",
            color: '#fff',
            borderColor:'#2d3135'
            },
            '& .MuiDataGrid-footerContainer': {
            backgroundColor: "#1d1f21",
            color: '#fff',
            '& .MuiSvgIcon-root': {
                color: '#fff',
            },
            '& .MuiTablePagination-root, & .MuiTablePagination-toolbar, & .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-displayedRows': {
                color: '#fff',
            },
            },
            
        
    };
};

export const tableViewSxStyles = ()=>{
    return {
          backgroundColor: "#1d1f21",
                color: "#fff",
                border: 0,
                "& .MuiDataGrid-columnHeaders": {
                    color: "#e5e7eb",
                    '& [role="row"] > *': {
                        backgroundColor: "#1d1f21",
                        borderColor: "#fff",
                    },
                },
                '.MuiDataGrid-cell': {
                    backgroundColor: "#1d1f21",
                    borderColor: '#2d3135',
                    color: "#fff",
                },
                '.MuiDataGrid-footerContainer': {
                    backgroundColor: "#1d1f21",
                    color: "#fff",
                },
                '.MuiDataGrid-toolbarContainer': {
                    backgroundColor: "#1d1f21",
                    color: "#fff",
                },
                '.MuiTablePagination-root': {
                    backgroundColor: "#1d1f21",
                    color: "#fff",
                },
    }
}

