import React from "react";

export default class Overlay extends React.Component {
	constructor(){
		super()
		this.handleClick = this.handleClick.bind(this);
		this.docListener = this.docListener.bind(this);
	}
	componentDidMount(){
		this.$domElm = React.findDOMNode(this);
		this.$overlay = this.$domElm.querySelector(".nb-overlay");
		this.$firstChild = this.$domElm.children[0];

		if(!this.$overlay || !this.$firstChild) return;
		/**
		 * now start to change overlay's position based on 's width and height;
		 */
		var direction = this.props.direction || "right";


		if(direction == "right"){
			this.$overlay.style.left = (this.$firstChild.clientWidth+ 12)+"px";
			this.$overlay.style.top = (this.$firstChild.clientHeight/2 - this.$overlay.clientHeight/2)+"px"
		}else if(direction == "left"){
			this.$overlay.style.left = (-this.$overlay.clientWidth - 12)+"px";
			this.$overlay.style.top = (this.$firstChild.clientHeight/2 - this.$overlay.clientHeight/2)+"px"
		}else if(direction == "bottom"){
			this.$overlay.style.top = (this.$firstChild.clientHeight+8) +"px";
			this.$overlay.style.left = (-this.$overlay.clientWidth/2 + this.$firstChild.clientWidth/2)+"px";
		}else if(direction == "top"){
			this.$overlay.style.top = (-8 -this.$overlay.clientHeight )+"px";
			this.$overlay.style.left = (-this.$overlay.clientWidth/2 + this.$firstChild.clientWidth/2)+"px";
		}else{ // direction is center; 
			this.$overlay.style.top = (this.$firstChild.clientHeight/2 - this.$overlay.clientHeight/2)+"px"
			this.$overlay.style.left = (-this.$overlay.clientWidth/2 + this.$firstChild.clientWidth/2)+"px";
		}
		// register the callback from parent if provided;
		if(this.props.registerCallback && typeof this.props.registerCallback=="function" ){
			this.props.registerCallback( this );
		}
	}
	handleClick(e){
		// if the overlay is triggered by click not hover;
		if(this.props.triggerBy == "click" && !this.$overlay.contains(e.target) ){
			this.$domElm.classList.add("active")
			document.addEventListener("click",this.docListener);
		}
	}
	docListener( e ){
		// only when click outside of overlay to hide the overlay;
		if( e.target != this.$overlay && !this.$overlay.contains(e.target) ){
				this.$domElm.classList.remove("active")
				document.removeEventListener("click",this.docListener);
		}
	}

	hide(){
		this.$domElm.classList.remove("active");
		document.removeEventListener("click",this.docListener);
	}
	render(){
		if(!this.props.children || this.props.children.length<2){
			return <span>ERROR,Overlay组件需要两个子组件或者HTML标签，第一个为显示的内容，</span>
		}
		var {direction,maxWidth,minWidth} = this.props
		var overlayStyle = {
			minWidth: (minWidth || 50)+"px",
		}
		if(maxWidth) overlayStyle.maxWidth = maxWidth + "px";
		direction = direction || "right";

		var className = "nb-overlay-wraper"
		if(this.props.triggerBy != "click" ){
			className += " byHover"
		}

		var overClass = "nb-overlay over-"+direction;

		return(
		<div className={className} onClick={this.handleClick}>
			{this.props.children[0]}
			<div className={overClass} style={overlayStyle}>
				{this.props.children.slice(1)}
			</div>
		</div>
		)
	}
}