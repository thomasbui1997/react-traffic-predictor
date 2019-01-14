import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.state.bikeTime;
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({date: new Date()});
  }

  nextTimeMarker(currentTime) {
    /**
     * Weekly Schedule 
     * Arrays represent the class interval times
     * Day 1 (Mon, Wedn, Fri): 50 minute intervals until 2:30 PM, then 75 minute intervals
     * Day 2 (Tues, Thurs): 75 minute intervals entire day
     * Classes run 8 AM - 7 PM
     */
     
    var currHour = currentTime[0];
    var currMin = currentTime[1];

    var currDay;

    var day1 = [
      [8, 0],
      [8, 50],
      [9, 5],
      [9, 55],
      [10, 10],
      [11, 0],
      [11, 15],
      [12, 5],
      [12, 20],
      [13, 10],
      [13, 25],
      [14, 15],
      [14, 30],
      [15, 45],
      [16, 0],
      [17, 15],
      [17, 30],
      [18, 45]
    ];

    var day2 = [
      [8, 30],
      [9, 45],
      [10, 0],
      [11, 15],
      [11, 30],
      [12, 45],
      [13, 0],
      [14, 15],
      [14, 30],
      [15, 45],
      [16, 0],
      [17, 15],
      [17, 30],
      [18, 45]
    ];

    if (this.state.dayNum % 2 == 0) {
      currDay = day1;
    } else {
      currDay = day2;
    }

    var timeMarker;

    for (var i = 0; i < currDay.length; i++) {
      var nextHour = currDay[i][0];
      var nextMin = currDay[i][1];

      if (currHour < nextHour || (currHour == nextHour && currMin < nextMin)) {
        timeMarker = [nextHour, nextMin];
        if (i % 2 == 0) {
          this.bikeTime = true;
        } else {
          this.bikeTime = true;
        }
        return timeMarker;
      }
    }
    return currDay[0];

  }

  timeUntilMarker(currentTime) {
    var timeMarker = this.nextTimeMarker(currentTime);

    var currHour = currentTime[0];
    var currMin = currentTime[1];

    var nextHour = timeMarker[0];
    var nextMin = timeMarker[1];

    var timeLeft = 0;
    if (currHour != nextHour) {
      timeLeft = 60 - currMin;
      timeLeft += nextMin;
    } else {
      timeLeft = nextMin - currMin;
    }

    return timeLeft;
  }

  render() { 
    /** 
     * Java Script Date Object
     * Get information on current date and time
     * State Date object updated every second
     */
    var date = new Date();

    // Calendar day
    var dayNum = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var dayName = date.getDay();
    
    // Time 
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    return (
      <View style={[this.bikeTime ? styles.green: styles.red, styles.container]}>
        <Text>{date.toLocaleString()}</Text>
        <Text>{this.timeUntilMarker([hour, minute])}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    backgroundColor: '#ff0000',
  },
  green: {
    backgroundColor: '#008000'
  }
});
