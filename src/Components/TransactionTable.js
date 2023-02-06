import React from "react";
import { TransactionData } from "../utils/DummyTransactionData";
import {
  RewardCalculator,
  // MonthlyRewardCalculator,
  TotalRewardCalculator,
  FilteredData
} from "../utils/RewardCalculator";

import { Month } from "../utils/GetMonth";
export const TransactionTable = ({ RewardData }) => {

  const transactionData = FilteredData(TotalRewardCalculator(RewardCalculator(TransactionData)));

  return (
    <table>
      <tr>
        <th>Customer ID</th>
        {
          transactionData[0].month.map((month) => {
            return (<th>{Month(month.month)}</th>
            );
          })
        }
        <th>Total Reward</th>

      </tr>
      {transactionData.map((item) => {
        return (
          <tr>
            <td>{item.customerID}</td>
            {item.month.map(ele => {
              return (
                <td>{ele.reward}</td>
              );
            })}
            <td>{item.TotalReward}</td>

          </tr>
        );
      })}




    </table>
  );
};
