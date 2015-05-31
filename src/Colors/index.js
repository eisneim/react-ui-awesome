import React from "react";

export default class Colors extends React.Component {
  componentDidMount(){
  	this.$domElm = React.findDOMNode(this);
  }
  handleSelect(e,color) {
    if(this.props.onSelectColor && typeof this.props.onSelectColor == "function"){
      this.props.onSelectColor(color);
    }
  }
  render() {
    this.colors = [
      "#000000","#222222","#444444","#888888","#AAAAAA","#CCCCCC","#dddddd","#EEEEEE","#FFFFFF","transparent",
      "#980000","#FF0000","#FF9900","#FFFF00","#00FF00","#00FFFF","#4A86E8","#0000FF","#9900FF","#A8276B",
      // the desatuarated color
      // red     red        orange   yellow   green     cyan      blue      deeblue   pruple    deeRed
      "#E6B8AF","#F4CCCC","#FCE5CD","#FFF2CC","#D9EAD3","#D0E0E3","#C9DAF8","#CFE2F3","#D9D2E9","#EAD1DC",
      "#DD7E6B","#EA9999","#F9CB9C","#FFE599","#B6D7A8","#A2C4C9","#A4C2F4","#9FC5E8","#B4A7D6","#D5A6BD",
      "#CC4125","#E06666","#F6B26B","#FFD966","#93C47D","#76A5AF","#6D9EEB","#6FA8DC","#8E7CC3","#C27BA0",
      "#A61C00","#CC0000","#E69138","#F1C232","#6AA84F","#45818E","#3C78D8","#3D85C6","#674EA7","#A64D79",
      "#5B0F00","#660000","#783F04","#7F6000","#274E13","#0C343D","#1C4587","#073763","#20124D","#4C1130",
      // flat colors
      "#BE3A31","#E54D42","#D15633","#E47F3A","#F19C3F","#F0C443","#6ACC77","#5AAE65","#5BBC9D","#4DA085",
      "#3A99D8","#2F81B7","#35495D","#2D3E4F","#9A5CB4","#8F55AB","#BDC3C7","#ECF0F1",
    ];

		const { selectedColor } = this.props;
		var $colors = this.colors.map((cc,index )=> {
      var isActive = selectedColor? (selectedColor.toLowerCase() ==cc.toLowerCase()?"active":"") : "";
			return (
				<li key={index} style={{backgroundColor:cc }}
          className={isActive}
          onClick={e=>this.handleSelect(e,cc)}>
          {cc == "transparent"?"无":""}
				</li>
			)
		});

    return (
      <div className="nb-color-panel">
      	<ul className="nb-color-swatches clearfix">
      		{$colors}
      	</ul>
      </div>
    )
  }
}