import React, { Component } from 'react';
import './AddRecipe.css';

class AddRecipe extends Component {
  state = { isLoggedIn: false, user: null };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('/api/recipes', {
      method: 'POST',
      body: data
    });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div className="recipe-form-wrapper">
        {isLoggedIn ? (
          <div>
            <form onSubmit={this.handleSubmit} className="recipe-form">
              <label htmlFor="name">Receptnamn</label>
              <input id="name" name="name" type="text" />

              <label htmlFor="ingredients">Ingredienser</label>
              <textarea
                cols="50"
                rows="10"
                id="ingredients"
                name="ingredients"
                type="text"
              />

              <label htmlFor="description">Beskrivning</label>
              <textarea
                cols="50"
                rows="10"
                id="description"
                name="description"
                type="text"
              />

              <label htmlFor="time_cooking">Tidsåtgång</label>
              <input id="time_cooking" name="time_cooking" type="text" />

              <label htmlFor="difficulty">Svårighetsgrad</label>
              <select id="difficulty" name="difficulty">
                <option value="Lätt">Lätt</option>
                <option value="Medel">Medel</option>
                <option value="Svår">Svårt</option>
              </select>

              <label htmlFor="category">Kategori</label>
              <select id="categories_id" name="categories_id">
                <option value="3">Förrätt</option>
                <option value="4">Middag</option>
                <option value="1">Dessert</option>
                <option value="5">Bakning</option>
              </select>

              <button>Send data!</button>
            </form>
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
