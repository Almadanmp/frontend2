package pt.ipp.isep.dei.project.model.devicetypes;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class WashingMachineTest {

    @Test
    public void getTypeTest() {
        WashingMachine washingMachine = new WashingMachine();
        DeviceType expectedResult = DeviceType.WASHING_MACHINE;
        DeviceType result = washingMachine.getType();
        assertEquals(expectedResult, result);
    }

    @Test
    public void getConsumptionTest() {
        WashingMachine washingMachine = new WashingMachine();
        double expectedResult = 0;
        double result = washingMachine.getConsumption();
        assertEquals(expectedResult, result);
    }

    @Test
    public void seeIfGetNominalPower() {
        WashingMachine washingMachine = new WashingMachine(5);
        double expectedResult = 6;
        washingMachine.getNominalPower();
        washingMachine.setNominalPower(6);
        double result = washingMachine.getNominalPower();
        assertEquals(expectedResult, result);
    }

    @Test
    public void seeIfGetCapacity() {
        WashingMachine washingMachine = new WashingMachine(5);
        double expectedResult = 6;
        washingMachine.getCapacity();
        washingMachine.setCapacity(6);
        double result = washingMachine.getCapacity();
        assertEquals(expectedResult, result);
    }

    @Test
    public void getAttributeNamesTest() {
        WashingMachine washingMachine = new WashingMachine(5);
        List<String> expectedResult = new ArrayList<>();
        List<String> result = washingMachine.getAttributeNames();
        assertEquals(expectedResult, result);
    }

    @Test
    public void getAttributeValuesTest() {
        WashingMachine washingMachine = new WashingMachine(5);
        double expectedResult = 0;
        double result = washingMachine.getAttributeValue("lisboa");
        assertEquals(expectedResult, result);
    }

    @Test
    public void setAttributeValueTest() {
        WashingMachine washingMachine = new WashingMachine(5);
        boolean result = washingMachine.setAttributeValue("lisboa", 12);
        assertEquals(false, result);
    }
}