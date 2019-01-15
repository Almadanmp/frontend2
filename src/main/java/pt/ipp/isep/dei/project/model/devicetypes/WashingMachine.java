package pt.ipp.isep.dei.project.model.devicetypes;

import pt.ipp.isep.dei.project.model.DeviceSpecs;
import pt.ipp.isep.dei.project.model.Metered;

public class WashingMachine implements DeviceSpecs, Metered {

    private double mNominalPower;
    private double mCapacity;

    public WashingMachine() {
    }

    public WashingMachine(double capacity) {
        this.mCapacity = capacity;
    }

    public DeviceType getType() {

        return DeviceType.WASHING_MACHINE;
    }

    public double getConsumption() {
        return 0; //To be implemented later, not yet specified
    }

    public double getNominalPower() {

        return this.mNominalPower;
    }

    void setNominalPower(double nominalPower) {

        this.mNominalPower = nominalPower;
    }

    public double getCapacity() {
        return this.mCapacity;
    }

    public void setCapacity(double capacity) {
        this.mCapacity = capacity;
    }
}
