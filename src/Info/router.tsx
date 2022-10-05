import { Route } from 'react-router-dom';
import About from './About';
import Menu from './Menu';
import Credits from './Credits';
import Partners from './Partners';
import WhereToLook from './WhereToLook';
import FurtherReading from './FurtherReading';
import FAQ from './FAQ';

export default [
  <Route path="/info/menu" key="/info/menu" exact component={Menu} />,
  <Route path="/info/about" key="/info/about" exact component={About} />,
  <Route path="/info/credits" key="/info/credits" exact component={Credits} />,
  <Route
    path="/info/partners"
    key="/info/partners"
    exact
    component={Partners}
  />,
  <Route
    path="/info/whereToLook"
    key="/info/whereToLook"
    exact
    component={WhereToLook}
  />,
  <Route
    path="/info/furtherReading"
    key="/info/furtherReading"
    exact
    component={FurtherReading}
  />,
  <Route path="/info/faq" key="/info/faq" exact component={FAQ} />,
];
