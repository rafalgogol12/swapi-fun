import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { PATH } from '../utils/globals';
import PlanetList from '../swapi/container/PlanetList';
import PlanetDetails from '../swapi/container/PlanetDetails';
import { ApplicationState } from '../reducers';
import { yellowColor, darkGrey } from '../utils/styles';
import { RoutesProps } from '../utils/Types';

class Routes extends React.Component<RoutesProps> {
  render() {
    const route = [
      {
        component: PlanetList,
        path: PATH.ROOT
      },
      {
        component: PlanetDetails,
        path: PATH.PLANET
      }
    ];

    const routes = () => route.map((route, index) => {
      return <Route exact path={route.path} component={route.component} key={index} />;
    });

    const { planet } = this.props

    return (
      <div>
        <Header>
          <Title>
            {planet ?
              `Welcome to ${planet.name}!`
              :
              "Hello There!"
            }
          </Title>
        </Header>
        <Content>
          <Switch>
            {routes()}
          </Switch>
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (store: ApplicationState) => {
  return {
    planet: store.planets.planetDetails,
  }
}

export default connect(mapStateToProps)(Routes);

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: ${yellowColor};
`;

const Header = styled.div`
  padding: 4em;
  background: ${darkGrey};
`;

const Content = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1em;
  box-sizing: border-box;
`;