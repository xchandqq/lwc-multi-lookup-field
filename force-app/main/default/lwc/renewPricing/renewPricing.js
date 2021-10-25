import { api, LightningElement, wire } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import getOpportunityLineItemListByAccountId from '@salesforce/apex/RenewPricingController.getOpportunityLineItemListByAccountId';

export default class RenewPricing extends NavigationMixin(LightningElement) {

    columns = [
        { label: 'Opportunity', fieldName: 'oppty'},
        { label: 'Product', fieldName: 'prod'},
        { label: 'Start Date', fieldName: 'startDate', type: 'date'},
        { label: 'End Date', fieldName: 'endDate', type: 'date'},
    ]

    @api recordId;

    gettingRecords = false;
    hasReturned = false;
    data = [];
    selectedItems = [];

    get hasDataReturned(){
        return this.hasReturned;
    }

    get isEmptyData(){
        return this.hasReturned && this.data.length == 0;
    }

    get getItemCount(){
        return this.data.length + ' items';
    }

    get isEmptySelection(){
        return this.selectedItems.length == 0;
    }

    renderedCallback(){
        if(this.recordId == undefined) return;
        if(this.gettingRecords) return;
        if(this.hasReturned) return;

        this.gettingRecords = true;
        getOpportunityLineItemListByAccountId({accountId: this.recordId})
        .then((data) => {
            this.data = [];
            this.selectedItems = [];
            for(var item of data){
                var d = {
                    id: item['Id'],
                    opptyId: item['Opportunity']['Id'],
                    oppty: item['Opportunity']['Name'],
                    prod: item['Product2']['Name'],
                    startDate: item['Opportunity']['CreatedDate'],
                    endDate: item['Opportunity']['CloseDate']
                }
                this.data.push(d);
            }
            console.log(this.data);
            this.hasReturned = true;
            this.gettingRecords = false;
        });
    }

    getSelectedItem(e){
        this.selectedItems = e.detail.selectedRows;
    }

    processSelectedItems(e){
        var ids = [];
        for(var item of this.selectedItems){
            if(ids.filter(e => e == item.opptyId).length == 0){
                ids.push(item.opptyId);
            }
        }

        var payload = {
            'componentDef': 'one:alohaPage',
            'attributes' : {
                'address' : 'https://cgi337-dev-ed--sbqq.visualforce.com/apex/RenewContracts?wrapMassAction=1&id=0015f000004CAFMAA4&use307redirect=true',
                'postParameters' : {
                    'ids' : ids,
                    'vfRetURLInSFX' : '/lightning/r/Account/0015f000004CAFMAA4/related/Contracts/view'
                }
            },
            'state' : {

            }
        };

        var decodedPayload = btoa(JSON.stringify(payload));
        const config = {
            type: 'standard__webPage',
            attributes: {
                url: 'https://cgi337-dev-ed--sbqq.visualforce.com/one/one.app#'+decodedPayload
            }
        };

        console.log(payload);
        console.log(decodedPayload);
        console.log(config.attributes.url);

        this[NavigationMixin.Navigate](config);
    }


}