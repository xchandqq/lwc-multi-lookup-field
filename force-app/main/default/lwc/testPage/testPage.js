import { LightningElement } from 'lwc';
import findAccountsByNameKey from '@salesforce/apex/TestController.findAccountsByNameKey';

export default class TestPage extends LightningElement {
    
    recordList = [];

    selectedRecords = [];

    onTypeEvent(e){
        if(e.detail.length < 3) return;

        var xIds = this.selectedRecords.map(r=>{return r.Id});
        findAccountsByNameKey({
            searchKey: e.detail,
            excludeIds: xIds
        })
        .then(res=>{
            this.recordList = res;
        });
    }

    onChangeEvent(e){
        this.selectedRecords = e.detail;
    }

}