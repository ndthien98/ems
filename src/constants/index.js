module.exports = {
  ROLE: {
    ADMIN: "ADMIN",
    STUDENT: "STUDENT",
    TEACHER: "TEACHER",
    NORMAL: "NORMAL",
  },
  REQUEST_STATUS: {
    WAITING1: 'WAITING1',
    WAITING2: 'WAITING2',
    WAITING3: 'WAITING3',
    ACCEPTED1: 'ACCEPTED1',
    ACCEPTED2: 'ACCEPTED2',
    ACCEPTED3: 'ACCEPTED3',
    REFUSED: 'REFUSED',
    accept: (old_status) => {
      switch (old_status) {
        case 'WAITING1':
          return 'ACCEPTED1'
        case 'WAITING2':
          return 'ACCEPTED2'
        case 'WAITING3':
          return 'ACCEPTED3'
        default:
          break;
      }
    },
    reject: (old_status) => {
      switch (old_status) {
        case 'WAITING1':
          return 'WAITING2'
        case 'WAITING2':
          return 'WAITING3'
        case 'WAITING3':
          return 'REFUSED'
        default:
          break;
      }
    }

  },
  STUDENT_STATUS: {
    CREATED: 'ACTIVE',
  },
  TEACHER_STATUS: {
    CREATED: 'ACTIVE',
  },
  TOPIC_STATUS: {
    CREATED: 'ACTIVE',
  },
  COMPANY_STATUS: {
    CREATED: 'ACTIVE',
  },

}
