import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from "./components/account/LoginPage";
import Profile from './components/account/Profile';
import SignUpPage from './components/account/SignUpPage';
import Footer from './components/footer';
import Header from './components/header';
import ProductIndex from './components/products/ProductIndex';
import ProductShow from './components/products/ProductShow';
import SplashPage from './components/splash/SplashPage';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/products' component={ProductIndex} />
        <Route exact path='/products/:category' component={ProductIndex} />
        <Route exact path='/product/:productName' component={ProductShow} />
        <Route exact path='/account' component={Profile} />
        <Route exact path='/account/login' component={LoginPage} />
        <Route exact path='/account/register' component={SignUpPage} />
        <Route exact path='/' component={SplashPage} />
        <Redirect to='/' />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
