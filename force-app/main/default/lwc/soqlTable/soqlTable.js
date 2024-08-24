import { LightningElement, track } from 'lwc';
import executeQuery from '@salesforce/apex/SOQLQueryController.executeQuery';

export default class SoqlTable extends LightningElement {
    soqlQuery = '';

    handleQueryChange(event) {
        this.soqlQuery = event.target.value;
    }

    handleExecuteQuery() {
        executeQuery({ soql: this.soqlQuery })
        .then(result => {
            console.log(result);
        })
        .catch( error => {
            console.log(error.body.message);
        });
    }
}