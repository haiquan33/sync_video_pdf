import React, { Component } from 'react';
import logo from './logo.woff';
export default class Header extends Component {
    render() {
        return (
            <div style={{display:'flex',flexDirection:'column', justifyContent: 'flex-start',padding:'5px', borderBottom: '2px solid #757575',borderBottomWidth:'1px'}}>
                <img src={logo} style={styles.logo}/>
           
            </div>
        )
    }
}

const styles={
    logo:{
        width:'15%',
       
        marginLeft:'0px'
    }
}