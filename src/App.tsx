import React, { useState } from 'react';

import { ItemStorer } from './storage';

import { Header } from './components/Header';
import { Input, UpdateItems } from './components/Input';

import './App.css';

import { ListItemsProps, ListItems } from './components/List';

function App() {
  const ls = new ItemStorer();

  const [state, setState] = useState<ListItemsProps>(ls.get()),
    updateItems: UpdateItems = (value) => {
      const { items } = state;
      
      ls.save({items: [value, ...items]})
      setState({items: [value, ...items]})
    }

  return (
    <div>
      <Header text='Add Claps' />
      <div className='container'>
        <Input updateItems={updateItems} placeholder={'Type here to add claps'} />
        <ListItems items={state.items} />
      </div>
    </div>
  );
}

export default App;
