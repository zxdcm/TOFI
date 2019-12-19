import React from 'react'
import axios from 'axios';

import { EDIT_FILTER } from '../../../constants/API';
import './search.css'

export class SearchComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currency: ['BYN', 'USD', 'EUR', 'RUB'],
            banks: [],
            categories: [],
            deposits: []
        }
    }

    getDeposits() {
       
    }

    sendFilters(){
        const filters = ['sumVk', 'currency', 'date', 'replenishment', 'banks']
            .map(id => ({ key: id, val: document.getElementById(id).value}))
            .reduce((res, elem) => {
                    res[elem.key] = elem.val;
                    return res;
                }, {});

        axios.put(EDIT_FILTER + '/' + localStorage.getItem('userId'), {FiltersConfig: JSON.stringify(filters)})
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
                    <label><input type="checkbox" value={category.id} id={category.name}/>{category.name}</label>
                </div>
             </div>
        ));
        
        const deposits = this.state.deposits.map(depo => (
            <div className="card col-5 m-4" id={depo.id}>
                <div className="card-body">
                    <h5 className="card-title">{depo.name}</h5>
                    <p className="card-text">{depo.description}</p>
                    <a href="#" className="btn btn-dark">Go somewhere</a>
                </div>
            </div>
        ));

        return (
            <div className='container mt-4'>
                <div className='d-flex flex-wrap'>
                    <div className='form-group col-6'>
                        <label htmlFor='sumVk'>Сумма вклада</label>
                        <input className='form-control' type='text' id='sumVk'/>           
                    </div>
                    
                    <div className='form-group col-6'>
                        <label htmlFor='currency'>Валюта</label>
                        <select className='form-control' type='text' id='currency'>
                            {currency} 
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
                <button className='btn btn-outline-dark' onClick={() => this.sendFilters()}>Search for Me</button>   
                <div className='d-flex flex-wrap'>
                    {deposits}
                </div> 
            </div>
        );
    }

    componentDidMount(){
        axios.get('https://smartdeposit.herokuapp.com/api/bank/')
            .then(responce => this.setState({banks: responce.data.results}))
            .catch(error => alert("Some error"));

        axios.get('https://smartdeposit.herokuapp.com/api/category/')
            .then(responce => this.setState({categories: responce.data.results}))
            .catch(error => alert("Some error"));
        
        axios.get('https://smartdeposit.herokuapp.com/api/deposit/')
            .then(responce => this.setState({deposits: responce.data.results}))
            .catch(err => alert('Some error'));
        }
}