// initiate this Login.jsx
import React, { Component } from 'react'
// import { login } from './actions/login'
import { Navigate } from 'react-router'
import Navbar from '../components/Navbar';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
}
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.login(this.state)
  }
  render() {
    if (this.props.loggedIn) {
      return <Navigate to="/" />
    } else {
      return (
        <>
          <Navbar />
          <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="bg-dark-gray p-8 rounded shadow-2xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                  <input
                    className="border border-gray-300 p-2 w-full rounded"
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                  <input
                    className="border border-gray-300 p-2 w-full rounded"
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                </div>
                <button
                  className="bg-gray text-white px-4 py-2 rounded w-full hover:bg-blue-600"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
          </>
          )
        }}
      }

export default Login;