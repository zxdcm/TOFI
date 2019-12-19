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

    sendFilters(){
        const filters = ['timing', 'percent', 'banks']
                .map(id => ({ key: id, val: document.getElementById(id).value}))

        if (localStorage.getItem('username') && localStorage.getItem('userId')){
            const result = filters.reduce((res, elem) => {
                        res[elem.key] = elem.val;
                        return res;
                    }, {});
                    
            axios.put(EDIT_FILTER + '/' + localStorage.getItem('userId'), {FiltersConfig: JSON.stringify(result)})
                .then(res => alert('Ok'))
                .catch(res => console.log(res));
        }

        let url = 'https://smartdeposit.herokuapp.com/api/deposit/?';
        const timing = document.getElementById('timing').value;
        const percent = document.getElementById('percent').value;
        //const currency = document.getElementById('currency').value;
        const bank = document.getElementById('banks').value;

        let isAdded = false
        if(timing){
            url += 'min_term=' + timing
            isAdded = true;
        }

        if (percent){
            if (isAdded) {
                url += '&';
            }
            url += "percentage=" + percent;
        }
        if (bank) {
            if (isAdded){
                url += '&';
            }

            url += "banks[]=" + bank;   
        }

        axios.get(url)
            .then(responce => this.setState({deposits: responce.data.results}))
            .catch(err => alert('Some error'));
    }


    render() {
        const banks = this.state.banks.map(bankInfo => 
            <option id={'cot' + bankInfo.id} key={bankInfo.id} value={bankInfo.id}>{bankInfo.name}</option>);

        // const currency = this.state.currency.map((cur, key) => 
        //     <option key={key} value={cur}>{cur}</option>);   

        // const categories = this.state.categories.map(category => (
        //     <div className='col-6' key={category.id}>
        //         <div className="checkbox">
        //             <label><input type="checkbox" value={category.id} id={category.name}/>{category.name}</label>
        //         </div>
        //      </div>
        // ));
        
        const isAuth = localStorage.getItem('username') && localStorage.getItem('userId');

        const deposits = this.state.deposits.map(depo => (
                <div className='col-6 d-flex align-items-stretch cont'>
                    <div className="card border-dark" id={depo.id}>
                        <div className='card-header'>
                            <h3><b>{ 'Предложение №' + depo.id }</b></h3>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{depo.name}</h5>
                            <p className="card-text">{depo.description}</p>
                        </div>
                
                        <div class="card-footer">
                            { isAuth ? (
                            <button className='btn btn-dark'>Добавить</button>
                            ) : null}
                        </div>
                    </div>
                </div>))
                .reduce((res, cur, index) => { 
                    if (index % 2 == 0) {
                        res.push([cur])
                    } else {
                        res[res.length-1].push(cur)
                    }
                    return res;
                }, [])
                .map(item => (
                    <div className='row mt-4 mb-4'>
                        {item[0]}
                        {item[1]}
                    </div>
                ));

        return (
            <div className='container mt-4'>
                <div className='d-flex flex-wrap'>
                    <div className='form-group col-6'>
                        <label htmlFor='timing'><b>Минимальный срок</b></label>
                        <input className='form-control' type='number' id='timing'/>           
                    </div>
                    
                    {/* <div className='form-group col-6'>
                        <label htmlFor='currency'><b>Валюта</b></label>
                        <select className='form-control' id='currency'>
                            {currency} 
                        </select>           
                    </div> */}
                    <div className='form-group col-6'>
                        <label htmlFor='percent'><b>Процент</b></label>
                        <input className='form-control' type='number' id='percent'/>           
                    </div>
                    
                    <div className='form-group col-6'>
                        <label htmlFor='banks'><b>Банки</b></label>
                        <select className='form-control' type='text' id='banks'>
                            {banks}
                        </select>           
                    </div>
                    {/* <div className='form-group col-12 d-flex flex-wrap'>
                        <label htmlFor='predicate' className='col-12'><b>Категории</b></label>
                        {categories}
                    </div> */}
                    <div className='form-group col-12 d-flex flex-wrap'>
                        <button className='btn btn-dark col-2' onClick={() => this.sendFilters()}>Искать!</button>   
                    </div>
                </div>
                <div className='container'>
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