#!/usr/bin/env node
'use strict';

var fs = require('fs');
var name = "EBC";
var path = "GoogleService-Info.plist";

    if (fileExists( path )) {
      try {
        var contents = fs.readFileSync(path).toString();
				fs.writeFileSync("platforms/ios/" + name + "/Resources/Resources/GoogleService-Info.plist", contents);
      } catch(err) {
        process.stdout.write(err);
      }

    } else {
		throw new Error("cordova-plugin-fcm: You have installed platform ios but file 'GoogleService-Info.plist' was not found in your Cordova project root folder.")
	}