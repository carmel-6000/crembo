import ReactDataGrid from 'react-data-grid';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import update from 'immutability-helper';
import './Grid.css';
import './ContextMenu.css'
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Link } from "react-router-dom";
import Auth from '../Auth/Auth';
import * as moment from 'moment';
import Modal from 'react-responsive-modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
// import Select from 'react-select';
//import { Editors } from "react-data-grid-addons";


const { Row } = ReactDataGrid;
const {
  Menu: { ContextMenu, MenuItem, SubMenu },
  ToolsPanel: { AdvancedToolbar: Toolbar, GroupedColumnsPanel },
  Data: { Selectors },
  Draggable: { Container: DraggableContainer },
  Formatters: { ImageFormatter, DateRangeFormatter, DropDownFormatter },
  Editors: { DropDownEditor, AutoComplete }
} = require('react-data-grid-addons');


const booleansArgs = [{ id: 0, title: 'No', text: 'No', value: 0 }, { id: 1, title: 'Yes', text: 'Yes', value: 1 }];
const BooleanEditor = <DropDownEditor options={booleansArgs} />;


const tagArgs = [
  { id: "thing", title: "thing" },
  { id: "fg", title: "fg" },
  { id: "reg", title: "reg" }
]
const TagThing = <AutoComplete options={tagArgs} />

const reut = "reut";


class EnumEditor extends DropDownEditor {

  static propTypes = { value: PropTypes.array };

  constructor(props) {
    super(props);
    console.log("EnumEditor options", this.props.column.options);
    this.listOptions();
  }

  listOptions = () => {
    this.lOptions = this.props.column.options.map((option, index) => {
      return { id: index, title: option, text: option, value: option };
    });
  }

  render() {
    return (<DropDownEditor options={this.lOptions} />);

  }

}



class RowRenderer extends React.Component {
  static propTypes = {
    idx: PropTypes.number
  };

  constructor(props) {
    super(props);
    //    console.log("this.parentState",this.props.parentState);
  }

  setScrollLeft = (scrollBy) => {
    // if you want freeze columns to work, you need to make sure you implement this as apass through
    this.row.setScrollLeft(scrollBy);
  };

  getClassName = () => {

    let bgColor = '';
    // console.log("this.row",this.row); // זה מאוד חשוב והכל 
    if (this.props.parentState.crud && this.props.parentState.crud.metaFunctions &&
      this.props.parentState.crud.metaFunctions.heightLightRows && Array.isArray(this.props.parentState.crud.metaFunctions.heightLightRows) && typeof this.row === 'object') {

      this.props.parentState.crud.metaFunctions.heightLightRows.forEach((hlRow) => {
        //hlRow.field
        if (this.row.props.row[hlRow.field] !== null) {

          //console.log ("val for field ("+hlRow.field+"):",this.row.props.row[hlRow.field]);
          //console.log("DIFF IN HOURS",moment().diff(moment(this.row.props.row[hlRow.field]),'hours'));
          if (hlRow.rule === 'morethenhours' && hlRow.hours) {

            //console.log("hlRow.rule is 'morethenhours'");
            let diff = moment().diff(moment(this.row.props.row[hlRow.field]), 'hours');
            if (diff > hlRow.hours) {
              bgColor = hlRow.backgroundColor;
            }


          }
          if (hlRow.rule === 'lasthours' && hlRow.hours) {


            let diff = moment().diff(moment(this.row.props.row[hlRow.field]), 'hours');
            console.log("hlRow.rule is 'lasthours' for user:" + this.row.props.row.userName + " with diff:" + diff);
            //console.log("DIFF?!",diff);
            //console.log("hlRow.hours",hlRow.hours);

            if (diff > 0 && diff < hlRow.hours) {
              bgColor = hlRow.backgroundColor;
            }

          }

          //moment(rawDate).format('DD/MM/YY HH:mm');
        }
      });



    }
    return bgColor;
  }



  render() {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return (<div className={this.getClassName()} ><Row ref={node => this.row = node} {...this.props} /></div>);
  }
}

class BooleanFormatter extends React.Component {

  static propTypes = { value: PropTypes.number };

  render() {
    //console.log("this.props.value?",this.props.value);
    const val = this.props.value === 1 ? "yes" : "no";
    return (
      <div className="formatter-boolean">
        {val}
      </div>
    );
  }
}


