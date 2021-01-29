# zway-http-bridge
Z-Way app to publish all 'modify:metrics:level' events of all devices to a HTTP-Server using the PUT method. Can be used to build bridges to other ecosystems.

## App Options in Z-Way
Option | Description
--- | ---
URL to PUT to | The URL which wil be called for each event of all devices. The URL is called with HTTP PUT verb.

## Data Format
The data that will be send is a simple JSON object:
```
{
   device: <ID of device (int)>,
   instance: <Device instance (int)>,
   commandClass: <Command class (int)>,
   title: <Title of device (string)>,
   room: <Location of device (string)>,
   vDevId: <ID of device (string)>
   type: <Type of device (string)>,
   lastLevel: <Last known level of device (string|int)>,
   level: <Level of device (string|int)>,
   modificationTime: <Timestamp of event (int)>
}
```
