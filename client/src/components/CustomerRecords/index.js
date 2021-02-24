import React from "react";
import axios from "axios";
import "./style.css";
class Records extends React.Component {
  state = {
    url: "",
    records: [],
    fromDate2: "2021-01-01",
    toDate:
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1) +
      "-" +
      (new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate()),
    fromDate:
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 - 1 < 10
        ? "0" + (new Date().getMonth() + 1 - 1)
        : new Date().getMonth() + 1 - 1) +
      "-" +
      "1",
    info: { name: "Loading", total: "0", phone: "" },
    preTotal: null,
    endDate: null,
  };

  search = () => {
    axios
      .get(`/api/getRecordsUrl/${this.state.url}`)
      .then(({ data: { records: data, customerInfo } }) => {
        let a = 0;
        this.setState({
          info: { ...this.state.info, ...customerInfo },
          preTotal: null,
        });
        const records = data.map((record) => {
          const amount = record.amount >= 0 ? record.amount : "";
          const amount2 = record.amount < 0 ? record.amount : "";
          this.setState({ endDate: data[data.length - 1].date.split("T")[0] });

          a += record.amount;
          if (
            Number(new Date(record.date.split("T")[0])) <
            Number(new Date(this.state.fromDate))
          )
            this.setState({ preTotal: a });
          if (
            Number(new Date(record.date.split("T")[0])) <
            Number(new Date(this.state.fromDate))
          )
            return null;

          return (
            <tr>
              <th className='th'>{record.description}</th>
              <th className='th'>{record.date.split("T")[0]}</th>
              <th
                className='th'
                style={{
                  background: amount2 ? "red" : "",
                }}
              >
                {amount2}
              </th>
              <th className='th'>{amount}</th>
              <th className='th'>{a}</th>
            </tr>
          );
        });
        let info = {};
        if (data[0])
          info = {
            total: a || "0",
          };

        this.setState({
          records,
          info: { ...this.state.info, ...info },
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.setState({ url: this.props.match.params.url }, this.search);
  }

  render() {
    return (
      <div className='recordPage'>
        <br />
        <br />

        {this.state.info.name === "Loading" ? null : (
          <div className='info'>
            الاسم: {this.state.info.name}
            <br />
            الرصيد الكلي حتى تاريخ {this.state.endDate}:
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.state.info.total} شيكل
            <br />
            تلفون:{" "}
            <a href={`tel:${this.state.info.phone}`}>{this.state.info.phone}</a>
            <br />
            <br />
            <br />
          </div>
        )}
        <table style={{ width: "100%" }}>
          {this.state.info.name === "Loading" ? null : (
            <>
              <thead>
                <tr>
                  <th>البيان</th>
                  <th>التاريخ</th>
                  <th>الدفع</th>
                  <th>المبلغ</th>
                  <th>الرصيد</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className='th'>رصيد سابق</th>
                  <th className='th'>{this.state.fromDate}</th>
                  <th className='th'></th>
                  <th className='th'></th>
                  <th className='th'>{this.state.preTotal}</th>
                </tr>
              </tbody>
            </>
          )}
          <tbody>{this.state.records}</tbody>
        </table>
      </div>
    );
  }
}

export default Records;
