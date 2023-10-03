class SessionDTO {
    constructor(session) {
      this.email = session.user.email || null;
      this.first_name = session.user.first_name || null;
      this.last_name = session.user.last_name || null;
      this.rank = session.user.rank || null;
      this.role = session.user.role || null;
    }
  }
  
  export default SessionDTO;