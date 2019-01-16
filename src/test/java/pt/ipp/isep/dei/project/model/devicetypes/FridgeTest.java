package pt.ipp.isep.dei.project.model.devicetypes;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class FridgeTest {

    @Test
    public void getTypeTest() {
        Fridge fridge = new Fridge();
        DeviceType expectedResult = DeviceType.FRIDGE;
        DeviceType result = fridge.getType();
        assertEquals(expectedResult, result);
    }

    @Test
    public void getConsumptionTest() {
        Fridge fridge = new Fridge();
        double expectedResult = 0;
        double result = fridge.getConsumption();
        assertEquals(expectedResult, result);
    }

    @Test
    public void seeIfGetNominalPower() {
        Fridge fridge = new Fridge(4, 5);
        double expectedResult = 6;
        fridge.getNominalPower();
        fridge.setNominalPower(6);
        double result = fridge.getNominalPower();
        assertEquals(expectedResult, result);
    }

    @Test
    public void seeIfGetFreezerCapacity() {
        Fridge fridge = new Fridge(4, 5);
        double expectedResult = 3;
        fridge.getFreezerCapacity();
        fridge.setFreezerCapacity(3);
        double result = fridge.getFreezerCapacity();
        assertEquals(expectedResult, result);
    }

    @Test
    public void seeIfGetRefrigeratorCapacity() {
        Fridge fridge = new Fridge(4, 5);
        double expectedResult = 3;
        fridge.getRefrigeratorCapacity();
        fridge.setRefrigeratorCapacity(3);
        double result = fridge.getRefrigeratorCapacity();
        assertEquals(expectedResult, result);
    }

    @Test
    public void getAttributeNamesTest() {
        Fridge fridge = new Fridge(4, 5);
        List<String> expectedResult = new ArrayList<>();
        List<String> result = fridge.getAttributeNames();
        assertEquals(expectedResult, result);
    }

    @Test
    public void getAttributeValuesTest() {
        Fridge fridge = new Fridge(4, 5);
        double expectedResult = 0;
        double result = fridge.getAttributeValue("lisboa");
        assertEquals(expectedResult, result);
    }

    @Test
    public void setAttributeValueTest() {
        Fridge fridge = new Fridge(4, 5);
        boolean result = fridge.setAttributeValue("lisboa", 12);
        assertEquals(false, result);
    }


}