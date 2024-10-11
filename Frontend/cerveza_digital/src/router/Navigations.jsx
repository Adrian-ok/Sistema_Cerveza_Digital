import React from 'react'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import routes from './routes'
import { map } from 'lodash'

export function Navigations() {
    return (
        <Router>
            <Routes>
                {map(routes, (route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <route.layout>
                                <route.component></route.component>
                            </route.layout>
                        }
                    />
                ))}
            </Routes>
        </Router>
    )
}
