package pt.ipp.isep.dei.project.model.device.devicetypes;

import pt.ipp.isep.dei.project.model.device.devices.Device;

public interface DeviceType {

    Device createDeviceType();

    String getDeviceType();
}
