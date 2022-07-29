class UserDTO {
  constructor(user) {
    const { name, email } = user

    this.name = name
    this.email = email
  }
}

export default UserDTO
