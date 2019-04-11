package pt.ipp.isep.dei.project.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pt.ipp.isep.dei.project.dto.AreaSensorDTO;
import pt.ipp.isep.dei.project.dto.GeographicAreaDTO;
import pt.ipp.isep.dei.project.dto.LocalDTO;
import pt.ipp.isep.dei.project.dto.mappers.AreaSensorMapper;
import pt.ipp.isep.dei.project.dto.mappers.GeographicAreaMapper;
import pt.ipp.isep.dei.project.dto.mappers.LocalMapper;
import pt.ipp.isep.dei.project.dto.mappers.TypeAreaMapper;
import pt.ipp.isep.dei.project.model.*;
import pt.ipp.isep.dei.project.model.sensor.AreaSensor;
import pt.ipp.isep.dei.project.model.sensor.AreaSensorService;
import pt.ipp.isep.dei.project.model.sensor.SensorType;
import pt.ipp.isep.dei.project.repository.AreaSensorRepository;
import pt.ipp.isep.dei.project.repository.AreaTypeRepository;
import pt.ipp.isep.dei.project.repository.GeographicAreaRepository;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * GASettingsController tests class.
 */
@ExtendWith(MockitoExtension.class)
class GASettingsControllerTest {
    private GASettingsController controller = new GASettingsController();
    private GeographicArea firstValidArea;
    private GeographicArea secondValidArea;
    private AreaType typeCountry;
    private AreaType typeCity;
    private GeographicAreaDTO validGeographicAreaDTO;
    private AreaSensorDTO validAreaSensorDTO1;
    private AreaSensorDTO validAreaSensorDTO2;
    private AreaSensor validAreaSensor1;
    private AreaSensor validAreaSensor2;
    private GeographicAreaService validGeographicAreaService;
    private AreaSensorService validAreaSensorService;
    private AreaTypeService validAreaTypeService;
    private Date date; // Wed Nov 21 05:12:00 WET 2018
    private AreaSensorService areaSensorService;

    @Mock
    private GeographicAreaRepository geographicAreaRepository;

    @Mock
    AreaTypeRepository areaTypeRepository;

    @Mock
    AreaSensorRepository areaSensorRepository;

