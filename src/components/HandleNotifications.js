// /*
// class HandleNotifications extends Component {
//     constructor(props) {
//         super(props);
//         this.getToken = this.getToken.bind(this);
//         this.requestPermission = this.requestPermission.bind(this);
//         this.checkNotificationPermission = this.checkNotificationPermission.bind(this);
//     }
//
//
//
//     componentDidMount() {
//         this.checkNotificationPermission();
//
//         // setting channel for notification
//         const channel = new firebase.notifications.Android.Channel(
//             'channelId',
//             'Channel Name',
//             firebase.notifications.Android.Importance.Max
//         ).setDescription('A natural description of the channel');
//         firebase.notifications().android.createChannel(channel);
//
//         // showing notification when app is in foreground.
//         this.foregroundStateListener = firebase.notifications().onNotification((notification) => {
//             firebase.notifications().displayNotification(notification).catch(err => console.error(err));
//         });
//
//         // app tapped/opened in killed state
//         this.appKilledStateListener = firebase.notifications().getInitialNotification()
//             .then((notificationOpen: NotificationOpen) => {
//                 if (notificationOpen) {
//                     // anything you want to do with notification object.....
//                 }
//             });
//
//         // app tapped/opened in foreground and background state
//         this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
//             // ...anything you want to do with notification object.....
//         });
//     }
//
//     componentWillUnmount() {
//         this.appKilledStateListener();
//         this.notificationOpenedListener();
//         this.foregroundStateListener();
//     }
//
//     // firebase token for the user
//     async getToken(){
//         firebase.messaging().getToken().then((fcmToken) => console.log(fcmToken));
//     }
//
//     // request permission if permission diabled or not given
//     async requestPermission() {
//         try {
//             await firebase.messaging().requestPermission();
//         } catch (error) {}
//     }
//
//     // if permission enabled get firebase token else request permission
//     async checkNotificationPermission() {
//         const enabled = await firebase.messaging().hasPermission();
//         if (enabled) {
//             this.getToken() // call function to get firebase token for personalized notifications.
//         } else {
//             this.requestPermission();
//         }
//     }
//
//     render() {
//         return null;
//     }
// }
//
// export default HandleNotifications;
// */


import PushNotification from 'react-native-push-notification';
import {getAsyncObjectData, setAsyncData} from '../service/asynsStorage';

const processNotification = (notification) => {
    if (notification) {
        if (notification.data && notification.data.type === "NEW_JOBS") {
            const ids = JSON.parse(notification.data.ids),
                title = notification.data.title,
                message = notification.data.message;
            // console.log("ids => ", ids);

            // const message = `Hey, there${ids.length > 1 ? "'re" : "'s"} ${ids.length} new jobs. Click to view them`;

            const playSound = true, soundName = null;

            const details = {
                /* Android Only Properties */
                // channelId: "fcm_fallback_notification_channel", // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.

                /* Android Only Properties */
                // ticker: 'My Notification Ticker', // (optional)
                autoCancel: true, // (optional) default: true
                largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
                smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
                bigText: message, // (optional) default: "message" prop
                // subText: 'Notification', // (optional) default: none
                color: 'red', // (optional) default: system default
                vibrate: true, // (optional) default: true
                vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                tag: 'some_tag', // (optional) add tag to message
                group: 'group', // (optional) add group to message
                ongoing: false, // (optional) set whether this is an "ongoing" notification

                /* iOS only properties */
                alertAction: 'view', // (optional) default: view
                category: '', // (optional) default: empty string
                userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

                /* iOS and Android properties */
                title: title, // (optional)
                message: message ? message : 'My Notification Message', // (required)
                playSound: playSound, // (optional) default: true
                soundName: soundName ? soundName : 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                // actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
            };
            // console.log("details => ", details);
            PushNotification.localNotification(details);
        }
    }
};

const saveNewJobs = async (data) => {
    try {
        console.log("saveNewJobs data => ", data);
        if (data) {
            const ids = JSON.parse(data.ids);
            console.log("ids => ", ids);
            try {
                const newJobs = await getAsyncObjectData('newJobs');
                await setAsyncData('newJobs', JSON.stringify([...new Set([...newJobs, ...ids])]));
                console.log("New jobs saved !");
            } catch (e) {
                // It means that there's not new jobs data
                await setAsyncData('newJobs', JSON.stringify(ids));
                console.log("New jobs saved !");
            }
        }
    } catch (e) {
        console.log("Error saveNewJobs => ", e);
    }
};

export {
    saveNewJobs,
    processNotification
}
