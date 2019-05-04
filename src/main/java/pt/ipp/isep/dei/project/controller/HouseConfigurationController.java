package pt.ipp.isep.dei.project.controller;

import pt.ipp.isep.dei.project.controller.utils.LogUtils;
import pt.ipp.isep.dei.project.dto.RoomSensorDTO;
import pt.ipp.isep.dei.project.dto.mappers.RoomSensorMapper;
import pt.ipp.isep.dei.project.model.geographicarea.GeographicArea;
import pt.ipp.isep.dei.project.model.house.Address;
import pt.ipp.isep.dei.project.model.house.House;
import pt.ipp.isep.dei.project.model.room.Room;
import pt.ipp.isep.dei.project.model.room.RoomService;
import pt.ipp.isep.dei.project.io.ui.reader.JSONSensorsReader;

import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 * Controller class for House Configuration UI
 */


public class HouseConfigurationController {

    private static final String VALID_LOG_PATH = "resources/logs/sensorsImportHtml.html";

    /* USER STORY 101 - As an Administrator, I want to configure the location of the house */

    /**
     * Sets the address of a given House.
     *
     * @param street  the house's street.
     * @param number  the house's number.
     * @param town    The house's town.
     * @param zip     The house's zip code.
     * @param country The houses's country.
     * @param house   is the house we're going to set the address of.
     */

    void setHouseAddress(String street, String number, String zip, String town, String country, House house) {
        Address address = new Address(street, number, zip, town, country);
        house.setAddress(address);
    }

    /**
     * @param latitude  is the latitude we're going to set.
     * @param longitude is the longitude we're going to set.
     * @param altitude  is the altitude we're going to set.
     * @param house     is the house we're going to change the zip code to.
     */

    public void setHouseLocal(double latitude, double longitude, double altitude, House house) {
        house.setLocation(latitude, longitude, altitude);
    }

    /**
     * This method receives a house and a geographic area and sets this as
     * the house mother area.
     **/
    public void setHouseMotherArea(House house, GeographicArea geographicArea) {
        house.setMotherArea(geographicArea);
    }

    /**
     * @param house is the house we want to get the name from.
     * @return is the name of the given house.
     */

    String getHouseId(House house) {
        return house.getId();
    }


    /* USER STORY 105 - As an Administrator, I want to addWithoutPersisting a new room to the house, in order to configure it (name,
     house floor and dimensions) */

    /**
     * This method receives the house and room parameters and creates a new roomDTO.
     *
     * @param roomDesignation is the name of the room we're going to create.
     * @param roomHouseFloor  is the floor of the room we're going to create.
     * @param width           is the width of the room we're going to create.
     * @param length          is the length of the room we're going to create.
     * @param height          is the height of the room we're going to create.
     * @return a new Room
     */
    public Room createNewRoom(RoomService roomService, String roomDesignation, String roomDescription, int roomHouseFloor, double width, double length, double height, String houseID, String energyGridID) {
        return roomService.createRoom(roomDesignation, roomDescription, roomHouseFloor, width, length, height, houseID, energyGridID);
    }

    /**
     * The method receives a house and a roomDTO, transforms it into a room, and tries to addWithoutPersisting it to house.
     *
     * @param room the DTO of a Room.
     * @return true if room was added, false otherwise.
     **/
    public boolean addRoomToHouse(RoomService roomService, Room room) {
        return roomService.saveRoom(room);
    }


    /* USER STORY 108 - As an Administrator, I want to have a list of existing rooms, so that I can choose one to edit it. */

    /**
     * @return builds a string of all the individual members in the given list.
     */

    public String buildRoomsString(RoomService roomService, List<Room> houseRooms) {
        return roomService.buildRoomsAsString(houseRooms);
    }

    /* USER STORY 260 -  As an Administrator, I want to import a list of sensors for the house rooms.
       Sensors without a valid room shouldn’t be imported but registered in the application log. */

    /**
     * Method that reads all the sensors from a given file and imports them into the persistence layer.
     *
     * @param filepath    is the path of the file we want to import sensors from.
     * @param roomService is the service making the connection to the room repository.
     * @return is the number of imported sensors.
     */

    public int[] readSensors(String filepath, RoomService roomService) {
        // Initialize needed variables.
        JSONSensorsReader reader = new JSONSensorsReader();
        int[] result = new int[2];
        if (roomService.isEmptyRooms()) { // If there are no rooms to add sensors to, no sensors will be added.
            return result;
        }
        try {
            List<RoomSensorDTO> importedSensors = reader.importSensors(filepath);
            return addSensorsToModelRooms(importedSensors, roomService);
        } catch (IllegalArgumentException ok) { // Throws an exception if the file is corrupt or non existent.
            throw new IllegalArgumentException();
        }
    }

    /**
     * Method that takes a list of houseSensorDTOs, checks if the rooms they belong to exist in the program's
     * persistence layer, and if the correct room exists, maps the DTO into a model object and persists it in the program's database.
     *
     * @param importedSensors is the list of houseSensorDTOs that we're trying to import into the program.
     * @param roomService     is the service making the connection to the room repository.
     * @return is the number of sensors successfully added to the persistence layer.
     */

    private int[] addSensorsToModelRooms(List<RoomSensorDTO> importedSensors, RoomService roomService) {
        Logger logger = LogUtils.getLogger("sensorsImportLogger", VALID_LOG_PATH, Level.FINE); // Creates the logger for when things go wrong.
        int addedSensors = 0;
        int rejectedSensors = 0;
        for (RoomSensorDTO importedSensor : importedSensors) {
            Optional<Room> roomToAddTo = roomService.findRoomByID(importedSensor.getRoomID()); // Attempts to getDB a room in the repository with an ID that matches the sensor.
            if (roomToAddTo.isPresent()) { // If the room with the proper id exists, the sensor is saved.
                roomService.saveSensor(RoomSensorMapper.dtoToObject(importedSensor));
                addedSensors++;
            } else {
                logger.fine("The sensor " + importedSensor.getId() + " wasn't added to room " + importedSensor.getRoomID()
                        + " - there is no room with that ID.");
                LogUtils.closeHandlers(logger);
                rejectedSensors++;
            }
        }
        int[] result = new int[2];
        result[0] = addedSensors;
        result[1] = rejectedSensors;
        LogUtils.closeHandlers(logger);
        return result;
    }
}