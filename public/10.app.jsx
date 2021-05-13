(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./client/components/Summary.jsx":
/*!***************************************!*\
  !*** ./client/components/Summary.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ \"./node_modules/@material-ui/core/esm/Grid/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CircularProgress */ \"./node_modules/@material-ui/core/esm/CircularProgress/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/esm/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Box */ \"./node_modules/@material-ui/core/esm/Box/index.js\");\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/esm/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Summary.module.css */ \"./client/components/Summary.module.css\");\n/* harmony import */ var _functions_Functions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./functions/Functions */ \"./client/components/functions/Functions.js\");\n\n\n\n\n\n\n\n\n\n\nvar theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__[\"createMuiTheme\"])({\n  palette: {\n    primary: {\n      light: '#757ce8',\n      main: '#3f50b5',\n      dark: '#002884',\n      contrastText: '#fff'\n    },\n    secondary: {\n      light: '#33eb91',\n      main: '#33eb91',\n      dark: '#33eb91',\n      contrastText: '#000'\n    }\n  }\n});\n\nfunction Summary(_ref) {\n  var movie = _ref.movie;\n  // console.log('movie: ', movie)\n  var MPAA = Object(_functions_Functions__WEBPACK_IMPORTED_MODULE_9__[\"getMPAA\"])(movie);\n  var genres = movie.genres.map(function (obj) {\n    return obj.name;\n  }).join(', ');\n  var runtime = movie.runtime;\n  var runtimeStr = \"\".concat(Math.floor(runtime / 60), \"hr \").concat(runtime % 60, \"m\");\n  var poster_url = \"https://image.tmdb.org/t/p/w300\".concat(movie.poster_path);\n  var backdrop_url = \"https://image.tmdb.org/t/p/original\".concat(movie.backdrop_path);\n  var backdrop_style = {\n    backgroundImage: \"linear-gradient(rgb(0,0,0,0.85),\\n    rgb(0,0,0,0.85)), url(\".concat(backdrop_url, \")\"),\n    backgroundSize: 'cover',\n    backgroundRepeat: 'repeat'\n  };\n\n  function CircularProgressWithLabel(val) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_styles__WEBPACK_IMPORTED_MODULE_6__[\"ThemeProvider\"], {\n      theme: theme\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      position: \"relative\",\n      display: \"inline-flex\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      variant: \"determinate\",\n      value: val,\n      color: \"secondary\"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      top: 0,\n      left: 0,\n      bottom: 0,\n      right: 0,\n      position: \"absolute\",\n      display: \"flex\",\n      alignItems: \"center\",\n      justifyContent: \"center\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      variant: \"caption\",\n      component: \"div\"\n    }, \"\".concat(val, \"%\")))));\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].summary,\n    style: backdrop_style\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].summaryImgSection\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].summaryImg,\n    src: poster_url\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].body\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, movie.original_title, \"\\xA0\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].headingDate\n  }, \"(\", movie.release_date.slice(0, 4), \")\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].info\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].MPAA\n  }, MPAA), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].infoInner\n  }, movie.release_date, \"\\xA0\\u2022\\xA0\", genres, \"\\xA0\\u2022\\xA0\", runtimeStr)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].ratingsBar\n  }, CircularProgressWithLabel(movie.vote_average * 10), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].ratingsBarText\n  }, \"User Score\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].tagline\n  }, movie.tagline), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].overviewHeading\n  }, \"Overview\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Summary_module_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"].overviewBody\n  }, movie.overview)));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Summary);\n\n//# sourceURL=webpack:///./client/components/Summary.jsx?");

/***/ }),

/***/ "./client/components/Summary.module.css":
/*!**********************************************!*\
  !*** ./client/components/Summary.module.css ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_Summary_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./Summary.module.css */ \"./node_modules/css-loader/dist/cjs.js!./client/components/Summary.module.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_Summary_module_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"], options);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_css_loader_dist_cjs_js_Summary_module_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals || {});\n\n//# sourceURL=webpack:///./client/components/Summary.module.css?");

/***/ }),

/***/ "./client/components/functions/Functions.js":
/*!**************************************************!*\
  !*** ./client/components/functions/Functions.js ***!
  \**************************************************/
