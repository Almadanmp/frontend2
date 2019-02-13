package pt.ipp.isep.dei.project.io.ui;

import pt.ipp.isep.dei.project.controller.EnergyGridSettingsController;
import pt.ipp.isep.dei.project.controller.HouseMonitoringController;
import pt.ipp.isep.dei.project.controller.RoomConfigurationController;
import pt.ipp.isep.dei.project.model.*;
import pt.ipp.isep.dei.project.model.device.Device;
import pt.ipp.isep.dei.project.model.device.devicetypes.DeviceType;
import pt.ipp.isep.dei.project.model.device.programs.Program;
import pt.ipp.isep.dei.project.model.device.programs.ProgramList;

import java.util.*;

/**
 * Utility class that aggregates common INPUT methods used by the UI classes.
 */
public class InputUtils {

    void returnToMenu(Scanner scanner) {
        String pressEnter = "\nPress ENTER to return.";
        System.out.println(pressEnter);
        scanner.nextLine();
    }

    GeographicArea getGeographicAreaByList(GeographicAreaList geographicAreaList) {
        InputUtils inputUtils = new InputUtils();
        UtilsUI utils = new UtilsUI();
        while (true) {
            System.out.println("Please select one of the existing geographic areas: ");
            System.out.println(geographicAreaList.buildGaWholeListString(geographicAreaList));
            int aux = inputUtils.readInputNumberAsInt();
            if (aux >= 0 && aux < geographicAreaList.getGeographicAreaList().size()) {
                GeographicArea result = geographicAreaList.getGeographicAreaList().get(aux);
                System.out.println("You have chosen the following geographic area: ");
                System.out.println(result.buildGeographicAreaString() + "\n");
                return result;
            } else {
                System.out.println(utils.invalidOption);
            }
        }
    }

    Room getHouseRoomByList(House house) {
        InputUtils inputUtils = new InputUtils();
        UtilsUI utils = new UtilsUI();
        while (true) {
            System.out.println("Please select one of the existing rooms in the house: ");
            System.out.println(house.buildRoomListString());
            int aux = inputUtils.readInputNumberAsInt();
            if (aux >= 0 && aux < house.getRoomList().size()) {
                Room result = house.getRoomList().get(aux);
                System.out.println("You have chosen the following room: ");
                System.out.println(result.buildRoomString() + "\n");
                return result;
            } else {
                System.out.println(utils.invalidOption);
            }
        }
    }

    Room getGridRoomByList(EnergyGrid grid) {
        InputUtils inputUtils = new InputUtils();
        UtilsUI utils = new UtilsUI();
        while (true) {
            System.out.println("Please select one of the existing rooms in the house: ");
            System.out.println(grid.buildRoomListString());
            int aux = inputUtils.readInputNumberAsInt();
            if (aux >= 0 && aux < grid.getRoomList().size()) {
                Room result = grid.getRoomList().get(aux);
                System.out.println("You have chosen the following room: ");
                System.out.println(result.buildRoomString() + "\n");
                return result;
            } else {
                System.out.println(utils.invalidOption);
            }
        }
    }

    Device getGridDevicesByList(EnergyGrid grid) {
        InputUtils inputUtils = new InputUtils();
        UtilsUI utils = new UtilsUI();
        while (true) {
            System.out.println("Please select one of the existing devices in the selected room: ");
            System.out.println(grid.buildDeviceListString());
            int aux = inputUtils.readInputNumberAsInt();
            if (aux >= 0 && aux < grid.getDeviceList().size()) {
                Device result = grid.getDeviceList().get(aux);
                System.out.println("You have chosen the following device: ");
                System.out.println(result.buildDeviceString() + "\n");
                return result;
            } else {
                System.out.println(utils.invalidOption);
            }
        }
    }

