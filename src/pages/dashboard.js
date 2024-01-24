import '../App.css';
import React, { useEffect, useReducer } from "react";
import "../table/style.css";
import Table from "../table/Table";
import { randomColor, shortId } from "../table/utils";

function reducer(state, action) {
    switch (action.type) {
      case "add_option_to_column":
        const optionIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
        );
        return {
          ...state,
          skipReset: true,
          columns: [
            ...state.columns.slice(0, optionIndex),
            {
              ...state.columns[optionIndex],
              options: [
                ...state.columns[optionIndex].options,
                { label: action.option, backgroundColor: action.backgroundColor }
              ]
            },
            ...state.columns.slice(optionIndex + 1, state.columns.length)
          ]
        };
      case "add_row":
        return {
          ...state,
          skipReset: true,
          data: [...state.data, {}]
        };
      case "update_column_type":
        const typeIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
        );
        switch (action.dataType) {
          case "number":
            if (state.columns[typeIndex].dataType === "number") {
              return state;
            } else {
              return {
                ...state,
                columns: [
                  ...state.columns.slice(0, typeIndex),
                  { ...state.columns[typeIndex], dataType: action.dataType },
                  ...state.columns.slice(typeIndex + 1, state.columns.length)
                ],
                data: state.data.map((row) => ({
                  ...row,
                  [action.columnId]: isNaN(row[action.columnId])
                    ? ""
                    : Number.parseInt(row[action.columnId])
                }))
              };
            }
          case "select":
            if (state.columns[typeIndex].dataType === "select") {
              return {
                ...state,
                columns: [
                  ...state.columns.slice(0, typeIndex),
                  { ...state.columns[typeIndex], dataType: action.dataType },
                  ...state.columns.slice(typeIndex + 1, state.columns.length)
                ],
                skipReset: true
              };
            } else {
              let options = [];
              state.data.forEach((row) => {
                if (row[action.columnId]) {
                  options.push({
                    label: row[action.columnId],
                    backgroundColor: randomColor()
                  });
                }
              });
              return {
                ...state,
                columns: [
                  ...state.columns.slice(0, typeIndex),
                  {
                    ...state.columns[typeIndex],
                    dataType: action.dataType,
                    options: [...state.columns[typeIndex].options, ...options]
                  },
                  ...state.columns.slice(typeIndex + 1, state.columns.length)
                ],
                skipReset: true
              };
            }
          case "text":
            if (state.columns[typeIndex].dataType === "text") {
              return state;
            } else if (state.columns[typeIndex].dataType === "select") {
              return {
                ...state,
                skipReset: true,
                columns: [
                  ...state.columns.slice(0, typeIndex),
                  { ...state.columns[typeIndex], dataType: action.dataType },
                  ...state.columns.slice(typeIndex + 1, state.columns.length)
                ]
              };
            } else {
              return {
                ...state,
                skipReset: true,
                columns: [
                  ...state.columns.slice(0, typeIndex),
                  { ...state.columns[typeIndex], dataType: action.dataType },
                  ...state.columns.slice(typeIndex + 1, state.columns.length)
                ],
                data: state.data.map((row) => ({
                  ...row,
                  [action.columnId]: row[action.columnId] + ""
                }))
              };
            }
          default:
            return state;
        }
      case "update_column_header":
        const index = state.columns.findIndex(
          (column) => column.id === action.columnId
        );
        return {
          ...state,
          skipReset: true,
          columns: [
            ...state.columns.slice(0, index),
            { ...state.columns[index], label: action.label },
            ...state.columns.slice(index + 1, state.columns.length)
          ]
        };
      case "update_cell":
        return {
          ...state,
          skipReset: true,
          data: state.data.map((row, index) => {
            if (index === action.rowIndex) {
              return {
                ...state.data[action.rowIndex],
                [action.columnId]: action.value
              };
            }
            return row;
          })
        };
      case "add_column_to_left":
        const leftIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
        );
        let leftId = shortId();
        return {
          ...state,
          skipReset: true,
          columns: [
            ...state.columns.slice(0, leftIndex),
            {
              id: leftId,
              label: "Column",
              accessor: leftId,
              dataType: "text",
              created: action.focus && true,
              options: []
            },
            ...state.columns.slice(leftIndex, state.columns.length)
          ]
        };
      case "add_column_to_right":
        const rightIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
        );
        const rightId = shortId();
        return {
          ...state,
          skipReset: true,
          columns: [
            ...state.columns.slice(0, rightIndex + 1),
            {
              id: rightId,
              label: "Column",
              accessor: rightId,
              dataType: "text",
              created: action.focus && true,
              options: []
            },
            ...state.columns.slice(rightIndex + 1, state.columns.length)
          ]
        };
      case "delete_column":
        const deleteIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
        );
        return {
          ...state,
          skipReset: true,
          columns: [
            ...state.columns.slice(0, deleteIndex),
            ...state.columns.slice(deleteIndex + 1, state.columns.length)
          ]
        };
      case "enable_reset":
        return {
          ...state,
          skipReset: false
        };
      default:
        return state;
    }
  }

function Dashboard() {
    let statuses = [
        {label: "Done", backgroundColor: '#CAFFBF'},
        {label: "In Progress", backgroundColor: '#FDFFB6'},
        {label: "Not Started", backgroundColor: '#FFADAD'}
    ];

    let data = [];
    let classes = [];

    let columns = [
        {
          id: "assignment",
          label: "Assignment",
          accessor: "assignment",
          minWidth: 100,
          dataType: "text",
          options: []
        },
        {
          id: "course",
          label: "Course",
          accessor: "music",
          dataType: "select",
          width: 200,
          options: classes
        },
        {
          id: "status",
          label: "Status",
          accessor: "status",
          dataType: "select",
          width: 200,
          options: statuses
        },
        {
          id: "dueDate",
          label: "Due Date",
          accessor: "dueDate",
          dataType: "text",
          width: 100,
          options: []
        }
      ];

    let assignmentData = {
        columns: columns,
        data: data
    }
    const [state, dispatch] = useReducer(reducer, assignmentData);

    useEffect(() => {
        dispatch({ type: "enable_reset" });
    }, [state.data, state.columns]);

  return (
    <div className='text-white'>
        <div className='titleContainer'>
            <div className=' w-screen text-center mt-8 text-4xl font-bold'>Assignment Tracker</div>
        </div>
        <div>
        <div
      style={{
        width: "100vw",
        overflowX: "hidden"
      }}
    >
      <div style={{ overflow: "auto", display: "flex" }}>
        <div
          style={{
            flex: "1 1 auto",
            padding: "1rem",
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <Table
            columns={state.columns}
            data={state.data}
            dispatch={dispatch}
            skipReset={state.skipReset}
          />
        </div>
      </div>
     
    </div>
    </div>
    </div>
    
  );
}

export default Dashboard;
