import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Denis Travin',
        address: {
          street: 'TestStreet 123',
          country: 'Russia'
        },
        email: 'dskdnsht@lal.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then( res => {
        this.setState({ 
          loading: false
        })
        this.props.history.push('/')
        }
      )
      .catch( err => 
        this.setState({ 
          loading: false
        })
      )
  }

  render () {
    let form = (
      <form action="">
        <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
        <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
        <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
        <input className={classes.Input} type="text" name="postcode" placeholder="Your Postal Code"/>
        <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>         
      </form>
    )
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}