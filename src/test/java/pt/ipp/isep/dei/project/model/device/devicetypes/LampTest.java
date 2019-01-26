package pt.ipp.isep.dei.project.model.device.devicetypes;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.testng.Assert.assertTrue;

/**
 * Lamp tests class.
 */

public class LampTest {
    @Test
    public void getTypeTest() {
        Lamp lamp = new Lamp(23);
        DeviceType expectedResult = DeviceType.LAMP;
        DeviceType result = lamp.getType();
        assertEquals(expectedResult, result);
    }

    @Test
    public void getConsumptionTest() {
        Lamp lamp = new Lamp(5);
        double expectedResult = 0;
        double result = lamp.getConsumption();
        assertEquals(expectedResult, result);
    }

    @Test
    public void getAttributeNamesTest() {
        Lamp lamp = new Lamp(23);
        List<String> expectedResult = new ArrayList<>();
        expectedResult.add("luminousFlux");
        List<String> result = lamp.getAttributeNames();
        assertEquals(expectedResult, result);
    }

    @Test
    public void setAttributeValueTest() {
        Lamp lamp = new Lamp(23);
        boolean result = lamp.setAttributeValue("lisboa", 12);
        assertEquals(false, result);
    }

    @Test
    public void setAttributeValueTestTrue2() {
        Lamp lamp = new Lamp(3);
        boolean actualResult = lamp.setAttributeValue("luminousFlux", 12.0);
        assertTrue(actualResult);
    }

    @Test
    public void getObjectAttributeValueTest() {
        Lamp lamp = new Lamp(4);
       double expectedResult = 4;
        Object result = lamp.getAttributeValue("luminousFlux");
        assertEquals(expectedResult, result);
    }

    @Test
    public void setAttributeValueTestFalse() {
        Lamp lamp = new Lamp(4);
        Object result = lamp.setAttributeValue("luminousFlux",5);
        assertEquals(false, result);
    }
    @Test
    public void setAttributeValueTestDefault() {
        Lamp lamp = new Lamp(1);
        lamp.setAttributeValue("luminousFlux", 5.0);
        Object result = lamp.getAttributeValue("lisbon");
        assertEquals(0, result);
    }

    @Test
    public void setAttributeValueTestTrue() {
        Lamp lamp = new Lamp(1);
        lamp.setAttributeValue("luminousFlux", 5.0);
        Object result = lamp.getAttributeValue("luminousFlux");
        assertEquals(5.0, result);
    }

}
