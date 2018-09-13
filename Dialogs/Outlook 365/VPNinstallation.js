var builder = require('botbuilder');

module.exports = [
    function (session) {
        builder.Prompts.choice(session, "Please select the Mobile OS?", "IOS|Android", { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
        console.log();
        if(results.response.entity.toLowerCase()=="ios"){
            session.endDialog(`In order to access Adobe intranet and internal services while not at an Adobe facility, you can connect using a virtual private network (VPN) connection.
            Installing and Configuring Cisco AnyConnect VPN
            Adobe's VPN connection is only available to regular Adobe (Type 1) employees.
            To install and configure AnyConnect VPN:
            1. Launch Adobe App Catalog on your iOS device.
            2. Search for Cisco AnyConnect and tap install.
            3. Once installed, launch Cisco AnyConnect.
            4. Tap OK to enable the app.
            5. Toggle the AnyConnect VPN setting to on to connect.
            6. Accept the disclaimer.
            7. Under Connections, choose the closest VPN server based on your location.
            Installing and Configuring Cisco AnyConnect VPN
            In order to access Adobe intranet and internal services while not at an Adobe facility, you can connect using a virtual private network (VPN) connection.
            Adobe's VPN connection is only available to regular Adobe (Type 1) employees.
            To install and configure AnyConnect VPN:
            iOS devices are configured for on-demand VPN, which will allows the device to automatically connect if attempting to connect to an website or resource on the corporate network. If you prefer to manually establish a VPN connection, you must disable the on-demand VPN setting on your device.
            To disable on-demand VPN on your iOS device:
            1. On your device, tap Settings.
            2. Tap VPN.
            3. Select the info icon next to the selected connection (e.g. asa-sanjose.adobe.com).
            4. Toggle off the Connect On Demand option.
            Toggling VPN connections
            To activate and deactivate your VPN connection use the Cisco AnyConnect app.
            For security and performance reasons, it is important to only activate your VPN connection when you want to access Adobe resources.`);
        }else if(results.response.entity.toLowerCase()=="android"){
            session.endDialog(`To connect to Adobe's VPN:
            1. In the Google Play App store, search for AnyConnect by Cisco Systems, Inc.
            2. Download and install the AnyConnect app.
            3. Once the AnyConnect has finished installing, launch the app.
            4. Select VPN Configuration VPN7, and tap OK.
            5. Select I trust this application, then tap OK.
            6. Select the region closest to your location.
            Note: You might see a security warning. If this happens, tap Continue.
            7. Tap Accept in the VPN banner to complete the connection.
            Once you complete the initial setup, you can easily toggle the VPN connection on and off via the AnyConnect app. Doing so will let you access private Adobe resources, including the Adobe App Catalog.`)
        } else {
            session.reset();
        }
        
    }
]