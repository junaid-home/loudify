import React from 'react'
import {BrowserRouter, Switch} from 'react-router-dom'
import {PrivateRoute, UnauthRoute} from '../routes'
import SideBar from '../sidebar'
import Player from '../player'
import Header from '../header'
import HomeSection from '../home-section'
import LibrarySection from '../library-section'
import SearchSection from '../search-section'
import PlaylistDisplay from '../playlist-display'
import LoginSection from '../login-section'
import SingupSection from '../signup-section'
import Drawer from '../drawer'
import {Provider as SongProvider} from '../../store/song-context'
import {Provider as DrawerProvider} from '../../store/drawer-context'
import {Provider as SearchProvider} from '../../store/search-results'
import {Provider as AuthProvider} from '../../store/auth-context'

import './global.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <UnauthRoute exact path='/login' component={LoginSection} />
          <UnauthRoute exact path='/sign-up' component={SingupSection} />
          <PrivateRoute
            path='/'
            component={() => (
              <DrawerProvider>
                <SongProvider>
                  <SearchProvider>
                    <Player />
                    <div className='transition-all relative grid grid-cols-12'>
                      <SideBar />
                      <Drawer />
                      <div className='bg-gray-700 select-none px-2 py-2 md:col-start-3 col-start-1 col-end-13 pl-1'>
                        <div className='mb-20 relative min-h-screen'>
                          <Header />
                          <Switch>
                            <PrivateRoute exact path='/' component={HomeSection} />
                            <PrivateRoute
                              exact
                              path='/search'
                              component={SearchSection}
                            />
                            <PrivateRoute
                              exact
                              path='/library'
                              component={LibrarySection}
                            />
                            <PrivateRoute
                              exact
                              path='/playlist/:id'
                              component={PlaylistDisplay}
                            />
                          </Switch>
                        </div>
                      </div>
                    </div>
                  </SearchProvider>
                </SongProvider>
              </DrawerProvider>
            )}
          />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
