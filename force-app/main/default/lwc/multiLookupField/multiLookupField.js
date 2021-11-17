import { LightningElement, api } from 'lwc';

export default class MultiLookupField extends LightningElement {
    @api recordList;
    @api placeholder;
    @api iconName;
    @api label;
    selectedRecords = [];

    get getRecordListSize(){
        if(this.recordList == undefined) return 0;
        return this.recordList.length;
    }

    get hasRecords(){
        return this.getRecordListSize > 0;
    }

    inputTyped(e){
        const event = new CustomEvent('type', {detail: e.detail.value});
        this.dispatchEvent(event);
    }
    selectRecord(e){
        try{
            var rec = this.recordList.filter(r => e.target.id.includes(r.Id))[0];
            var recordDetail = {
                Id: rec.Id,
                Name: rec.Name
            };
            this.selectedRecords = [...this.selectedRecords, recordDetail];
            this.throwEvent();
            this.recordList = [];
            var inputComponent = this.template.querySelector('.inputCmp');
            inputComponent.value = '';
        }
        catch(e){
            console.log(e);
        }
    }

    removeSelection(e){
        this.selectedRecords = this.selectedRecords.filter(r => r.Name != e.target.label);
        this.throwEvent();
    }

    throwEvent(){
        const event = new CustomEvent('selection', {detail: this.selectedRecords});
        this.dispatchEvent(event);
    }
}