    Program getSelectedProgramFromDevice(Device device) {
        InputUtils inputUtils = new InputUtils();
        UtilsUI utils = new UtilsUI();
        while (true) {
            ProgramList deviceProgramList = device.getProgramList();
            System.out.println("Please select one of the existing programs in the selected program List: ");
            System.out.println(deviceProgramList.buildProgramListString());
            int aux = inputUtils.readInputNumberAsInt();
            if (aux >= 0 && aux < deviceProgramList.getProgramList().size()) {
                Program result = deviceProgramList.getProgramList().get(aux);
                System.out.println("You have chosen the following program: ");
                System.out.println(result.buildProgramString() + "\n");
                return result;
            } else {
                System.out.println(utils.invalidOption);
            }
        }
    }

    Device getInputRoomDevicesByList(Room room) {
        InputUtils inputUtils = new InputUtils();
        UtilsUI utils = new UtilsUI();
        while (true) {
            System.out.println("Please select one of the existing devices in the selected room: ");
            System.out.println(room.buildDeviceListString());
            int aux = inputUtils.readInputNumberAsInt();
            if (aux >= 0 && aux < room.getDeviceList().size()) {
                Device result = room.getDeviceList().get(aux);
                System.out.println("You have chosen the following device:");
                System.out.println(result.buildDeviceString() + "\n");
                return result;
            } else {
                System.out.println(utils.invalidOption);
            }
        }
    }

    EnergyGrid getInputGridByList(House house) {
        EnergyGridSettingsController controller = new EnergyGridSettingsController();
        UtilsUI utilsUI = new UtilsUI();
        while (true) {
            System.out.println("Please select one of the existing grids on the selected house: ");
            System.out.println(controller.buildGridListString(house));
            int aux = this.readInputNumberAsInt();
            if (aux >= 0 && aux < house.getEGListObject().getEnergyGridList().size()) {
                EnergyGrid result = house.getEGListObject().getEnergyGridList().get(aux);
                System.out.println("You have chosen the following grid:");
                System.out.println(result.buildGridString() + "\n");
                return result;
            } else {
                System.out.println(utilsUI.invalidOption);
            }
        }
    }

    TypeSensor getInputSensorTypeByList(TypeSensorList typeSensorList) {
        while (true) {
            UtilsUI utils = new UtilsUI();
            InputUtils inputUtils = new InputUtils();
            RoomConfigurationController ctrl = new RoomConfigurationController();
            System.out.println("Please select a type of sensor from the list:");
            System.out.println(typeSensorList.buildString());
            int aux = inputUtils.readInputNumberAsInt();
            if (aux >= 0 && aux < typeSensorList.getSensorList().size()) {
                TypeSensor result = typeSensorList.getSensorList().get(aux);
                System.out.println("You have chosen the following sensor type:");
                System.out.println(result.buildString() + "\n");
                return result;
            } else {
                System.out.println(utils.invalidOption);
            }
        }
    }


    Sensor getInputSensorFromRoomByList(Room room) {
        UtilsUI utils = new UtilsUI();
        InputUtils inputUtils = new InputUtils();
        HouseMonitoringController controller = new HouseMonitoringController();
        while (true) {
            System.out.println("Please select one of the existing Sensors on the selected Room: ");
            System.out.println(room.getSensorList().buildSensorListString());
            int aux = inputUtils.readInputNumberAsInt();
            if (aux >= 0 && aux < room.getSensorList().getSensorList().size()) {
                Sensor result = room.getSensorList().getSensorList().get(aux);
                System.out.println("You have chosen the following sensor:");
                System.out.println(result.buildSensorString() + "\n");
                return result;
            } else {
                System.out.println(utils.invalidOption);
            }
        }
    }

    DeviceType getInputDeviceTypeByList(House house) {
        InputUtils inputUtils = new InputUtils();
        UtilsUI utils = new UtilsUI();
        List<DeviceType> deviceTypeList = house.getmDeviceTypeList();
        while (true) {
            System.out.println("Please select one of the device types: ");

            System.out.println(house.getmDeviceTypeList());
            System.out.println(house.buildTypeListString(deviceTypeList));
            int aux = inputUtils.readInputNumberAsInt();
            if (aux >= 0 && aux < house.getmDeviceTypeList().size()) {
                DeviceType result = deviceTypeList.get(aux);
                System.out.println("You have chosen the following device type:");
                System.out.println(result.getDeviceType() + "\n");
                return result;

            } else {
                System.out.println(utils.invalidOption);
            }
        }
    }

