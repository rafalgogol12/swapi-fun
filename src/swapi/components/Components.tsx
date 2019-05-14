import * as React from "react";
import styled from "styled-components";
import { yellowColor } from "../../utils/styles";

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

const Info = styled.div`
  margin: 1.2em 0;
`;

const Bold = styled.span`
  font-weight: bold
`;

const List = styled.ul`
  list-style: none;
  padding-left: 1em;
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