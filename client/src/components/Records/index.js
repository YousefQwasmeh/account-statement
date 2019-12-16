import React from "react";
import axios from "axios";
import "./style.css";
class Records extends React.Component {
  state = {
    customerName: "",
    records: [],
    fromDate: "2019-01-01",
    toDate:
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate(),
    info: { name: "Loading", total: "loading" },
    preTotal: null,
    endDate: null,
    customersNames: []
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
  nameList = ({ target }) => {
    this.setState({ customerName: target.innerText });
  };
  componentDidMount() {
    axios
      .get("https://you97sef.herokuapp.com/api/getAllCustomers")
      .then(({ data }) => {
        this.setState({
          customersNames: data.map(c => <li onClick={this.nameList}>{c}</li>)
        });
      })
      .catch(err => console.log(err, 566666666));
  }
  prediction = name => {
    try {
      return this.state.customersNames.filter(c =>
        c.props.children.includes(name)
      );
    } catch (e) {
      return null;
    }
  };
  render() {
    const predictionNames = this.prediction(this.state.customerName);
    return (
      <div>
        <form>
          <input
            onChange={({ target }) => {
              this.setState({ customerName: target.value });
            }}
            type='text'
            placeholder='اسم الزبون'
            value={this.state.customerName}
          />

          {predictionNames.length !== 0 &&
          predictionNames.length === 1 &&
          predictionNames[0].props.children ===
            this.state.customerName ? null : (
            <ul style={{ maxHeight: "160px", "overflow-y": "scroll" }}>
              {predictionNames}
            </ul>
          )}

          <button
            onClick={event => {
              event.preventDefault();
              this.search();
            }}
          >
            كشف الحساب
          </button>
          <br />
          <br />
          <span>From: </span>
          <input
            onChange={({ target }) => {
              this.setState({ fromDate: target.value });
            }}
            type='date'
            name='fromDate'
            value={this.state.fromDate}
          ></input>
          <br />
          <br />
          <span>To: &nbsp;&nbsp;&nbsp;&nbsp;</span>
          <input
            onChange={({ target }) => {
              this.setState({ toDate: target.value });
            }}
            type='date'
            value={this.state.toDate}
            name='toDate'
          ></input>
        </form>
        <br />
        {this.state.info.name === "Loading" ? null : (
          <div className='info'>
            الاسم: {this.state.info.name}
            <br />
            الرصيد الكلي حتى تاريخ {this.state.endDate}:
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.state.info.total} شيكل
          </div>
        )}
        <table style={{ width: "100%" }}>
          {this.state.info.name === "Loading" ? null : (
            <>
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
            </>
          )}

          {this.state.records}
        </table>
      </div>
    );
  }
}

export default Records;
