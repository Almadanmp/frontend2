package pt.ipp.isep.dei.project.controller;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pt.ipp.isep.dei.project.dto.AreaSensorDTO;
import pt.ipp.isep.dei.project.dto.GeographicAreaDTO;
import pt.ipp.isep.dei.project.dto.LocalDTO;
import pt.ipp.isep.dei.project.dto.ReadingDTO;
import pt.ipp.isep.dei.project.model.*;
import pt.ipp.isep.dei.project.model.sensor.*;
import pt.ipp.isep.dei.project.reader.ReaderXMLGeoArea;
import pt.ipp.isep.dei.project.repository.AreaSensorRepository;
import pt.ipp.isep.dei.project.repository.GeographicAreaRepository;
import pt.ipp.isep.dei.project.repository.ReadingRepository;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.io.PrintStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertEquals;


/**
 * ReaderController test class.
 */
@ExtendWith(MockitoExtension.class)
class ReaderControllerTest {

    // Common artifacts for testing in this class.

    private GeographicAreaService validGeographicAreaService;
    private GeographicAreaService validGeographicAreaService2;
    private GeographicAreaService emptyGeographicAreaService;
    private GeographicAreaService validGeographicAreaServiceNoSensors;
    private GeographicArea validGeographicArea;
    private ReaderXMLGeoArea validReaderXMLGeoArea;
    private Date validDate1 = new Date();
    private Date validDate2 = new Date();
    private Date validDate3 = new Date();
    private Date validDate4 = new Date();
    private ReaderController validReader;
    private AreaSensor validAreaSensor1;
    private static final String validCSVLocation1 = "src/test/resources/readingsFiles/test1CSVReadings.csv";
    private static final String validCSVLocation3 = "src/test/resources/readingsFiles/test3CSVReadings.csv";
    private static final String validJSONLocation1 = "src/test/resources/readingsFiles/test1JSONReadings.json";
    private static final String validJSONLocation4 = "src/test/resources/readingsFiles/test4JSONReadings.json";
    private static final String validXMLocation1 = "src/test/resources/readingsFiles/test1XMLReadings.xml";
    private static final String validXMLocation4 = "src/test/resources/readingsFiles/test4XMLReadings.xml";
    private static final String validXMLocation5 = "src/test/resources/readingsFiles/test5XMLReadings.xml";

    private static final String validLogPath = "resources/logs/logOut.log";
    private static final String invalidLogPath = "./resoursagfdgs/logs/logOut.log";

    private static final Logger logger = Logger.getLogger(ReaderController.class.getName());

    @Mock
    AreaSensorRepository areaSensorRepository;

    @Mock
    ReadingRepository readingRepository;

    @Mock
    GeographicAreaRepository geographicAreaRepository;

    private AreaSensorService areaSensorService;
    private ReadingService readingService;
    private GeographicAreaService geographicAreaService;
    private HouseService houseService;


