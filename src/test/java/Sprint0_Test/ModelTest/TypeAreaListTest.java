package Sprint0_Test.ModelTest;

import Sprint0.Model.TypeArea;
import Sprint0.Model.TypeAreaList;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

class TypeAreaListTest {

    @Test
    public void seeIfPrintTypeAreaListWorks(){
        TypeAreaList list =new TypeAreaList();
        TypeArea t1 = new TypeArea("Rua");
        list.addTypeArea(t1);
        String result = list.printTypeAreaList();
        String expectedResult = "\n" +
                "Area Types List:\n" +
                "\n" +
                "-Rua;";
        assertEquals(result,expectedResult);
    }

    @Test
    void newTAG() {
        TypeAreaList newList = new TypeAreaList();
        boolean result = newList.newTAG("cidade");
        assertTrue(result);
    }

    @Test
    public void seeIfnewTAGWorksWithAnother() {
        TypeArea tipo = new TypeArea("rua");
        TypeAreaList newList = new TypeAreaList();
        newList.addTypeArea(tipo);
        boolean result = newList.newTAG("cidade");
        assertTrue(result);
    }

    @Test
    public void seeIfnewTAGDoesntWorkWhenDuplicatedISAdded() {
        TypeArea tipo = new TypeArea("cidade");
        TypeAreaList expectedResult = new TypeAreaList();
        expectedResult.addTypeArea(tipo);
        boolean result = expectedResult.newTAG("cidade");
        assertFalse(result);
    }

    @Test
    public void seeIfNewTAGDoesntWorkWhenNullIsAdded(){
        TypeArea tipo = new TypeArea("cidade");
        TypeAreaList list = new TypeAreaList();
        list.addTypeArea(tipo);
        boolean result = list.newTAG(null);
        assertFalse(result);
    }

    @Test
    public void seeIfNewTAGDoesntWorkWhenNameIsEmpty(){
        TypeArea tipo = new TypeArea("cidade");
        TypeAreaList list = new TypeAreaList();
        list.addTypeArea(tipo);
        boolean result = list.newTAG("");
        assertFalse(result);
    }
    @Test
    public void seeIfNewTAGDoesntWorkWhenNumbersAreAdded(){
        TypeArea tipo = new TypeArea("cidade");
        TypeAreaList list = new TypeAreaList();
        list.addTypeArea(tipo);
        boolean result = list.newTAG("cidade1");
        assertFalse(result);
    }
}