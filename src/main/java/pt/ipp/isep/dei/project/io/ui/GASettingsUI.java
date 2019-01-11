package pt.ipp.isep.dei.project.io.ui;

import pt.ipp.isep.dei.project.controller.GASettingsController;
import pt.ipp.isep.dei.project.model.GeographicArea;
import pt.ipp.isep.dei.project.model.GeographicAreaList;
import pt.ipp.isep.dei.project.model.TypeArea;
import pt.ipp.isep.dei.project.model.TypeAreaList;

import java.util.List;
import java.util.Scanner;

class GASettingsUI {
    private GASettingsController mController;
    private GeographicArea mGeoArea;
    private GeographicAreaList mGeoAreaList;
    private String mTypeAreaString;
    private TypeArea mTypeArea;
    private boolean mListWasCreated;
    private double mGeoAreaLat;
    private double mGeoAreaLong;
    private double mGeoAreaAlt;
    private double mGeoAreaLength;
    private double mGeoAreaWidth;
    private boolean mAreaAddedToList;
    private String nameOfGeoArea;
    private String mDaughterAreaName;
    private String mMotherAreaName;
    private String mContainedAreaName;
    private String mContainerAreaName;

    GASettingsUI() {
        this.mController = new GASettingsController();
    }

    void runGASettings(GeographicAreaList programGAList, TypeAreaList programTypeAreaList) {
        UtilsUI utils = new UtilsUI();
        boolean activeInput = true;
        int option;
        if (programGAList == null || programGAList.getGeographicAreaList().isEmpty()) {
            System.out.println("Invalid Geographic Area List - List Is Empty");
            return;
        }
        System.out.println("--------------\n");
        System.out.println("Geographic Area Settings\n");
        System.out.println("--------------\n");
        while (activeInput) {
            printOptionMessage();
            option = utils.readInputNumberAsInt();
            String mStringMessageAskingToCreateGeographicAreaType = "There aren't any Geographic Area Types. Please create a new Geographic Area type before you continue.";
            switch (option) {
                case 1:
                    if (programTypeAreaList == null || programTypeAreaList.getTypeAreaList().isEmpty()) {
                        System.out.println(mStringMessageAskingToCreateGeographicAreaType);
                        return;
                    }
                    getInputUS01();
                    updateModelUS01(programTypeAreaList);
                    displayStateUS01();
                    activeInput = false;
                    break;

                case 2:
                    if (programTypeAreaList == null || programTypeAreaList.getTypeAreaList().isEmpty()) {
                        System.out.println(mStringMessageAskingToCreateGeographicAreaType);
                        return;
                    }
                    updateModelUS02(programTypeAreaList);
                    displayStateUS02();
                    activeInput = false;
                    break;
                case 3:
                    if (programTypeAreaList == null || programTypeAreaList.getTypeAreaList().isEmpty()) {
                        System.out.println(mStringMessageAskingToCreateGeographicAreaType);
                        return;
                    }
                    getAreaInputUS03();
                    getTypeAreaInputUS03(programTypeAreaList);
                    getLocalInputUS03();
                    updateGeoAreaUS03();
                    updateModelUS03(programGAList);
                    displayStateUS03();
                    activeInput = false;
                    break;
                case 4:
                    if (programTypeAreaList == null || programTypeAreaList.getTypeAreaList().isEmpty()) {
                        System.out.println(mStringMessageAskingToCreateGeographicAreaType);
                        return;
                    }
                    getInputTypeArea(programTypeAreaList);
                    if (!matchGAByTypeArea(programGAList)) {
                        return;
                    } else {
                        displayGAListByTypeArea();
                    }
                    activeInput = false;
                    break;
                case 5:
                    this.mGeoArea = utils.getInputGeographicArea(programGAList);
                    this.mMotherAreaName = mGeoArea.getId();
                    printAreaByName(mMotherAreaName, programGAList); //TODO Method in UI. Print by name is the responsibility of GAList class. Controller should call that method.
                    this.mGeoArea = utils.getInputGeographicArea(programGAList);
                    this.mDaughterAreaName = mGeoArea.getId();
                    printAreaByName(mDaughterAreaName, programGAList); //TODO Method in UI. Print by name is the responsibility of GAList class. Controller should call that method
                    updateStateUS07(programGAList);
                    displayStateUS07();
                    activeInput = false;
                    break;
                case 6:
                    getContainerArea(programGAList);
                    getContainedArea(programGAList);
                    checkIfContained(programGAList);
                    activeInput = false;
                    break;
                case 0:
                    return;
                default:
                    System.out.println(utils.INVALID_OPTION);
                    break;
            }
        }
    }

