//Отрисовка таблицы и все все все

import Student from './student.js'

//Массив студентов
const students = [
  new Student('Игорь', 'Фролов', 'Сергеевич', 'Радиотехника', 2019, new Date(1998, 2, 21)),
  new Student('Алена', 'Фролова', 'Сергеевна', 'Машиностроение', 2021, new Date(2002, 4, 11)),
  new Student('Игорь', 'Филипов', 'Гуриевич', 'Юриспруденция', 2010, new Date(1976, 1, 1)),
];

const $studentsList = document.getElementById('students-list'),
  $studentsListTHALL = document.querySelectorAll('.students-table th')

let column = 'fio',
  columnDir = true;

//Получить ТR студента
function newStudentTR(student) {
  const $studentTR = document.createElement('tr'),
    $fioTD = document.createElement('td'),
    $birthDateTD = document.createElement('td'),
    $startTD = document.createElement('td'),
    $facultyTD = document.createElement('td')

  //Склонение возраста
  function declination(age) {
    let txt;
    let count = age % 100;
    if (count >= 5 && count <= 20) {
      txt = ' лет';
    } else {
      count = count % 10;
      if (count == 1) {
        txt = ' год';
      } else if (count >= 2 && count <= 4) {
        txt = ' года';
      } else {
        txt = ' лет';
      }
    }
    return txt;
  }

  //Закончил
  function graduated(txt) {
    student.start = parseInt(student.start)
    if (student.getStudentPeriod() <= 4) {
      txt = `${student.start} -${(student.start + student.getStudentPeriod())}  (${student.getStudentPeriod()} курс)`;
    } else {
      txt = `${student.start} - ${(student.start + 4)} Закончил`;
    }
    return txt;
  }


  $fioTD.textContent = student.fio;
  $facultyTD.textContent = student.faculty;
  $birthDateTD.textContent = `${student.getBirthDateString()} (${student.getAge() + declination(student.getAge())})`
  $startTD.textContent = graduated(student.start);

  $studentTR.append($fioTD)
  $studentTR.append($facultyTD)
  $studentTR.append($birthDateTD)
  $studentTR.append($startTD)

  return $studentTR;
}

//Получить сортировку sort массива по параметрам
function getSortStudents(prop, dir) {
  const studentsCopy = [...students];
  return studentsCopy.sort(function (studentA, studentB) {
    if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
      return -1;
  })
}

//Рендер результата
function render() {
  let studentsCopy = [...students]

  studentsCopy = getSortStudents(column, columnDir);
  $studentsList.innerHTML = '';

  for (const student of studentsCopy) {
    $studentsList.append(newStudentTR(student))
  }
}

//Событие сортировки
$studentsListTHALL.forEach(element => {
  element.addEventListener('click', function () {
    column = this.dataset.column
    columnDir = !columnDir
    render()
  })
})
render()

//валидация формы
const surnameInput = document.querySelector('#input-surname');
const firstNameInput = document.querySelector('#input-name');
const lastNameInput = document.querySelector('#input-lastname');
const facultyInput = document.querySelector('#input-faculty');
const startInput = document.querySelector('#input-start');
const birthDateInput = document.querySelector('#input-birthDate');

const nameSpan = document.querySelector('#name-span');
const surnameSpan = document.querySelector('#surname-span');
const lastnameSpan = document.querySelector('#lastname-span');
const facultySpan = document.querySelector('#faculty-span');
const startSpan = document.querySelector('#start-span');
const birthDateSpan = document.querySelector('#birthDate-span');

function validateFirstName(firstName) {
  firstName = firstName.trim();
  if (firstName === '') {
    return 'Имя студента не может быть пустым';
  }
  if (!/^[a-zA-ZА-ЯËа-яё]+$/.test(firstName)) {
    return 'Имя студента должно состоять из букв';
  } else {
    return undefined;
  }
}

function validateSurName(surName) {
  surName = surName.trim();
  if (surName === '') {
    return 'Фамилия студента не может быть пустой';
  }
  if (!/^[a-zA-ZА-ЯËа-яё]+$/.test(surName)) {
    return 'Фамилия студента должна состоять из букв';
  } else {
    return undefined;
  }
}

function validateLastName(lastName) {
  lastName = lastName.trim();
  if (lastName === '') {
    return 'Отчество студента не может быть пустым';
  }
  if (!/^[a-zA-ZА-ЯËа-яё]+$/.test(lastName)) {
    return 'Отчество студента должно состоять из букв';
  } else {
    return undefined;
  }
}

function validateFaculty(faculty) {
  faculty = faculty.trim();
  if (faculty === '') {
    return 'Факультет студента не может быть пустым';
  }
  if (!/^[a-zA-ZА-ЯËа-яё]+$/.test(faculty)) {
    return 'Факультет студента должен состоять из букв';
  } else {
    return undefined;
  }
}

