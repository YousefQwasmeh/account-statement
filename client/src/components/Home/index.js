import React from "react";
// import axios from "axios";
import "./style.css";
import Records from "../Records";
import Customers from "../Customers";
import InputPage from "../InputPage";
import UploadFile from "../UploadFile";
class Home extends React.Component {
  state = {
    page: null,
    pages: [<Records />, <Customers />, <InputPage />, <UploadFile />],
  };
  render = () => {
    document.title = `Home Page`;
    document.body.style.background = "#fff";
    return (
      <div>
        <div className='list-buttons'>
          <button
            onClick={() => {
              this.setState({ page: 0 });
              // window.location = "/records";
            }}
          >
            كشف حساب زبون
          </button>
          <button
            onClick={() => {
              this.setState({ page: 2 });
              // window.location = "/input";
            }}
          >
            ادخال بيانات
          </button>
          <button
            onClick={() => {
              this.setState({ page: 1 });
              // window.location = "/customers";
            }}
          >
            انشاء زبون جديد
          </button>
          <button
            disabled
            onClick={() => {
              // window.location = "/customers";
            }}
          >
            بحث خاص
          </button>
          <button
            onClick={() => {
              this.setState({ page: 3 });
              // window.location = "/upload";
            }}
          >
            تحميل بيانات من ملف
          </button>
        </div>
        {this.state.pages ? this.state.pages[this.state.page] : null}
      </div>
    );
  };
}

export default Home;
