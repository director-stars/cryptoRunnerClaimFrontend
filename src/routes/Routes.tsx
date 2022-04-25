// import React from "react";
// import { Switch, Route } from "react-router-dom";
// import Home from "src/pages/Home/Home";

// const Routes: React.FC = () => {
//   return (
//     <Switch>
//       <Route path="/" exact component={Home} />
//     </Switch>
//   );
// };

// export default Routes;


import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import Home from "src/pages/Home/Home";
import Claim from "src/pages/Claim/Claim";

const Routes: React.FC = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === '') {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change

  return (
      <Switch>
        <Route exact path="/" component={Claim} />
        .
        .
      </Switch>
  )
}

export default Routes;