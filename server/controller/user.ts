import * as request from 'request';
import User from '../model/user';

class UserCtr {

  model = User;

  constructor() {
  }

  test = (req, res) => {
    res.json({ 
      status: 1, 
      message: 'success', 
      ip: req.connection.remoteAddress, 
      host: req.get('host') 
    });
  }

}

export default UserCtr;
