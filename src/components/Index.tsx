import * as React from 'react'
import './Index.css'
import './Index.less'
import helloWorldPng from '../images/hello_world.png'

interface IndexState {
    inputValue: string
}
export class Index extends React.Component<any, IndexState> {
    constructor(props: any) {
        super(props)
        this.state = {
            inputValue: 'hello world'
        }
    }
    handleChange = (e: any) => {
        e.preventDefault()
        this.setState({
            inputValue: e.target.value
        })
    }
    render(): React.ReactNode {
        // supported map
        const map = new Map()
        map.set('1', 'hello')
        map.set('2', 'world')
        console.log(map)
        // array function

        return (
        <div className='hello_world'>
            <input value={this.state.inputValue} onChange={this.handleChange}/>
            <p>{this.state.inputValue}</p>
            <img src={helloWorldPng} alt='hello_world'/>
        </div>
        )
    }
}