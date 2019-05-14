import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darkGrey, whiteColor, globalRadius } from '../utils/styles';
import { ButtonProps, PaginationProps, PaginationState, iPager } from '../utils/Types';

class Pagination extends React.Component<PaginationProps, PaginationState> {
  static propTypes: { items: PropTypes.Validator<any[]>; onChangePage: PropTypes.Validator<(...args: any[]) => any>; initialPage: PropTypes.Requireable<number>; pageSize: PropTypes.Requireable<number>; };
  static defaultProps: { initialPage: number; pageSize: number; };

  constructor(props: PaginationProps) {
    super(props);
    this.state = {
      pager: new iPager(1, 0, 0, 0, [], 0, 0, 0, 0)
    }
  }

  public componentWillMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  public componentDidUpdate(prevProps: any) {
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  public render() {
    const { pager } = this.state;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <PaginationList>
        {this.renderButton(`<<`, 1, this.disabledFirst())}
        {this.renderButton("<", pager.currentPage - 1, this.disabledFirst())}
        {pager.pages.map((page: number, index: number) =>
          <Button key={index} onClick={() => this.setPage(page)} disabled={this.currentPage(page)} active={this.currentPage(page)}>{page}</Button>
        )}
        {this.renderButton(">", pager.currentPage + 1, this.disabledLast())}
        {this.renderButton(">>", pager.totalPages, this.disabledLast())}
      </PaginationList>
    );
  }

  private setPage(page: number) {
    const { items, pageSize } = this.props;
    let pager = this.state.pager;

    if (page < 1) {
      return;
    }

    pager = this.getPager(items.length, page, pageSize);

    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({ pager });
    this.props.onChangePage(pageOfItems);
  }

  private getPager(totalItems: number, currentPage: number, pageSize: number) {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number;
    let endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    let pages = (new Array(endPage - startPage + 1)).fill(undefined).map((_, i) => i + startPage);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  private renderButton(label: string, page: number, disabled: boolean = false) {
    return (
      <Button onClick={() => this.setPage(page)} disabled={disabled}>
        {label}
      </Button>
    )
  }

  private disabledFirst() {
    return this.state.pager.currentPage === 1
  }

  private disabledLast() {
    const { pager } = this.state;
    return pager.currentPage === pager.totalPages;
  }

  private currentPage(page: number) {
    return this.state.pager.currentPage === page
  }

}

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number
}

const defaultProps = {
  initialPage: 1,
  pageSize: 10
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;

const PaginationList = styled.div`
  margin: 2em auto;
  text-align: center;
`;

const Button = styled.button<ButtonProps>`
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  background: ${props => props.active ? darkGrey : "transparent"};
  color: ${props => props.active ? whiteColor : darkGrey};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 1px solid ${darkGrey};
  border-radius: ${globalRadius};
  margin: 0.1em
`;