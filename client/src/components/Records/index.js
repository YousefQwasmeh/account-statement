import React from "react";
import axios from "axios";
class Records extends React.Component {
  state = {
    records: [],
    info: { name: "Loading", total: "loading" }
  };
  componentDidMount = () => {
    axios
      .get("http://localhost:4000/api/records")
      .then(({ data }) => {
        console.log(data);
        let a = 0;
        const records = data.map(record => {
          a += record.amount;
          const amount = record.amount >= 0 ? record.amount : "";
          const amount2 = record.amount < 0 ? record.amount : "";
          return (
            <tr>
              <th>{a}</th>
              <th>{amount}</th>
              <th>{amount2}</th>
              <th>{record.description}</th>
              <th>{record.date.split("T")[0]}</th>
              {/* <th>{record.customer_name}</th> */}
            </tr>
          );
        });
        const info = { name: data[0].customer_name, total: a };

        this.setState({ records, info });
      })
      .catch(err => console.log(err));
  };
  aa = () => this.state.records.map(r => r);
  render() {
    console.log(this.state.records);
    return (
      <div>
        الاسم: {this.state.info.name}
        <br />
        الرصيد: {this.state.info.total}
        <table style={{ width: "100%" }}>
          <tr>
            <th>الرصيد</th>
            <th>المبلغ</th>
            <th>الدفع</th>
            <th>البيان</th>
            <th>التاريخ</th>
            {/* <th>الاسم</th> */}
          </tr>
          {this.state.records}
        </table>
      </div>
    );
  }
}

export default Records;
