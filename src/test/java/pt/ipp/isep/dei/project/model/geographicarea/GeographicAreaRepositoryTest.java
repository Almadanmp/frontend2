package pt.ipp.isep.dei.project.model.geographicarea;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import pt.ipp.isep.dei.project.controllerCLI.ReaderController;
import pt.ipp.isep.dei.project.dto.GeographicAreaDTO;
import pt.ipp.isep.dei.project.dto.LocalDTO;
import pt.ipp.isep.dei.project.dto.mappers.GeographicAreaMapper;
import pt.ipp.isep.dei.project.model.Local;
import pt.ipp.isep.dei.project.model.Reading;
import pt.ipp.isep.dei.project.model.areatype.AreaType;
import pt.ipp.isep.dei.project.model.device.WaterHeater;
import pt.ipp.isep.dei.project.model.device.devicespecs.WaterHeaterSpec;
import pt.ipp.isep.dei.project.model.house.Address;
import pt.ipp.isep.dei.project.model.house.House;
import pt.ipp.isep.dei.project.model.sensortype.SensorType;
import pt.ipp.isep.dei.project.repository.AreaTypeCrudeRepo;
import pt.ipp.isep.dei.project.repository.GeographicAreaCrudeRepo;
import pt.ipp.isep.dei.project.repository.SensorTypeCrudeRepo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.*;

