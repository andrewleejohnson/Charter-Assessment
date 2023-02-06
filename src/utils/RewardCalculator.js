const RewardCalculator = (transactionData) => {
  const rewards = [];
  transactionData.map((item) => {
    var reward = 0;
    if (item.amount >= 100) {
      reward = 1 * 50 + (item.amount - 100) * 2;
    } else if (item.amount > 50 && item.amount < 100) {
      reward = (item.amount - 50) * 1;
    }
    rewards.push({
      customerID: item.customerID,
      Reward: reward,
      Month: item.date.split("-")[1],
    });
  });
  return rewards;
};



const TotalRewardCalculator = (monthlyReward) => {
  monthlyReward.sort((a, b) => a.customerID - b.customerID);

  let old_cust = 0;
  let finalArr = [];
  let totalReward = 0;
  let month = [];

  let usedCustId = 0;
  monthlyReward.map((ele, index) => {
    totalReward = 0;
    month = [];
    let temp = monthlyReward.filter((row, i) => {
      if (usedCustId != ele.customerID) {
        if (row.customerID == ele.customerID) {
          return true;
        }
      } else {
        return false;
      }
    });

    if (temp && temp.length > 0) {
      usedCustId = ele.customerID;
      temp.map((element, j) => {
        totalReward += element.Reward;
        month.push({ month: element.Month, reward: element.Reward });
        if (temp.length - 1 == j) {
          let temp = {
            customerID: element.customerID,
            TotalReward: totalReward,
            month,
          };
          finalArr.push(temp);
        }
      });
    }
  });
  return finalArr;
};
const FilteredData = (Array1) => {
  var holder = {};

  Array1.map(item => {
    const res = Array.from(item.month.reduce(
      (m, { month, reward }) => m.set(month, (m.get(month) || 0) + reward), new Map
    ), ([month, reward]) => ({ month, reward }));
    item.month = res;
  });
  return Array1;
};
export { RewardCalculator, TotalRewardCalculator, FilteredData };
