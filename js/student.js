//Класс Student с конструктором и методами работы с данными студентов
export default class Student {
  constructor(name, surname, lastname, faculty, start, birthDate) {
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.faculty = faculty
    this.start = start
    this.birthDate = birthDate
  }


  //Сделали свойством через get
  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
  }

  // getFIO() {
  //   return this.surname + ' ' + this.name + ' ' + this.lastname
  // }

  //Методы класса
  getStudentPeriod() {
    const currentTime = new Date();
    return currentTime.getFullYear() - this.start;
  }

  getBirthDateString() {
    const yyyy = this.birthDate.getFullYear();
    let mm = this.birthDate.getMonth() + 1;
    let dd = this.birthDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy;
  }

  getAge() {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    let m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
