import React, { Component } from 'react';

class AddRecipe extends Component {
  state = { isLoggedIn: false, user: null };

  componentDidMount() {
    fetch('/api/user')
      .then(res => res.json())
      .then(user => this.setState({ user: user.user }))
      .then(() => this.checkLoggedIn(this.state.user));
  }

  checkLoggedIn = user => {
    if (user != null) {
      this.setState(state => {
        return { isLoggedIn: true };
      });
    } else {
      return this.state.isLoggedIn;
    }
  };

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        {isLoggedIn ? (
          <div>
            <p>Inloggad visa formulär</p>
          </div>
        ) : (
          <div>
            <p>Ej Inloggad visa inloggnings formulär</p>
          </div>
        )}
      </div>
    );
  }
}

export default AddRecipe;
