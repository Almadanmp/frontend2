import React, {Component} from 'react';
import TextInput from './TextInput';
import {connect} from 'react-redux';
import {logInUser} from './sessionActions';
import {Alert} from 'reactstrap';
import {fetchUserRole} from "../user/ActionsUserRole";

export class LogInPage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {credentials: {username: '', password: ''}, collapse: false, loggedIn: false}
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    this.setState({credentials: credentials})
  }

  onSave = async event => {
    event.preventDefault();
    logInUser(this.state.credentials.username, this.state.credentials.password)
      .then(res => {
        //If the login is successful the user gets redirected to its home page
        if (res.status === 200) {
          this.setState({loggedIn: true});
          this.props.history.replace('/about');
          this.props.onFetchUserRole()
        }
      })
      .catch(err => {
          this.setState({loggedIn: null})
          return console.log(err);
        }
      )
  };

  render() {
    const {credentials} = this.state;
    if ((this.state.loggedIn === false)) {
      return (
        <>
          <style>{'body { background-color: white; }'}</style>
          <header>
            <img src="https://imgur.com/rf2xy6y.png" className="flex-logo"/>
          </header>
          <div className="first">
            <div className="div">

              <form>
                <TextInput
                  color="#e4e7ea"
                  name="username"
                  label="username"
                  type="text"
                  size="2"
                  value={credentials.username}
                  onChange={this.onChange}/>

                <TextInput
                  background-color="#00000000"
                  name="password"
                  label="password"
                  type="password"
                  size="2"
                  value={credentials.password}
                  onChange={this.onChange}/>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onSave}> Log in
                </button>
                {" "}
              </form>
            </div>
          </div>

          <div className="second_div">
            <div className="second">
              <img src="https://imgur.com/2dNT9M2.png" className="flex-item"/>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <style>{'body { background-color: white; }'}</style>
          <header>
            <img src="https://imgur.com/rf2xy6y.png" className="flex-logo"/>
          </header>
          <div className="first">
            <div className="div">
              <form>
                <TextInput
                  color="#e4e7ea"
                  name="username"
                  label="username"
                  type="text"
                  size="2"
                  value={credentials.username}
                  onChange={this.onChange}/>

                <TextInput
                  background-color="#00000000"
                  name="password"
                  label="password"
                  type="password"
                  size="2"
                  value={credentials.password}
                  onChange={this.onChange}/>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onSave}> Log in
                </button>
                {" "}
              </form>
              <br/>
              <div className="help-block"><Alert color="danger">Wrong Password or Username</Alert></div>
            </div>
          </div>

          <div className="second_div">
            <div className="second">
              <img src="https://imgur.com/2dNT9M2.png" className="flex-item"/>
            </div>
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userRole: state.ReducersUserRole.userRole,
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserRole: () => {
      dispatch(fetchUserRole())
    },
    actions:(logInUser)

  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInPage);

