import * as React from 'react';
import { ApplicationState } from '../../reducers';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import { PATH, cachePlanetID } from '../../utils/globals';
import { History } from 'history';
import { fetchPlanetDetails, setPlanetDetails } from '../actions';
import styled from 'styled-components';
import { formatIsoToDate, numberWithSpace } from "../../utils/functions";
import { darkGrey, shadow, globalRadius } from '../../utils/styles';
import { iSinglePlanet } from '../../utils/Types';
import { renderInfo, renderList, renderDeepList } from './PlanetList';

interface PlanetDetailsProps {
  planet: iSinglePlanet
  history: History
  fetchPlanetDetails: (id: string) => void
  setPlanetDetails: () => void
}

class PlanetDetails extends React.Component<PlanetDetailsProps> {
  public componentDidMount() {
    const id = localStorage.getItem(cachePlanetID);
    if (id) {
      this.props.fetchPlanetDetails(id)
    } else {
      this.props.history.replace(PATH.ROOT)
    }
  }

  public componentWillUnmount() {
    this.props.setPlanetDetails()
  }

  public render() {
    const { planet, history } = this.props;

    if (planet === undefined) {
      return <Spinner />
    }

    return (
      <Details>
        <Sum>
          <Half>
            {renderInfo("Population", numberWithSpace(planet.population))}
            {renderInfo("Orbital period", planet.orbitalPeriod)}
            {renderInfo("Rotation period", planet.rotationPeriod)}
            {renderInfo("Surface water", planet.surfaceWater)}
            {renderInfo("Gravity", planet.gravity)}
            {renderInfo("Diameter", planet.diameter)}
            {renderList("Climates", planet.climates)}
            {renderList("Terrains", planet.terrains)}
            {renderInfo("Created", formatIsoToDate(planet.created))}
            {renderInfo("Edited", formatIsoToDate(planet.edited))}
          </Half>
          <Half>
            {renderDeepList("Film Connection", planet.filmConnection.edges, "title")}
            {renderDeepList("Resident Connection", planet.residentConnection.edges, "name")}
          </Half>
        </Sum>
        <Button onClick={() => history.goBack()}>Back</Button>
      </Details>
    )
  }
}

const mapStateToProps = (store: ApplicationState) => {
  return {
    planet: store.planets.planetDetails,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPlanetDetails: (id: string) => dispatch(fetchPlanetDetails(id)),
    setPlanetDetails: () => dispatch(setPlanetDetails(undefined))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetDetails);

const Details = styled.div`
`;

const Sum = styled.div`
  box-shadow: ${shadow};
  padding: 0 1em 1em;
  margin: 1em 0;
  overflow: hidden;
  clear: both;
`;

const Half = styled.div`
  width: 50%;
  float: left;

  @media (max-width: 991px) {
    width: 100%;
    float: inherit
  }
`;

const Button = styled.button`
  background: transparent;
  color: ${darkGrey};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${darkGrey};
  border-radius: ${globalRadius};
`;
