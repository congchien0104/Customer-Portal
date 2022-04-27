import React from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import { defaultRouter } from "./default";


const routes = [
    {
        child: (
            <>
                <Home />
            </>
        ),
        path: defaultRouter.homepage,
        exact: true,   
    },
    {
        child: (
            <>
                <SignIn />
            </>
        ),
        path: defaultRouter.signin,
        exact: true,   
    },
    {
        child: (
            <>
                <SignUp />
            </>
        ),
        path: defaultRouter.signup,
        exact: true,   
    }
]

const renderRoute = (routes) => {
    return routes.map((route, index) => {
        return (
            <Route path={route.path} exact key={index}>
                { route.child}
            </Route>
        )
    })
}

const Router = () => {
    return (
        <BrowserRouter>
        <Switch>
            {renderRoute(routes)}
        </Switch>
        </BrowserRouter>
    )
}

export default Router;