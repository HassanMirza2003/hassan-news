import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Newsbox from './components/Newsbox';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize =5;

  state = {
    progress : 0
  }

  setProgress = (progress) => {
    this.setState({progress : progress})
  }
  render() {
    return (
      <div>
        <BrowserRouter >
          <Navbar />
          <LoadingBar
          height={3}
            color='#f11946'
            progress={this.state.progress}
          />

          <Routes>
            <Route exact path='/' element={<Newsbox setProgress = {this.setProgress} key='general' pageSize={12} country='us' category='general' />}></Route>
            <Route path='/business' element={<Newsbox setProgress = {this.setProgress} key='business' pageSize={12} country='us' category='business' />}></Route>
            <Route path='/entertainment' element={<Newsbox setProgress = {this.setProgress} key='entertainment' pageSize={12} country='us' category='entertainment' />}></Route>
            <Route path='/health' element={<Newsbox setProgress = {this.setProgress} key='health' pageSize={12} country='us' category='health' />}></Route>
            <Route path='/science' element={<Newsbox setProgress = {this.setProgress} key='science' pageSize={12} country='us' category='science' />}></Route>
            <Route path='/sports' element={<Newsbox setProgress = {this.setProgress} key='sports' pageSize={12} country='us' category='sports' />}></Route>
            <Route path='/technology' element={<Newsbox setProgress = {this.setProgress} key='technology' pageSize={12} country='us' category='technology' />}></Route>
          </Routes>
        </BrowserRouter >
      </div>
    )
  }
}