function validateStart(start) {
  start = start.trim();
  if (start === '') {
    return 'Год поступления студента не может быть пустым';
  }
  if (!/^[0-9]+$/.test(start)) {
    return 'Год поступления студента должен состоять из цифр';
  }
  if (start < 2000 || start > new Date().getFullYear()) {
    return 'Год указан в неверном формате';
  } else {
    return undefined;
  }
};

function validateBirthDate(birthDate) {

  const regex_date = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  let parts = birthDate.split('-');
  let day = parseInt(parts[2]);
  let month = parseInt(parts[1]);
  let year = parseInt(parts[0]);

  if (birthDate === '') {
    return 'Дата рождения не может быть пустой';
  }
  if (!regex_date.test(birthDate)) {
    return 'Дата поступления студента должна состоять из цифр';
  }
  if (year < 1900 || year > new Date().getFullYear()) {
    return 'Дата указана в неверном форматe';
  } else {
    return undefined;
  }
}

//сумбит, проверка и построение
document.getElementById('add-student').addEventListener('submit', function (e) {
  e.preventDefault();

  let firstName = firstNameInput.value;
  let surName = surnameInput.value;
  let lastName = lastNameInput.value;
  let faculty = facultyInput.value;
  let start = startInput.value;
  let birthDate = birthDateInput.value;

  let isValid = true;
  let string = '';

  const surNameError = validateSurName(surName);
  const firstNameError = validateFirstName(firstName);
  const lastNameError = validateLastName(lastName);
  const facultyError = validateFaculty(faculty);
  const startError = validateStart(start);
  const birthDateError = validateBirthDate(birthDate);

  surnameSpan.innerHTML = '';
  nameSpan.innerHTML = '';
  lastnameSpan.innerHTML = '';
  facultySpan.innerHTML = '';
  startSpan.innerHTML = '';
  birthDateSpan.innerHTML = '';

  if (typeof surNameError === typeof string) {
    isValid = false;
    surnameSpan.innerHTML = `${string}`;
    surnameInput.classList.add('is-invalid');
    surnameSpan.append(surNameError);
  }
  if (typeof firstNameError === typeof string) {
    isValid = false;
    nameSpan.innerHTML = `${string}`;
    firstNameInput.classList.add('is-invalid');
    nameSpan.append(firstNameError);
  }
  if (typeof lastNameError === typeof string) {
    isValid = false;
    lastnameSpan.innerHTML = `${string}`;
    lastNameInput.classList.add('is-invalid');
    lastnameSpan.append(lastNameError);
  }
  if (typeof facultyError === typeof string) {
    isValid = false;
    facultySpan.innerHTML = `${string}`;
    facultyInput.classList.add('is-invalid');
    facultySpan.append(facultyError);
  }
  if (typeof startError === typeof string) {
    isValid = false;
    startSpan.innerHTML = `${string}`;
    startInput.classList.add('is-invalid');
    startSpan.append(startError);
  }
  if (typeof birthDateError === typeof string) {
    isValid = false;
    birthDateSpan.innerHTML = `${string}`;
    birthDateInput.classList.add('is-invalid');
    birthDateSpan.append(birthDateError);
  }


  if (typeof surNameError === typeof undefined) {
    surnameInput.classList.remove('is-invalid')
    surnameInput.classList.add('is-valid');
    surnameSpan.remove(surNameError);
  }
  if (typeof firstNameError === typeof undefined) {
    firstNameInput.classList.remove('is-invalid')
    firstNameInput.classList.add('is-valid');
    nameSpan.remove(firstNameError);
  }
  if (typeof lastNameError === typeof undefined) {
    lastNameInput.classList.remove('is-invalid')
    lastNameInput.classList.add('is-valid');
    lastnameSpan.remove(lastNameError);
  }
  if (typeof facultyError === typeof undefined) {
    facultyInput.classList.remove('is-invalid')
    facultyInput.classList.add('is-valid');
    facultySpan.remove(facultyError);
  }
  if (typeof startError === typeof undefined) {
    startInput.classList.remove('is-invalid')
    startInput.classList.add('is-valid');
    startSpan.remove(startError);
  }
  if (typeof birthDateError === typeof undefined) {
    birthDateInput.classList.remove('is-invalid')
    birthDateInput.classList.add('is-valid');
    birthDateSpan.remove(birthDateError);
  }

  // если проверка успешна то
  if (isValid) {
    students.push(new Student(
      firstName,
      surName,
      lastName,
      faculty,
      start,
      new Date(birthDate)
    ));
    render();

    //очистка
    if (firstName != string) {
      firstNameInput.value = string;
      surnameInput.value = string;
      lastNameInput.value = string;
      facultyInput.value = string;
      startInput.value = string;
      birthDateInput.value = string;
    }

    surnameInput.classList.remove('is-valid');
    firstNameInput.classList.remove('is-valid');
    lastNameInput.classList.remove('is-valid');
    facultyInput.classList.remove('is-valid');
    startInput.classList.remove('is-valid');
    birthDateInput.classList.remove('is-valid');
  }
});
