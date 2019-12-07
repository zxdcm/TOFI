import React from 'react'

export class SearchComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <form>
                    <div className='d-flex flex-wrap'>
                        <div className='form-group col-4'>
                            <label htmlFor='sum-vk'>Сумма вклада</label>
                            <input className='form-control' type='text' id='sum-vk'/>           
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
                                <option value="">Банк 1</option>
                                <option value="">Банк 2</option>
                                <option value="">Банк 3</option>
                            </select>           
                        </div>
                        <label htmlFor='predicate'>Условия</label>
  
                        <div className='form-group col-12 d-flex flex-wrap'>
                            <div className='col-4'>
                                <div class="checkbox">
                                    <label><input type="checkbox" value=""/>Пополнения</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div class="checkbox">
                                    <label><input type="checkbox" value=""/>Капитализация</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div class="checkbox disabled">
                                    <label><input type="checkbox" value="" disabled/>Досрочное снятие</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div class="checkbox">
                                    <label><input type="checkbox" value=""/>Частичное снятие</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div class="checkbox">
                                    <label><input type="checkbox" value=""/>Пролонгация</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div class="checkbox disabled">
                                    <label><input type="checkbox" value="" disabled/>Открытие онлайн</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-outline-dark'>Search for Me</button>    
                </form>
            </div>
        );
    }
}