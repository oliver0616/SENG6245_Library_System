import React, { Component } from "react";

/* sources
* https://stackoverflow.com/questions/40515142/how-to-make-a-sticky-footer-in-react
*/


export default class Footer extends Component
{
    render()
    {
        var style = {
            backgroundColor: "#343a40",
            borderTop: "1px solid #343a40",
            textAlign: "center",
            padding: "20px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "60px",
            width: "100%",
        }

        var phantom = {
            display: 'block',
            padding: '30px',
            height: '60px',
            width: '100%',
        }
        return(
            <div>
                <div style={phantom} />
                <div style={style}>
                </div>
            </div>
        )
    }

}