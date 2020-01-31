import React, {useState, useEffect, useContext} from 'react';
import BackgroundJob from 'react-native-background-job';
import PushNotification from 'react-native-push-notification';

import io from 'socket.io-client';
import {baseUrl} from 'src/constants';

const socket = io(baseUrl, {query: {user_id: Date.now.toString()}});

let current_message = '';
let next_message = '';

socket.on('notify', value => {
  console.log('server notify ....', value);
  next_message = value;
});

socket.on('news', value => {
  console.log('server news....', value);
  next_message = value;
});
socket.on('message', value => {
  console.log('server message ....', value);
  next_message = value;
});

const alertMessage = () => {
  PushNotification.configure({
    onNotification: function(notification) {
      console.log('NOTIFICATION: ', notification);
    },
    popInitialNotification: true,
  });

  if (current_message !== next_message) {
    PushNotification.localNotification({
      bigText: next_message,
      subText: 'New message arrived',
      message: 'Hello, this is the my test message.',
    });
    current_message = next_message;
  }
};

const registerBackgroundJob = () => {
  const backgroundJob = {
    jobKey: 'VerifySms',
    job: () => {
      alertMessage();
    },
  };

  BackgroundJob.register(backgroundJob);

  let backgroundSchedule = {
    jobKey: 'VerifySms',
    period: 5000,
    exact: true,
    allowExecutionInForeground: true,
  };

  BackgroundJob.schedule(backgroundSchedule)
    .then(() => console.log('Success: job registered.'))
    .catch(err => console.err(err));
};

const cancelBackgroundJob = () => {
  BackgroundJob.cancel({jobKey: 'VerifySms'})
    .then(() => console.log('Success: job cancelled.'))
    .catch(err => console.err(err));
};

registerBackgroundJob();

export default socket;
