import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Trending from './components/Trending';
import Header from './components/Header';
import TVShow from './components/TVShow';
import Movies from './components/Movies';
import SearchSection from './components/SearchSection';
import { useSelector } from 'react-redux';
import MyList from './components/MyList';
import './App.css';
import Dashboard from './components/Dashboard';
import About from './components/About';
import UserProfile from './components/UserProfile';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './components/ErrorComponent';

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //console.log(isLoggedIn);
  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorComponent}
        onError={() => console.log("Error Happened")}>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path='/auth' element={<Auth />} />
                <Route path='/' element={<Dashboard />} />
              </>) :
              (<>
                <Route path='/trending' element={<Trending />} />
                <Route path='/tvShow' element={<TVShow />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/search' element={<SearchSection />} />
                <Route path='/myList' element={<MyList />} />
                <Route path='/about' element={<About />} />
                <Route path='/user' element={<UserProfile />} /></>)}
          </Routes>
        </main>
        </ErrorBoundary>
    </React.Fragment>
  )
}

export default App;