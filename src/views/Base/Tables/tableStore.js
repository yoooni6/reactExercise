import { observable, action } from 'mobx';
import agent from './agent'

export class tableStore {
    @observable allData = {}
    // @observable allCountries = []
    @observable currentData= []
    @observable currentPage= 1
    
    pageLimit= 16
    totalRecords = 0
    totalPages= 0
    pageNeighbours = 1
    spillYn = false

    @observable visible = false

    @action setVisible(visible) {
        this.visible = visible
    }

    @action setAllData() {
        this.allData = agent.searchData()    
        this.setVaribles()    
    }

    setVaribles() {
        const offset = (this.currentPage - 1) * this.pageLimit;
        const currentData = this.allData.slice(offset, offset + this.pageLimit);
        this.setCurrentData(currentData)

        this.totalRecords = this.allData.length
        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
    }

    @action setCurrentData(currentData){
        this.currentData = currentData
    }
    
    setSpillYn(spillYn = false) {
        this.spillYn = spillYn
    }
    setCurrentPage(currentPage){
        this.currentPage = currentPage
        if (!this.spillYn) {
            this.setVaribles()
        }
    }   

}


export default new tableStore()