package pt.ipp.isep.dei.project.model.sensor;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import pt.ipp.isep.dei.project.repository.HouseSensorRepository;
import pt.ipp.isep.dei.project.repository.SensorTypeRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * House Sensor Service tests class.
 */
@ExtendWith(MockitoExtension.class)
class HouseSensorServiceTest {

    // Common artifacts for testing in this class.

    private HouseSensor firstValidHouseSensor;
    private HouseSensor secondValidHouseSensor;
    private HouseSensor thirdValidHouseSensor;
    private Date validDate1; // Date 21/11/2018
    private Date validDate2; // Date 03/09/2018

    @Autowired
    ReadingService readingService;

    @Mock
    HouseSensorRepository houseSensorRepository;

    @Mock
    SensorTypeRepository sensorTypeRepository;

    private HouseSensorService validHouseSensorService; // Contains the first valid sensor by default.


    @BeforeEach
    void arrangeArtifacts() {
        MockitoAnnotations.initMocks(this);
        validHouseSensorService = new HouseSensorService(houseSensorRepository, sensorTypeRepository);
        SimpleDateFormat validSdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        try {
            validDate1 = validSdf.parse("21/11/2018 00:00:00");
            validDate2 = validSdf.parse("03/09/2018 00:00:00");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        firstValidHouseSensor = new HouseSensor("T32875", "SensorOne", new SensorType("Temperature", "Celsius"), validDate1, "RoomDFS");
        firstValidHouseSensor.setActive(true);
        secondValidHouseSensor = new HouseSensor("T32876", "SensorTwo", new SensorType("Temperature", "Celsius"), new Date(), "RoomDFS");
        secondValidHouseSensor.setActive(true);
        thirdValidHouseSensor = new HouseSensor("T32877", "SensorThree", new SensorType("Rainfall", "l/m2"), new Date(), "RoomDFS");
    }

    @Test
    void seeIfGetAllSensor() {

        List<HouseSensor> houseSensors = new ArrayList<>();
        validHouseSensorService.save(secondValidHouseSensor);

        Mockito.when(houseSensorRepository.findAll()).thenReturn(houseSensors);

        assertEquals(houseSensors, validHouseSensorService.getAllSensor());
    }

//    @Test
//    void seeIfGetAllById(){
//
//        List<HouseSensor> houseSensors = new ArrayList<>();
//        houseSensors.add(firstValidHouseSensor);
//        validHouseSensorService.addPersistence(firstValidHouseSensor);
//        String mockId = "T32875";
//        Mockito.when(houseSensorRepository.findById(mockId)).thenReturn(Optional.of(firstValidHouseSensor));
//
//        assertEquals(houseSensors, validHouseSensorService.getAllByRoomId("T32875"));
//    }

//    @Test
//    void seeIfGetReadings() {
//        //Act
//        List<HouseSensor> twoSensorsList = new ArrayList<>();
//
//        Reading readingOne = new Reading(31, new GregorianCalendar(2018, Calendar.MARCH, 1).getTime(), "C", secondValidHouseSensor.getId());
//        secondValidHouseSensor.addReading(readingOne);
//
//        twoSensorsList.add(firstValidHouseSensor);
//        twoSensorsList.add(secondValidHouseSensor);
//
//        ReadingService expectedResult1 = new ReadingService();
//        expectedResult1.addReading(readingOne);
//
//        // Act
//
//        List<Reading> actualResult1 = readingService.getAreaReadings();
//
//        // Assert
//
//        assertEquals(expectedResult1, actualResult1);
//
//    }

//    @Test
//    void seeIfGetReadingsValueFromSpecificDays() {
//        //Act
//        HouseSensorService twoSensorsList = new HouseSensorService();
//
//        Reading readingOne = new Reading(31, new GregorianCalendar(2018, Calendar.MARCH, 1).getTime(), "C", secondValidHouseSensor.getId());
//        secondValidHouseSensor.addReading(readingOne);
//
//        twoSensorsList.add(firstValidHouseSensor);
//        twoSensorsList.add(secondValidHouseSensor);
//        twoSensorsList.add(firstValidHouseSensor); //test add false
//
//        List<Double> expectedResult1 = new ArrayList<>();
//        expectedResult1.add(31.0);
//
//        // Act
//
//        List<Double> actualResult1 = twoSensorsList.getValuesOfSpecificDayReadings(new GregorianCalendar(2018, Calendar.MARCH, 1).getTime());
//
//        // Assert
//
//        assertEquals(expectedResult1, actualResult1);
//
//    }

    @Test
    void seeIfEqualsWorksOnSameObject() {
        //Act

        boolean actualResult = validHouseSensorService.equals(validHouseSensorService); // Required for Sonarqube testing purposes.

        //Assert

        assertTrue(actualResult);
    }

    @Test
    void seeIfEqualsWorksOnDiffObject() {
        //Act

        boolean actualResult = validHouseSensorService.equals(20D); // Required for Sonarqube testing purposes.

        //Assert

        assertFalse(actualResult);
    }

    @Test
    void seeIfToStringWorks() {
        // Arrange

        List<HouseSensor> houseSensors = new ArrayList<>();
        houseSensors.add(secondValidHouseSensor);
        houseSensors.add(thirdValidHouseSensor);
        String expectedResult = "---------------\n" +
                "T32876SensorTwo | Type: Temperature | Active\n" +
                "T32877SensorThree | Type: Rainfall | Active\n" +
                "---------------\n";

        // Act

        String actualResult = validHouseSensorService.buildString(houseSensors);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfToStringWorksEmpty() {
        // Arrange

        List<HouseSensor> houseSensors = new ArrayList<>();
        String expectedResult = "Invalid List - List is Empty\n";

        // Act

        String actualResult = validHouseSensorService.buildString(houseSensors);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

//    @Test
//    void seeIfIsEmptyWorks() {
//        // Arrange
//
//        HouseSensorService emptyList = new HouseSensorService();
//        HouseSensorService twoSensorsList = new HouseSensorService();
//        twoSensorsList.add(firstValidHouseSensor);
//        twoSensorsList.add(secondValidHouseSensor);
//
//        // Act
//
//        boolean actualResult1 = emptyList.isEmpty();
//        boolean actualResult2 = validHouseSensorService.isEmpty();
//        boolean actualResult3 = twoSensorsList.isEmpty();
//
//        // Assert
//
//        assertTrue(actualResult1);
//        assertFalse(actualResult2);
//        assertFalse(actualResult3);
//    }

    @Test
    void seeIfSensorFromRepositoryIsActiveWorks() {
        //Arrange

        String sensorId = "SensorOne";
        Mockito.when(houseSensorRepository.findById(sensorId)).thenReturn(Optional.of(firstValidHouseSensor));

        //Act

        boolean actualResult1 = validHouseSensorService.sensorFromRepositoryIsActive(sensorId, validDate1);

        //Assert

        assertTrue(actualResult1);
    }

    @Test
    void seeIfSensorFromRepositoryIsActiveWorksWhenSensorStartsAfterReading() {
        //Arrange

        String sensorId = "SensorOne";
        Mockito.when(houseSensorRepository.findById(sensorId)).thenReturn(Optional.of(firstValidHouseSensor));

        //Act

        boolean actualResult1 = validHouseSensorService.sensorFromRepositoryIsActive(sensorId, validDate2);

        //Assert

        assertFalse(actualResult1);
    }

    @Test
    void seeIfSensorFromRepositoryIsActiveWorksWhenSensorDoesNotExist() {
        //Arrange

        String sensorId = "SensorOne";
        Mockito.when(houseSensorRepository.findById(sensorId)).thenReturn((Optional.empty()));

        //Act

        boolean actualResult1 = validHouseSensorService.sensorFromRepositoryIsActive(sensorId, validDate1);

        //Assert

        assertFalse(actualResult1);
    }

//    @Test
//    void seeItGetSensorListByTypeWorks() {
//        // Arrange
//
//        HouseSensorService expectedResult = new HouseSensorService();
//        expectedResult.add(firstValidHouseSensor);
//
//        // Act
//
//        HouseSensorService actualResult = validHouseSensorService.getSensorsOfGivenType("Temperature");
//
//        // Assert
//
//        assertEquals(expectedResult, actualResult);
//    }
//
//    @Test
//    void seeItGetSensorListByTypeWorksFalse() {
//        // Arrange
//
//        HouseSensorService expectedResult = new HouseSensorService();
//
//        // Act
//
//        HouseSensorService actualResult = validHouseSensorService.getSensorsOfGivenType("Pressure");
//
//        // Assert
//
//        assertEquals(expectedResult, actualResult);
//    }

    @Test
    void seeIfSensorExistsInRepositoryWorks() {
        //Arrange
        HouseSensor houseSensor = new HouseSensor();
        houseSensor.setId("SensorID");

        Mockito.when(houseSensorRepository.findById("SensorID")).thenReturn(Optional.of(houseSensor));

        //Act

        boolean actualResult = validHouseSensorService.sensorExistsInRepository("SensorID");

        //Assert

        assertTrue(actualResult);
    }

    @Test
    void seeIfSensorExistsInRepositoryWorksWhenSensorIsNotInRepository() {
        //Arrange

        Mockito.when(houseSensorRepository.findById("SensorID")).thenReturn(Optional.empty());

        //Act

        boolean actualResult = validHouseSensorService.sensorExistsInRepository("SensorID");

        //Assert

        assertFalse(actualResult);
    }
}