    boolean yesOrNo(String answer, String question) {
        UtilsUI utils = new UtilsUI();
        Scanner scanner = new Scanner(System.in);
        while (!("y".equalsIgnoreCase(answer)) && !("n".equalsIgnoreCase(answer))) {
            System.out.println(utils.invalidOption);
            System.out.println(question);
            answer = scanner.nextLine();
        }
        if ("y".equalsIgnoreCase(answer)) {
            return true;
        } else return !"n".equalsIgnoreCase(answer);
    }

    /**
     * Method to read the user input as an Int
     * If its not an int it will print an invalid option message
     * If its a double it will convert it to an int
     *
     * @return value read from the user
     */
    int readInputNumberAsInt() {
        UtilsUI utils = new UtilsUI();
        Scanner scan = new Scanner(System.in);
        while (!scan.hasNextDouble()) {
            System.out.println(utils.invalidOption);
            scan.next();
        }
        Double option = scan.nextDouble();
        return option.intValue();
    }

    /**
     * Method to read a double value from a user.
     * Will validate input is a double. if it isn't it will print an error message.
     *
     * @return value read from user
     */
    Double getInputAsDouble() {
        UtilsUI utils = new UtilsUI();
        Scanner scanner = new Scanner(System.in);
        while (!scanner.hasNextDouble()) {
            System.out.println(utils.invalidOption);
            scanner.next();
        }
        return scanner.nextDouble();
    }

    /**
     * Method will read a group of values from user and return a date (year, month, day, hour and
     * minute). It will only accept valid numbers.
     * @return date introduced by user
     */
    public Date getInputYearMonthDay() {
        int year = getInputYear();
        boolean isLeapyear = new GregorianCalendar().isLeapYear(year);
        int month = getInputMonth();
        int day = getInputDay(isLeapyear,month);
        Date date = new GregorianCalendar(year, month, day).getTime();
        System.out.println(("You have chosen the following date:\n") + date.toString() + "\n");
        return date;
    }

    /**
     * Method will read a group of values from user and return a date (year, month, day, hour and
     * minute). It will only accept valid numbers.
     * @return date introduced by user
     */
    public Date getInputYearMonthDayHourMin() {
        int year = getInputYear();
        boolean isLeapyear = new GregorianCalendar().isLeapYear(year);
        int month = getInputMonth();
        int day = getInputDay(isLeapyear,month);
        int hour = getInputHour();
        int minute = getInputMinute();
        Date date = new GregorianCalendar(year, month, day, hour, minute).getTime();
        System.out.println(("You have chosen the following date:\n") + date.toString() + "\n");
        return date;
    }

    /**
     * Method will ask the user to introduce a year and will return an int
     * that corresponds to the number introduced by user. User can only introduce
     * values from the gregorian calendar
     * @return int of the year introduced by user
     */
    private int getInputYear() {
        Scanner scan = new Scanner(System.in);
        int year = -1;
        while (year <= 1581) { //Gregorian Calendar was introduced in 1582, so was the concept of leap year
            year = getInputDateAsInt(scan, "year");
            scan.nextLine();
        }
        return year;
    }

    /**
     * Method will ask the user for a month and will return an int of that value subtracted by one
     * @return int of the month introduced by user
     */
    private int getInputMonth() {
        Scanner scan = new Scanner(System.in);
        int month = -1;
        while (month <= -1 || month > 11) { // -1 e 11 porque depois se subtrai um valor
            month = getInputDateAsInt(scan, "month") - 1;
            scan.nextLine();
        }
        return month;
    }

