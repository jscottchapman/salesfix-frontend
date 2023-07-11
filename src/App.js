import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Card, Icon, Image } from 'semantic-ui-react'

class App extends Component {
  const classes = 
  render() {
    return (
      <div className="App">
         <Card>
    <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        {process.env.REACT_APP_LW_URL}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
      </div>
    );
  }
}

export default App;
