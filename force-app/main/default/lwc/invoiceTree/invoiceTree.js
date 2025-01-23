import { LightningElement, wire } from 'lwc';
import getInvoicesWithLineItems from '@salesforce/apex/InvoiceController.getInvoicesWithLineItems';

export default class InvoiceTree extends LightningElement {
    treeItems = [];
    error;

    @wire(getInvoicesWithLineItems)
    wiredInvoices({ error, data }) {
        if (data) {
            // Transform the data into the format required by <lightning-tree>
            this.treeItems = Object.entries(data).map(([invoiceName, lineItems]) => {
                return {
                    label: invoiceName, // Invoice Name
                    name: invoiceName, // Unique identifier
                    expanded: true, // Start expanded
                    items: lineItems.map(lineItemName => ({
                        label: lineItemName, // Line Item Name
                        name: lineItemName, // Unique identifier
                        expanded: false, // Default for child nodes
                        items: [] // No further child nodes
                    }))
                };
            });
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.treeItems = [];
        }
    }
}
