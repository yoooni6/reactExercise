import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col,
  // Pagination, PaginationItem, PaginationLink, 
  Row, Table, Input
} from 'reactstrap';
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import PaginationCustom from './Pagination'
import MyAutofocusInput from './MyAutofocusInput'
import CustomModal from './CustomModal'


const RenderRow = (props) => {
  
  return props.keys.map((key, index) => {
    if (props.indexId === 0 && key === 'slug') {
      return <MyAutofocusInput />

    } else {
      return <td key={props.data[key]}>{props.data[key]}</td>
    }
    
  })
}


@inject('tableStore')
@withRouter
@observer
class Tables extends Component {

  componentWillMount() {
    this.props.tableStore.setAllData()
  }

  getKeys = () => {
    return Object.keys(this.props.tableStore.currentData[0]);
  }

  getHeader = () => {
    let keys = this.getKeys();
    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th>
    })
  }

  getRowsData = () => {
    const items = this.props.tableStore.currentData;
    const keys = this.getKeys();
    return items.map((row, index) => {
      return <tr key={index}><RenderRow key={index} data={row} keys={keys} indexId={index}/></tr>
    })
  }

  // onPageChanged = () => {
  //   const { allCountries } = this.props.tableStore.data;
  //   const currentPage = this.props.tableStore.currentPage;
  //   const totalPages = this.props.tableStore.totalPages
  //   const pageLimit = this.props.tableStore.pageLimit

  //   const offset = (currentPage - 1) * pageLimit;
  //   const currentCountries = allCountries.slice(offset, offset + pageLimit);

  //   this.props.tableStore.setCurrentCountries(currentCountries)
  //   this.props.tableStore.setCurrentPage(currentPage)
  //   this.props.tableStore.setTotalPages(totalPages)
  //   // this.setState({ currentPage, currentCountries, totalPages });
  // }

  render() {
    const totalCountries = this.props.tableStore.totalRecords;

    if (totalCountries === 0) return null;

    // const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Combined All Table
                <CustomModal />
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      {this.getHeader()}
                    </tr>
                  </thead>
                  <tbody>
                    {this.getRowsData()}
                  </tbody>
                </Table>
                <nav>
                  {/* <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination> */}

                  <div className="d-flex flex-row py-4 align-items-center">
                    <PaginationCustom
                      totalRecords={totalCountries}
                      pageLimit={18}
                      pageNeighbours={1}
                      // onPageChanged={this.onPageChanged}
                       />
                  </div>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Tables;
