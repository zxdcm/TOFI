import React from 'react'
import axios from 'axios';

import { EDIT_FILTER } from '../../../constants/API';


export class SearchComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currency: ['BYN', 'USD', 'EUR', 'RUB'],
            banks: [],
            categories: []
        }
    }

    sendFilters(){
        const filters = ['sumVk', 'currency', 'date', 'replenishment', 'banks']
            .map(id => ({ key: id, val: document.getElementById(id).value}))
            .reduce((res, elem) => {
                    res[elem.key] = elem.val;
                    return res;
                }, {});
        
        axios.put(EDIT_FILTER + '/1', {FiltersConfig: JSON.stringify(filters)})
            .then(res => alert('Ok'))
            .catch(res => console.log(res));
    }


    render() {
        const banks = this.state.banks.map(bankInfo => 
            <option key={bankInfo.id}>{bankInfo.name}</option>);

        const currency = this.state.currency.map((cur, key) => 
            <option key={key}>{cur}</option>);   

        const categories = this.state.categories.map(category => (
            <div className='col-6' key={category.id}>
                <div className="checkbox">
                    <label><input type="checkbox" value={category.id}/>{category.name}</label>
                </div>
             </div>
        ));
        
        return (
            <div className='container'>
                <form>
                    <div className='d-flex flex-wrap'>
                        <div className='form-group col-4'>
                            <label htmlFor='sumVk'>Сумма вклада</label>
                            <input className='form-control' type='text' id='sumVk'/>           
                        </div>
                        
                        <div className='form-group col-4'>
                            <label htmlFor='currency'>Валюта</label>
                            <select className='form-control' type='text' id='currency'>
                               {currency} 
                            </select>           
                        </div>
                        
                        <div className='form-group col-4'>
                            <label htmlFor='date'>Срок</label>
                            <select className='form-control' type='text' id='date'>
                                <option>Любой срок</option>
                                <option>До 1-го месяца</option>
                                <option>1-3 месяца</option>
                                <option>3-6 месяца</option>
                                <option>6-9 месяца</option>
                                <option>9-12 месяца</option>
                                <option>1-2 года</option>
                                <option>2-3 года</option>
                                <option>От 3-х лет</option>
                            </select>           
                        </div>
                        <div className='form-group col-6'>
                            <label htmlFor='replenishment'>Пополнения</label>
                            <input className='form-control' type='text' id='replenishment'/>           
                        </div>
                        
                        <div className='form-group col-6'>
                            <label htmlFor='banks'>Банки</label>
                            <select className='form-control' type='text' id='banks'>
                               {banks}
                            </select>           
                        </div>
                        <label htmlFor='predicate'>Условия</label>
  
                        <div className='form-group col-12 d-flex flex-wrap'>
                            {categories}
                        </div>
                    </div>
                    <button className='btn btn-outline-dark'>Search for Me</button>    
                </form>
            </div>
        );
    }

    componentDidMount(){
        axios.get('https://smartdeposit.herokuapp.com/api/bank/', {responseType: 'json'})
            .then(responce => this.setState({banks: responce.data.results}))
            .catch(error => alert("Some error"));

        axios.get('https://smartdeposit.herokuapp.com/api/category/')
            .then(responce => this.setState({categories: responce.data.results}))
            .catch(error => alert("Some error"));

    }
}