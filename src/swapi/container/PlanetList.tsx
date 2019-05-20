import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { History } from 'history';
import { Dispatch } from 'redux';

import { fetchPlantes } from '../actions';
import { ApplicationState } from '../../reducers';
import Spinner from '../../common/Spinner';
import { PATH, cachePlanetID } from '../../utils/globals';
import { numberWithSpace } from '../../utils/functions';
import Pagination from "../../common/Pagination";
import { iPlanets } from '../../utils/Types';
import { shadow, yellowColor } from '../../utils/styles';

interface PlanetListProps {
  planets: iPlanets[]
  history: History
  planetID: string
  fetchPlantes: () => void
}

interface PlanetListState {
  pageOfItems: iPlanets[]
}

class PlanetList extends React.Component<PlanetListProps, PlanetListState> {
  constructor(props: PlanetListProps) {
    super(props);
    this.state = {
      pageOfItems: []
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  public componentDidMount() {
    this.props.fetchPlantes()
  }

  public render() {
    const { planets } = this.props;

    if (planets === undefined) {
      return <Spinner />
    }

    return (
      <Planetdiv>
        {this.state.pageOfItems.map((p: iPlanets, i: number) =>
          <Planet key={`${p.name}_${i}`} onClick={() => this.pickPlanet(p.id)}>
            <PlanetName>{p.name}</PlanetName>
            {renderInfo("Population", numberWithSpace(p.population))}
            {renderInfo("Terrains", p.terrains.join(', '))}
          </Planet>
        )}
        <Pagination items={this.props.planets} onChangePage={this.onChangePage} />
      </Planetdiv>
    )
  }

  private async pickPlanet(id: string) {
    const { planetID, history } = this.props;
    if (planetID !== id) {
      localStorage.setItem(cachePlanetID, id)
    }
    await history.push(PATH.PLANET)
  }

  private onChangePage(pageOfItems: iPlanets[]) {
    this.setState({ pageOfItems: pageOfItems });
  }
}

export function renderInfo(label: string, value: string | number) {
  return <Info>{label}: <Bold>{value ? value : "none"}</Bold></Info>
}

export function renderList(label: string, array: string[]) {
  return (
    <Info>{label}:
      <List>{array.map((el: string, i: number) =>
        <ListElement key={`${el}_${i}`}>
          <Bold>{el}</Bold>
        </ListElement>)}
      </List>
    </Info>
  )
}

export function renderDeepList(label: string, array: any[], key: string) {
  return (
    <Info>{label}:
      <List>{array.map((el: any, i: number) =>
        <ListElement key={`${el.node[key]}_${i}`}>
          <Bold>{el.node[key]}</Bold>
        </ListElement>)}
      </List>
    </Info>
  )
}

const mapStateToProps = (store: ApplicationState) => {
  return {
    planets: store.planets.all,
    planetID: store.planets.singlePlanetID
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchPlantes: () => dispatch(fetchPlantes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetList);

const Planetdiv = styled.div``;

const Planet = styled.div`
overflow: hidden;
cursor:pointer;
padding: 0 1em;
margin: 1em 0;
box-shadow: ${shadow};
`;

const PlanetName = styled.h2`
font-size: 1.3em;
color: #8c8c8c;
margin: 0.6em 0;
font-weight: bold;
`;

const Info = styled.div`
  margin: 1.2em 0;
`;

const Bold = styled.span`
  font-weight: bold
`;

const ListElement = styled.li`
  margin: 0.5em 0;
  ::before {
    content: '\\2756'; 
    color: ${yellowColor};
    font-weight: bold;
    display: inline-block;
    width: 1.5em;
  }
`;

const List = styled.ul`
  list-style: none;
  padding-left: 1em;
`;