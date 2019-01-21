package pt.ipp.isep.dei.project.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * GeographicAreaList tests class.
 */

public class GeographicAreaListTest {

    @Test
    public void seeIfConstructorGeographicAreaListWorks() {
        //Arrange
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);
        GeographicArea ga = new GeographicArea("Porto",t1,2,3,l1, new SensorList());
        GeographicAreaList geographicAreaList = new GeographicAreaList(ga);
        List<GeographicArea> expectedResult = new ArrayList<>();
        List<GeographicArea> actualResult;
        //Act
        expectedResult.add(ga);
        actualResult = geographicAreaList.getGeographicAreaList();
        //Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void seeIfAddsGeographicAreaToGeographicAreaListIfSameAsConstructor() {
        //Arrange
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);
        GeographicArea ga1 = new GeographicArea("Porto",t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea("Porto",t1,2,3,l1, new SensorList());
        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        boolean expectedResult = false;
        boolean actualResult;
        //Act
        actualResult = geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfAddsGeographicAreaToGeographicAreaListIfDifferentFromConstructor() {
        //Arrange
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);
        Local l2 = new Local(87, 67, 100);
        GeographicArea ga1 = new GeographicArea("Porto",t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea("Porto",t1,2,3,l2, new SensorList());
        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        boolean expectedResult = true;
        boolean actualResult;
        //Act
        actualResult = geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        //Assert
        assertEquals(expectedResult, actualResult);
    }


    @Test
    public void seeIfGetNameThatMatchesNameFromFirstGeoAreaInList() {
        //Arrange
        String stringToTest = "Porto";

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";
        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());
        ga1.setId(n1);

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());
        ga2.setId(n2);

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());
        ga3.setId(n3);

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        GeographicArea expectedResult = new GeographicArea(n1,t1,2,3,l1, new SensorList());
        GeographicArea actualResult;
        //Act
        expectedResult.setId(n1);
        actualResult = geographicAreaList.matchGeoArea(stringToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfGetNameThatMatchesNameFromMiddleGeoAreaInList() {
        //Arrange
        String stringToTest = "Braga";

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";
        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        GeographicArea expectedResult = new GeographicArea(n2,t1,2,3,l2, new SensorList());
        GeographicArea actualResult;
        //Act
        expectedResult.setId(n2);
        actualResult = geographicAreaList.matchGeoArea(stringToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfGetNameThatMatchesNameFromLastGeoAreaInList() {
        //Arrange
        String stringToTest = "Lisboa";

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";
        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        GeographicArea expectedResult = new GeographicArea(n3,t1,2,3,l3, new SensorList());
        GeographicArea actualResult;
        //Act
        expectedResult.setId(n3);
        actualResult = geographicAreaList.matchGeoArea(stringToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfGetsNullWhenListIsEmpty() {
        //Arrange
        String stringToTest = "Lisboa";
        GeographicAreaList geographicAreaList = new GeographicAreaList();
        GeographicArea expectedResult = null;
        GeographicArea actualResult;
        //Act
        actualResult = geographicAreaList.matchGeoArea(stringToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void seeIfTrueWhenGeographicAreaWithNameGivenIsFirstInGeographicAreaList() {
        //Arrange
        String stringToTest = "Porto";
        boolean expectedResult = true;
        boolean actualResult;

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";
        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        //Act
        actualResult = geographicAreaList.checkIfContainsGAByString(stringToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfTrueWhenGeographicAreaWithNameGivenIsSecondInGeographicAreaList() {
        //Arrange
        String stringToTest = "Braga";
        boolean expectedResult = true;
        boolean actualResult;

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";
        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        //Act
        actualResult = geographicAreaList.checkIfContainsGAByString(stringToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfTrueWhenGeographicAreaWithNameGivenIsLastInGeographicAreaList() {
        //Arrange
        String stringToTest = "Lisboa";
        boolean expectedResult = true;
        boolean actualResult;

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";
        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        //Act
        actualResult = geographicAreaList.checkIfContainsGAByString(stringToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfFalseWhenGANameGivenIsNotPresentInGeographicAreaList() {
        //Arrange
        String stringToTest = "Madrid";
        boolean expectedResult = false;
        boolean actualResult;

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";


        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        //Act
        actualResult = geographicAreaList.checkIfContainsGAByString(stringToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void seeIfTrueWhenGivenGeoAreaIsFirstInGeographicAreaList() {
        //Arrange
        boolean expectedResult = true;
        boolean actualResult;

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";

        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);
        GeographicArea gaToTest = new GeographicArea(n1,t1,2,3,l1, new SensorList());
        gaToTest.setId(n1);

        //Act
        actualResult = geographicAreaList.containsGA(gaToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfTrueWhenGivenGeoAreaIsInMiddleOfGeographicAreaList() {
        //Arrange
        boolean expectedResult = true;
        boolean actualResult;

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";


        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());


        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);
        GeographicArea gaToTest = new GeographicArea(n2,t1,2,3,l2, new SensorList());
        gaToTest.setId(n2);

        //Act
        actualResult = geographicAreaList.containsGA(gaToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfTrueWhenGivenGeoAreaIsInLastOfGeographicAreaList() {
        //Arrange
        boolean expectedResult = true;
        boolean actualResult;

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";

        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);
        GeographicArea gaToTest = new GeographicArea(n3,t1,2,3,l3, new SensorList());
        gaToTest.setId(n3);

        //Act
        actualResult = geographicAreaList.containsGA(gaToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfFalseWhenGivenGeoAreaIsNotContainedInGeographicAreaList() {
        //Arrange
        boolean expectedResult = false;
        boolean actualResult;

        TypeArea t1 = new TypeArea("Cidade");
        Local l1 = new Local(38, 7, 100);
        String n1 = "Porto";

        Local l2 = new Local(39, 67, 100);
        String n2 = "Braga";

        Local l3 = new Local(87, 67, 100);
        String n3 = "Lisboa";

        Local localTest = new Local(98, 54, 100);
        GeographicArea gaToTest = new GeographicArea("Coimbra",t1,2,3,localTest, new SensorList());
        gaToTest.setId("Madrid");

        GeographicArea ga1 = new GeographicArea(n1,t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea(n2,t1,2,3,l2, new SensorList());
        GeographicArea ga3 = new GeographicArea(n3,t1,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        //Act
        actualResult = geographicAreaList.containsGA(gaToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void seeIfGetGeographicAreaList() {
        //Arrange
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);
        GeographicArea ga = new GeographicArea("Porto",t1,2,3,l1, new SensorList());
        GeographicAreaList geographicAreaList = new GeographicAreaList(ga);
        List<GeographicArea> expectedResult = new ArrayList<>();
        List<GeographicArea> actualResult;
        //Act
        expectedResult.add(ga);
        actualResult = geographicAreaList.getGeographicAreaList();
        //Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void seeIfGetGeographicAreaListOfSameTypeAsLastGeoAreaInList() {
        //Arrange
        String typeToTest = "Freguesia";
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);

        TypeArea t2 = new TypeArea("País");
        Local l2 = new Local(43, 71, 100);

        TypeArea t3 = new TypeArea("Freguesia");
        Local l3 = new Local(43, 74, 100);

        GeographicArea ga1 = new GeographicArea("Porto",t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea("Coimbra",t2,2,3,l2, new SensorList());
        GeographicArea ga3 = new GeographicArea("Lisboa",t3,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        GeographicAreaList expectedResult = new GeographicAreaList();
        expectedResult.addGeographicAreaToGeographicAreaList(ga3);
        GeographicAreaList actualResult;
        //Act
        actualResult = geographicAreaList.matchGeographicAreaWithInputType(typeToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfGetGeographicAreaListOfSameTypeAsFirstGeoAreaInList() {
        //Arrange
        String typeToTest = "Rua";
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);

        TypeArea t2 = new TypeArea("País");
        Local l2 = new Local(43, 71, 100);

        TypeArea t3 = new TypeArea("Freguesia");
        Local l3 = new Local(43, 74, 100);

        GeographicArea ga1 = new GeographicArea("Porto",t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea("Coimbra",t2,2,3,l2, new SensorList());
        GeographicArea ga3 = new GeographicArea("Lisboa",t3,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        GeographicAreaList expectedResult = new GeographicAreaList();
        expectedResult.addGeographicAreaToGeographicAreaList(ga1);
        GeographicAreaList actualResult;
        //Act
        actualResult = geographicAreaList.matchGeographicAreaWithInputType(typeToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfGetGeographicAreaListOfSameTypeAsGeoAreaInMiddleOfList() {
        //Arrange
        String typeToTest = "País";
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);

        TypeArea t2 = new TypeArea("País");
        Local l2 = new Local(43, 71, 100);

        TypeArea t3 = new TypeArea("Freguesia");
        Local l3 = new Local(43, 74, 100);

        GeographicArea ga1 = new GeographicArea("Porto",t1,2,3,l1,new SensorList());
        GeographicArea ga2 = new GeographicArea("Coimbra",t2,2,3,l2, new SensorList());
        GeographicArea ga3 = new GeographicArea("Lisboa",t3,2,3,l3, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga3);

        GeographicAreaList expectedResult = new GeographicAreaList();
        expectedResult.addGeographicAreaToGeographicAreaList(ga2);
        GeographicAreaList actualResult;
        //Act
        actualResult = geographicAreaList.matchGeographicAreaWithInputType(typeToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfGetEmptyGeographicAreaListFromTypeDifferentOfTypeInList() {
        //Arrange
        String typeToTest = "Cidade";
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);
        GeographicArea ga1 = new GeographicArea("Porto",t1,2,3,l1, new SensorList());

        TypeArea t2 = new TypeArea("Freguesia");
        Local l2 = new Local(43, 71, 100);
        GeographicArea ga2 = new GeographicArea("Coimbra",t2,2,3,l2, new SensorList());

        GeographicAreaList geographicAreaList = new GeographicAreaList(ga1);
        geographicAreaList.addGeographicAreaToGeographicAreaList(ga2);

        GeographicAreaList expectedResult = new GeographicAreaList();
        GeographicAreaList actualResult;
        //Act
        actualResult = geographicAreaList.matchGeographicAreaWithInputType(typeToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfGetEmptyGeographicAreaListFromEmptyStartingList() {
        //Arrange
        String typeToTest = "Cidade";

        GeographicAreaList geographicAreaList = new GeographicAreaList();

        GeographicAreaList expectedResult = new GeographicAreaList();
        GeographicAreaList actualResult;
        //Act
        actualResult = geographicAreaList.matchGeographicAreaWithInputType(typeToTest);
        //Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void seeIfEqualsWhenObjectsAreDifferentButWithSameContent() {
        //Arrange
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);
        GeographicArea ga1 = new GeographicArea("Porto",t1,2,3,l1, new SensorList());

        TypeArea t2 = new TypeArea("Freguesia");
        Local l2 = new Local(43, 71, 100);
        GeographicArea ga2 = new GeographicArea("Coimbra",t2,2,3,l2, new SensorList());

        GeographicAreaList geographicAreaList1 = new GeographicAreaList(ga1);
        geographicAreaList1.addGeographicAreaToGeographicAreaList(ga2);

        GeographicAreaList geographicAreaList2 = new GeographicAreaList(ga1);
        geographicAreaList2.addGeographicAreaToGeographicAreaList(ga2);

        boolean expectedResult = true;
        boolean actualResult;
        //Act
        actualResult = geographicAreaList1.equals(geographicAreaList2);
        //Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void seeIfEqualsToSameObject() {
        //Arrange
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);
        GeographicArea ga1 = new GeographicArea("Porto",t1,2,3,l1, new SensorList());

        TypeArea t2 = new TypeArea("Freguesia");
        Local l2 = new Local(43, 71, 100);
        GeographicArea ga2 = new GeographicArea("Coimbra",t2,2,3,l2, new SensorList());

        GeographicAreaList geographicAreaList1 = new GeographicAreaList(ga1);
        geographicAreaList1.addGeographicAreaToGeographicAreaList(ga2);

        GeographicAreaList geographicAreaList2 = new GeographicAreaList(ga1);
        geographicAreaList2.addGeographicAreaToGeographicAreaList(ga2);

        boolean expectedResult = true;
        boolean actualResult;
        //Act
        actualResult = geographicAreaList1.equals(geographicAreaList1);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfFalseWhenObjectsAreDifferentWithDifferentContent() {
        //Arrange
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);

        TypeArea t2 = new TypeArea("Freguesia");
        Local l2 = new Local(43, 71, 100);

        TypeArea t3 = new TypeArea("Rua");
        Local l3 = new Local(54, 98, 100);

        TypeArea t4 = new TypeArea("Freguesia");
        Local l4 = new Local(73, 74, 100);

        GeographicArea ga1 = new GeographicArea("Porto",t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea("Coimbra",t2,2,3,l2, new SensorList());
        GeographicArea ga3 = new GeographicArea("Braga",t3,2,3,l3, new SensorList());
        GeographicArea ga4 = new GeographicArea("Lisboa",t4,2,3,l4, new SensorList());


        GeographicAreaList geographicAreaList1 = new GeographicAreaList(ga1);
        geographicAreaList1.addGeographicAreaToGeographicAreaList(ga2);

        GeographicAreaList geographicAreaList2 = new GeographicAreaList(ga3);
        geographicAreaList2.addGeographicAreaToGeographicAreaList(ga4);

        boolean expectedResult = false;
        boolean actualResult;
        //Act
        actualResult = geographicAreaList1.equals(geographicAreaList2);
        //Assert
        assertEquals(expectedResult, actualResult);
    }
    @Test
    public void seeIfFalseWhenObjectsAreFromDifferentClass() {
        //Arrange
        TypeArea t1 = new TypeArea("Rua");
        Local l1 = new Local(38, 7, 100);

        TypeArea t2 = new TypeArea("Freguesia");
        Local l2 = new Local(43, 71, 100);

        GeographicArea ga1 = new GeographicArea("Porto",t1,2,3,l1, new SensorList());
        GeographicArea ga2 = new GeographicArea("Coimbra",t2,2,3,l2, new SensorList());

        GeographicAreaList geographicAreaList1 = new GeographicAreaList(ga1);
        geographicAreaList1.addGeographicAreaToGeographicAreaList(ga2);


        boolean expectedResult = false;
        boolean actualResult;
        //Act
        actualResult = geographicAreaList1.equals(l2);
        //Assert
        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void seeIfAnInvalidListIsAdded(){
        GeographicAreaList list = new GeographicAreaList();
        boolean expectedResult = false;
        boolean actualResult = list.checkIfListIsValid();

        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void seeIfPrintsGeoAList() {
        GeographicArea gA1 = new GeographicArea("Portugal", new TypeArea("Country"), 10, 20, new Local(21, 33, 18), new SensorList());
        GeographicArea gA2 = new GeographicArea("Oporto", new TypeArea("City"), 10, 20, new Local(14, 14, 18), new SensorList());
        GeographicArea gA3 = new GeographicArea("Lisbon", new TypeArea("Village"), 10, 20, new Local(3, 3, 18), new SensorList());

        GeographicAreaList gAL1 = new GeographicAreaList();
        gAL1.addGeographicAreaToGeographicAreaList(gA1);
        gAL1.addGeographicAreaToGeographicAreaList(gA2);
        gAL1.addGeographicAreaToGeographicAreaList(gA3);
        String expectedResult = "---------------\n" +
                "0) Name: Portugal | Type: Country | Latitude: 21.0 | Longitude: 33.0\n" +
                "1) Name: Oporto | Type: City | Latitude: 14.0 | Longitude: 14.0\n" +
                "2) Name: Lisbon | Type: Village | Latitude: 3.0 | Longitude: 3.0\n" +
                "---------------\n";
        String result = gAL1.buildGaWholeListString(gAL1);
        assertEquals(expectedResult, result);
    }

    @Test
    public void seeIfPrintsGeoAListIfEmpty() {
        GeographicAreaList gAL1 = new GeographicAreaList();
         String expectedResult = "Invalid List - List is Empty\n";
        String result = gAL1.buildGaWholeListString(gAL1);
        assertEquals(expectedResult, result);
    }

    @Test
    public void hashCodeDummyTest(){
        GeographicAreaList gAL1 = new GeographicAreaList();
        int expectedResult = 1;
        int actualResult = gAL1.hashCode();
        Assertions.assertEquals(expectedResult,actualResult);
    }
}