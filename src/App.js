import React, { Fragment, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Preloader from './components/preloader/Preloader';
import News from './components/news/News';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import AddCap from './components/AddCap/AddCap'
import AddProduct from './components/AddProduct/AddProduct'
import ShopPage from './components/ShopPage/ShopPage'
import GamesPage from './components/GamesPage/GamesPage'
import CapsPage from './components/CapsPage/CapsPage'
import OpenCapPage from './components/OpenCapPage/OpenCapPage'
import { ColaCapsServiceProvider } from './components/hoc-helpers/colacaps-service-context';
import ColaCapsService from './services/ColaCapsService';
import Modal from './components/Modal/Modal';
import AddNew from './components/AddNew/AddNew';
import NewPage from './components/NewPage/NewPage';
import SaleStory from './components/SaleStory/SaleStory';

class App extends Component {

  state = {
    isAdmin: false,
    isAuth: false,
    balance: 0,
    username: '',
    activeModal: false,
    modalData: {
      won: '',
      imageUrl: 'http://localhost:8080',
      title: '',
      description: ''
    }
  }

  getUserBalance = async (username) => {
    let form = new FormData()
    form.append('username', username)
    const res = await fetch(this.baseUrl + '/caps/balance', {
        method: 'POST',
        body: form
    })
    if (!res.ok) {
        throw Error('could not get cap balance')
    }
    return await res.json()
  }
  
  componentDidMount() {
    let token = localStorage.getItem('colacaps_token')
    let isAdmin = localStorage.getItem('colacaps_admin')
    let username = localStorage.getItem('colacaps_username')
    if (!token && !username && !isAdmin) {
      return;
    }
    this.getUserBalance(username).then(result => {
      this.setState({
        isAuth: true,
        isAdmin: !!isAdmin,
        username,
        balance: result.data
      })
    })
  }

  onLogOut = () => {
    localStorage.removeItem('colacaps_username')
    localStorage.removeItem('colacaps_token')
    localStorage.removeItem('colacaps_admin')
    this.setState({
      isAdmin: false,
      isAuth: false
    })
  }

  onOpened = (result) => {
    this.setState(prev => {
      return {
        activeModal: true,
        balance: prev.balance + result.price,
        modalData: {
          won: 'Congratulations!',
          imageUrl: 'http://localhost:8080/' + result.imageUrl,
          description: result.msg,
          title: result.name
        }
      }
    })
  }

  onBought = (result) => {
    this.setState(prev => { 
      return {
        activeModal: true,
        balance: prev.balance - result.price,
        modalData: {
          won: "Thank you!",
          imageUrl: 'http://localhost:8080/' + result.imageUrl,
          description: result.description,
          title: result.title
        }
      }
    })
  }
  
  onLoggedIn = ({isAdmin, username, token, balance}) => {
    localStorage.setItem('colacaps_username', username)
    localStorage.setItem('colacaps_token', token)
    localStorage.setItem('colacaps_admin', isAdmin)
    this.setState({
      isAdmin,
      isAuth: true,
      username,
      balance
    })
  }

  render() {

    let {won, imageUrl, description, title} = this.state.modalData

    let authRoutes = !this.state.isAuth && (
      <Fragment>
        <Route path="/login">
          <LoginPage onLoggedIn={this.onLoggedIn} />
        </Route>
        <Route path="/register" component={RegisterPage}/>
      </Fragment>
    )
    
    let adminRoutes = this.state.isAdmin && (
      <Fragment>
        <Route path="/addnew" component={AddNew} />
        <Route path="/addcap" component={AddCap} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/story" component={SaleStory} />
      </Fragment>
    )
    
    return (
      <Preloader delay="3">
        <ColaCapsServiceProvider value={new ColaCapsService()}>
          <Router>
            {
              this.state.activeModal && (
                <Modal
                  onModalClose={() => this.setState({activeModal: false})} 
                  imageUrl={imageUrl} 
                  title={title} won={won} 
                  description={description} />
              )
            }
            <Navbar 
              onLoggedOut={this.onLogOut} 
              balance={this.state.balance}
              userName={this.state.username}
              isAdmin={this.state.isAdmin} 
              isAuth={this.state.isAuth} /> 
            <Switch>
              <Route exact path={['/', '/news']} component={News}/>
              <Route path="/news/:id?" component={NewPage} />
              <Route path="/shop">
                <ShopPage  
                  userName={this.state.username} 
                  isAuth={this.state.isAuth} 
                  onBought={this.onBought} />
              </Route>
              <Route path="/games" component={GamesPage} />
              <Route path="/caps">
                <CapsPage 
                  isAuth={this.state.isAuth}
                  userName={this.state.username}
                  isAdmin={this.state.isAdmin} 
                />
              </Route>
              <Route path="/opencap">
                <OpenCapPage 
                  onOpened={this.onOpened} 
                  isAuth={this.state.isAuth} />
              </Route>
              {authRoutes}
              {adminRoutes}
            </Switch>
          </Router>
        </ColaCapsServiceProvider>
      </Preloader>
    )
  }
}

export default App
