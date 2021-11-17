public without sharing class TestController {
    @AuraEnabled (cacheable = true)
    public static List<Account> findAccountsByNameKey(String searchKey, List<Id> excludeIds){
        String accountNameKey = '%' + searchKey + '%';
        return [SELECT Id, Name FROM Account WHERE Name LIKE :accountNameKey AND Id NOT IN :excludeIds ORDER BY Name ASC LIMIT 5];
    }
}
