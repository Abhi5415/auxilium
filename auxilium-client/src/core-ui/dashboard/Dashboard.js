import React from "react";
import styled from "styled-components";

import { Button, Typography, Row, Col, Icon, Tooltip } from "antd";
import { NetTransactionSummary } from "../transactions/NetTransactionSummary";
import {
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress
} from "ant-design-pro/lib/Charts";
import Trend from "ant-design-pro/lib/Trend";
import NumberInfo from "ant-design-pro/lib/NumberInfo";
import numeral from "numeral";
import moment from "moment";

const { Title } = Typography;

const HeaderContainer = styled.div`
  display: flex;
`;

const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export class Dashboard extends React.Component {
  state = {
    visitData: [],
    dailyVolume: 0,
    yesterdayPrediction: 0,
    dailyTransactionCount: 0,
    transactionAvg: 0
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let transactions = await (await fetch(
      "http://localhost:5000/transactions/all",
      {
        method: "get"
      }
    )).json();

    transactions = transactions.map(transaction => {
      transaction.monthlyDate = moment(transaction.date).format("YYYY-MM-DD");
      return transaction;
    });

    var dateMoneyMap = {};
    var dailyTransactionCountMap = {};

    transactions.forEach(transaction => {
      if (dateMoneyMap[transaction.monthlyDate]) {
        dateMoneyMap[transaction.monthlyDate] += Math.abs(transaction.amount);
        dailyTransactionCountMap[transaction.monthlyDate]++;
      } else {
        dateMoneyMap[transaction.monthlyDate] = Math.abs(transaction.amount);
        dailyTransactionCountMap[transaction.monthlyDate] = 1;
      }
    });

    const visitData = [];

    Object.keys(dateMoneyMap).forEach(key => {
      visitData.push({
        x: key,
        y: dateMoneyMap[key]
      });
    });

    let transactionAvg = 0;

    Object.keys(dailyTransactionCountMap).forEach(key => {
      transactionAvg += dailyTransactionCountMap[key];
    });

    transactionAvg /= Object.keys(dailyTransactionCountMap).length;

    this.setState({
      visitData,
      dailyVolume: visitData[0].y,
      yesterdayPrediction: 100 * (visitData[0].y / visitData[1].y),
      dailyTransactionCount:
        dailyTransactionCountMap[moment().format("YYYY-MM-DD")],
      transactionAvg
    });
  }

  render() {
    return (
      <React.Fragment>
        <HeaderContainer>
          <Title level={2}>Dashboard</Title>
        </HeaderContainer>
        <ChartsContainer>
          <ChartCard
            title="Daily volume"
            total={`${this.state.dailyVolume} units`}
            style={{
              width: "30%"
            }}
            contentHeight={46}
          >
            <span>
              Yesterday
              <Trend
                flag="down"
                style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
              >
                {this.state.yesterdayPrediction}%
              </Trend>
            </span>
            <span style={{ marginLeft: 16 }}>
              Projected
              <Trend
                flag="up"
                style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
              >
                {this.state.yesterdayPrediction / 2}%
              </Trend>
            </span>
          </ChartCard>
          <ChartCard
            style={{
              width: "68%"
            }}
            title="Today's Transaction Count"
            total={numeral(this.state.dailyTransactionCount).format("0,0")}
            contentHeight={134}
          >
            <NumberInfo
              subTitle={<span>Average Transaction Count</span>}
              total={numeral(this.state.transactionAvg).format("0,0")}
            />
            <MiniArea line height={45} data={this.state.visitData} />
          </ChartCard>
        </ChartsContainer>
        <NetTransactionSummary />
      </React.Fragment>
    );
  }
}
