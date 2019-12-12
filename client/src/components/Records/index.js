import React from "react";
import axios from "axios";
class Records extends React.Component {
  state = {
    customerName: "",
    records: [],
    fromDate: "2019-1-1",
    toDate: "2019-05-05",
    info: { name: "Loading", total: "loading" },
    preTotal: null,
    endDate: null
  };

  aa = () => this.state.records.map(r => r);
  search = () => {
    console.log(this.state.customerName, "999999999999");
    axios
      .get(
        `https://you97sef.herokuapp.com/api/records/${this.state.customerName}`
      )
      .then(({ data }) => {
        console.log(data);
        let a = 0;
        this.setState({ preTotal: null });
        const records = data.map(record => {
          const amount = record.amount >= 0 ? record.amount : "";
          const amount2 = record.amount < 0 ? record.amount : "";
          // const aa = Date("2019-05-06");
          // const b = Date("2019-05-05");
          // console.log(Number(new Date("2019-01-02")));
          this.setState({ endDate: data[data.length - 1].date.split("T")[0] });

          const toDate = this.state.toDate.split("-");
          const datee = record.date.split("T")[0].split("-");
          a += record.amount;
          if (
            Number(new Date(record.date.split("T")[0])) >
            Number(new Date(this.state.toDate))
          )
            if (this.state.preTotal == null)
              this.setState({ preTotal: a - record.amount });
          if (
            Number(new Date(record.date.split("T")[0])) >
              Number(new Date(this.state.toDate)) ||
            Number(new Date(record.date.split("T")[0])) <
              Number(new Date(this.state.fromDate))
          )
            return null;

          // if (datee[0] > toDate[0]) return null;
          // else if (datee[2] > toDate[2]) return null;
          // else if (datee[1] > toDate[1]) return null;
          // console.log("0000000000");
          // console.log(toDate, datee);
          // console.log("0000000000");
          // console.log("qqqqqqqqqqqqq");
          // if (record.date.split("T")[0] > "2019-05-05") return null;
          return (
            <tr>
              <th style={{ border: "2px solid" }}>{record.description}</th>
              <th style={{ border: "2px solid" }}>
                {record.date.split("T")[0]}
              </th>
              <th style={{ border: "2px solid" }}>{amount2}</th>
              <th style={{ border: "2px solid" }}>{amount}</th>
              <th style={{ border: "2px solid" }}>{a}</th>
              {/* <th>{record.customer_name}</th> */}
            </tr>
          );
        });
        // if (this.state.preTotal == null) this.setState({ preTotal: a });
        let info = {};
        if (data[0]) info = { name: data[0].customer_name, total: a };

        this.setState({ records, info });
      })
      .catch(err => console.log(err));
  };
  render() {
    // console.log(this.state.records);

    return (
      <div>
        <input
          onChange={({ target }) => {
            // console.log(target.value, "88888888");
            this.setState({ customerName: target.value });
          }}
          type='text'
          placeholder='اسم الزبون'
        />
        <button
          onClick={() => {
            this.search();
          }}
        >
          كشف الحساب
        </button>
        <br />
        <input
          onChange={({ target }) => {
            this.setState({ fromDate: target.value });
            console.log(target.value, "frommmmmmmmmmmmmm");
          }}
          type='date'
          name='fromDate'
        ></input>
        :الى
        <input
          onChange={({ target }) => {
            this.setState({ toDate: target.value });
            console.log(target.value, "nnnnnnn");
          }}
          style={{ marginLeft: "30px" }}
          type='date'
          name='toDate'
        ></input>
        من:
        <br />
        الاسم: {this.state.info.name}
        <br />
        الرصيد الكلي حتى تاريخ {this.state.endDate}: {this.state.info.total}
        <table style={{ width: "100%" }}>
          <tr>
            <th>البيان</th>
            <th>التاريخ</th>
            <th>الدفع</th>
            <th>المبلغ</th>
            <th>الرصيد</th>
            {/* <th>الاسم</th> */}
          </tr>
          <tr>
            <th style={{ border: "2px solid" }}>رصيد سابق</th>
            <th style={{ border: "2px solid" }}>{this.state.fromDate}</th>
            <th style={{ border: "2px solid" }}></th>
            <th style={{ border: "2px solid" }}></th>
            <th style={{ border: "2px solid" }}>{this.state.preTotal}</th>
            {/* <th>{record.customer_name}</th> */}
          </tr>
          {this.state.records}
        </table>
      </div>
    );
  }
}

export default Records;
