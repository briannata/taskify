import {randomColor} from "./utils";

export default function makeData(count) {
  let data = [];
  let classes = [];
  let statuses = [
    {label: "Done", backgroundColor: randomColor()},
    {label: "In Progress", backgroundColor: randomColor()},
    {label: "Not Started", backgroundColor: randomColor()}
  ];
  for (let i = 0; i < count; i++) {
    let row = {
      ID: i,
      assignment: "test",
      course: "test",
      status: "Done",
      dueDate: new Date(),
    };
    classes.push({label: row.course, backgroundColor: randomColor()});
    data.push(row);
  }

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
    },
    {
      id: 999999,
      width: 20,
      label: "+",
      disableResizing: true,
      dataType: "null"
    }
  ];
  return {columns: columns, data: data, skipReset: false};
}
