package pt.ipp.isep.dei.project.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;
import pt.ipp.isep.dei.project.io.ui.MainUI;
import pt.ipp.isep.dei.project.repository.TypeAreaRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

/**
 * TypeAreaList tests class.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@DataJpaTest
@ContextConfiguration(classes = {MainUI.class },
        loader = AnnotationConfigContextLoader.class)
class TypeAreaListTest {
    // Common testing artifacts for this class.

    private List<TypeArea> validTypes;
    private TypeArea firstValidType;
    private TypeArea secondValidType;

    @Autowired
    TypeAreaRepository typeAreaRepository;

    @Autowired
    private TypeAreaList validList;

    @BeforeEach
    void arrangeArtifacts() {
        validTypes = validList.getTypeAreas();
        firstValidType = new TypeArea("Country");
        secondValidType = new TypeArea("City");
        validList.addTypeArea(firstValidType);
        validList.addTypeArea(secondValidType);
    }

    @Test
    void seeIfCreateTypeAreaWorks() {
        // Act
        TypeArea type1 = validList.createTypeArea("Country");
        // Assert
        assertEquals(type1, firstValidType);
    }

    @Test
    void seeIfGetAllAsStringWorks() {
        // Arrange
        String expectedResult = "---------------\n" +
                "1) Name: Country \n" +
                "2) Name: City \n" +
                "---------------\n";
        // Act
        String actualResult = validList.getAllAsString();
        // Assert
        assertEquals(actualResult, expectedResult);
    }


    @Test
    void seeIfGetSizeRepository() {
        // Arrange
        int expectedResult = 2;
        // Act
        int actualResult = validList.getSizeRepository();
        // Assert
        assertEquals(actualResult, expectedResult);
    }

    //TODO This test works on intellij and Maven, but not on Sonarqube

    /*
    @Test
    void seeIfGetTypeAreaByIdRepository() {
        // Arrange
        TypeArea expectedResult = firstValidType;
        // Act
        TypeArea actualResult = validList.getTypeAreaByIdRepository(1);
        // Assert
        assertEquals(actualResult, expectedResult);
    }
    */

    @Test
    void seeIfPrintGAWholeList() {
        // Arrange

        String expectedResult = "---------------\n" +
                "0) Description: Country \n" +
                "1) Description: City \n" +
                "---------------\n";

        // Act

        String actualResult = validList.buildString();

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfBuildListIfEmpty() {
        // Arrange
        TypeAreaList emptyList = new TypeAreaList();
        String expectedResult = "Invalid List - List is Empty\n";

        // Act

        String actualResult = emptyList.buildString();

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfIsEmptyWorks() {
        // Arrange

        TypeAreaList emptyList = new TypeAreaList(); // List is Empty.
        List<TypeArea> oneElementList = new ArrayList<>(); // List has one element.
        emptyList.setTypeAreaRepository(typeAreaRepository);
        oneElementList.add(firstValidType);

        // Act

        boolean actualResult1 = emptyList.isEmpty();
        boolean actualResult2 = oneElementList.isEmpty();
        boolean actualResult3 = validList.isEmpty();

        //Assert

        assertTrue(actualResult1);
        assertFalse(actualResult2);
        assertFalse(actualResult3);
    }

    @Test
    void seeIfEqualsWorksTrue() {
        // Assert

        List<TypeArea> testList = new ArrayList<>();
        testList.add(firstValidType);
        testList.add(secondValidType);

        // Act

        boolean actualResult = validTypes.equals(testList);

        // Assert

        assertTrue(actualResult);
    }

    @Test
    void seeIfEqualsWorksFalse() {
        // Arrange

        List<TypeArea> testList = new ArrayList<>();
        testList.add(secondValidType);

        // Act

        boolean actualResult = validList.equals(testList);

        // Assert

        assertFalse(actualResult);
    }

    @Test
    void seeIfEqualsWorksNotAnInstance() {
        // Act

        boolean actualResult = validList.equals(new RoomList()); // Needed for sonarqube testing purposes.

        // Assert

        assertFalse(actualResult);
    }

    @Test
    void seeIfEqualsWorksForItself() {
        // Act

        boolean actualResult = validList.equals(validList); // Needed for sonarqube testing purposes.

        // Assert

        assertTrue(actualResult);
    }

    @Test
    void hashCodeDummyTest() {
        //Arrange

        int expectedResult = 1;

        // Act

        int actualResult = validList.hashCode();

        // Assert

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void seeIfGetTypeAreaByIndexWorks() {
        //Act

        TypeArea actualResult1 = validList.get(0);
        TypeArea actualResult2 = validList.get(1);

        //Assert

        assertEquals(firstValidType, actualResult1);
        assertEquals(secondValidType, actualResult2);
    }

    @Test
    void getByIndexEmptyTypeAreaList() {
        // Arrange

        TypeAreaList emptyList = new TypeAreaList();

        // Act

        Throwable exception = assertThrows(IndexOutOfBoundsException.class, () -> emptyList.get(0));

        // Assert

        assertEquals("The type area list is empty.", exception.getMessage());
    }

    @Test
    void seeIfGetElementsAsArrayWorks() {
        // Arrange

        TypeArea[] expectedResult1 = new TypeArea[0];
        TypeArea[] expectedResult2 = new TypeArea[1];
        TypeArea[] expectedResult3 = new TypeArea[2];

        TypeAreaList emptyList = new TypeAreaList();
        List<TypeArea> oneTypeArea = new ArrayList<>();

        oneTypeArea.add(new TypeArea("typeArea1"));

        expectedResult2[0] = new TypeArea("typeArea1");
        expectedResult3[0] = firstValidType;
        expectedResult3[1] = secondValidType;

        //Act

        TypeArea[] actualResult1 = emptyList.getElementsAsArray();
        TypeArea[] actualResult3 = validList.getElementsAsArray();

        //Assert

        assertArrayEquals(expectedResult1, actualResult1);
        assertArrayEquals(expectedResult3, actualResult3);
    }

    @Test
    void seeIfGetSizeWorks() {
        // Arrange

        TypeAreaList emptyList = new TypeAreaList();

        // Act

        int actualResult1 = emptyList.size();
        int actualResult2 = validList.size();


        // Assert

        assertEquals(0, actualResult1);
        assertEquals(2, actualResult2);
    }

    @Test
    void seeIfEqualsWorks() {
        // Arrange

        validList.addTypeArea(firstValidType);

        // Act

        boolean actualResult = validList.equals(validList);

        // Assert

        assertTrue(actualResult);
    }
/*
    @Test
    void seeIfEqualsWorksFalse() {
        // Arrange

        TypeSensorList testList = new TypeSensorList();
        testList.add(firstTypeSensor);
        testList.add(secondTypeSensor);

        // Act

        boolean actualResult = testList.equals(validList);

        // Assert

        assertFalse(actualResult);
    }

    @Test
    void seeIfEqualsWorksNotAnInstanceOf() {
        //Act

        boolean actualResult = validList.equals(new RoomList()); // Needed for Sonarqube testing purposes.

        // Assert

        assertFalse(actualResult);
    }

    @Test
    void seeIfEqualsWorksOnItself() {
        // Act

        boolean actualResult = validList.equals(validList); // Needed for Sonarqube testing purposes.

        // Assert

        assertTrue(actualResult);
    }
    */
}