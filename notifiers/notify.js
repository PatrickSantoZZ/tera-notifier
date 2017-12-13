var os = require('os');
var utils = require('./lib/utils');

// All notifiers
//var NotifySend = require('./notifiers/notifysend');
//var NotificationCenter = require('./notifiers/notificationcenter');
var WindowsToaster = require('./notifiers/toaster');
var Growl = require('./notifiers/growl');
var WindowsBalloon = require('./notifiers/balloon');

var options = { withFallback: false };

switch (os.type()) {
  /*case 'Linux': //No point using linux and OSx platform notifications
    module.exports = new NotifySend(options);
    module.exports.Notification = NotifySend;
    break;
  case 'Darwin':
    module.exports = new NotificationCenter(options);
    module.exports.Notification = NotificationCenter;
    break;*/
  case 'Windows_NT':
    if (utils.isLessThanWin8() || utils.isWin10Build1709) { //If user is windows 10 Build 1709 (Fall Creators), use windows balloon instead.
	  if(utils.isWin10Build1709) console.log('[Tera Notifier]Detected Win10 Build 1709. Switching to Balloon Notifications.')
      module.exports = new WindowsBalloon(options);
      module.exports.Notification = WindowsBalloon;
    } else {
      module.exports = new WindowsToaster(options);
      module.exports.Notification = WindowsToaster;
    }
    break;
  default:
    if (os.type().match(/BSD$/)) {
      //module.exports = new NotifySend(options);
      //module.exports.Notification = NotifySend;
    } else {
      module.exports = new Growl(options);
      module.exports.Notification = Growl;
    }
}

// Expose notifiers to give full control.
//module.exports.NotifySend = NotifySend;
//module.exports.NotificationCenter = NotificationCenter;
module.exports.WindowsToaster = WindowsToaster;
module.exports.WindowsBalloon = WindowsBalloon;
module.exports.Growl = Growl;
