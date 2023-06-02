import React, {Component, useRef} from "react";
import {w3cwebsocket as W3WebSocket} from "websocket";
import {Box, Container} from "@mui/material";
import { TextField } from "@mui/material";
import {Button} from "@mui/material";
import {Card} from "@mui/material";
import {Paper} from "@mui/material";
class App extends Component{
	state={
		loggedin: false,
		messages:[],
		value:'',
		username: '',
		room: ''
	}
	onButtonclicked=(e)=>{
		
		
	}
	connect(){
		this.client=new W3WebSocket('ws://127.0.0.1:8000/ws/main/'+this.state.room+'/');
		this.client.onopen=()=>{
			console.log("connected"+this.state.room);
			
		}
	}
	loadData(){
		this.client.onmessage=(message)=>{
			const data=JSON.parse(message.data);
			if(data){
				this.setState(
					(state)=>(
						{
							messages:[...state.messages,{
								msg: data.message,
								name:data.username,
							}]
						}
					)
				)
			}
		}
	}
	
	render(){
		//const slideRef=useRef(null);
		return(
			<div className="p-0 m-0 w-100 h-100 d-flex ">
				{ this.state.loggedin?
				<div className="p-0 m-0 w-100 h-100 d-flex flex-column">
					{this.loadData()}
					
				<div className="w-25 h-75 mx-auto mt-3 pb-3 pl-2 border border-solid px-3" style={{backgroundColor: "white"}}>
					<div className="text-center w-100 mb-3"><h5>{this.state.room}</h5></div>
					<div id="messagesDiv"  style={{maxHeight: '90%',overflowY:'scroll' }}>
					{
						this.state.messages.map(message=> <>
						<span className="mb-2" style={{fontSize:13}}>{message.name}
							</span>
							<Paper elevation={2} sx={{height: '50px', bgcolor: '#0981FC',paddingLeft:1,color: 'white'}}>{message.msg}</Paper>
						</>	
						)
					}
					</div>
					
				</div>
				<form noValidate className="d-flex w-100 h-auto flex-column">
				<TextField onChange={e=>{
					this.setState({value:e.target.value});
					this.value=this.state.value;
				}} id="msginput" type="text" className="w-25 mx-auto mt-3" variant="outlined" name="message"  label="Message" sx={{border: 0,bgcolor: "white"}}></TextField>
				<Button type='submit' onClick={(e)=>{
					
					e.preventDefault();
					this.client.send(JSON.stringify(
						{
							type: "message",
							message: this.state.value,
							username: this.state.username,
						}
					))
					this.state.value='';
					document.getElementById('msginput').value='';
					var objDiv = document.getElementById("messagesDiv");
					var l=objDiv.scrollHeight+50;
					objDiv.scrollTo(0,l);
									
				}} className="w-25 mx-auto btn btn-primary mt-3" sx={{border: 0,height:30,bgcolor:'#01CF48'}} variant="contained">Send</Button>
				</form>
				</div>
				: <div className="m-auto d-flex flex-column w-25 h-50" style={{backgroundColor: "white"}}>
				<form  noValidate className="p-2 d-flex w-100 mt-4 flex-column h-50" >
					<TextField className="mb-3" id="outlined-basic" label="Room ID" variant="outlined" name="name" onChange={e=>{
							this.setState(
								{
									room: e.target.value
								}
							)
							this.value=this.state.room;
						}
					}/>
					<TextField className="mb-3" id="outlined-basic" label="Username" variant="outlined" name="username" onChange={e=>{
							this.setState(
								{
									username: e.target.value
								}
							)
							this.value=this.state.username;
							this.connect();
						}
					}/>
					
					<Button type='submit' onClick={
					(e)=>{e.preventDefault(); this.setState({loggedin:true});}
					
				} className="m-auto" variant="outlined">Submit</Button>
				</form>
				</div>
				
				}
			</div>
		)
	}
}
export default (App)