    @BeforeEach
    void arrangeArtifacts() {

        SimpleDateFormat day = new SimpleDateFormat("dd-MM-yyyy");
        try {
            date = day.parse("12-12-2018");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        validAreaTypeService = new AreaTypeService(areaTypeRepository);
        validAreaSensorService = new AreaSensorService(areaSensorRepository);
        typeCountry = new AreaType("Country");
        typeCity = new AreaType("City");
        firstValidArea = new GeographicArea("Portugal", typeCountry,
                2, 5, new Local(21, 33, 5));
        firstValidArea.setId(new Long(01));
        secondValidArea = new GeographicArea("Portugal", typeCity,
                2, 5, new Local(21, 33, 5));
        secondValidArea.setId(new Long(02));
        validAreaSensor1 = new AreaSensor("RF12345", "SensOne", new SensorType("Temperature", "Celsius"),
                new Local(31, 15, 3), date, new Long(01));
        validAreaSensor2 = new AreaSensor("TT12345", "SensTwo", new SensorType("Temperature", "Celsius"),
                new Local(21, 65, 3), date, new Long(02));
        firstValidArea.addSensor(validAreaSensor1);
        validGeographicAreaDTO = GeographicAreaMapper.objectToDTO(firstValidArea);
        validAreaSensorDTO1 = AreaSensorMapper.objectToDTO(validAreaSensor1);
        validAreaSensorDTO2 = AreaSensorMapper.objectToDTO(validAreaSensor2);

        validGeographicAreaService = new GeographicAreaService(geographicAreaRepository);
        validGeographicAreaService.addAndPersistGA(firstValidArea);
        validGeographicAreaService.addAndPersistGA(secondValidArea);

        areaSensorService = new AreaSensorService(areaSensorRepository);
    }

    @Test
    void seeIfPrintGATypeListWorks() {
        // Arrange

        List<AreaType> areaTypes = new ArrayList<>();
        areaTypes.add(typeCountry);
        areaTypes.add(typeCity);

        typeCountry.setId(0);
        typeCity.setId(1);

        Mockito.when(areaTypeRepository.findAll()).thenReturn(areaTypes);

        String expectedResult = "---------------\n" +
                "0) Name: Country \n" +
                "1) Name: City \n" +
                "---------------\n";

        // Act

        String actualResult = controller.buildGATypeListString(validAreaTypeService);


        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfPrintGATypeListWorksIfListIsEmpty() {
        // Arrange

        String expectedResult = "Invalid List - List is Empty\n";

        // Act

        String actualResult = controller.buildGATypeListString(validAreaTypeService);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfMatchGAByTypeAreaWorks() {
        // Arrange

        List<GeographicArea> expectedResult = new ArrayList<>();
        expectedResult.add(secondValidArea);
        GeographicAreaService service = new GeographicAreaService(geographicAreaRepository);
        service.addGeographicArea(secondValidArea);

        Mockito.when(geographicAreaRepository.findAll()).thenReturn(expectedResult);

        // Act

        List<GeographicArea> actualResult = controller.matchGAByTypeArea(service, TypeAreaMapper.objectToDTO(typeCity));

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfGetTypeAreaName() {

        // Arrange

        String expectedResult = "City";

        // Act

        String actualResult = controller.getTypeAreaName(TypeAreaMapper.objectToDTO(typeCity));

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    //USER STORY 001 TESTS

    @Test
    void seeIfCreateTypeAreaWorksEmptyList() {
        // Act

        boolean result = controller.createAndAddTypeAreaToList(validAreaTypeService, "City");

        // Assert

        assertTrue(result);
    }


    @Test
    void seeIfNewTAGDoesNotWorkWhenDuplicatedISAdded() {
        // Arrange

        List<AreaType> areaTypes = new ArrayList<>();
        areaTypes.add(typeCountry);
        areaTypes.add(typeCity);

        // Act

        boolean result = controller.createAndAddTypeAreaToList(validAreaTypeService, "Country");

        // Assert

        assertTrue(result);
    }

    //USER STORY 002 TESTS

    @Test
    void seeIfPrintTypeAreaListWorks() {
        // Arrange

        List<AreaType> areaTypes = new ArrayList<>();
        areaTypes.add(typeCountry);

        typeCountry.setId(0);

        String expectedResult = "---------------\n" +
                "0) Name: Country \n" +
                "---------------\n";
        Mockito.when(areaTypeRepository.findAll()).thenReturn(areaTypes);

        // Act

        String actualResult = controller.getTypeAreaList(validAreaTypeService);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfPrintTypeAreaListWorksWithTwoTypes() {
        // Arrange

        List<AreaType> areaTypes = new ArrayList<>();
        areaTypes.add(typeCountry);
        areaTypes.add(typeCity);

        typeCountry.setId(0);
        typeCity.setId(1);

        Mockito.when(areaTypeRepository.findAll()).thenReturn(areaTypes);

        String expectedResult = "---------------\n" +
                "0) Name: Country \n" +
                "1) Name: City \n" +
                "---------------\n";

        // Act

        String actualResult = controller.getTypeAreaList(validAreaTypeService);

        // Assert

        assertEquals(expectedResult, actualResult);
    }


    //USER STORY 003 TESTS

    @Test
    void seeIfCreatesGeographicAreaAndAddsItToList() {
        // Act

        boolean result = controller.addNewGeoAreaToList(validGeographicAreaService, validGeographicAreaDTO,
                LocalMapper.objectToDTO(firstValidArea.getLocal()));

        // Assert

        assertTrue(result);
    }

    //USER STORY 004 TESTS

    @Test
    void seeIfMatchGAByTypeCountry() {
        // Arrange

        GeographicAreaService gaL1 = new GeographicAreaService(geographicAreaRepository);
        gaL1.addGeographicArea(firstValidArea);
        gaL1.addGeographicArea(secondValidArea);
        GeographicAreaService expectedResult = new GeographicAreaService(geographicAreaRepository);
        expectedResult.addGeographicArea(firstValidArea);

        // Act

        List<GeographicArea> actualResult = controller.matchGAByTypeArea(gaL1, TypeAreaMapper.objectToDTO(typeCountry));

        // Assert

        assertEquals(expectedResult.size(), actualResult.size());
    }

    @Test
    void seeMatchGAByTypeNotInList() {
        // Arrange

        GeographicAreaService gaL1 = new GeographicAreaService(geographicAreaRepository);
        gaL1.addGeographicArea(firstValidArea);

        List<GeographicArea> expectedResult = new ArrayList<>();

        // Act

        List<GeographicArea> actualResult = controller.matchGAByTypeArea(gaL1, TypeAreaMapper.objectToDTO(typeCity));

        // Assert

        assertEquals(expectedResult.size(), actualResult.size());
    }

    @Test
    void getTypeAreaName() {
        // Arrange

        String expectedResult = "City";
        String actualResult;

        // Act

        actualResult = controller.getTypeAreaName(TypeAreaMapper.objectToDTO(typeCity));

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfDeactivateSensor() {
        // Act

        boolean actualResult = controller.deactivateSensor(validAreaSensorDTO1, areaSensorService);

        // Assert

        assertTrue(actualResult);
    }

    @Test
    void seeIfDeactivateSensorWhenSecondInList() {
        // Act

        boolean actualResult = controller.deactivateSensor(validAreaSensorDTO2, areaSensorService);

        // Assert

        assertTrue(actualResult);
    }

    @Test
    void seeIfDeactivatedSensorDoesntChange() {
        // Arrange

        validAreaSensor1.deactivateSensor();
        AreaSensorDTO areaSensorDTO = AreaSensorMapper.objectToDTO(validAreaSensor1);

        // Act

        boolean actualResult = controller.deactivateSensor(areaSensorDTO, areaSensorService);

        // Assert

        assertFalse(actualResult);
    }


    @Test
    void seeIfPrintGAList() {
        // Arrange

        List<GeographicArea> list = new ArrayList<>();
        list.add(secondValidArea);
        secondValidArea.setId(new Long(0));
        String expectedResult = "---------------\n" +
                "0) Name: Portugal | Type: City | Latitude: 21.0 | Longitude: 33.0\n" +
                "---------------\n";

        // Act

        String result = controller.buildGAListString(validGeographicAreaService, list);

        // Assert

        assertEquals(expectedResult, result);
    }

    @Test
    void seeIfSetMotherAreaWorks() {
        // Act

        boolean actualResult = controller.setMotherArea(firstValidArea, secondValidArea);

        // Assert

        assertTrue(actualResult);
    }

    @Test
    void seeIfSetMotherAreaBreaks() {
        // Act

        boolean actualResult = controller.setMotherArea(firstValidArea, null);

        // Assert

        assertFalse(actualResult);
    }

//USER STORY 008 Tests

    @Test
    void seeIfItsContained() {
        // Arrange

        firstValidArea.setMotherArea(secondValidArea);

        // Act

        boolean actualResult = controller.isAreaContained(secondValidArea, firstValidArea);

        // Assert

        assertTrue(actualResult);
    }

    @Test
    void seeIfIndirectlyContained() {
        // Arrange

        GeographicArea grandDaughterGA = new GeographicArea("Porto", new AreaType("Country"),
                2, 4, new Local(21, 33, 5));
        grandDaughterGA.setMotherArea(secondValidArea);
        secondValidArea.setMotherArea(firstValidArea);

        // Act

        boolean actualResult = controller.isAreaContained(firstValidArea, grandDaughterGA);

        // Assert

        assertTrue(actualResult);
    }

    @Test
    void seeIfNotContained() {
        // Arrange

        GeographicArea grandDaughterGA = new GeographicArea("Oporto", new AreaType("Country"), 2, 4, new Local(21, 33, 5));
        grandDaughterGA.setMotherArea(secondValidArea);
        secondValidArea.setMotherArea(firstValidArea);

        // Act

        boolean actualResult = controller.isAreaContained(grandDaughterGA, firstValidArea);

        // Assert

        assertFalse(actualResult);
    }

    @Test
    void seeGAId() {
        // Act

        String actualResult = controller.getGeographicAreaId(firstValidArea);

        // Assert

        assertEquals(actualResult, "Portugal");
    }

    @Test
    void seeIfCreateGeoAreaDTO() {
        // Arrange

        GeographicAreaDTO expectedResult = new GeographicAreaDTO();
        LocalDTO localDTO = new LocalDTO();
        expectedResult.setName("Joana");
        expectedResult.setLocalDTO(localDTO);
        localDTO.setLatitude(12);
        localDTO.setLongitude(13);
        localDTO.setAltitude(13);
        expectedResult.setTypeArea(typeCity.getName());

        // Act

        GeographicAreaDTO result = controller.createGeoAreaDTO("Joana", TypeAreaMapper.objectToDTO(typeCity),
                controller.createLocalDTO(12, 13, 13), 12, 13);

        // Assert

        assertEquals(expectedResult, result);
    }

    @Test
    void seeIfCreateLocalDTO() {
        // Arrange

        LocalDTO result = controller.createLocalDTO(12, 13, 14);

        // Act

        assertTrue(result instanceof LocalDTO);
    }


    @Test
    void seeIfInputAreaWorks() {
        // Arrange

        GeographicAreaDTO expectedResult = validGeographicAreaDTO;
        geographicAreaRepository.save(firstValidArea);

        // Act

        Mockito.when(geographicAreaRepository.findById(firstValidArea.getId())).thenReturn(Optional.of(firstValidArea));
        InputStream in = new ByteArrayInputStream(firstValidArea.getId().toString().getBytes());
        System.setIn(in);
        GeographicAreaDTO actualResult = controller.inputArea(validGeographicAreaService);

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfInputSensorWorks() {
        // Arrange

        AreaSensorDTO expectedResult = validAreaSensorDTO1;
        areaSensorRepository.save(validAreaSensor1);

        // Act

        Mockito.when(areaSensorRepository.findById(validAreaSensor1.getId())).thenReturn(Optional.of(validAreaSensor1));
        InputStream in = new ByteArrayInputStream(validAreaSensor1.getId().getBytes());
        System.setIn(in);
        AreaSensorDTO actualResult = controller.inputSensor(validGeographicAreaDTO, areaSensorService);


        // Assert

        assertEquals(expectedResult, actualResult);
    }

   @Test
   void seeIfRemoveSensorWorks() {
       // Arrange

       List<AreaSensor> expectedResult = new ArrayList<>();

       // Act

       controller.removeSensor(validAreaSensorDTO1, validAreaSensorService);
       List<AreaSensor> actualResult = areaSensorRepository.findAll();

       // Assert

       assertEquals(expectedResult.size(), actualResult.size());
   }


    @Test
    void seeIfAddNewGeoAreaToListWorksAlreadyThere() {
        // Act

        boolean result = controller.addNewGeoAreaToList(validGeographicAreaService, validGeographicAreaDTO, LocalMapper.objectToDTO(new Local(21, 33, 5)));

        // Assert

        assertTrue(result);
    }

}