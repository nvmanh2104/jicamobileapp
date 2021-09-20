
import PushNotification from "react-native-push-notification";



const showNotification =(title,message)=>{
    PushNotification.createChannel({
        channelId:"com.WeatherApp",
        channelName:"com.WeatherApp",
        channelDescription:"A channel to push news",
        playSound:true,
        soundNameL:'default',
        importance:4,
        vibrate:true
    },
    (created) => console.log(`createChannel 'sound-channel-id' returned '${created}'`)
    )
    PushNotification.localNotification({
        // Android Only
        channelId:'com.WeatherApp',
        vibrate:true,
        playSound:true,
        soundName:'default',
        //IOS only
        category: '', // (optional) default: empty string
        subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
        //IOS and Android
        title:title,
        message:message,
    })
}
const handleCancel =()=>{
    PushNotification.cancelAllLocalNotifications();

}





export {showNotification,handleCancel}