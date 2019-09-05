import React, { Component } from "react";
import axios from 'axios';

class App extends Component {

  // initialize our state
  state = {
    rawData: {
      id: null,
      name: null,
      description: null,
      auth: null,
      events: null,
      variables: [],
      order: [],
      folders_order: [],
      folders: [],
      requests: []
    },
    events: [],
    interval1IsSet: false
  };

  // when component mounts, first thing it does is fetch all existing data from provided API
  // then we incorporate a polling logic so that we can easily see the data periodically
  componentDidMount() {
    this.fetchData();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.fetchData, 10000);
      this.setState({ intervalIsSet: interval});
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  fetchData = () => {
    fetch("https://cors-anywhere.herokuapp.com/" + 'https://www.getpostman.com/collections/aeda02068150bbf58a0b')
      .then((data) => data.json())
      .then((res) => {
        const tempRequests = res.requests;
        const tempEvents = [];

        tempRequests.forEach(req => {
          req.events.forEach(event => {
            tempEvents.push({
              name: req.name,
              listen: event.listen,
              scriptId: event.script.id,
              scriptExec: event.script.exec,
              scripttype: event.script.type,
            });
          });
        });

        this.setState({
          rawData: {
            id: res.id,
            name: res.name,
            description: res.description,
            auth: res.auth,
            events: res.events,
            variables: res.variables,
            order: res.order,
            folders_order: res.folders_order,
            folders: res.folders,
            requests: tempRequests
          },
          events: tempEvents
        })
      });
  };

  // put method that uses backend api
  // to create new query into our data base
  putRawDataToDb = () => {
    const rawData = this.state.rawData;
    axios.post('http://localhost:3001/api/putRawDataToDb', {
      id: rawData.id,
      name: rawData.name,
      description: rawData.description,
      auth: rawData.auth,
      events: rawData.events,
      variables: rawData.variables,
      order: rawData.order,
      folders_order: rawData.folders_order,
      folders: rawData.folders,
      requests: rawData.requests
    });
  };

  putEventsToDb = () => {
    const events = this.state.events;
    events.forEach(event => {
      axios.post('http://localhost:3001/api/putRawEventToDb', {
        name: event.name,
        listen: event.listen,
        scriptId: event.scriptId,
        scriptExec: event.scriptExec,
        scripttype: event.scripttype,
      });
    });
  };

  putDataToDb = () => {
    this.putRawDataToDb();
    this.putEventsToDb();
  }

  // api to get data from data base from backend
  openGetRawDataAPI() {
    const url = 'http://localhost:3001/api/getRawDataFromDb';
    window.open(url, '_blank');
  }

  openGetRawEventsAPI() {
    const url = 'http://localhost:3001/api/getRawEventsFromDb';
    window.open(url, '_blank');
  }

  // ui part
  render() {
    const rawData = this.state.rawData;
    const events = this.state.events;
    return (
      <div className="form-group">
        <h1>Health Check Data</h1>
        <button onClick={() => this.putDataToDb()} >Put Raw Data to Db</button>
        <br />
        <button onClick={() => this.openGetRawDataAPI()} >Get Raw Data from Db</button>
        <br />
        <button onClick={() => this.openGetRawEventsAPI()} >Get Events from Db</button>
        <br />
        <pre>
          <h2>Current Raw Data in JSON format</h2>
          {JSON.stringify(rawData, null, 2)} <br />
          <h2>Current Events in JSON format</h2>
          {JSON.stringify(events, null, 2)}
        </pre>
      </div>
    );
  }
}

export default App;
