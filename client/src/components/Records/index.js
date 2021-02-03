import React from "react";
import axios from "axios";
import "./style.css";
class Records extends React.Component {
  state = {
    customerName: "",
    records: [],
    fromDate: "2020-01-01",
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
    info: { name: "Loading", total: "loading", phone: "", note: "" },
    preTotal: null,
    endDate: null,
    customersNames: [],
    editNote: "hidden",
    branch: 1,
  };

  aa = () => this.state.records.map((r) => r);
  search = () => {
    axios
      .get(`/api/records/${this.state.customerName}/${this.state.branch}`)
      .then(({ data: { data, info2 } }) => {
        let a = 0;
        this.setState({
          info: { note: "", ...this.state.info, ...info2 },
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
            Number(new Date(record.date.split("T")[0])) >
              Number(new Date(this.state.toDate)) ||
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
              {/* <th style={{ border: "2px solid" }}>{record.customer_name}</th> */}
              {/* <th>{record.customer_name}</th> */}
            </tr>
          );
        });
        // if (this.state.preTotal == null) this.setState({ preTotal: a });
        let info = {};
        if (data[0])
          info = {
            name: data[0].customer_name,
            total: a,
          };

        this.setState({
          records,
          info: { ...this.state.info, ...info },
          customerName: "",
        });
      })
      .catch((err) => console.log(err));
  };
  nameList = ({ target }) => {
    this.setState({ customerName: target.innerText });
  };
  componentDidMount() {
    axios
      .get("/api/getAllCustomers")
      .then(({ data }) => {
        this.setState({
          customersNames: data.map(({ name }, i) => (
            <li key={"li" + i} onClick={this.nameList}>
              {name}
            </li>
          )),
        });
      })
      .catch((err) => console.log(err));
  }
  prediction = (name) => {
    try {
      return this.state.customersNames.filter((c) =>
        c.props.children.includes(name)
      );
    } catch (e) {
      return null;
    }
  };
  render() {
    const predictionNames = this.prediction(this.state.customerName);
    return (
      <div className='recordPage'>
        <form>
          <input
            onChange={({ target }) => {
              this.setState({ customerName: target.value });
            }}
            type='text'
            placeholder='اسم الزبون'
            value={this.state.customerName}
          />

          {predictionNames &&
          predictionNames.length !== 0 &&
          predictionNames.length === 1 &&
          predictionNames[0].props.children ===
            this.state.customerName ? null : this.state.customerName !== "" ? (
            <ul key='list' style={{ maxHeight: "160px", overflowY: "scroll" }}>
              {predictionNames}
            </ul>
          ) : null}

          <button
            onClick={(event) => {
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
          <input
            style={{ marginLeft: "5%", width: "90px" }}
            onChange={({ target }) => {
              this.setState({ branch: target.value });
            }}
            type='Number'
            placeholder='branch No'
            value={this.state.branch}
          />
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
            الاسم: <span onClick={this.nameList}>{this.state.info.name}</span>
            <br />
            الرصيد الكلي حتى تاريخ {this.state.endDate}:
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.state.info.total} شيكل
            <br />
            تلفون:{" "}
            <a href={`tel:${this.state.info.phone}`}>{this.state.info.phone}</a>
            <br />
            ملاحظات:{this.state.info.note}
            <br />
            <textarea
              id='note'
              onChange={({ target }) => {
                this.setState({
                  info: { ...this.state.info, note: target.value },
                });
              }}
              value={this.state.info.note}
              style={{ visibility: this.state.editNote, width: "80%" }}
              // type='textarea'
            ></textarea>
            <br />
            <button
              onClick={({ target }) => {
                if (this.state.editNote === "unset") {
                  console.log("saved");
                  axios
                    .post("/api/setNote", { ...this.state.info })
                    .then((response) => {
                      if (response.status === 200) console.log("done");
                      else console.log("err");
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                  target.innerText = "تعديل الملاحظات";
                } else {
                  target.innerText = "حفظ التعديلات";
                }

                document.getElementById(
                  "note"
                ).style.visibility = this.state.editNote;
                this.setState({
                  editNote:
                    this.state.editNote === "hidden" ? "unset" : "hidden",
                });
              }}
            >
              تعديل الملاحظات
            </button>
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
                  {/* <th>الاسم</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className='th'>رصيد سابق</th>
                  <th className='th'>{this.state.fromDate}</th>
                  <th className='th'></th>
                  <th className='th'></th>
                  <th className='th'>{this.state.preTotal}</th>
                  {/* <th style={{ border: "2px solid" }}>{"name"}</th> */}
                  {/* <th>{record.customer_name}</th> */}
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