class ProgressBarFormatter extends React.Component {

  static propTypes = { value: PropTypes.number };

  render() {
    const val = this.props.value;
    return (
      <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
          aria-valuenow={val} aria-valuemin="0" aria-valuemax="100" style={{ width: val + '%' }}> {val}% </div>
      </div>
    );
  }
}


class ExternalLinkFormatter extends React.Component {

  static propTypes = { value: PropTypes.string };

  render() {

    // console.log("LinkFormatter this.props",this.props.dependentValues.href);
    let val = this.props.dependentValues.val;
    let href = this.props.value;

    if (href === "" || href === undefined) {
      return (<div className="formatter-boolean">-</div>);
    } else {
      console.log("HREF", href);
      return (<a href={href} target="_blank">{val}</a>)
    }

  }

}

class ListFormatter extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    modelMeta: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.listed = [];
    console.log("this props value", this.props.value)

  }

  render() {

    //this is the name of the related table. 
    const modelRelations = Object.keys(this.props.res.options.relations);

    //this is an array of the thing you want to show as tags from the related table. 
    let tagParam = this.props.res.crud.fields[modelRelations].listView;
    this.listed = [];
    this.middle = "";

    for (let i = 0; i < this.props.value.length; i++) {
      for (let j = 0; j < tagParam.length; j++) {
        this.middle = this.middle + " " + this.props.value[i][tagParam[j]]
      }

      this.listed.push(this.middle);
      this.middle = ""
    }

    // if the row doesn't have an Id, or that this.listed is empty  > return "-"
    let id = this.props.dependentValues.id;
    console.log("listed", this.props.value)
    if (id === "" || id === undefined || this.listed === []) {
      return (<div>-</div>);
    } else {
      return (
        <div className="btn-group">
          {this.listed.map((item) => (
            <h4> <span className="badge badge-info">{item}</span></h4>
          ))}
        </div>
      );
    }

  }
}

// class TagFormatter extends React.Component {
//   static propTypes = {
//     //  options: PropTypes.array.isRequired,
//      value: PropTypes.array
//     };
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: []
//     };
//     this.handleSelectChange = this.handleSelectChange.bind(this);
//   }

//   getInputNode() {
//     return ReactDOM.findDOMNode(this);
//   }

//   getValue() {
//     const updated = {};
//     updated[this.props.column.key] = this.state.value;
//     return updated;
//   }

//   handleSelectChange(value) {
//     this.setState({ value });
//   }

//   render() {
//     let options = [];

//      options = this.props.dependentValues.tags.map((tag) => {
//     // this.options = this.props.column.tags.map((tag) => {
//       return { value: tag, label: tag };
//     });

//     return (
//       <div className="react-contextmenu react-contextmenu--visible">
//       <Select refs="multiselect" multi simpleValue value={this.state.value} 
//         options={options}
//         placeholder="Select your favourite(s)"
//          onChange={this.handleSelectChange} 
//          />
//          <AutoCompleteFilter {...props} multiSelection={true} />;
//        </div>
//     );
//   }
// }

class LinkFormatter extends React.Component {

  static propTypes = { value: PropTypes.string };

  render() {
    //console.log("LinkFormatter this.props",this.props.dependentValues.href);

    let hrefTmpl = this.props.dependentValues.href;
    let href = null;
    if (hrefTmpl.includes("{this.value}")) {
      href = hrefTmpl.replace("{this.value}", this.props.value);
    } else {
      href = hrefTmpl;
    }

    return (
      <div className="formatter-boolean">
        <Link to={href}>{this.props.value}</Link>
      </div>);
  }

}


class DateTimeFormatter extends React.Component {

  static propTypes = { value: PropTypes.string };

  constructor(props) {
    super(props);

    let rawDate = this.props.value;
    let dateObj = new Date(rawDate);
    //TimeAgo.locale(en);
    //const timeAgo = new TimeAgo('en-US');
    //let tAgo=timeAgo.format(Date.now() - ((new Date()).getTime()-dateObj.getTime()) );
    this.rawDate = rawDate;
    this.fDate = rawDate == '' || rawDate === null ? "-" : moment(rawDate).format('DD/MM/YY HH:mm');
  }

