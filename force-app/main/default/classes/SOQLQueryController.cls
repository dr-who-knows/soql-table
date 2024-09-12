public with sharing class SOQLQueryController {
    @AuraEnabled
    public static List<SObject> executeQuery(String soql) {
        try {
            return Database.query(soql);
        } catch (Exception e) {
            throw new AuraHandledException('Error executing SOQL: ' + e.getMessage());
        }
    }
}