    /**
     * Method will ask the user to introduce a day and will return an int
     * that corresponds to the number introduced by user. User can only introduce
     * valid values
     * @return int of the day introduced by user
     */
    private int getInputDay(boolean isLeapyear, int month) {
        if(month == 1) {
            return getInputFebruaryDay(isLeapyear);
        }
        else {
            return getInputNotFebruaryDay(month);
        }
    }

    /**
     * Method will receive a boolean and ask the user for a day and will return an int
     * that corresponds to the number introduced by user. The boolean is true in case of leap
     * year and the user can only introduce a number from 1 to 29. Otherwise, it can only a number
     * from 0 to 28.
     * @return int of the day introduced by user
     */
    private int getInputFebruaryDay(boolean isLeapyear){
        Scanner scan = new Scanner(System.in);
        int day = -1;
        if(isLeapyear){
            while (day < 1 || day > 29) {
                day = getInputDateAsInt(scan, "day");
                scan.nextLine();
            }
            return day;
        }
        while (day < 1 || day > 28) {
            day = getInputDateAsInt(scan, "day");
            scan.nextLine();
        }
        return day;
    }

    /**
     * Method will receive an int of a month and ask the user for a day. It will return an int
     * that corresponds to the number introduced by user. The user can only introduce valid days
     * for that month (January - 0 to 31, April - 0 to 30).
     * @return int of the day introduced by user
     */
    private int getInputNotFebruaryDay(int month){
        Scanner scan = new Scanner(System.in);
        int day = -1;
        if(isJanuaryMarchMay(month)|| isJulyAugust(month) || isOctoberDecember(month)){
            while (day < 1 || day > 31) {
                day = getInputDateAsInt(scan, "day");
                scan.nextLine();
            }
            return day;
        }
        while (day < 1 || day > 30) {
            day = getInputDateAsInt(scan, "day");
            scan.nextLine();
        }
        return day;
    }

    //The next three methods were created because of a code smell
    /**
     * Method that checks if the month given is January, March or May, returning
     * true in case it is, false in case it is not.
     * @param month month to test
     */
    private boolean isJanuaryMarchMay(int month) {
        return month == 0 || month ==2 || month == 4;
    }

    /**
     * Method that checks if the month given is July or August, returning
     * true in case it is, false in case it is not.
     * @param month month to test
     */
    private boolean isJulyAugust(int month) {
        return month == 6 || month == 7;
    }

    /**
     * Method that checks if the month given is October or December, returning
     * true in case it is, false in case it is not.
     * @param month month to test
     */
    private boolean isOctoberDecember(int month) {
        return month == 9 || month == 11;
    }

    /**
     * Method will ask the user for an hour and will return an int
     * that corresponds to the number introduced by user. User can only introduce
     * valid values (0 to 23).
     * @return int of the hour introduced by user
     */
    private int getInputHour() {
        Scanner scan = new Scanner(System.in);
        int hour = -1;
        while (hour < 0 || hour > 23) {
            hour = getInputDateAsInt(scan, "hour");
            scan.nextLine();
        }
        return hour;
    }

    /**
     * Method will ask the user to introduce a minute and will return an int
     * that corresponds to the number introduced by user. User can only introduce
     * valid values (0 to 59).
     * @return int of the minute introduced by user
     */
    private int getInputMinute() {
        Scanner scan = new Scanner(System.in);
        int minute = -1;
        while (minute < 0 || minute > 59) {
            minute = getInputDateAsInt(scan, "minute");
            scan.nextLine();
        }
        return minute;
    }

    /**
     * Method to get a date as an int.
     *
     * @param scan     the scanner to read input
     * @param dataType the type of date to read (year, month or day)
     * @return value read from the user
     */
    private int getInputDateAsInt(Scanner scan, String dataType) {
        System.out.println("Enter a valid " + dataType + ":");
        while (!scan.hasNextInt()) {
            scan.next();
            System.out.println("Not a valid " + dataType + ". Try again");
        }
        return scan.nextInt();
    }
}