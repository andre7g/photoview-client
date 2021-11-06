import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import routes from "./routes";
import { map } from "lodash";
import User from "../pages/User";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import LayoutBasic from "../layouts/LayoutBasic";

export default function Navigation() {
    return(
        // <Router>
        //     <Routes>
        //         { map(routes, (route,index) =>{
        //             <Route
        //                 key= { index }
        //                 path= { route.path }
        //                 exact = { route.exact }
        //                 render = { (props)=>{
        //                     <route.component { ...props } />
        //                 }}
        //             />
        //         })}
        //     </Routes>
        // </Router>

        <Router>
            <Routes>
              <Route 
                path='/'
                exact='true' 
                element={  
                    <LayoutBasic> 
                        <Home/>
                    </LayoutBasic> 
                } 
                />
              <Route 
                path='/:username'
                exact='true' 
                element={
                <LayoutBasic>
                    <User/>
                </LayoutBasic>
                }
                />
            </Routes>    
        </Router>
    )
}