  render() {
    //console.log("rawDate?",this.rawDate);
    const fDate = this.fDate;

    return (

      <div className="formatter-datetime">
        {fDate}
      </div>);
  }
}




// Create the context menu.
// Use this.props.rowIdx and this.props.idx to get the row/column where the menu is shown.
class MyContextMenu extends React.Component {
  static propTypes = {
    onRowDelete: PropTypes.func.isRequired,
    //onRowInsertAbove: PropTypes.func.isRequired,
    //onRowInsertBelow: PropTypes.func.isRequired,
    rowIdx: PropTypes.string.isRequired,
    idx: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  onRowDelete = (e, data) => {
    if (typeof (this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  };

  onRowInsertAbove = (e, data) => {
    if (typeof (this.props.onRowInsertAbove) === 'function') {
      this.props.onRowInsertAbove(e, data);
    }
  };

  onRowInsertBelow = (e, data) => {
    if (typeof (this.props.onRowInsertBelow) === 'function') {
      this.props.onRowInsertBelow(e, data);
    }
  };

  render() {
    const { idx, id, rowIdx } = this.props;
    /*
    <SubMenu title="Insert Row">
              <MenuItem data={{ rowIdx, idx }} onClick={this.onRowInsertAbove}>Above</MenuItem>
              <MenuItem data={{ rowIdx, idx }} onClick={this.onRowInsertBelow}>Below</MenuItem>
            </SubMenu>
    */
    return (
      <ContextMenu id={id}>
        <MenuItem data={{ rowIdx, idx }} onClick={this.onRowDelete}>Delete Row</MenuItem>

      </ContextMenu>
    );
  }
}


class ChooseFieldsDropDown extends React.Component {


  constructor(props) {
    super(props);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  toggleCheckbox({ target }) {

    let colName = target.getAttribute("name");

    if (target.checked) {
      this.props.addCol(colName);
    } else {
      this.props.removeCol(colName)
    }

  }

  render() {
    return (
      <div className="dropdown chooseFieldsDropDown">

        <button
          className="btn btn-secondary dropdown-toggle" type="button"
          id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
          aria-expanded="true"
        >
          Choose Fields
          </button>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <ul>
            {
              this.props.allCols.map((col, i) =>
                <li key={i}>
                  <input type='checkbox'
                    defaultChecked={true}
                    onClick={this.toggleCheckbox}
                    name={col.key}
                    label={col.name}
                  />
                  <label>{col.name}</label>
                </li>)
            }
          </ul>

        </div>
      </div>
    );

  }
}

class AddNewRow extends React.Component {

  static propTypes = {
    onAddRow: PropTypes.func,
    numberOfRows: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onAddRow = () => {
    if (this.props.onAddRow !== null && this.props.onAddRow instanceof Function) {
      this.props.onAddRow({ newRowIndex: this.props.numberOfRows }, this.state); //WHAT IS THIS????? ? 
      this.setState({
        gender: "",
        userName: ""
      })

    }
  };

  changeGender(event) {
    this.setState({
      gender: event.target.value,
    })
  }
  changeUser(event) {
    this.setState({
      userName: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-info" data-toggle="modal" data-target=".bd-example-modal-lg" >
          Add Row
        </button>

        <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h3> Fill out the following fields to create a new row:</h3>

                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>


              <div className="modal-body">   {/* כאן נכנסים כל השדות המותאמים אישית לכל טבלה */}
                <form>
                  <div className="form-group row">
                    <label htmlFor="staticUserName" className="col-sm-4 col-form-label">User Name:</label>
                    <div className="col-sm-7">
                      <input value={this.state.userName} onChange={this.changeUser.bind(this)} type="text" className="form-control-plaintext" id="staticUserName" placeholder="User Name" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Password:</label>
                    <div className="col-sm-7">
                      <input type="password" className="form-control-plaintext" id="inputPassword" placeholder="Password" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="GenderSelection" className="col-sm-4 col-form-label">Gender:</label>
                    <div className="col-sm-7">
                      <select value={this.state.gender} onChange={this.changeGender.bind(this)} className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                        <option defaultValue>Choose..</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <div className="form-group col-sm-11">
                  <button type="button" data-dismiss="modal" className=" btn-info btn-lg" onClick={this.onAddRow}>Add a Row</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    );
  }
}


class CustomToolbar extends React.Component {

  static propTypes = {
    onToggleFilter: PropTypes.func,
    enableFilter: PropTypes.bool,
    addRowButtonText: PropTypes.string,
    filterRowsButtonText: PropTypes.string,
    children: PropTypes.any,
    groupBy: PropTypes.array.isRequired,
    onColumnGroupAdded: PropTypes.func.isRequired,
    onColumnGroupDeleted: PropTypes.func.isRequired,
    addCol: PropTypes.func,
    removeCol: PropTypes.func,
    allCols: PropTypes.array
  };
  constructor(props) {
    super(props);
  }

  renderCustomButtons = () => {
    const cButtons = this.props.customButtons;

    return (
      <div>
        {
          cButtons.map((cButton, i) => <button type="button"
            onClick={() => this.props.handleCustomButtonClick('openRawTable')}
            className="btn" key={i}>{cButton.label}</button>)
        }
      </div>
    )
  }

  renderToggleFilterButton = () => {
    if (this.props.enableFilter) {
      return (<button type="button" className="btn" onClick={this.props.onToggleFilter}>
        {this.props.filterRowsButtonText}
      </button>);
    }
  };

  logOut = () => {

    console.log("logout is launched");

    Auth.logout(() => {
      window.location.reload();
    });

  }

  //toolbar={<Toolbar enableFilter={true}/>}
  render() {
    console.log("CustomToolBar ?! this.props.allCols", this.props.allCols);
    return (

      <React.Fragment>


        <div className="react-grid-Toolbar">

          <div className="tools">

            {this.renderCustomButtons()}
            <AddNewRow onAddRow={this.props.onAddRow} allCols={this.props.allCols} />
            {/* {this.renderAddRowButton()} */}
            {this.renderToggleFilterButton()}
            <ChooseFieldsDropDown addCol={this.props.addCol} removeCol={this.props.removeCol} allCols={this.props.allCols} />
            {this.props.children}
          </div>

          <GroupedColumnsPanel groupBy={this.props.groupBy}
            onColumnGroupAdded={this.props.onColumnGroupAdded}
            onColumnGroupDeleted={this.props.onColumnGroupDeleted}

          />

        </div>
      </React.Fragment>
    );
  }
}









class Grid extends Component {

  //You can call any PropTypes inside this.props 
  static propTypes = {
    whereObj: PropTypes.object,
    modelMeta: PropTypes.string, //api/meta/TABLE_NAME
    modelApi: PropTypes.string, //api/TABLE_NAME
    useShortFieldsSyntax: PropTypes.boolean // true
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      allCols: [],
      originalRows: [],
      rows: [],
      cols: [],
      filters: {},
      groupBy: [],
      expandedRows: {},
      modalPopup: () => <div />, ///????????
      isModalPopupOpened: false ///????
    };

    this.customButtons = [];
  }

  ///This function makes al the column names to become from "like that" to "Like that"
  ucWords(st) {
    st = st.toLowerCase();
    return st.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function (s) { return s.toUpperCase(); });
  }

  componentDidMount() {

    let cols = [];
    let allCols = [];

    //fetch the model.json, and transform the common/models/__.json into an object 
    Auth.authFetch(this.props.modelMeta).then(response => { return response.json() }).then(res => {


      //metaRes/crud== another name for res (which is model.json)
      this.setState({ crud: res.crud });
      let metaRes = res;
      let col = {};
      

      console.log("MODEL.JSON (RES):", res);
      console.log("Model Relations Are:", Object.keys(res.options.relations));

      //for each prop (column) in res.crud.fields 
      for (let prop in res.crud.fields) {

        let key = null, name = null;


        //replace thisWord or this_word into This Word
        if (this.props.useShortFieldsSyntax == true) {

          key = prop;
          name = this.ucWords(new String(prop).replace(/([A-Z])/g, " $1"));
        } else {

          key = new String(prop).replace(/([A-Z])/g, "_$1").toLowerCase();
          name = this.ucWords(key.replace(/_/g, " "));
        }

        //Col is the properties of every column, as writted inside the jason (width, editable.. etc). 
        // if you''l console.log col, you'll get each column properties. 
        col = {
          key: key,
          name: name,
          editable: res.crud.fields[prop] && res.crud.fields[prop].editable && res.crud.fields[prop].editable === 'true',
          resizable: true,
          sortable: true,
          filterable: true,
          draggable: true
        }

        // THIS PART SHOWS US WHAT TO DO IN EVERY CASE OF COL PROPERTIES.

        if (prop === "id" || prop === "index") {
          col.width = 80;
        }
        if (res.crud.fields[prop] && res.crud.fields[prop].type) {
          switch (res.crud.fields[prop].type) {
            case "boolean":
              col.formatter = BooleanFormatter;
              col.editor = BooleanEditor;
              col.resizable = false;
              col.width = 80;

              break;

            case "datetimePicker":
              col.formatter = DateTimeFormatter;

              break;

            case "enum":
              col.editor = EnumEditor;
              col.options = res.crud.fields[prop].options;
              col.resizable = false;

              break;

            case "image":
              col.formatter = ImageFormatter;
              col.width = 200;

              break;

            case "link":
              col.formatter = LinkFormatter;
              col.getRowMetaData = (row) => { return { ...row, href: res.crud.fields[prop].href }; }

              break;

            case "externalLink":
              col.formatter = ExternalLinkFormatter;
              col.getRowMetaData = (row) => { return { ...row, val: res.crud.fields[prop].value }; }

              break;

            case "progress":
              col.formatter = ProgressBarFormatter;
              col.width = 220;

              break;

            case "tag-list":
              col.editor = TagThing;
              // col.formatter= TagFormatter;
              col.tags = res.crud.fields[prop].tags;
              // col.getRowMetaData = (row) => { return { ...row, tags: res.crud.fields[prop].tags }; }
              col.width = 220;

              break;

            case "list-view":
              col.formatter = <ListFormatter res={res} />;
              col.getRowMetaData = (row) => row
              col.width = 100;

              break;

            default:
              col.resizable = true;

          }
        }

        if (res.crud.fields[prop] && res.crud.fields[prop].width && !isNaN(res.crud.fields[prop].width)) {
          col.width = parseInt(res.crud.fields[prop].width);
        }

        if (res.crud.fields[prop] && res.crud.fields[prop].isHidden && res.crud.fields[prop].isHidden == "true") {

        } else {
          //this is the columns that being shown at the site itself.
          cols.push(col);
        }
        //allCols is all of the coulumns ---> both hidden an shown columns.
        allCols.push(col);


      }


      let apiUrl = this.props.modelApi; //api/modelname
      const modelRelations = Object.keys(res.options.relations);

      // <---- THIS PART IS NOT CLEAR ---- >
      // if (this.props.whereObj) {
      //   console.log("where object~~~", this.props.whereObj);
      //   apiUrl = this.props.modelApi + "?where=" + JSON.stringify(this.props.whereObj);
      // }

      // <---- SHOULD WORK , UNDERSTAND WHY NOT --- > 
      // If the model has a relation, it takes t and give us the model + the relation data. 
      for (let i = 0; i < modelRelations.length; i++) {

        if (res.options.relations[modelRelations[i]].type && res.options.relations[modelRelations[i]].type === "hasMany") {
          apiUrl = this.props.modelApi + "?filter=" + JSON.stringify({ include: modelRelations });
        } else {
          apiUrl = this.props.modelApi;
        }
      }

      console.log("apiUrl", apiUrl);


      Auth.authFetch(apiUrl).then(response => { return response.json() }).then(res => {

        console.log("modelData?", res);
        console.log("cols", cols)
        if (typeof res == 'undefined') {
          res = [];
        }
        this.setState({ originalRows: res, rows: res, cols: cols, sortColumn: null, sortDirection: null, allCols: allCols });


        if (metaRes.crud && metaRes.crud.menubar && metaRes.crud.menubar.menuitems && typeof Array.isArray(metaRes.crud.menubar.menuitems) && metaRes.crud.menubar.menuitems.length > 0) {
          //console.log("~~~~menubar exist with menuitems longer than 0",metaRes.crud.menubar.menuitems);
          for (let miIndex in metaRes.crud.menubar.menuitems) {

            let menuItem = metaRes.crud.menubar.menuitems[miIndex];

            if (menuItem.type) {
              switch (menuItem.type) {
                case "popupAction":
                  //console.log("~~~~~~~~~~~~~~~~~~It's a popupAction menu item type");
                  this.customButtons.push(menuItem);

                  // console.log("rows",res);
                  //console.log("cols",cols);
                  let tac = { textAlign: 'center' };
                  let borderStyle = { border: '1px solid #ededed' };

                  this.setState({
                    modalPopup: () => (
                      <Modal open={this.state.isModalPopupOpened} center onClose={this.onCloseModal}>
                        <table border="1" cellspacing="5" cellpadding="5" style={borderStyle}>
                          <tr>
                            {cols.map((col, ii) => <th key={ii}>{col.name}</th>)}
                          </tr>
                          {

                            res.map((row, i) => <tr key={i}>
                              {
                                cols.map((col, ii) => {
                                  if (new String(row[col.key]).includes("http")) {
                                    return <td key={ii} style={tac}><a href={row[col.key]}>Link</a></td>
                                  } else {
                                    return <td key={ii} style={tac}>{row[col.key]}</td>
                                  }

                                })

                              }</tr>)
                          }
                        </table>
                      </Modal>

                    )
                  });

                  break;
              }
            }
          }
        } else {
          //              console.log("~~~~menubar DOES NOT exist with menuitems longer than 0");
        }




      }).catch((err) => {
        console.log('Fetch Error :-S', err);
      });

    }).catch((err) => {
      console.log('Fetch Error :-S', err);
    });
  }

  onCloseModal = () => {
    this.setState({ isModalPopupOpened: false });
  };

  addCol = (fieldName) => {
    //console.log("add col is invoked with fieldName",fieldName);
    let cols = [...this.state.cols];
    let exist = false;
    for (var i in cols) {
      if (cols[i]['key'] == fieldName) {
        exist = true;
      }
    }
    if (exist) return;
    let colsChanged = false;
    for (let index in this.state.allCols) {
      if (this.state.allCols[index]['key'] == fieldName) {
        cols.push(this.state.allCols[index]);
        colsChanged = true;
      }
    }
    this.setState({ cols: cols });


  }
  removeCol = (fieldName) => {
    //console.log("remove col is invoked with fieldName",fieldName);
    let cols = [...this.state.cols];
    for (var i in cols) {
      if (cols[i]['key'] == fieldName) {
        cols.splice(i, 1);
      }
    }
    //console.log("cols after",cols);
    this.setState({ cols: cols });

  }

  getSize = () => {
    return this.getRows().length;
  };


  getRows = () => {

    let r = Selectors.getRows(this.state);
    //console.log("rows(r)",r);
    return r;
  };

  /*
  rowGetter = (i) => {
    return this.state.rows[i];
  };
  */

  rowGetter = (rowIdx) => {
    let rows = this.getRows();
    //console.log("ROWS?!?!!?!?",rows);
    let result = rows[rowIdx];
    console.log("ROWS[IDS]?!?!!? tom", rows[rowIdx].id);
    result.index = rowIdx;
    return result;
  };

  addNewRow = (index, obj) => {

    let rows = [...this.state.rows];
    let newRow = { ...rows[rows.length - 1] };
    for (let key in newRow) {
      newRow[key] = null;
    }
    newRow.userName = obj.userName;
    newRow.genderType = obj.gender;

    rows.push(newRow);
    this.setState({ rows: rows });
    setTimeout(() => {
      let objDiv = document.querySelector(".react-grid-Canvas");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 500);
  }

  handleCustomButtonClick = (type) => {
    console.log("do action is launched with type", type);
    if (type == 'openRawTable') {
      this.setState({ isModalPopupOpened: true });
    }
  }

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };
    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
    this.setState({ rows: rows });
  };


  handleFilterChange = (filter) => {

    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    console.log("setting filters on state:", newFilters);
    this.setState({ filters: newFilters });
  };

  onClearFilters = () => {
    // all filters removed
    this.setState({ filters: {} });
  };


  deleteRow = (e, { rowIdx }) => {

    const options = {
      //title: 'Title',
      message: 'Are you should you want to delete this entry? This action cannot be undone!',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {

            //console.log("row id",this.state.rows[rowIdx].id);

            Auth.authPost(this.props.modelApi + '/' + this.state.rows[rowIdx].id, {
              method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            })
              .then(response => { return response.json() }).then(res => {

                if (res.count && res.count == 1) {

                  this.state.rows.splice(rowIdx, 1);
                  this.setState({ rows: this.state.rows });
                } else {
                  console.log("Delete err", res.error);
                }
              });

          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ],
      childrenElement: () => <div />,
      //customUI: ({ title, message, onClose }) => <div>Custom UI</div>,
      willUnmount: () => { }
    }

    confirmAlert(options)




  };


  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {

    //console.log("Grid has updated?");
    let rows = this.state.rows.slice();


    for (let i = fromRow; i <= toRow; i++) {

      let rowToUpdate = { ...rows[i] };
      let updatedRow = update(rowToUpdate, { $merge: updated });

      rows[i] = updatedRow;
      let uRow = { ...updatedRow };
      delete uRow.id;
      delete uRow.created;
      console.log("new row?", updatedRow.id);
      console.log("lalala", uRow)
      let whereUrlEncoded = '{"id":' + (updatedRow.id == null ? '"a"' : updatedRow.id) + '}';
      Auth.authPost(this.props.modelApi + '/upsertWithWhere?where=' + whereUrlEncoded, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(uRow) }).then(response => { return response.json() }).then(res => {
        console.log("Update res", res);

        ////////////////////////////////////////////////////////////////////////////ID כאן
        if (res.id && !isNaN(res.id) && updatedRow.id == null) {
          updatedRow.id = res.id;
        }
        ////////////////////////////////////////////////////////////////////////////ID כאן


        if (res.error) {
          rows[i] = rowToUpdate;
          this.setState({ rows: rows });
        }
        console.log("rescount", res.count) /// res.count is undefined and have never been declared, so it won't put 
        if (res.count && res.count > 0) {
          console.log("data is updated");
          this.setState({ rows: rows });

        }
      });

    }

    this.setState({ rows: rows });
  };


  onColumnGroupAdded = (colName) => {
    let columnGroups = this.state.groupBy.slice(0);
    let activeColumn = this.state.cols.find((index) => index.key === colName)
    let isNotInGroups = columnGroups.find((index) => activeColumn.key === index.name) == null;
    if (isNotInGroups) {
      columnGroups.push({ key: activeColumn.key, name: activeColumn.name });
    }

    this.setState({ groupBy: columnGroups });
  };

  onColumnGroupDeleted = (name) => {
    let columnGroups = this.state.groupBy.filter(function (g) {
      return typeof g === 'string' ? g !== name : g.key !== name;
    });
    this.setState({ groupBy: columnGroups });
  };

  onRowExpandToggle = ({ columnGroupName, name, shouldExpand }) => {
    let expandedRows = Object.assign({}, this.state.expandedRows);
    expandedRows[columnGroupName] = Object.assign({}, expandedRows[columnGroupName]);
    expandedRows[columnGroupName][name] = { isExpanded: shouldExpand };
    this.setState({ expandedRows: expandedRows });
  };



  render() {

    const ModalPopup = this.state.modalPopup;

    return (
      <React.Fragment>
        <DraggableContainer>
          <ReactDataGrid
            // ref={node => this.grid = node}
            enableCellSelect={true}
            enableDragAndDrop={true}
            onGridSort={this.handleGridSort}
            enableCellSelect={true}
            columns={this.state.cols}
            rowGetter={this.rowGetter}
            rowsCount={this.getSize()}
            minHeight={800}
            onAddFilter={this.handleFilterChange}
            onRowExpandToggle={this.onRowExpandToggle}
            contextMenu={
              <MyContextMenu id="customizedContextMenu" onRowDelete={this.deleteRow}
              />
            }
            toolbar={
              <CustomToolbar
                handleCustomButtonClick={this.handleCustomButtonClick}
                customButtons={this.customButtons}
                groupBy={this.state.groupBy}
                onColumnGroupAdded={this.onColumnGroupAdded}
                onColumnGroupDeleted={this.onColumnGroupDeleted}
                enableFilter={true}
                onAddRow={this.addNewRow}
                filterRowsButtonText="Filter"
                addCol={this.addCol}
                removeCol={this.removeCol}
                allCols={this.state.allCols}
              />
            }
            onClearFilters={this.onClearFilters}
            onGridRowsUpdated={this.handleGridRowsUpdated}
            rowRenderer={
              <RowRenderer parentState={this.state} />
            }
          />
        </DraggableContainer>
        <ModalPopup />
      </React.Fragment>

    );
  }
}

export default DragDropContext(HTML5Backend)(Grid);
