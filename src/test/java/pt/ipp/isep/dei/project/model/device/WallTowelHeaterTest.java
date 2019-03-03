package pt.ipp.isep.dei.project.model.device;

import org.junit.jupiter.api.Test;
import pt.ipp.isep.dei.project.model.device.devicespecs.WallTowelHeaterSpec;
import pt.ipp.isep.dei.project.model.device.log.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.testng.Assert.*;

public class WallTowelHeaterTest {

    // Common artifacts for testing in this class.
    private WallTowelHeater validWTHeater = new WallTowelHeater(new WallTowelHeaterSpec());

    @Test
    void testGetDeviceType() {
        // Arrange
        String expectedResult = "WallTowelHeater";
        // Act
        String actualResult = validWTHeater.getType();
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    @Test
    void testSetGetName() {
        // Arrange
        validWTHeater.setName("wTH1");
        validWTHeater.setName("Aquece Toalhas");
        String expectedResult = "Aquece Toalhas";
        // Act
        String actualResult = validWTHeater.getName();
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    @Test
    void testSetGetNominalPower() {
        // Arrange
        validWTHeater.setNominalPower(20);
        double expectedResult = 20;
        // Act
        double actualResult = validWTHeater.getNominalPower();
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    @Test
    void testEqualsOverrideToSameObject() {
        // Arrange
        validWTHeater.setName("WTHeater1");
        validWTHeater.setNominalPower(10.0);
        // Act
        boolean actualResult = validWTHeater.equals(validWTHeater);
        // Assert
        assertTrue(actualResult);
    }

    @Test
    void testEqualsOverrideToDifferentObject() {
        // Arrange
        validWTHeater.setName("WTHeater1");
        validWTHeater.setNominalPower(40);
        WallTowelHeater wTHeater2 = new WallTowelHeater(new WallTowelHeaterSpec());
        wTHeater2.setName("WTHeater2");
        wTHeater2.setNominalPower(45);
        // Act
        boolean actualResult = validWTHeater.equals(wTHeater2);
        // Assert
        assertFalse(actualResult);
    }

    @Test
    void testEqualsOverrideToNullObject() {
        // Arrange
        validWTHeater.setName("WallTowelHeater");
        // Act
        boolean actualResult = validWTHeater.equals(null);
        // Assert
        assertFalse(actualResult);
    }

    @Test
    void testPrintDevice() {
        // Arrange
        validWTHeater.setName("Toalha Quentinha 3000");
        validWTHeater.setNominalPower(100);
        String expectedResult = "The device name is Toalha Quentinha 3000, and its nominal power is 100.0 kW.\n";
        // Act
        String actualResult = validWTHeater.buildString();
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    @Test
    void testHashCode() {
        // Arrange
        int expectedResult = 1;
        // Act
        int actualResult = validWTHeater.hashCode();
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    @Test
    void testSetGetAttributeValue() {
        // Arrange
        validWTHeater.setAttributeValue("Anything", 10);
        Integer expectedResult = 0;
        // Act
        Object actualResult = validWTHeater.getAttributeValue("Anything");
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    @Test
    void testGetAttributeUnit() {
        // Arrange
        validWTHeater.setAttributeValue("Anything", 10);
        boolean expectedResult = false;
        // Act
        Object actualResult = validWTHeater.getAttributeUnit("Anything");
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    @Test
    void testGetAttributeNames() {
        // Arrange
        validWTHeater.setAttributeValue("Anything", 10);
        List<String> expectedResult = new ArrayList<>();
        // Act
        Object actualResult = validWTHeater.getAttributeNames();
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    @Test
    void testDeactivateReturnTrue() {
        // Act
        boolean actualResult = validWTHeater.deactivate();
        // Assert
        assertTrue(actualResult);
    }

    @Test
    void testDeactivateReturnFalse() {
        // Arrange
        validWTHeater.deactivate();
        // Act
        boolean actualResult = validWTHeater.deactivate();
        // Assert
        assertFalse(actualResult);
    }

    @Test
    void testGetEnergyConsumption() {
        // Arrange
        validWTHeater.setNominalPower(20.0);
        double expectedResult = 40.0;
        // Act
        double actualResult = validWTHeater.getEnergyConsumption(2);
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    @Test
    void testGetLogList() {
        // Arrange
        Log log = new Log(1, new GregorianCalendar(2019, 1, 1).getTime(),
                new GregorianCalendar(2019, 1, 1).getTime());
        validWTHeater.addLog(log);
        LogList expectedResult = new LogList();
        expectedResult.addLog(log);
        // Act
        LogList actualResult = validWTHeater.getLogList();
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    @Test
    void testAddLog() {
        // Arrange
        Log log = new Log(1, new GregorianCalendar(2019, 1, 1).getTime(),
                new GregorianCalendar(2019, 1, 1).getTime());
        // Act
        boolean actualResult = validWTHeater.addLog(log);
        // Assert
        assertTrue(actualResult);
    }

    @Test
    void testAddLogReturnFalse() {
        // Arrange
        Log log = new Log(1, new GregorianCalendar(2019, 1, 1).getTime(),
                new GregorianCalendar(2019, 1, 1).getTime());
        validWTHeater.addLog(log);
        // Act
        boolean actualResult = validWTHeater.addLog(log);
        // Assert
        assertFalse(actualResult);
    }

    @Test
    void testAddLogToInactive() {
        // Arrange
        Log log = new Log(1, new GregorianCalendar(2019, 1, 1).getTime(),
                new GregorianCalendar(2019, 1, 1).getTime());
        validWTHeater.deactivate();
        // Act
        boolean actualResult = validWTHeater.addLog(log);
        // Assert
        assertFalse(actualResult);
    }

    @Test
    void getTotalMeteredEnergyConsumptionInDeviceWithinGivenTimeIntervalEquals() {
        // Arrange
        Date initialTime = new GregorianCalendar(2018, 10, 20, 10, 0).getTime();
        Date finalTime = new GregorianCalendar(2018, 10, 20, 11, 0).getTime();
        Date periodBeginning1 = new GregorianCalendar(2018, 10, 20, 10, 0).getTime();
        Date periodEnding1 = new GregorianCalendar(2018, 10, 20, 10, 20).getTime();
        Date periodBeginning2 = new GregorianCalendar(2018, 10, 20, 10, 30).getTime();
        Date periodEnding2 = new GregorianCalendar(2018, 10, 20, 11, 0).getTime();
        Log log1 = new Log(56, periodBeginning1, periodEnding1);
        Log log2 = new Log(55, periodBeginning2, periodEnding2);
        validWTHeater.addLog(log1);
        validWTHeater.addLog(log2);
        double expectedResult = 111.0;
        // Act
        double actualResult = validWTHeater.getConsumptionWithinGivenInterval(initialTime, finalTime);
        // Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    void getTotalMeteredEnergyConsumptionInDeviceWithinGivenTimeIntervalAfterBefore() {
        // Arrange
        Date initialTime = new GregorianCalendar(2018, 10, 20, 10, 0).getTime();
        Date finalTime = new GregorianCalendar(2018, 10, 20, 11, 0).getTime();
        Date periodBeginning1 = new GregorianCalendar(2018, 10, 20, 10, 1).getTime();
        Date periodEnding1 = new GregorianCalendar(2018, 10, 20, 10, 20).getTime();
        Date periodBeginning2 = new GregorianCalendar(2018, 10, 20, 10, 30).getTime();
        Date periodEnding2 = new GregorianCalendar(2018, 10, 20, 10, 59).getTime();
        Log log1 = new Log(56, periodBeginning1, periodEnding1);
        Log log2 = new Log(55, periodBeginning2, periodEnding2);
        validWTHeater.addLog(log1);
        validWTHeater.addLog(log2);
        double expectedResult = 111.0;
        // Act
        double actualResult = validWTHeater.getConsumptionWithinGivenInterval(initialTime, finalTime);
        // Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    void getTotalMeteredEnergyConsumptionInDeviceWithinGivenTimeIntervalAfterBeforeReverseOutOfBounds() {
        // Arrange
        Date initialTime = new GregorianCalendar(2018, 10, 20, 10, 0).getTime();
        Date finalTime = new GregorianCalendar(2018, 10, 20, 11, 0).getTime();
        Date periodBeginning1 = new GregorianCalendar(2018, 10, 20, 9, 0).getTime();
        Date periodEnding1 = new GregorianCalendar(2018, 10, 20, 10, 20).getTime();
        Date periodBeginning2 = new GregorianCalendar(2018, 10, 20, 10, 30).getTime();
        Date periodEnding2 = new GregorianCalendar(2018, 10, 20, 11, 20).getTime();
        Log log1 = new Log(56, periodBeginning1, periodEnding1);
        Log log2 = new Log(55, periodBeginning2, periodEnding2);
        validWTHeater.addLog(log1);
        validWTHeater.addLog(log2);
        double expectedResult = 0.0;
        // Act
        double actualResult = validWTHeater.getConsumptionWithinGivenInterval(initialTime, finalTime);
        // Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    void testCountLogsInInterval() {
        // Arrange
        Date initialTime = new GregorianCalendar(2018, 10, 20, 10, 0).getTime();
        Date finalTime = new GregorianCalendar(2018, 10, 20, 11, 0).getTime();
        Date periodBeginning1 = new GregorianCalendar(2018, 10, 20, 10, 0).getTime();
        Date periodEnding1 = new GregorianCalendar(2018, 10, 20, 10, 20).getTime();
        Date periodBeginning2 = new GregorianCalendar(2018, 10, 20, 10, 20).getTime();
        Date periodEnding2 = new GregorianCalendar(2018, 10, 20, 10, 40).getTime();
        Date periodBeginning3 = new GregorianCalendar(2018, 10, 20, 10, 40).getTime();
        Date periodEnding3 = new GregorianCalendar(2018, 10, 20, 11, 0).getTime();
        Log log1 = new Log(56, periodBeginning1, periodEnding1);
        Log log2 = new Log(55, periodBeginning2, periodEnding2);
        Log log3 = new Log(55, periodBeginning3, periodEnding3);
        validWTHeater.addLog(log1);
        validWTHeater.addLog(log2);
        validWTHeater.addLog(log3);
        Integer expectedResult = 3;
        // Act
        Integer actualResult = validWTHeater.countLogsInInterval(initialTime, finalTime);
        // Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    void testGetLogsInInterval() {
        // Arrange
        Date initialTime = new GregorianCalendar(2018, 10, 20, 10, 0).getTime();
        Date finalTime = new GregorianCalendar(2018, 10, 20, 11, 0).getTime();
        Date periodBeginning1 = new GregorianCalendar(2018, 10, 20, 10, 0).getTime();
        Date periodEnding1 = new GregorianCalendar(2018, 10, 20, 10, 20).getTime();
        Date periodBeginning2 = new GregorianCalendar(2018, 10, 20, 10, 20).getTime();
        Date periodEnding2 = new GregorianCalendar(2018, 10, 20, 10, 40).getTime();
        Date periodBeginning3 = new GregorianCalendar(2018, 10, 20, 10, 40).getTime();
        Date periodEnding3 = new GregorianCalendar(2018, 10, 20, 11, 0).getTime();
        Date periodBeginning4 = new GregorianCalendar(2018, 10, 20, 11, 0).getTime();
        Date periodEnding4 = new GregorianCalendar(2018, 10, 20, 11, 20).getTime();
        Date periodBeginning5 = new GregorianCalendar(2018, 10, 20, 9, 40).getTime();
        Date periodEnding5 = new GregorianCalendar(2018, 10, 20, 10, 0).getTime();
        Log log1 = new Log(56, periodBeginning1, periodEnding1);
        Log log2 = new Log(55, periodBeginning2, periodEnding2);
        Log log3 = new Log(55, periodBeginning3, periodEnding3);
        Log log4 = new Log(55, periodBeginning4, periodEnding4);
        Log log5 = new Log(55, periodBeginning5, periodEnding5);
        validWTHeater.addLog(log1);
        validWTHeater.addLog(log2);
        validWTHeater.addLog(log3);
        validWTHeater.addLog(log4);
        validWTHeater.addLog(log5);
        LogList expectedResult = new LogList();
        expectedResult.addLog(log1);
        expectedResult.addLog(log2);
        expectedResult.addLog(log3);
        // Act
        LogList actualResult = validWTHeater.getLogsInInterval(initialTime, finalTime);
        //Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    void testGetLogsInIntervalOutOfBounds() {
        // Arrange
        Date initialTime = new GregorianCalendar(2018, 10, 20, 10, 0).getTime();
        Date finalTime = new GregorianCalendar(2018, 10, 20, 11, 0).getTime();
        Date periodBeginning1 = new GregorianCalendar(2018, 10, 20, 9, 50).getTime();
        Date periodEnding1 = new GregorianCalendar(2018, 10, 20, 10, 10).getTime();
        Date periodBeginning2 = new GregorianCalendar(2018, 10, 20, 10, 50).getTime();
        Date periodEnding2 = new GregorianCalendar(2018, 10, 20, 11, 10).getTime();
        Log log1 = new Log(56, periodBeginning1, periodEnding1);
        Log log2 = new Log(55, periodBeginning2, periodEnding2);
        validWTHeater.addLog(log1);
        validWTHeater.addLog(log2);
        LogList expectedResult = new LogList();
        // Act
        LogList actualResult = validWTHeater.getLogsInInterval(initialTime, finalTime);
        // Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    void getConsumption() {
        // Arrange
        validWTHeater.setNominalPower(15);
        double expectedResult = 360;
        // Act
        double result = validWTHeater.getEnergyConsumption(24);
        // Assert
        assertEquals(expectedResult, result);
    }

    @Test
    void getConsumptionTimeZero() {
        // Arrange
        validWTHeater.setNominalPower(15);
        double expectedResult = 0;
        // Act
        double result = validWTHeater.getEnergyConsumption(0);
        // Assert
        assertEquals(expectedResult, result);
    }

    @Test
    void testSetAttributeValueForAllCases() {
        //Arrange
        Double attribute = 6.0;
        // same hash codes, but different strings + double:
        assertFalse(validWTHeater.setAttributeValue("Anything", attribute));
        // distinct hash code to cover default cases of switches + double
        assertFalse(validWTHeater.setAttributeValue("", attribute));
    }

    @Test
    void testSetAttributeValueForNotDouble() {
        //Arrange
        Double dAttribute = 6.0;
        Integer attribute = 6;
        validWTHeater.setAttributeValue("Anything", dAttribute);
        // original strings + not double:
        assertFalse(validWTHeater.setAttributeValue("Anything", attribute));
        // same hash codes, but different strings + not double:
        assertFalse(validWTHeater.setAttributeValue("notAnything", attribute));
        assertFalse(validWTHeater.setAttributeValue("notNOMINAL_POWER", attribute));
        // distinct hash code to cover default cases of switches + not double
        assertFalse(validWTHeater.setAttributeValue("", attribute));
    }
}