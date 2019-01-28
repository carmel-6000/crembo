
class EnumEditor extends DropDownEditor {

  //static propTypes = {value: PropTypes.string};

  constructor(props){
    super(props);
    console.log("EnumEditor options",this.props.column.options);
    this.listOptions();
  }

  listOptions=()=>{
    
    this.lOptions= this.props.column.options.map((option,index)=>{
      return { id: index, title:option ,text:option,  value:option };
    });
    
  }
  render() {

    return (<DropDownEditor options={this.lOptions} />);

  }

}
