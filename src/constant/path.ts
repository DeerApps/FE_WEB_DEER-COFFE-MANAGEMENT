const path = {
  home: '/',
  employees: '/manager/employees',
  users: '/users',
  approval: '/manager/approval',
  schedule: '/manager/schedule',
  approvalForm: '/manager/approval/:formId',
  login: '/login',
  logout: '/logout',
  user: '/user'
} as const

export default path