/**
 * GeographicAreaService tests class.
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class GeographicAreaRepositoryTest {

    // Common testing artifacts for this class.

    private GeographicArea firstValidArea;
    private List<GeographicArea> validList;
    private static final Logger logger = Logger.getLogger(ReaderController.class.getName());
    private static final String PATH_TO_FRIDGE = "pt.ipp.isep.dei.project.model.device.devicetypes.FridgeType";
    private AreaSensor firstValidAreaSensor;
    private AreaSensor secondValidAreaSensor;
    private AreaSensor validAreaSensor;
    private Date validDate1; // Date 21/11/2018
    private Date validDate2; // Date 03/09/2018
    private Date validDate3;
    private Date validDate4;
    private Date initialTime;
    private Date endingTime;
    private Date sensorCreationTime;
    private Date validReadingDate;
    private Date validReadingDate2;
    private Date validReadingDate3;
    private Reading validReading;
    private Reading validReading2;
    private Reading validReadingHotDay;
    private Reading validReadingColdDay;
    private GeographicAreaRepository geographicAreaRepository;
    private List<Reading> validReadingList;
    private House validHouse;
    private List<String> deviceTypeString;

    @Mock
    private SensorTypeCrudeRepo sensorTypeCrudeRepo;
    @Mock
    GeographicAreaCrudeRepo geographicAreaCrudeRepo;
    @Mock
    AreaTypeCrudeRepo areaTypeCrudeRepo;

    @BeforeEach
    void arrangeArtifacts() {
        MockitoAnnotations.initMocks(this);
        SimpleDateFormat validSdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        SimpleDateFormat readingSD = new SimpleDateFormat("yyyy-MM-dd");
        try {
            validDate1 = validSdf.parse("21/11/2018 00:00:00");
            validDate2 = validSdf.parse("03/09/2018 00:00:00");
            validDate3 = validSdf.parse("12/10/2018 00:00:00");
            validDate4 = validSdf.parse("01/10/2018 00:00:00");
            validReadingDate = readingSD.parse("2018-10-03");
            validReadingDate2 = readingSD.parse("2018-10-04");
            validReadingDate3 = readingSD.parse("2018-10-05");
            initialTime = readingSD.parse("2017-10-03");
            endingTime = readingSD.parse("2019-10-03");
            sensorCreationTime = readingSD.parse("2016-10-03");
        } catch (ParseException e) {
            e.printStackTrace();
        }


        firstValidArea = new GeographicArea("Portugal", "Country", 300, 200,
                new Local(50, 50, 10));
        validList = new ArrayList<>();
        validList.add(firstValidArea);

        firstValidAreaSensor = new AreaSensor("SensorOne", "SensorOne", new SensorType("Temperature", "Celsius"), new Local(2, 2, 2), validDate1, 6008L);
        firstValidAreaSensor.setActive(true);
        secondValidAreaSensor = new AreaSensor("SensorTwo", "SensorTwo", new SensorType("Temperature", "Celsius"), new Local(10, 10, 10),
                validDate1, 6008L);
        secondValidAreaSensor.setActive(true);
        validAreaSensor = new AreaSensor("SensorThree", "SensorThree", new SensorType("temperature", "C"), new Local(10, 10, 10),
                sensorCreationTime, 6008L);
        validAreaSensor.setActive(true);

        this.geographicAreaRepository = new GeographicAreaRepository(geographicAreaCrudeRepo, areaTypeCrudeRepo, sensorTypeCrudeRepo);

        validReading = new Reading(23, validDate2, "C", "sensorID");
        validReading2 = new Reading(23, validReadingDate, "C", "SensorThree");
        validReadingHotDay = new Reading(50, validReadingDate2, "C", "SensorThree");
        validReadingColdDay = new Reading(0, validReadingDate3, "C", "SensorThree");

        validAreaSensor.addReading(validReading2);
        //validAreaSensor.addReading(validReadingColdDay);
        //validAreaSensor.addReading(validReadingHotDay);
        validReadingList = new ArrayList<>();
        validReadingList.add(validReading2);
        validReadingList.add(validReadingColdDay);
        validReadingList.add(validReadingHotDay);

        deviceTypeString = new ArrayList<>();
        deviceTypeString.add(PATH_TO_FRIDGE);
        validHouse = new House("ISEP", new Address("Rua Dr. António Bernardino de Almeida", "431",
                "4455-125", "Porto", "Portugal"),
                new Local(20, 20, 20), 60,
                180, deviceTypeString);
        validHouse.setMotherArea(firstValidArea);
        firstValidArea.addSensor(validAreaSensor);
    }

    @Test
    void seeIfUpdateGeoAreaWorks() {
        // Arrange

        GeographicArea expectedResult = new GeographicArea("Portugal", "Country", 300, 200,
                new Local(50, 50, 10));

        Mockito.when(geographicAreaCrudeRepo.save(firstValidArea)).thenReturn(expectedResult);

        // Assert

        assertEquals(expectedResult, firstValidArea);
    }

    @Test
    void seeIfAddAreaReadingsWorksWhenSensorIDIsInvalid() {
        // Arrange

        List<Reading> readings = new ArrayList<>();
        Reading reading = new Reading(21D, validDate1, "C", "sensorID");
        readings.add(reading);

        List<GeographicArea> geographicAreas = new ArrayList<>();
        geographicAreas.add(firstValidArea);

        Mockito.when(geographicAreaCrudeRepo.findAll()).thenReturn(geographicAreas);

        int expectedResult = 0;

        //Act

        int actualResult = geographicAreaRepository.addAreaReadings("invalidSensor", readings, logger);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfAddAreaReadingsWorks() {
        // Arrange

        List<Reading> readings = new ArrayList<>();
        Reading reading = new Reading(21D, validDate1, "C", "sensorID");
        readings.add(reading);

        List<GeographicArea> geographicAreas = new ArrayList<>();
        geographicAreas.add(firstValidArea);
        firstValidArea.addSensor(firstValidAreaSensor);

        Mockito.when(geographicAreaCrudeRepo.findAll()).thenReturn(geographicAreas);

        int expectedResult = 1;

        //Act

        int actualResult = geographicAreaRepository.addAreaReadings("SensorOne", readings, logger);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfAddReadingsToAreaSensorWorks() {
        // Arrange

        List<Reading> readings = new ArrayList<>();
        Reading reading = new Reading(21D, validDate1, "C", "sensorID");
        readings.add(reading);

        int expectedResult = 1;

        //Act

        int actualResult = geographicAreaRepository.addReadingsToAreaSensor(firstValidAreaSensor, readings, logger);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfAddReadingsToAreaSensorWorksWhenReadingIsFromBeforeSensorActivatingDate() {
        // Arrange

        List<Reading> readings = new ArrayList<>();
        Reading reading = new Reading(21D, validDate2, "C", "sensorID");
        readings.add(reading);

        int expectedResult = 0;

        //Act

        int actualResult = geographicAreaRepository.addReadingsToAreaSensor(firstValidAreaSensor, readings, logger);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfAddReadingsToAreaSensorWorksWhenReadingAlreadyExists() {
        // Arrange

        List<Reading> readings = new ArrayList<>();
        Reading reading = new Reading(21D, validDate1, "C", "sensorID");
        readings.add(reading);

        firstValidAreaSensor.addReading(reading);

        int expectedResult = 0;

        //Act

        int actualResult = geographicAreaRepository.addReadingsToAreaSensor(firstValidAreaSensor, readings, logger);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfAddReadingsToAreaSensorWorksWhenListIsEmpty() {
        // Arrange

        List<Reading> readings = new ArrayList<>();

        int expectedResult = 0;

        //Act

        int actualResult = geographicAreaRepository.addReadingsToAreaSensor(firstValidAreaSensor, readings, logger);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfGetGeographicAreaContainingSensorWithGivenIdWorks() {
        // Arrange

        firstValidArea.addSensor(firstValidAreaSensor);
        firstValidArea.addSensor(secondValidAreaSensor);

        Mockito.when(geographicAreaCrudeRepo.findAll()).thenReturn(validList);

        //Act

        GeographicArea actualResult = geographicAreaRepository.getGeographicAreaContainingSensorWithGivenId("SensorTwo");

        // Assert

        assertEquals(firstValidArea, actualResult);
    }

    @Test
    void seeIfGetGeographicAreaContainingSensorWithGivenIdWorksWhenSensorIdDoesNotExist() {
        // Arrange

        List<GeographicArea> emptyList = new ArrayList<>();

        Mockito.when(geographicAreaCrudeRepo.findAll()).thenReturn(emptyList);

        // Assert

        assertThrows(IllegalArgumentException.class,
                () -> geographicAreaRepository.getGeographicAreaContainingSensorWithGivenId("invalidSensorID"));
    }


    @Test
    void seeIfEqualsWorksFalseDifferentObject() {
        // Arrange

        //Act

        boolean actualResult = geographicAreaRepository.equals(new WaterHeater(new WaterHeaterSpec())); // Needed for SonarQube testing purposes.

        // Assert

        assertFalse(actualResult);
    }

    @Test
    void seeIfPrintsGeoAList() {
        // Arrange
        List<GeographicArea> geographicAreas = new ArrayList<>();
        String expectedResult = "Invalid List - List is Empty\n";

        // Act

        String result = geographicAreaRepository.buildStringRepository(geographicAreas);

        // Assert

        assertEquals(expectedResult, result);
    }

    @Test
    void seeIfPrintsGeoAListIfEmpty() {
        // Arrange

        List<GeographicArea> geoAreas = new ArrayList<>();
        String expectedResult = "Invalid List - List is Empty\n";

        // Act

        String actualResult = geographicAreaRepository.buildStringRepository(geoAreas);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfIsEmptyFalse() {
        List<GeographicArea> geographicAreas = new ArrayList<>();
        geographicAreas.add(firstValidArea);

        Mockito.when(geographicAreaCrudeRepo.findAll()).thenReturn(geographicAreas);

        assertFalse(geographicAreaRepository.isEmpty());

    }

    @Test
    void seeIfIsEmptyTrue() {

        List<GeographicArea> geographicAreas = new ArrayList<>();

        Mockito.when(geographicAreaCrudeRepo.findAll()).thenReturn(geographicAreas);

        assertTrue(geographicAreaRepository.isEmpty());
    }

    @Test
    void seeIfGetTypeAreaByIdRepository() {
        long mockId = 1234;
        firstValidArea.setId(mockId);

        Mockito.when(geographicAreaCrudeRepo.findById(mockId)).thenReturn(Optional.of(firstValidArea));

        GeographicArea result = geographicAreaRepository.get(mockId);

        assertEquals(result.getId(), firstValidArea.getId());

    }

    @Test
    void seeIfGetTypeAreaByIdRepositoryNull() {
        long mockId = 1234;

        Mockito.when(geographicAreaCrudeRepo.findById(mockId)).thenReturn(Optional.empty());

        Throwable exception = assertThrows(NoSuchElementException.class, () -> geographicAreaRepository.get(mockId));

        assertEquals("ERROR: There is no Geographic Area with the selected ID.", exception.getMessage());
    }

    @Test
    void seeIfCreateGAWorks() {
        String iD = "Coimbra";
        Local local = new Local(12, 12, 12);

        AreaType city = new AreaType("city");
        AreaType urbanArea = new AreaType("urban area");

        Mockito.when(areaTypeCrudeRepo.findByName("urban area")).thenReturn(Optional.of(urbanArea));
        Mockito.when(areaTypeCrudeRepo.findByName("city")).thenReturn(Optional.of(city));

        GeographicArea expectedResult = new GeographicArea(iD, city.getName(), 12, 12, local);

        GeographicArea actualResult = geographicAreaRepository.createGA(iD, city.getName(), 12, 12, local);

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfCreateAreaSensorWorks() {
        SensorType rainfall = new SensorType("rainfall", "mm");
        SensorType temperature = new SensorType("temperature", "C");

        sensorTypeCrudeRepo.save(rainfall);
        sensorTypeCrudeRepo.save(temperature);

        Mockito.when(sensorTypeCrudeRepo.findByName("rainfall")).thenReturn(Optional.of(rainfall));
        Mockito.when(sensorTypeCrudeRepo.findByName("temperature")).thenReturn(Optional.of(temperature));

        AreaSensor expectedResult = new AreaSensor("Sensor123", "Temperature Sensor 2",
                rainfall, new Local(41, -8, 100), validDate1, new Long(56));

        AreaSensor actualResult = geographicAreaRepository.createAreaSensor("Sensor123", "Temperature Sensor 2",
                "rainfall", "mm", new Local(41, -8, 100), validDate1, new Long(56));
        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfCreateAreaSensorWorksWithSensorTypeNull() {
        assertThrows(IllegalArgumentException.class,
                () -> geographicAreaRepository.createAreaSensor("Sensor123", "Temperature Sensor 2",
                        "humidity", "g/m3", new Local(41, -8, 100), validDate1, new Long(56)));
    }

    @Test
    void seeIfAddAndPersistReturnsFalse() {
        // Arrange

        // First Area

        GeographicAreaDTO firstArea = new GeographicAreaDTO();
        firstArea.setName("ISEP");
        firstArea.setDescription("Campus do ISEP");
        firstArea.setTypeArea("urban area");
        firstArea.setWidth(0.261);
        firstArea.setLength(0.249);
        firstArea.setLocalDTO(new LocalDTO(41.178553, -8.608035, 111));

        // Populate expectedResult array

        GeographicArea areaOne = GeographicAreaMapper.dtoToObject(firstArea);

        validList.add(areaOne);

        Mockito.when(geographicAreaCrudeRepo.findAll()).thenReturn(validList);

        boolean result = geographicAreaRepository.addAndPersistGA(areaOne);

        assertFalse(result);
    }

    @Test
    void seeIfGetsGeoAreasByType() {

        // Act

        List<GeographicArea> actualResult = geographicAreaRepository.getGeoAreasByType(validList, "Country");
        int expectedResult = 1;
        // Assert

        assertEquals(expectedResult, actualResult.size());
    }

    @Test
    void seeIfGetsGeoAreasByTypeNotARealType() {

        // Act

        List<GeographicArea> actualResult = geographicAreaRepository.getGeoAreasByType(validList, "Not a valid type");
        int expectedResult = 0;
        // Assert

        assertEquals(expectedResult, actualResult.size());
    }

    @Test
    void seeIfEqualsWorksOnSameObject() {
        //Act

        boolean actualResult = geographicAreaRepository.equals(geographicAreaRepository); // Required for Sonarqube testing purposes.

        //Assert

        assertTrue(actualResult);
    }

    @Test
    void seeIfEqualsWorksOnDiffObject() {
        //Act

        boolean actualResult = geographicAreaRepository.equals(20D); // Required for Sonarqube testing purposes.

        //Assert

        assertFalse(actualResult);
    }


//    @Test
//    void seeIfUpdateSensor() {
//        // Arrange
//        AreaSensor sensor = new AreaSensor("SensorOne", "SensorOne", new SensorType("Temperature", "Celsius"), new Local(2, 2, 2), validDate1, 6008L);
//        sensor.setActive(true);
//        AreaSensorService areaSensors = new AreaSensorService();
//        areaSensors.add(sensor);
//
//
//        // Act
//        Mockito.when(areaSensorRepository.findByName("SensorOne")).thenReturn(sensor);
//
//
//        // Assert
//
//        assertEquals(sensor, validAreaSensorService.updateSensor(sensor));
//    }


//    @Test
//    void seeIfGetSensorsDistanceToHouse() {
//        //Arrange
//        List<String> deviceTypeString = new ArrayList<>();
//        deviceTypeString.add("pt.ipp.isep.dei.project.model.device.devicetypes.FridgeType");
//        GeographicArea validArea = new GeographicArea("Europe", new AreaType("Continent"), 3500, 3000,
//                new Local(20, 12, 33));
//        House validHouse = new House("ISEP", new Address("Rua Dr. António Bernardino de Almeida", "431",
//                "4455-125", "Porto", "Portugal"),
//                new Local(20, 20, 20), 60,
//                180, deviceTypeString);
//        validHouse.setMotherArea(new GeographicArea("Porto", new AreaType("Cidade"),
//                2, 3, new Local(4, 4, 100)));
//        List<Double> expectedResult = new ArrayList<>();
//        expectedResult.add(2259.92026088549);
//
//        //Act
//        List<Double> actualResult = validAreaSensorService.getSensorsDistanceToHouse(validHouse);
//
//        //Assert
//        assertEquals(expectedResult, actualResult);
//
//    }


//    @Test
//    void seeIfAddReadingToMatchingSensorWorks() {
//        // Arrange
//
//        Date dateSensorStartedFunctioning = new GregorianCalendar(2017, Calendar.FEBRUARY, 3).getTime();
//        firstValidSensor.setDateStartedFunctioning(dateSensorStartedFunctioning);
//
//        // Act for reading within bounds.
//
//        boolean result = validAreaSensorList.addReadingToMatchingSensor("SensorOne", 31D, new GregorianCalendar(
//                2017, Calendar.FEBRUARY, 5).getTime());
//
//        // Act for reading outside bounds.
//
//        boolean failedResult = validAreaSensorList.addReadingToMatchingSensor("SensorOne", 31D, new GregorianCalendar(
//                2015, Calendar.FEBRUARY, 1).getTime());
//
//        // Act for not existing sensor
//
//        boolean failedResult2 = validAreaSensorList.addReadingToMatchingSensor("xxxxxxx", 32D, new GregorianCalendar(
//                2018, Calendar.FEBRUARY, 1).getTime());
//
//
//        // Assert
//
//        assertTrue(result);
//        assertFalse(failedResult);
//        assertFalse(failedResult2);
//    }


}