    // OPÇÃO LISTAR POR NOMES / POR LISTA - TYPE AREA

    private void getInputTypeArea(TypeAreaList typeAreaList) {
        UtilsUI utils = new UtilsUI();
        System.out.println(
                "We need to know what is the type of Geographic Area you want.\n" + "Would you like to:\n" + "1)Type the Geographic Area Type name;\n" + "2) Choose it from a list;\n" +
                        "0) Return;");
        boolean activeInput = false;
        while (!activeInput) {
            int option = utils.readInputNumberAsInt();
            switch (option) {
                case 1:
                    getInputTypeAreaName();
                    if (!getTypeAreaByName(typeAreaList)) {
                        System.out.println("Unable to select a Geographic Area. Returning to main menu.");
                        return;
                    }
                    activeInput = true;
                    break;
                case 2:
                    getInputTypeAreaByList(typeAreaList);
                    activeInput = true;
                    break;
                case 0:
                    return;
                default:
                    System.out.println(utils.INVALID_OPTION);
                    break;
            }
        }
    }


    //GET INPUT TYPE AREA NAME BY NAME OR BY LIST//
    private boolean getInputTypeAreaName() {
        UtilsUI utils = new UtilsUI();
        Scanner mScanner = new Scanner(System.in);
        System.out.println("Please type the name of the Geographic Area Type Where: ");
        this.mTypeAreaString = mScanner.nextLine();
        return (!"exit".equals((this.mTypeAreaString)));
    }

    private boolean getTypeAreaByName(TypeAreaList typeAreaList) {
        UtilsUI utils = new UtilsUI();
        List<Integer> listOfIndexesTypeArea = mController.matchTypeAreaIndexByString(this.mTypeAreaString, typeAreaList);
        String youHaveChosen = "You have chosen the following Geographic Area Type:";
        while (listOfIndexesTypeArea.isEmpty()) {
            System.out.println("There is no Geographic Area Type with that name. Please insert the name of a Geographic Area Type" +
                    " that exists or type 'exit' to cancel and create a new Geographic Area Type on the Main Menu.");
            if (!getInputTypeAreaName()) {
                return false;
            }
            listOfIndexesTypeArea = mController.matchTypeAreaIndexByString(this.mTypeAreaString, typeAreaList);
        }

        if (listOfIndexesTypeArea.size() > 1) {
            System.out.println("There are multiple Geographic Area Types with that name. Please choose the right one.");
            System.out.println(mController.printTypeAreaElementsByIndex(listOfIndexesTypeArea, typeAreaList));
            int aux = utils.readInputNumberAsInt();
            if (listOfIndexesTypeArea.contains(aux)) {
                this.mTypeArea = typeAreaList.getTypeAreaList().get(aux);
                System.out.println(youHaveChosen);
                System.out.println(mController.printTypeArea(this.mTypeArea));
            } else {
                System.out.println(utils.INVALID_OPTION);
            }
        } else {
            System.out.println(youHaveChosen);
            this.mTypeArea = typeAreaList.getTypeAreaList().get(listOfIndexesTypeArea.get(0));
            System.out.println(mController.printTypeArea(this.mTypeArea));
        }
        return true;
    }


    private void getInputTypeAreaByList(TypeAreaList typeAreaList) {
        UtilsUI utils = new UtilsUI();
        boolean activeInput = false;
        System.out.println("Please select the Geographic Area Type from the list: ");

        while (!activeInput) {
            System.out.print(mController.printGATypeList(typeAreaList));
            int aux = utils.readInputNumberAsInt();
            if (aux >= 0 && aux < typeAreaList.getTypeAreaList().size()) {
                this.mTypeArea = typeAreaList.getTypeAreaList().get(aux);
                activeInput = true;
                //TODO fazer um print bonito
                System.out.println("You have chosen the following Geographic Area Type:");
                System.out.println(mController.printTypeArea(this.mTypeArea));
            } else {
                System.out.println(utils.INVALID_OPTION);
            }
        }
    }


/* USER STORY 001 - As an Administrator, I want to add a new type of geographical area, in order to be able to create a
 classification of geographical areas.*/

