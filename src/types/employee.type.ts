type Role = 'Employee' | 'Admin' | 'Manager' | 'SuperAdmin'

export interface Employee {
  Employee_id: string
  Email: string
  Password: string
  FullName: string
  PhoneNumber: string
  DateJoined: Date
  Address: string
  Role: Role
  Facial_data: string
  Manager_id: string
  isActive: Boolean
}
