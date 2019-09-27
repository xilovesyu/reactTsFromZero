import * as React from 'react'
import './Index.css'
import './Index.less'
import helloWorldPng from '../images/hello_world.png'

export class Index extends React.Component<any, any> {
    render(): React.ReactNode {
        return (
        <div className='hello_world'>
            <p>hello world</p>
            <img src={helloWorldPng} alt='hello_world'/>
        </div>
        )
    }
}