import React, { useState } from 'react';

import { Header } from './components/Header';
import { Input, UpdateItems } from './components/Input';

import './App.css';

import { ListItemsProps, ListItems } from './components/List';

function App() {
  const [state, setState] = useState<ListItemsProps>({items:[]}),
    updateItems: UpdateItems = (value) => {
      const { items } = state;
     
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
