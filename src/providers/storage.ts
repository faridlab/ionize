import { SecureStorage } from 'ionic-native';

export let secureStorage: SecureStorage = new SecureStorage();
secureStorage.create('secureStorage')
 .then(
   () => console.log('secure Storage is ready!'),
   error => console.log(error)
);
