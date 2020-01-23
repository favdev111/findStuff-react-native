import io from 'socket.io-client';
import {baseUrl} from 'src/constants';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';

const socket = io(baseUrl, {query: {user_id: Date.now.toString()}});

socket.on('notify', value => {
  showMessage({
    message: value,
    icon: {icon: 'auto', position: 'left'},
    type: 'info',
    hideStatusBar: true,
    duration: 3000,
    animation: true,
    animationDuration: 1000,
  });
});

socket.on('news', value => {
  showMessage({
    message: value,
    icon: {icon: 'auto', position: 'left'},
    type: 'default',
    backgroundColor: 'purple',
    hideStatusBar: true,
    duration: 3000,
    animation: true,
    animationDuration: 1000,
  });
});

socket.on('message', value => {
  showMessage({
    message: value,
    icon: {icon: 'auto', position: 'left'},
    type: 'success',
    hideStatusBar: true,
    duration: 3000,
    animation: true,
    animationDuration: 1000,
  });
});

export default socket;
