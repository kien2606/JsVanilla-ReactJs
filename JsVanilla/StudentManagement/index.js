var stt = 1;
var listStudent = [
  {
    name: "Vũ Mạnh Kiên",
    studentCard: "B18DCAT124",
    classStudent: "D18CQAT04-B",
    kpa: 4.0,
  },
  {
    name: "Trần Hoài Nam",
    studentCard: "B18DCAT168",
    classStudent: "D18CQAT04-B",
    kpa: 4.1,
  },
  {
    name: "Tô Thiên Long",
    studentCard: "B18DCAT148",
    classStudent: "D18CQAT04-B",
    kpa: 4.2,
  },
];

//kiểm tra từ localStorage
if (window.localStorage.data) {
  listStudent = JSON.parse(window.localStorage.data);
} else {
  window.localStorage.setItem("data", JSON.stringify(listStudent));
}

// lay dự liệu nhúng vào table

let wrapListStudent = document.querySelector(".list-student");
function handlePage(students) {
  stt = students.length;
  return students.map((item) => {
    return ` <tr>
      <td>${item.name}</td>
      <td>${item.studentCard}</td>
      <td>${item.classStudent}</td>
      <td>${item.kpa}</td>
      <td>
        <div type="submit" class="btn btn-secondary btn-delete-student">Xóa</div>
      </td>
  </tr>`;
  });
}
wrapListStudent.innerHTML = handlePage(listStudent).join("");

//add student

const addStudent = (e) => {
  let name = document.querySelector("#nameStudent");
  let studentCard = document.querySelector("#cardStudent");
  let classStudent = document.querySelector("#class");
  let kpa = document.querySelector("#kpa");
  let newStudent = {
    name: name.value,
    studentCard: studentCard.value,
    classStudent: classStudent.value,
    kpa: kpa.value,
  };

  let existing = JSON.parse(localStorage.getItem("data"));

  existing.push(newStudent);

  localStorage.setItem("data", JSON.stringify(existing));
};

const addStudentBtn = document.querySelector(".btn-add-student");
addStudentBtn.addEventListener("click", addStudent);

//search student

function myFunction() {
  let input = document.getElementById("myInput").value;
  let list = JSON.parse(window.localStorage.data);
  let filterValue = list.filter((value) => {
    if (input == "") {
      return list;
    } else if (value.name.toLowerCase().includes(input.toLowerCase())) {
      return value;
    }
  });
  let result = filterValue.map((item) => {
    return ` <tr>
      <td>${item.name}</td>
      <td>${item.studentCard}</td>
      <td>${item.classStudent}</td>
      <td>${item.kpa}</td>
  </tr>`;
  });
  wrapListStudent.innerHTML = result.join("");
}

// delete student

const deleteStudent = document.querySelectorAll(".btn-delete-student");

deleteStudent.forEach((element,index) => {
  element.addEventListener("click", () => {
    console.log(listStudent);
    

    let newValue = [
      ...listStudent.slice(0 , index),
      ...listStudent.slice(index+1)
    ];
    
    localStorage.setItem("data", JSON.stringify(newValue));

  });
});
