package pt.ipp.isep.dei.project.io.ui;

        import java.util.Date;
        import java.util.GregorianCalendar;
        import java.util.Scanner;

/**
 * Utility class that aggregates common INPUT methods used by the UI classes.
 */
class InputUtils {

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
     * Method to get a date as an int.
     *
     * @param scan     the scanner to read input
     * @param dataType the type of date to read (year, month or day)
     * @return value read from the user
     */
    int getInputDateAsInt(Scanner scan, String dataType) {
        System.out.println("Enter the " + dataType + ":");
        while (!scan.hasNextInt()) {
            scan.next();
            System.out.println("Not a valid " + dataType + ". Try again");
        }
        return scan.nextInt();
    }

    /**
     * Method to get an inputDate from user.
     * It will read an ints inputed from user and convert it to Date Format.
     * @return Date
     */
     Date getInputStartDate() {
        InputUtils inputUtils = new InputUtils();
        Scanner scan = new Scanner(System.in);

        int year = inputUtils.getInputDateAsInt(scan, "year");
        scan.nextLine();

        int month = inputUtils.getInputDateAsInt(scan, "month") - 1;
        scan.nextLine();

        int day = inputUtils.getInputDateAsInt(scan, "day");

        System.out.println("You entered following date: "+ day + "/" + month + "/" + year + ".");
        scan.nextLine();

        return createDate(year, month, day);

    }

    /**
     * @param year is the year of the created date.
     * @param month is the month of the created date.
     * @param day is the day of the created date.
     * @return is the new created date.
     */

    public Date createDate(int year, int month, int day) {
        return new GregorianCalendar(year, month, day).getTime();
    }

}
