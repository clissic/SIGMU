class UserDTO {
  constructor(avatar, first_name, last_name, rank, email, password) {
    this.avatar = avatar;
    this.first_name = first_name;
    this.last_name = last_name;
    this.rank = rank
    this.email = email;
    this.password = password;
  }
}

export default UserDTO;