/*! exports provided: getMPAA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMPAA\", function() { return getMPAA; });\nfunction getMPAA(_ref) {\n  var release_dates = _ref.release_dates;\n  var dates = release_dates.results;\n  var rating = 'NR';\n  dates.every(function (val) {\n    if (val.iso_3166_1 === 'US') {\n      rating = val.release_dates[0].certification;\n      return false;\n    }\n\n    return true;\n  });\n  return rating;\n}\n\n//# sourceURL=webpack:///./client/components/functions/Functions.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./client/components/Summary.module.css":
/*!************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./client/components/Summary.module.css ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"._2B5YwRt7jRr1PWcWKox__U {\\n  position: relative;\\n  color: white;\\n  display: flex;\\n  width: 90%;\\n  margin: 20px auto 0px auto;\\n  padding: 2%;\\n  background-repeat: repeat;\\n  background-color: grey;\\n  overflow-wrap: normal;\\n}\\nh1 {\\n  margin-bottom: 10px;\\n}\\n\\n._2g8-0c981HgTv4Ccxeg7W3 {\\n  color: grey;\\n  border: 1px solid grey;\\n  padding: 2px;\\n}\\n._2Hu5oJ1mrfKtB81zSHYjnb {\\n  margin-bottom: 15px;\\n  color: rgb(207, 207, 207);\\n  line-height: 150%;\\n}\\n._1eNR3iF5uXVN0ZI8bcZl1p {\\n  margin-left: 6px;\\n}\\n._3YOgtBY-T42gf0VBbbOW13 {\\n  margin-bottom: 10px;\\n}\\n._1t82xrPFYqv_iwdXg0cGzP {\\n  vertical-align: top;\\n  margin-left: 5px;\\n  padding-top: 5px;\\n  display: inline-block;\\n  height: 100%;\\n  width: 1%;\\n  overflow-wrap: normal;\\n}\\n._31NfPRL3ZWv7QTk13-GI7T {\\n  font-style: italic;\\n}\\n.oS2rdphL030Dox58Bq8af {\\n  font-size: 25px;\\n  font-weight: bold;\\n  margin: 15px 0px;\\n}\\n._10V3dWN5FBWsrZJZLMTPTF {\\n  height: 100%;\\n  background-color: none;\\n  display: flex;\\n  align-items: center;\\n}\\n\\n._1B30Nn9tYYJMaAv8SW9lmc {\\n  margin: 0 auto;\\n  align-self: flex-start;\\n}\\n\\n._3gMffA5qALga0j3_vhlLx6 {\\n  padding: 0 0 5% 5%;\\n  flex-grow: 1;\\n  height: 100%;\\n  background-color: none;\\n}\\n._3GCEKKGqzXjJiMR2wG8P_1{\\n  color: grey;\\n  font-weight: 100;\\n}\\n@media only screen and (max-width: 600px) {\\n  ._2B5YwRt7jRr1PWcWKox__U {\\n    flex-direction: column;\\n    width: 95%;\\n    margin-top: 0px;\\n    padding: 0px 8px 0 8px;\\n  }\\n  ._3gMffA5qALga0j3_vhlLx6 {\\n    padding: 0% 5% 5% 0%;\\n    margin-left: 3%;\\n  }\\n}\\n\", \"\"]);\n// Exports\n___CSS_LOADER_EXPORT___.locals = {\n\t\"summary\": \"_2B5YwRt7jRr1PWcWKox__U\",\n\t\"MPAA\": \"_2g8-0c981HgTv4Ccxeg7W3\",\n\t\"info\": \"_2Hu5oJ1mrfKtB81zSHYjnb\",\n\t\"infoInner\": \"_1eNR3iF5uXVN0ZI8bcZl1p\",\n\t\"ratingsBar\": \"_3YOgtBY-T42gf0VBbbOW13\",\n\t\"ratingsBarText\": \"_1t82xrPFYqv_iwdXg0cGzP\",\n\t\"tagline\": \"_31NfPRL3ZWv7QTk13-GI7T\",\n\t\"overviewHeading\": \"oS2rdphL030Dox58Bq8af\",\n\t\"summaryImgSection\": \"_10V3dWN5FBWsrZJZLMTPTF\",\n\t\"summaryImg\": \"_1B30Nn9tYYJMaAv8SW9lmc\",\n\t\"body\": \"_3gMffA5qALga0j3_vhlLx6\",\n\t\"headingDate\": \"_3GCEKKGqzXjJiMR2wG8P_1\"\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./client/components/Summary.module.css?./node_modules/css-loader/dist/cjs.js");

/***/ })

}]);