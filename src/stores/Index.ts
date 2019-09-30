import { action, observable } from 'mobx'

class Index {
    @observable inputValue = 'hello world'

    @action.bound
    changeValue(value: string): void {
        this.inputValue = value
    }

    @observable modalVisible = false

    @action.bound
    changeVisible(visible?: boolean): void {
        this.modalVisible = (visible===null || visible===undefined) ? !this.modalVisible : visible
    }
}
export default new Index()