    private void getInputUS01() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Please insert the name of the new Geographic Area Type: ");
        while (!scanner.hasNext("[a-zA-Z_]+")) {
            System.out.println("That's not a valid name a Type Area. Please insert only Alphabetic Characters");
            scanner.next();
        }
        this.mTypeAreaString = scanner.next();
    }

    private void updateModelUS01(TypeAreaList typeAreaList) {
        this.mListWasCreated = mController.createAndAddTypeAreaToList(mTypeAreaString, typeAreaList);
    }

    private void displayStateUS01() {
        if (mListWasCreated) {
            System.out.println("Success, you have inserted a new Type of Geographic Area.");
        } else {
            System.out.println("Failed, you have inserted an invalid or repeated Type of Geographic Area.");
        }
    }

    /* USER STORY 002 - As a System Administrator I want to obtain a list of the types of Geographical Areas previously stated.
     * Class responsible for presenting the list.  */
    private void updateModelUS02(TypeAreaList typeAreaList) {
        System.out.println(mController.getTypeAreaList(typeAreaList));
    }

    private void displayStateUS02() {
        System.out.println("\nList finished.");
    }

    /* User Story - 03 As a System Administrator I want to Create a new Geographic Area */
    private void getAreaInputUS03() {
        this.nameOfGeoArea = readInputString("name");
    }

    private void getTypeAreaInputUS03(TypeAreaList typeAreaList) {
        UtilsUI utils = new UtilsUI();
        boolean activeInput = false;
        System.out.println("Please select one of the following types for the new Geographic Area: ");

        while (!activeInput) {
            System.out.println(mController.getTypeAreaList(typeAreaList));
            int aux = utils.readInputNumberAsInt();
            if (aux >= 0 && aux < typeAreaList.getTypeAreaList().size()) {
                TypeArea auxType = typeAreaList.getTypeAreaList().get(aux);
                activeInput = true;
                System.out.println("You have chosen the following type for the new Geographic Area:");
                System.out.println((auxType.printTypeGeographicArea()));
            } else {
                System.out.println(utils.INVALID_OPTION);
            }
        }
    }

    private void getLocalInputUS03() {
        this.mGeoAreaLat = readInputNumber("Latitude");
        this.mGeoAreaLong = readInputNumber("Longitude");
        this.mGeoAreaAlt = readInputNumber("Altitude");
        this.mGeoAreaLength = readInputNumber("Length");
        this.mGeoAreaWidth = readInputNumber("Width");

    }

    private void updateGeoAreaUS03() {
        System.out.print("The Geographic Area you want to create is " + nameOfGeoArea  + " and its " +
                "localization is on " + mGeoAreaLat + " latitude " + mGeoAreaLong + " longitude. The size is " +
                this.mGeoAreaLength + " by " + this.mGeoAreaWidth + " kms\n");
    }

    private void updateModelUS03(GeographicAreaList newGeoListUi) {
        this.mAreaAddedToList = mController.addNewGeoAreaToList(newGeoListUi, nameOfGeoArea, mTypeAreaString, mGeoAreaLat, mGeoAreaLong, mGeoAreaAlt, mGeoAreaLength, mGeoAreaWidth);
    }

    private void displayStateUS03() {
        if (mAreaAddedToList) {
            System.out.print("The Geographic Area has been successfully added.");
        } else
            System.out.print("The Geographic Area hasn't been added to the list. " +
                    "There is already an area with those input values.");
    }

    private String createInputMsg(String inputType) {
        return "Please Insert " + inputType + " for the New Geographic Area: ";
    }

    private String createInvalidStringMsg(String inputType) {
        return "That's not a valid " + inputType + ". Please insert only Alphabetic Characters";
    }

    private String createInvalidNumberMsg(String inputType) {
        return "That's not a valid " + inputType + ". Please insert only Numbers";
    }

    private String readInputString(String inputType) {
        Scanner scanner = new Scanner(System.in);
        System.out.print(createInputMsg(inputType));

        while (!scanner.hasNext("[a-zA-Z\\sà-ùÀ-Ù]*")) {
            System.out.println(createInvalidStringMsg(inputType));
            scanner.next();
        }
        return scanner.next();
    }

    private double readInputNumber(String inputType) {
        Scanner scanner = new Scanner(System.in);
        System.out.print(createInputMsg(inputType));

        while (!scanner.hasNextDouble()) {
            System.out.println(createInvalidNumberMsg(inputType));
            scanner.next();
        }
        return scanner.nextDouble();
    }

    /* USER STORY 04 -  As an Administrator, I want to get a list of existing geographical areas of a given type. */
    private boolean matchGAByTypeArea(GeographicAreaList newGeoListUi) {
        if ((newGeoListUi.getGeographicAreaList().isEmpty())) {
            System.out.print("The list of Geographic Areas is currently empty.\n Please return to main menu and add a Geographic Area to the list first.");
            return false;
        } else {
            this.mGeoAreaList = mController.matchGAByTypeArea(newGeoListUi, this.mTypeArea);
            this.mTypeAreaString = mController.getTypeAreaName(this.mTypeArea);
            return true;
        }
    }

    private void displayGAListByTypeArea() {
        if (this.mGeoAreaList.getGeographicAreaList().isEmpty()) {
            System.out.println("There are no Geographic Areas of that Area Type.");
        } else {
            System.out.println("Geographic Areas of the type " + this.mTypeAreaString + ":\n");
            System.out.println(mController.printGAList(this.mGeoAreaList));
        }
    }

    /* USER STORY 07 - */

    private void printAreaByName(String name, GeographicAreaList newGeoListUi) {
        if (mController.checkIfListContainsGeoArea(name, newGeoListUi)) {
            System.out.println("Success, you have inserted a valid Geographic Area.");
        } else {
            System.out.println("Error! You have inserted a non-existant Geographic Area.");
        }
    }

    private void updateStateUS07(GeographicAreaList newGeoListUi) {
        GeographicArea daughterArea = mController.matchGeoAreaByName(mDaughterAreaName, newGeoListUi);
        GeographicArea motherArea = mController.matchGeoAreaByName(mMotherAreaName, newGeoListUi);
        mController.setMotherArea(daughterArea, motherArea);
    }

    private void displayStateUS07() {
        System.out.print("The Geographic Area " + mDaughterAreaName + " is contained in " + mMotherAreaName + "\n");
    }

