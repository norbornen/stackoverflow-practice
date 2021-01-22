// @ts-check

class User {
  front_id;;
  email;
  username;
  password;
  registration_date = null;
  role;
  sessions = [];
  is_confirmed;
  is_blocked;

  constructor() {
  }
}


module.exports = User;
