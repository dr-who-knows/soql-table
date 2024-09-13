import { LightningElement, track } from 'lwc';
import executeQuery from '@salesforce/apex/SOQLQueryController.executeQuery';
import FORMULAJS from '@salesforce/resourceUrl/formulaJs';
import { loadScript } from 'lightning/platformResourceLoader';

export default class SoqlTable extends LightningElement {
    soqlQuery = '';
    @track queryResult = [];
    @track columns = [];
    formulaJsInitialized = false;

    connectedCallback() {
        if (this.formulaJsInitialized) {
            return;
        }
        this.formulaJsInitialized = true;

        loadScript(this, FORMULAJS)
            .then(() => {
                console.log('Formula.js loaded successfully.');
            })
            .catch(error => {
                console.error('Error loading Formula.js:', error);
            });
    }
    
    handleQueryChange(event) {
        this.soqlQuery = event.target.value;
    }

    handleExecuteQuery() {
        executeQuery({ soql: this.soqlQuery })
            .then(result => {
                if (result.length > 0) {
                    this.columns = Object.keys(result[0]).map(key => ({
                        label: key,
                        fieldName: key
                    }));

                    this.queryResult = result.map(row => {
                        let formattedRow = [];
                        this.columns.forEach(col => {
                            formattedRow.push({
                                key: col.fieldName,
                                value: row[col.fieldName] !== null ? row[col.fieldName] : ''
                            });
                        });
                        return { id: row.Id, data: formattedRow };
                    });
                } else {
                    this.queryResult = [];
                    this.columns = [];
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        console.log(this.queryResult);
    }

    get hasData() {
        return this.queryResult.length > 0;
    }
}