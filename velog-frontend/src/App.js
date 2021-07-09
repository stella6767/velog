import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import './App.css';
import { logoutMsg } from './lib/constants/auth';
import Home from './pages/home/Home';
import writeForm from './pages/post/writeForm';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';
import useUpdateEffect from './lib/hooks/useUpdateEffect';
import Header from './pages/Header';
import User from './pages/user/User';
import PostDetail from './pages/post/PostDetail';
import 'antd/dist/antd.css';
import { Switch } from 'react-router-dom';
import Recent from './pages/recent/Recent';
import LikeList from './pages/user/LikeList';

function App() {
  const { cmRespDto, logoutDone } = useSelector(({ auth }) => ({
    cmRespDto: auth.cmRespDto,
    logoutDone: auth.logoutDone,
  }));

  useUpdateEffect(() => {
    if (logoutDone) {
      alert(cmRespDto.msg);
    }
  }, [logoutDone]);

  //404 에러페이지는 만들지 고민중
  return (
    <>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/recent" exact={true} component={Recent} />
        <Route path="/write" exact={true} component={writeForm} />
        <Route path="/search" exact={true} component={Search} />
        <Route path="/setting" exact={true} component={Profile} />
        <Route path="/header" exact={true} component={Header} />
        <Route path="/:userId" exact={true} component={User} />
        <Route path="/list/liked" exact={true} component={LikeList} />

        <Route path="/:userId/:postId" exact={true} component={PostDetail} />
        <Route path="/recent" exact={true} component={PostDetail} />
      </Switch>
    </>
  );
}

export default App;
