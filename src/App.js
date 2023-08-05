import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Newsbox from './components/Newsbox';
import { BrowserRouter , Route, Routes , Link} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter >
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Newsbox key='general' pageSize={12} country='us' category='general' />}></Route>
            <Route path='/business' element={<Newsbox key='business' pageSize={12} country='us' category='business' />}></Route>
            <Route path='/entertainment' element={<Newsbox key='entertainment' pageSize={12} country='us' category='entertainment' />}></Route>
            <Route path='/health' element={<Newsbox key='health' pageSize={12} country='us' category='health' />}></Route>
            <Route path='/science' element={<Newsbox key='science' pageSize={12} country='us' category='science' />}></Route>
            <Route path='/sports' element={<Newsbox key='sports' pageSize={12} country='us' category='sports' />}></Route>
            <Route path='/technology' element={<Newsbox key='technology' pageSize={12} country='us' category='technology' />}></Route>
          </Routes>
        </BrowserRouter >
      </div>
    )
  }
}
