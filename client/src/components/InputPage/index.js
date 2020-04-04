import React from "react";
import axios from "axios";
import "./style.css";
class Records extends React.Component {
  state = {
    customerName: "",
    records: [],
    date: "2019-01-01",
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
    info: { name: "Loading", total: "loading", phone: "", description: "" },
    preTotal: null,
    endDate: null,
    customersNames: [],
    editNote: "hidden",
    branch: 1,
    recordInfo: {
      description: null,
      amount: null,
      date:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-" +
        (new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate()),
      branchNo: 1,
      customerName: null,
    },
    recordsInfo: {
      description: null,
      amount: null,
      fromDate:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-" +
        (new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate()),
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
      branchNo: 1,
      customerName: null,
    },
  };
  componentDidMount() {
    this.setState({
      date:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-" +
        (new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate()),
    });

    axios
      .get("/api/getAllCustomers")
      .then(({ data }) => {
        this.setState({
          customersNames: data.map((c, i) => (
            <li key={"li" + i} onClick={this.nameList}>
              {c}
            </li>
          )),
        });
      })
      .catch((err) => console.log(err, "566666666"));
  }
  updateInput = ({ target }) => {
    this.setState({
      recordInfo: { ...this.state.recordInfo, [target.name]: target.value },
    });
  };
  updateInput2 = ({ target }) => {
    this.setState({
      recordsInfo: { ...this.state.recordsInfo, [target.name]: target.value },
    });
  };
  getData = () => {
    axios
      .get(
        `/api/getRecords/${this.state.recordsInfo.fromDate}/${this.state.recordsInfo.toDate}`
      )
      .then(({ data }) => {
        this.setState({
          records: data.map((record) => {
            return (
              <tr>
                <th style={{ border: "2px solid" }}>{record.customer_name}</th>
                <th style={{ border: "2px solid" }}>{record.amount}</th>
                <th style={{ border: "2px solid" }}>{record.description}</th>
                <th style={{ border: "2px solid" }}>{record.branch}</th>
                <th style={{ border: "2px solid" }}>
                  {record.date.split("T")[0]}
                </th>
              </tr>
            );
          }),
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className='inputPage'>
        <form style={{ direction: "rtl" }}>
          <div

          // style={{
          //   // textAlign: "right",
          //   display: "flex",
          //   flexDirection: "row-reverse"
          // }}
          >
            <br />
            <span>الاسم</span>

            <input
              value={this.state.recordInfo.customerName}
              onChange={this.updateInput}
              autoComplete='off'
              name='customerName'
              // style={{ marginLeft: "70px", width: "200px" }}
              type='text'
              placeholder='الاسم'
            ></input>
            <br />
            <span>المبلغ</span>

            <input
              value={this.state.recordInfo.amount}
              onChange={this.updateInput}
              autoComplete='off'
              name='amount'
              // style={{ marginLeft: "70px", width: "200px" }}
              type='text'
              placeholder='المبلغ'
            ></input>
            <br />
            <span>البيان</span>

            <input
              value={this.state.recordInfo.description}
              onChange={this.updateInput}
              name='description'
              // style={{ marginLeft: "70px", width: "200px" }}
              type='text'
              placeholder='البيان'
            ></input>
            <br />
          </div>

          <br />
          <span>التاريخ</span>

          <input
            value={this.state.recordInfo.date}
            onChange={this.updateInput}
            name='date'
            type='date'
          ></input>
          <br />
          <span>الفرع</span>

          <input
            value={this.state.recordInfo.branchNo}
            onChange={this.updateInput}
            name='branchNo'
            // style={{ marginLeft: "70px", width: "100px" }}
            type='text'
            placeholder='رقم الفرع'
          ></input>
          <br />
          <input
            name='send'
            style={{ margin: "auto0", display: "block", width: "200px" }}
            type='submit'
            value='ادخال'
            onClick={(target) => {
              target.preventDefault();

              axios
                .post("/api/addRecord", { ...this.state.recordInfo })
                .then((response) => {
                  this.setState({
                    recordInfo: {
                      ...this.state.recordInfo,
                      customerName: "",
                      amount: "",
                      description: "",
                    },
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          ></input>
        </form>
        {/* <input
          style={{ marginLeft: "70px", width: "200px" }}
          type='text'
          placeholder='الاسم'
        ></input> */}

        <form style={{ direction: "rtl" }}>
          <span>من تاريخ</span>
          <input
            value={this.state.recordsInfo.fromDate}
            onChange={this.updateInput2}
            name='fromDate'
            type='date'
          ></input>
          {/* <br /> */}
          <span>الى تاريخ</span>
          <input
            value={this.state.recordsInfo.toDate}
            onChange={this.updateInput2}
            name='toDate'
            type='date'
          ></input>
          <br />
          <input
            type='submit'
            value='getRecords'
            onClick={(target) => {
              target.preventDefault();
              this.getData();
            }}
          ></input>
        </form>
        <table style={{ width: "100%", direction: "rtl" }}>
          {/* {this.state.info.name === "Loading" ? null : ( */}
          <>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>المبلغ</th>
                <th>البيان</th>
                <th>الفرع</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ border: "2px solid" }}>{0}</th>
                <th style={{ border: "2px solid" }}>{1}</th>
                <th style={{ border: "2px solid" }}>{2}</th>
                <th style={{ border: "2px solid" }}>{3}</th>
                <th style={{ border: "2px solid" }}>{4}</th>
              </tr>
            </tbody>
          </>
          {/* // )} */}
          <tbody>{this.state.records}</tbody>
        </table>
      </div>
    );
  }
}

export default Records;