    @BeforeEach
    void arrangeArtifacts() {
        areaSensorService = new AreaSensorService(areaSensorRepository);
        readingService = new ReadingService(readingRepository);
        geographicAreaService = new GeographicAreaService(this.geographicAreaRepository);
        validReader = new ReaderController(areaSensorService, readingService, houseService);
        validReaderXMLGeoArea = new ReaderXMLGeoArea();
        SimpleDateFormat validSdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            validDate1 = validSdf.parse("2016-11-15");
            validDate2 = validSdf.parse("2016-11-15");
            validDate3 = validSdf.parse("2017-11-15");
            validDate4 = validSdf.parse("2017-11-16");
        } catch (ParseException c) {
            c.printStackTrace();
        }
        GeographicArea validGeographicArea = new GeographicArea("ISEP", new AreaType("urban area"), 0.249, 0.261,
                new Local(41.178553, -8.608035, 111));
        GeographicArea validGeographicArea2 = new GeographicArea("Porto", new AreaType("city"), 3.30, 10.09,
                new Local(41.149935, -8.610857, 118));
        GeographicArea emptyGeographicArea = new GeographicArea("Lisbon", new AreaType("city"), 0.299, 0.291,
                new Local(41.178553, 8.608035, 117));
        validAreaSensor1 = new AreaSensor("RF12345", "Meteo station ISEP - rainfall", new SensorType("rain", "mm"),
                new Local(41.179230, -8.606409, 125),
                validDate1, 6008L);
        AreaSensor validAreaSensor2 = new AreaSensor("TT12346", "Meteo station ISEP - temperature", new SensorType("rain2", "mm2"),
                new Local(41.179230, -8.606409, 125),
                validDate2, 6008L);
        AreaSensor validAreaSensor3 = new AreaSensor("RF12334", "Meteo station CMP - rainfall", new SensorType("rain2", "mm2"),
                new Local(41.179230, -8.606409, 139),
                validDate3, 6008L);
        AreaSensor validAreaSensor4 = new AreaSensor("TT1236A", "Meteo station CMP - temperature", new SensorType("rain2", "mm2"),
                new Local(41.179230, -8.606409, 139),
                validDate4, 6008L);
        AreaSensorService validAreaSensorService = new AreaSensorService();
        AreaSensorService validAreaSensorService2 = new AreaSensorService();
        validAreaSensorService.add(validAreaSensor1);
        validAreaSensorService.add(validAreaSensor2);
        validAreaSensorService2.add(validAreaSensor3);
        validAreaSensorService2.add(validAreaSensor4);
        validGeographicArea.setSensorList(validAreaSensorService);
        validGeographicArea2.setSensorList(validAreaSensorService2);
        validGeographicAreaService = new GeographicAreaService(geographicAreaRepository);
        validGeographicAreaService2 = new GeographicAreaService(geographicAreaRepository);
        emptyGeographicAreaService = new GeographicAreaService(geographicAreaRepository);
        validGeographicAreaServiceNoSensors = new GeographicAreaService(geographicAreaRepository);
        validGeographicAreaServiceNoSensors.addGeographicArea(emptyGeographicArea);
        validGeographicAreaService.addGeographicArea(validGeographicArea);
        validGeographicAreaService.addGeographicArea(validGeographicArea2);
        validGeographicAreaService2.addGeographicArea(validGeographicArea);
    }

    private final InputStream systemIn = System.in;
    private final PrintStream systemOut = System.out;

    @BeforeEach
    void setUpOutput() {
        ByteArrayOutputStream testOut = new ByteArrayOutputStream();
        System.setOut(new PrintStream(testOut));
        logger.setLevel(Level.WARNING);
    }

    @AfterEach
    void restoreSystemInputOutput() {
        System.setIn(systemIn);
        System.setOut(systemOut);
    }

    @Test
    void seeIfParseAndLogReadingFailsWithInvalidDateFormat() {
        // Arrange

        String[] readings = new String[3];
        readings[0] = "RF12345";
        readings[1] = "invalid date";
        readings[2] = "23";

        // Act

        int actualResult = validReader.parseAndLogCSVReading(readings, logger);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfParseAndLogReadingsWorksLogNotLoggable() {

        //Arrange


        logger.setLevel(Level.INFO);
        String[] readings = new String[3];
        readings[0] = "RF12345";
        readings[1] = "2008-12-30T02:00:00+00:00";
        readings[2] = "test";

        // Act

        int actualResult = validReader.parseAndLogCSVReading(readings, logger);

        //Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfParseAndLogReadingFailsWithInvalidValue() {
        // Arrange


        String[] readings = new String[3];
        readings[0] = "RF12345";
        readings[1] = "2008-12-30T02:00:00+00:00";
        readings[2] = "invalid value";

        // Act

        int actualResult = validReader.parseAndLogCSVReading(readings, logger);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfReadReadingsFromCSVWorksWithEmptySensorList() {
        // Act

        int actualResult = validReader.readReadingsFromCSV(geographicAreaService, " ", " ");

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfReadReadingsFromCSVWorksWhenFileIsEmpty() {

        // Act

        int actualResult = validReader.readReadingsFromCSV(geographicAreaService, validCSVLocation3, validLogPath);

        // Assert

        assertEquals(0, actualResult);
    }

//    @Test
//    void seeIfReadReadingsFromCSVThrowsExceptionWithInvalidLogPath() {
//        // Assert
//
//        Assertions.assertThrows(IllegalArgumentException.class, () -> validReader.readReadingsFromCSV(geographicAreaService, validCSVLocation1, invalidLogPath));
//    }


    @Test
    void seeIfParseAndLogJSONReadingWorksWithInvalidDateFormat() {
        //Arrange

        JSONObject validJSONObj = new JSONObject();
        validJSONObj.put("id", "TT12346");
        validJSONObj.put("timestamp/date", "00:00+00:00");
        validJSONObj.put("value", "57.2");
        validJSONObj.put("unit", "F");


        // Act

        int actualResult = validReader.parseAndLogJSONReading(validJSONObj, logger);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfParseAndLogJSONReadingWorksWithInvalidValue() {
        //Arrange

        JSONObject validJSONObj = new JSONObject();
        validJSONObj.put("id", "TT12346");
        validJSONObj.put("timestamp/date", "2018-12-30T02:00:00+00:00");
        validJSONObj.put("value", "string");
        validJSONObj.put("unit", "F");


        // Act

        int actualResult = validReader.parseAndLogJSONReading(validJSONObj, logger);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfParseAndLogJSONReadingsWorksWithInvalidField() {

        //Arrange

        JSONObject validJSONObj1 = new JSONObject();
        validJSONObj1.put("id", "TT12346");
        validJSONObj1.put("timestamp/date", "2018-12-30T02:00:00+00:00");
        validJSONObj1.put("value", "invalidField");
        validJSONObj1.put("unit", "F");

        JSONArray validJSONArray = new JSONArray();
        validJSONArray.put(validJSONObj1);

        // Act

        int actualResult = validReader.parseAndLogJSONReadings(validJSONArray, logger);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfReadFileXMLGeoAreaWorksZeroAreas() {
        // Arrange

        GeographicAreaService actualResult = new GeographicAreaService(geographicAreaRepository);

        // Act

        File fileToRead = new File("src/test/resources/readingsFiles/test1XMLReadings.xml");
        String absolutePath = fileToRead.getAbsolutePath();
        double areasAdded = validReaderXMLGeoArea.readFileXMLAndAddAreas(absolutePath, actualResult, areaSensorService,readingService,houseService);

        // Assert

        assertEquals(0, areasAdded);
    }


    @Test
    void seeIfReadFileXMLGeoAreaWorksWithoutGeoAreas() {
        // Arrange
        GeographicAreaService actualResult = new GeographicAreaService(geographicAreaRepository);

        // Act

        File fileToRead = new File("src/test/resources/geoAreaFiles/DataSet_sprint05_GA_test_no_GAs.xml");
        String absolutePath = fileToRead.getAbsolutePath();
        double areasAdded = validReaderXMLGeoArea.readFileXMLAndAddAreas(absolutePath, actualResult, areaSensorService, readingService,houseService);

        // Assert

        assertEquals(0, areasAdded);
    }

    @Test
    void seeIfAcceptPathWorksXML() {
        String input = "src/test/resources/geoAreaFiles/DataSet_sprint05_GA_test_no_GAs.xml";
        File fileToRead = new File(input);
        String absolutePath = fileToRead.getAbsolutePath();
        int result = validReader.acceptPath(absolutePath, geographicAreaService);
        assertEquals(result, 0);
    }

    @Test
    void seeIfAcceptPathWorksWrongPath() {
        String input = "src/test/resources/wrong_path";
        File fileToRead = new File(input);
        String absolutePath = fileToRead.getAbsolutePath();
        int result = validReader.acceptPath(absolutePath, geographicAreaService);
        assertEquals(result, -1);
    }

    @Test
    void seeIfAcceptPathWorksJSON() {
        // Arrange

        String input = "src/test/resources/geoAreaFiles/DataSet_sprint04_GA.json";
        File fileToRead = new File(input);
        String absolutePath = fileToRead.getAbsolutePath();
        GeographicAreaService geographicAreaList1 = new GeographicAreaService(geographicAreaRepository);
        ReaderController readerController = new ReaderController(areaSensorService, readingService, houseService);

        // Act

        int result = readerController.acceptPath(absolutePath, geographicAreaList1);

        // Assert

        assertEquals(result, 2);
    }

    @Test
    void seeIfParseAndLogReadingWorksWithExtraParameter() {
        // Arrange


        String[] readings = new String[4];
        readings[0] = "RF12345";
        readings[1] = "2019-12-30T02:00:00+00:00";
        readings[2] = "23";
        readings[3] = "12";

        // Act

        int actualResult = validReader.parseAndLogCSVReading(readings, logger);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfParseAndLogReadingFailsWithWrongSensor() {
        // Arrange


        String[] readings = new String[4];
        readings[0] = "wrong sensor";
        readings[1] = "2019-12-30T02:00:00+00:00";
        readings[2] = "23";
        readings[3] = "C";

        // Act

        int actualResult = validReader.parseAndLogCSVReading(readings, logger);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfParseAndLogReadingFailsWithRepeatedReading() {
        // Arrange
        Date validDate = new Date();
        SimpleDateFormat validSdf2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'+00:00'");
        try {
            validDate = validSdf2.parse("2019-12-30T02:00:00+00:00");
        } catch (ParseException c) {
            c.printStackTrace();
        }


        String[] readings = new String[4];
        readings[0] = "RF12345";
        readings[1] = "2019-12-30T02:00:00+00:00";
        readings[2] = "23";
        readings[3] = "C";

        validAreaSensor1.addReading(new Reading(32, validDate, "C", validAreaSensor1.getId()));

        // Act

        int actualResult = validReader.parseAndLogCSVReading(readings, logger);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfParseAndLogReadingFailsWithEmptySensorList() {
        // Arrange
        String[] readings = new String[4];
        readings[0] = "RF12345";
        readings[1] = "2019-12-30T02:00:00+00:00";
        readings[2] = "23";
        readings[3] = "C";

        // Act

        int actualResult = validReader.parseAndLogCSVReading(readings, logger);

        // Assert

        assertEquals(0, actualResult);
    }


    @Test
    void seeIfParseAndLogJSONReadingWorksWithInvalidSensorID() {
        //Arrange

        JSONObject validJSONObj = new JSONObject();
        validJSONObj.put("id", "xxxx");
        validJSONObj.put("timestamp/date", "2018-12-30T02:00:00+00:00");
        validJSONObj.put("value", "23.3");
        validJSONObj.put("unit", "F");


        // Act

        int actualResult = validReader.parseAndLogJSONReading(validJSONObj, logger);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfParseAndLogJSONReadingWorksWithInvalidLogger() {

        //Arrange

        JSONObject validJSONObj = new JSONObject();
        validJSONObj.put("id", "xxxx");
        validJSONObj.put("timestamp/date", "2018-12-30T02:00:00+00:00");
        validJSONObj.put("value", "23.3");
        validJSONObj.put("unit", "F");

        logger.setLevel(Level.INFO);

        // Act

        int actualResult = validReader.parseAndLogJSONReading(validJSONObj, logger);

        // Assert

        assertEquals(0, actualResult);
    }


    @Test
    void seeIfReadReadingsFromJSONWorksWithEmptySensorList() {
        // Act

        int actualResult = validReader.readReadingsFromJSON(geographicAreaService, validJSONLocation1, validLogPath);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfReadReadingsFromJSONWorksWhenFileHasNoReadings() {

        // Act

        int actualResult = validReader.readReadingsFromJSON(geographicAreaService, validJSONLocation1, validLogPath);

        // Assert

        assertEquals(0, actualResult);
    }


    @Test
    void seeIfReadReadingsFromJSONWorksWhenInputValuesAreWrong() {

        // Act

        int actualResult = validReader.readReadingsFromJSON(geographicAreaService, validJSONLocation4, validLogPath);

        // Assert

        assertEquals(0, actualResult);
    }


    @Test
    void seeIfReadReadingsFromXMLWorksWhenSensorListIsEmpty() {
        // Act
        int actualResult = validReader.readReadingsFromXML(geographicAreaService, validXMLocation1, validLogPath);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfReadReadingsFromXMLWorksWhenFileHasNoReadings() {
        // Act

        int actualResult = validReader.readReadingsFromXML(geographicAreaService, validXMLocation1, validLogPath);

        // Assert

        assertEquals(0, actualResult);
    }


    @Test
    void seeIfReadReadingsFromXMLWorksWhenInputValuesAreWrong() {
        // Act

        int actualResult = validReader.readReadingsFromXML(geographicAreaService, validXMLocation4, validLogPath);

        // Assert

        assertEquals(0, actualResult);
    }

    @Test
    void seeIfReadReadingsFromXMLWorksWhenFileHasNoElements() {
        // Act

        int actualResult = validReader.readReadingsFromXML(geographicAreaService, validXMLocation5, validLogPath);

        // Assert

        assertEquals(0, actualResult);
    }


    @Test
    void seeIfAddReadingToMatchingSensorWorksWhenLoggerAndReadingAreInvalid() {
        //Arrange

        logger.setLevel(Level.SEVERE);

        //Act

        int actualResult = validReader.addReadingToMatchingAreaSensor(logger, "xxxx", 20D, validDate1, "C");

        // Assert

        assertEquals(actualResult, 0);
    }


    @Test
    void seeIfAddReadingToMatchingSensorWorksWhenLoggerIsInvalidAndReadingAreValid() {
        //Arrange

        logger.setLevel(Level.SEVERE);

        //Act

        int actualResult = validReader.addReadingToMatchingAreaSensor(logger, "TT12346", 20D, validDate1, "C");

        // Assert

        assertEquals(actualResult, 0);
    }

    @Test
    void seeIfAddReadingToMatchingSensorWorksWhenLoggerIsValidAndReadingAreInvalid() {
        //Act

        int actualResult = validReader.addReadingToMatchingAreaSensor(logger, "xxxx", 20D, validDate1, "C");

        // Assert

        assertEquals(actualResult, 0);
    }

    @Test
    void seeIfReadFileWorks() {
        //Arrange
        List<GeographicAreaDTO> expectedResult = new ArrayList<>();

        GeographicAreaDTO geographicAreaDTO = new GeographicAreaDTO();
        geographicAreaDTO.setName("ISEP");
        LocalDTO localDTO = new LocalDTO(41.178553,-8.608035,111);
        geographicAreaDTO.setLocalDTO(localDTO);
        geographicAreaDTO.setDescription("Campus do ISEP");
        geographicAreaDTO.setWidth(0.261);
        geographicAreaDTO.setLength(0.249);
        geographicAreaDTO.setAreaSensorDTOList(null);
        geographicAreaDTO.setTypeArea("urban area");

        expectedResult.add(geographicAreaDTO);

        //Act

        List<GeographicAreaDTO> actualResult = validReader.readFileJSONGeoAreas("src/test/resources/geoAreaFiles/DataSet_sprint04_GA_TEST_ONLY_ONE_GA.json");

        //Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfReadFileXMLGeoAreaWorks() {
        // Arrange

        GeographicAreaService actualResult = new GeographicAreaService(geographicAreaRepository);

        // Act

        File fileToRead = new File("src/test/resources/geoAreaFiles/DataSet_sprint05_GA.xml");
        String absolutePath = fileToRead.getAbsolutePath();
        double areasAdded = validReaderXMLGeoArea.readFileXMLAndAddAreas(absolutePath, actualResult, areaSensorService, readingService, houseService);

        // Assert

        assertEquals(2, areasAdded);

        // Get one of the areas to  check its contents.
//
//        GeographicArea actualArea = actualResult.getAll().get(0);
//        AreaSensorService firstAreaSensors = actualArea.getSensorList();
//
//        // Declare expected area / sensors.
//
//        AreaSensorService expectedSensors = new AreaSensorService();
//        expectedSensors.add(actualArea.getSensorList().get(0));
//        expectedSensors.add(actualArea.getSensorList().get(1));
//
//        GeographicArea expectedArea = new GeographicArea("ISEP", new AreaType("urban area"), 0.249,
//                0.261, new Local(41.178553, -8.608035, 139));
//
//        // Assert
//
//        assertEquals(expectedArea, actualArea);
//        assertEquals(expectedSensors, firstAreaSensors);
    }


    @Test
    void seeIfReadFileXMLGeoAreaWorksWithAnotherDateFormat() {
        // Arrange

        GeographicAreaService geographicAreaList3 = new GeographicAreaService(geographicAreaRepository);

        // Act

        File fileToRead = new File("src/test/resources/geoAreaFiles/DataSet_sprint05_GA_test_wrong_date.xml");
        String absolutePath = fileToRead.getAbsolutePath();
        double areasAdded = validReaderXMLGeoArea.readFileXMLAndAddAreas(absolutePath, geographicAreaList3, areaSensorService, readingService, houseService);

        // Assert

        assertEquals(2, areasAdded);

        // Get one of the areas to  check its contents.

    //    GeographicArea actualArea = geographicAreaList3.getAll().get(0);
    //    AreaSensorService firstAreaSensors = actualArea.getSensorList();

        // Declare expected area / sensors.

    //    AreaSensorService expectedSensors = new AreaSensorService();
     //   expectedSensors.add(actualArea.getSensorList().get(0));
     //   expectedSensors.add(actualArea.getSensorList().get(1));

     //   GeographicArea expectedArea = new GeographicArea("ISEP", new AreaType("urban area"), 0.249,
     //           0.261, new Local(41.178553, -8.608035, 139));

        // Assert

     //   assertEquals(expectedArea, actualArea);
     //   assertEquals(expectedSensors, firstAreaSensors);
    }

    @Test
    void seeIfReadFileXMLGeoAreaWorksWithNormalDateAndOtherDate() {
        // Arrange
        // Act

        File fileToRead = new File("src/test/resources/geoAreaFiles/DataSet_sprint05_GA_test_wrong_date.xml");
        String absolutePath = fileToRead.getAbsolutePath();
        double areasAdded = validReaderXMLGeoArea.readFileXMLAndAddAreas(absolutePath, geographicAreaService, areaSensorService, readingService, houseService);

        // Assert

        assertEquals(2, areasAdded);

    }

    @Test
    void seeIfReadFileXMLGeoAreaWorksWithOneGeoArea() {
        // Arrange

        GeographicAreaService actualResult = new GeographicAreaService(geographicAreaRepository);

        // Act

        File fileToRead = new File("src/test/resources/geoAreaFiles/DataSet_sprint05_GA_test_one_GA.xml");
        String absolutePath = fileToRead.getAbsolutePath();
        double areasAdded = validReaderXMLGeoArea.readFileXMLAndAddAreas(absolutePath, actualResult, areaSensorService, readingService, houseService);

        // Assert

        assertEquals(1, areasAdded);
    }


    @Test
    void seeIfReadFileWorksWithOneGA() {
        //Arrange
        List<GeographicAreaDTO> expectedResult = new ArrayList<>();

        GeographicAreaDTO geographicAreaDTO = new GeographicAreaDTO();
        geographicAreaDTO.setName("ISEP");
        LocalDTO localDTO = new LocalDTO(41.178553, -8.608035, 111);
        geographicAreaDTO.setLocalDTO(localDTO);
        geographicAreaDTO.setDescription("Campus do ISEP");
        geographicAreaDTO.setWidth(0.261);
        geographicAreaDTO.setLength(0.249);
        geographicAreaDTO.setTypeArea("urban area");

        expectedResult.add(geographicAreaDTO);

        //Act

        List<GeographicAreaDTO> actualResult = validReader.readFileJSONGeoAreas("src/test/resources/geoAreaFiles/DataSet_sprint04_GA_TEST_ONLY_ONE_GA.json");

        //Assert

        assertEquals(expectedResult, actualResult);
    }
    @Test
    void seeIfReadFileWorksWithOneGAAndOneSensor() {
        //Arrange
        List<GeographicAreaDTO> expectedResult = new ArrayList<>();

        GeographicAreaDTO geographicAreaDTO = new GeographicAreaDTO();
        geographicAreaDTO.setName("ISEP");
        LocalDTO localDTO = new LocalDTO(41.178553, -8.608035, 111);
        geographicAreaDTO.setLocalDTO(localDTO);
        geographicAreaDTO.setDescription("Campus do ISEP");
        geographicAreaDTO.setWidth(0.261);
        geographicAreaDTO.setLength(0.249);
        geographicAreaDTO.setTypeArea("urban area");

        expectedResult.add(geographicAreaDTO);

        AreaSensorDTO areaSensorDTO = new AreaSensorDTO();
        LocalDTO localSensorDTO = new LocalDTO(41.179230, -8.606409, 125);
        areaSensorDTO.setLocalDTO(localSensorDTO);
        areaSensorDTO.setUnits("l/m2");
        areaSensorDTO.setDateStartedFunctioning("2016-11-15");
        areaSensorDTO.setTypeSensor("rainfall");
        areaSensorDTO.setName("Meteo station ISEP - rainfall");
        areaSensorDTO.setId("RF12345");


        //Act

        List<GeographicAreaDTO> actualResult = validReader.readFileJSONGeoAreas("src/test/resources/geoAreaFiles/DataSet_sprint04_GA_TEST_ONLY_ONE_GA.json");

        //Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void addReadingsToGeographicAreaSensorsWorks() { //TODO TERESA revisitar este teste
        //Arrange
        List<ReadingDTO> readingDTOS = new ArrayList<>();

        ReadingDTO readingDTO1 = new ReadingDTO();
        readingDTO1.setSensorId("TT");
        readingDTO1.setUnit("C");
        readingDTO1.setValue(2D);
        readingDTO1.setDate(validDate1);

        ReadingDTO readingDTO2 = new ReadingDTO();
        readingDTO2.setSensorId("TT");
        readingDTO2.setUnit("C");
        readingDTO2.setValue(2D);
        readingDTO2.setDate(validDate3);

        readingDTOS.add(readingDTO1);
        readingDTOS.add(readingDTO2);

        AreaSensor sensor = new AreaSensor("TT", "Sensor", new SensorType(), new Local(2,2,2), validDate1,2L);

        Mockito.when(areaSensorRepository.findById("TT")).thenReturn(Optional.of(sensor));
        Mockito.when(readingRepository.findReadingByDateEqualsAndSensorId(validDate1, "TT")).thenReturn((null));

        //Act

        int actualResult = validReader.addReadingsToGeographicAreaSensors(readingDTOS, validLogPath);

        //Assert

        assertEquals(2, actualResult);
    }

    @Test
    void seeIfReadFileWorksWithTwoGA() {

    }
}
