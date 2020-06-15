import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
import Test from './pages/Test'

const Routes = () =>{
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact/>
            <Route component={Test} path='/test'/>
            <Route component={CreatePoint} path='/create-point'/>
        </BrowserRouter>
    )
}

export default Routes