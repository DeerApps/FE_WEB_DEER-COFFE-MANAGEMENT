const path = {
  apply: '/',
  home: '/manager',
  employees: '/manager/employees',
  users: '/users',
  approval: '/manager/approval',
  schedule: '/manager/schedule',
  approvalForm: '/manager/approval/:formId',
  login: '/login',
  logout: '/logout',
  user: '/user',
  profile: '/profile',
  absentForm:'employee/application/absent'
} as const

export default path
