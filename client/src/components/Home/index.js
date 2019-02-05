import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        const obj = {
            key1: {
                valid: {
                    kui: false
                }
            },
            validation1: {
                required: true,
                valid: {
                    withAtr: true
                }
            },
            validation2: {
                required: true,
                valid: {
                    email: true,
                    withAtr: true
                }
            }
        }
        
        for(let key in obj){
            console.log(obj[key].valid.withAtr);
        }
        return (
            <div>
                Home
            </div>
        )
    }
}
