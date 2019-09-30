import * as React from 'react'
import './Index.css'
import './Index.less'
import helloWorldPng from '../images/hello_world.png'
import { Avatar, Button, Input, Modal } from 'antd'
//import 'antd/es/button/style/css' //manually import
//import 'antd/es/input/style/css' // manually import
import IndexStore from '../stores/Index'
import { observer } from 'mobx-react'

interface IndexState {
    inputValue: string;
}
@observer
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
        //console.log(map)
        // array function
        const promise = new Promise((resolve: any, reject: any) => {
            resolve()
        })
        return (
        <div className='hello_world'>
            <input value={this.state.inputValue} onChange={this.handleChange}/>
            <p>{this.state.inputValue}</p>
            <img src={helloWorldPng} alt='hello_world'/>
            <Avatar icon={'user'}/>
            <Input value={IndexStore.inputValue} onChange={(e: any) => {
                IndexStore.changeValue(e.target.value)
            }}/>
            <p>{IndexStore.inputValue}</p>
            <Button type={'primary'} onClick={(e: any) => {
                e.preventDefault()
                IndexStore.changeVisible(true)
            }}>Click Me</Button>
            <Modal
                title="Hello World Modal"
                visible={IndexStore.modalVisible}
                onOk={(e: any) => {
                    e.preventDefault()
                    IndexStore.changeVisible()
                }}
                onCancel={(e: any) => {
                    e.preventDefault()
                    IndexStore.changeVisible()
                }}
            >
                <p>Hello World</p>
            </Modal>
        </div>
        )
    }
}
