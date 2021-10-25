/**
 * @description       : 
 * @author            : Christian Abellanosa
 * @group             : 
 * @last modified on  : 10-26-2021
 * @last modified by  : Christian Abellanosa
**/
public with sharing class RenewPricingController {
    
    @AuraEnabled
    public static List<OpportunityLineItem> getOpportunityLineItemListByAccountId(String accountId){
        return [
            SELECT Opportunity.Name, Product2.Name, Opportunity.CreatedDate, Opportunity.CloseDate, Id, Opportunity.Id 
            FROM OpportunityLineItem
            WHERE Opportunity.Account.Id = :accountId
            ORDER BY Opportunity.Name ASC, Product2.Name ASC];
    }
}
