let GlobalVar = require("../global").default;
// global.lan = "us";
// const Components = require(`./${global.lan}-stepForm.js`).default;
// export default Components;
// export CompB from "./comp_b";

const Components = {};

Components["driver-US"] = require("./driver/us-step-form").default;
Components["driver-DE"] = require("./driver/de-step-form").default;
Components["driver-PL"] = require("./driver/pl-step-form").default;
Components["carerocket-US"] = require("./carerocket/us-step-form").default;
Components["carerocket-DE"] = require("./carerocket/de-step-form").default;
Components["carerocket-PL"] = require("./carerocket/pl-step-form").default;

export default Components;
