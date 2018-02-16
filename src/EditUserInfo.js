import React, { Component } from 'react';

class EditUserInfo extends Component {
  constructor(){
    super();
    this.state={
      firstname:'',
      lastname:'',
      password:'',
      phonenumber: ''
    }
  }
  editUser = ()=>{
      const edit = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        password: this.state.password,
        phonenumber: this.state.phonenumber
      }
    }
  }
  render() {
    return (
      <div>
        <form>
        </form>
      </div>
    );
  }
}

export default EditUserInfo;