/* US08 - As an Administrator, I want to find out if a geographical area is included, directly
or indirectly, in another one. */

    /**
     * getInputGeographicContainer()
     * this method makes the user define the NAME of the GeographicArea CONTAINER
     */
    private void getContainerArea(GeographicAreaList newGeoListUi) {
        UtilsUI utils = new UtilsUI();
        this.mGeoArea = utils.getInputGeographicArea(newGeoListUi);
        this.mContainerAreaName = mGeoArea.getId();
    }

    /**
     * getInputGeographicContainer()
     * this method makes the user define the NAME of the GeographicArea CONTAINED
     */
    private void getContainedArea(GeographicAreaList newGeoListUi) {
        UtilsUI utils = new UtilsUI();
        this.mGeoArea = utils.getInputGeographicArea(newGeoListUi);
        this.mContainedAreaName = mGeoArea.getId();
    }

    /**
     * @param newGeoListUi is the MainUI List
     *                     First we check if the Geographic Areas that we are testing exist in the MainUI list.
     *                     Then we check the GeographicAreaContained for its flag
     *                     And finally it tests the flag (Geographic Area) is equal to the testing GeographicArea Container
     */

    private void checkIfContained (GeographicAreaList newGeoListUi) {
        if (!(mController.seeIfGAListContainsAreasByName(mContainedAreaName, mContainerAreaName, newGeoListUi))) {
            System.out.println("The given areas are invalid!");
            return;
        }
        if (!(mController.seeIfItsContained())) {
            System.out.println(mContainedAreaName + " is NOT contained in " + mContainerAreaName);
            return;
        }
        System.out.println(mContainedAreaName + " is contained in " + mContainerAreaName);
    }


    /* UI SPECIFIC METHODS - NOT USED ON USER STORIES */
    private void printOptionMessage() {
        System.out.println("Geographic Settings Options:\n");
        System.out.println("1) Create a new type of Geographical Area. (US001)");
        System.out.println("2) List the existing types of Geographical Areas. (US002)");
        System.out.println("3) Add a new geographical area. (US003)");
        System.out.println("4) List of existing geographical areas of a given type. (US004)");
        System.out.println("5) Add an existing geographical area to another one. (US007)");
        System.out.println("6) See if a geographical area is included, directly or indirectly, in another one. (US008)");
        System.out.println("0) (Return to main menu)\n");
    }
}
