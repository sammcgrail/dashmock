#!/usr/bin/python
import dbus
bus = dbus.SystemBus()
config = bus.get_object('com.doble.IDD200.Configuration','/com/doble/IDD200/Configuration')
res = config.getGasMeasurements(11,'2015-11-01 00:00','2015-12-11 04:00',dbus_interface='com.doble.IDD200.ConfigurationInterface')
print res[2]
print res[1]
print res[0]

