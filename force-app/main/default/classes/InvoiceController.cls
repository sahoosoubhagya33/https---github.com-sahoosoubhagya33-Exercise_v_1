public class InvoiceController {
    @AuraEnabled(cacheable=true)
    public static Map<String, List<String>> getInvoicesWithLineItems() {
        
		// Query Invoices with related Invoice Line Items
        List<Invoice_u__c> invoices = [SELECT Id, Name__c,(SELECT Id, Name__c FROM Invoice_u_Line_Items__r) FROM Invoice_u__c ORDER BY Name__c];   
        //Prepare the map to return the records
        Map<String, List<String>> invoiceMap = new Map<String, List<String>>();
        for (Invoice_u__c invoice : invoices) {
            List<String> lineItems = new List<String>();
            for (Invoice_u_Line_Item__c lineItem : invoice.Invoice_u_Line_Items__r) {
                lineItems.add(lineItem.Name__c);
            }
            invoiceMap.put(invoice.Name__c, lineItems);
        }
        
        return invoiceMap;
    }
}