import React from 'react'
import axios from 'axios';

import { EDIT_FILTER } from '../../../constants/API';

export class SearchComponent extends React.Component {
    constructor(props){
        super(props);
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
                                <option>BYN</option>
                                <option>USD</option>
                                <option>EUR</option>
                                <option>RUB</option>    
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
                                <option>Банк 1</option>
                                <option>Банк 2</option>
                                <option>Банк 3</option>
                            </select>           
                        </div>
                        <label htmlFor='predicate'>Условия</label>
  
                        <div className='form-group col-12 d-flex flex-wrap'>
                            <div className='col-4'>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>Пополнения</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>Капитализация</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="checkbox disabled">
                                    <label><input type="checkbox" value="" disabled/>Досрочное снятие</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>Частичное снятие</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>Пролонгация</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="checkbox disabled">
                                    <label><input type="checkbox" value="" disabled/>Открытие онлайн</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-outline-dark'>Search for Me</button>    
                </form>
                <button onClick={e => this.sendFilters()}>test</button>
            </div>
        );
    }
}