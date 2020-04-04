import React from "react";
import axios from "axios";
import "./style.css";
class Records extends React.Component {
  state = {
    customerName: "",
    records: [],
    newCustomer: {
      name: "",
      phone: "",
      note: "",
      email: "",
      type: 1,
      password: null,
      img: null,
    },
    customers: [],
    allCustomers: [],
    show: false,
    search: {
      name: "",
      phone: "",
      note: "",
      email: "",
    },
    // info: { name: "Loading", phone: "", note: "" },
    // customersNames: [],
    // editNote: "hidden",
    // recordInfo: {
    //   note: null,
    //   email: null,
    //   branchNo: 1,
    //   customerName: null
    // }
  };
  componentDidMount() {
    axios
      .get("/api/getAllCustomers")
      .then(({ data }) => {
        this.setState({
          allCustomers: data.map((customerInfo) => {
            return (
              <tr
                id={customerInfo.id}
                onClick={() => {
                  this.setState({
                    newCustomer: customerInfo,
                  });
                }}
              >
                <th style={{ border: "2px solid" }}>{customerInfo.name}</th>
                <th style={{ border: "2px solid" }}>{customerInfo.email}</th>
                <th style={{ border: "2px solid" }}>{customerInfo.note}</th>
                <th style={{ border: "2px solid" }}>{customerInfo.phone}</th>
              </tr>
            );
          }),
        });

        this.setState({
          customersNames: data.map((c, i) => (
            <li key={"li" + i} onClick={this.nameList}>
              {c}
            </li>
          )),
        });
      })
      .catch((err) => console.log(err));
  }
  updateInput = ({ target }) => {
    this.setState({
      newCustomer: { ...this.state.newCustomer, [target.name]: target.value },
    });
  };
  updateInput2 = ({ target }) => {
    this.setState({
      search: { ...this.state.search, [target.name]: target.value },
    });
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
              value={this.state.newCustomer.name}
              onChange={this.updateInput}
              autoComplete='off'
              name='name'
              type='text'
              placeholder='الاسم'
            ></input>
            <br />
            <span>البريد الاكتروني</span>

            <input
              value={this.state.newCustomer.email}
              onChange={this.updateInput}
              autoComplete='off'
              name='email'
              type='email'
              placeholder='البريد الاكتروني'
            ></input>
            <br />
            <span>ملاحظات</span>

            <input
              value={this.state.newCustomer.note}
              onChange={this.updateInput}
              name='note'
              type='text'
              placeholder='ملاحظات'
            ></input>
            <br />
          </div>

          <br />
          <span>الهاتف</span>
          <input
            value={this.state.newCustomer.phone}
            onChange={this.updateInput}
            name='phone'
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
                .post("/api/addCustomer", { ...this.state.newCustomer })
                .then((response) => {
                  this.setState({
                    newCustomer: {
                      name: "",
                      phone: "",
                      note: "",
                      email: "",
                      type: 1,
                      password: null,
                      img: null,
                    },
                    // st@ff2020 YDRC Staff
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          ></input>
        </form>

        <form style={{ direction: "rtl" }}>
          <div>
            <span>الاسم</span>
            <input
              type='text'
              name='name'
              // onChange={({ target }) =>
              //   this.setState({ customerName: target.value })
              // }
              onChange={this.updateInput2}
            ></input>
            <span>البريد الاكتروني</span>
            <input
              type='text'
              name='email'
              // onChange={({ target }) =>
              //   this.setState({ customerName: target.value })
              // }
              onChange={this.updateInput2}
            ></input>
            <span>ملاحظات</span>
            <input
              type='text'
              name='note'
              // onChange={({ target }) =>
              //   this.setState({ customerName: target.value })
              // }
              onChange={this.updateInput2}
            ></input>
            <span>الهاتف</span>
            <input
              type='text'
              name='phone'
              // onChange={({ target }) =>
              //   this.setState({ customerName: target.value })
              // }
              onChange={this.updateInput2}
            ></input>
          </div>
          <br />
          <input
            type='submit'
            value='getCustomers'
            onClick={(target) => {
              target.preventDefault();
              this.setState({ show: true });
            }}
          ></input>
        </form>
        <table style={{ width: "100%", direction: "rtl" }}>
          {this.state.show ? (
            <>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>البريد الاكتروني</th>
                  <th>ملاحظات</th>
                  <th>الهاتف</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allCustomers.filter(
                  ({
                    props: {
                      children: [
                        {
                          props: { children: name },
                        },
                        {
                          props: { children: email },
                        },
                        {
                          props: { children: note },
                        },
                        {
                          props: { children: phone },
                        },
                      ],
                    },
                  }) => {
                    return (
                      name.includes(this.state.search.name) &&
                      (email
                        ? email.includes(this.state.search.email)
                        : !this.state.search.email) &&
                      (note
                        ? note.includes(this.state.search.note)
                        : !this.state.search.note) &&
                      (phone
                        ? phone.includes(this.state.search.phone)
                        : !this.state.search.phone)
                    );
                  }
                )}
              </tbody>
            </>
          ) : null}
        </table>
      </div>
    );
  }
}

export default Records;
