package pt.ipp.isep.dei.project.model;

/**
 * Class that represents a Geographical Area.
 */

public class GeographicArea {

    private String id;
    private TypeArea typeArea;
    private double length;
    private double width;
    private GeographicArea motherArea;
    private Local location;
    private SensorList areaSensors;
    private String description;


    // GeoArea constructors. The minimum amount of data for a GeoArea is a place and a type of area.
    // They can be made with or without a sensor list.

    /**
     * Empty constructor to use on UIs
     *
     * @param id       the Id of the Area
     * @param typeArea the type of the area.
     * @param length   the total length of the area.
     * @param width    the total width of the area.
     * @param location the location of the area,
     */

    public GeographicArea(String id, TypeArea typeArea, double length, double width, Local location) {
        this.id = id;
        this.typeArea = typeArea;
        this.length = length;
        this.width = width;
        this.location = location;
        this.areaSensors = new SensorList();
    }

    // Setters and Getters for all the parameters.

    public String getId() {
        return this.id;
    }

    /**
     * Sets the description attribute
     *
     * @param description String is a short description of the Geographical Area.
     */

    public void setDescription(String description) {
        this.description = description;
    }

    String getDescription() {
        return this.description;
    }

    /**
     * Setter for Sensor List.
     *
     * @param listToSet list to set
     */
    public void setSensorList(SensorList listToSet) {
        this.areaSensors = listToSet;
    }

    public boolean setMotherArea(GeographicArea geoArea) {
        if (geoArea != null) {
            this.motherArea = geoArea;
            return true;
        } else {
            return false;
        }
    }

    GeographicArea getMotherArea() {
        return this.motherArea;
    }

    /**
     * This method is used to check if the current GeoArea is contained in the given area.
     *
     * @param motherArea - Geographic Area being compared to daughter area mother area attribute.
     * @return true if contained, false if not.
     */

    public boolean isContainedInArea(GeographicArea motherArea) {
        GeographicArea tempMotherArea = this;
        while (tempMotherArea.getMotherArea() != null) {
            if (tempMotherArea.isMotherAreaEqual(motherArea)) {
                return true;
            } else {
                tempMotherArea = this.getMotherArea();
            }
        }
        return false;
    }

    /**
     * Getter for type of Geographic Area.
     *
     * @return returns the attribute TypeArea from an object of the class Geographic Area
     */
    TypeArea getTypeArea() {
        return this.typeArea;
    }

    /**
     * Getter for Geographic Area localization.
     *
     * @return returns the attribute local from an object of the class Geographic Area
     */
    public Local getLocal() {
        return this.location;
    }

    /**
     * Getter for Geographic Area sensor list.
     *
     * @return returns the attribute sensorList from an object of the class Geographic Area
     */
    public SensorList getSensorList() {
        return this.areaSensors;
    }

    /**
     * Method to print details that are required for a Geographic Area to be different from another GA (equals -
     * name, type area and local).
     *
     * @return returns a string with Geographic Area Parameters
     */

    public String buildGeographicAreaString() {
        String result;
        result = this.id + ", " + this.typeArea.getName() + ", " +
                this.location.getLatitude() + "º lat, " + this.location.getLongitude() + "º long\n";
        return result;
    }

    double getWidth() {
        return this.width;
    }

    public double getLength() {
        return this.length;
    }

    public boolean addSensorToSensorList(Sensor sensor) {
        return this.areaSensors.addSensor(sensor);
    }

    /**
     * Method checks if geographic area's sensor list is empty.
     *
     * @return true if SensorList is empty, false otherwise
     */
    public boolean isSensorListEmpty() {
        return areaSensors.isEmpty();
    }

    /** This method checks if mother area is equal to geographic area given.
     *
     * @return true if is equal to geographic area given, false otherwise.
     * **/
    public boolean isMotherAreaEqual(GeographicArea geographicArea){
        return this.motherArea.equals(geographicArea);
    }

    /** This method checks if name, type area and local match those of geographic area.
     *
     * @return true if it matches, false if it does not.
     * **/
    public boolean equalsParameters(String name, TypeArea typeArea, Local local){
        return (this.id.equals(name) && (this.typeArea.equals(typeArea) && (this.location.equals(local))));
    }

    /** This method checks if type area given match that of geographic area.
     *
     * @return true if it matches, false if it does not.
     * **/
    public boolean equalsTypeArea(TypeArea typeArea){
        return (this.typeArea.equals(typeArea));
    }

    /**
     * Method 'equals' is required so that each 'Geographic Area' can be added to a 'Geographic Area List'. Two
     * Geographic Areas cannot have the same Localization, name and TypeArea
     */
    @Override
    public boolean equals(Object testObject) {
        if (this == testObject) {
            return true;
        }
        if (!(testObject instanceof GeographicArea)) {
            return false;
        }
        GeographicArea gA = (GeographicArea) testObject;
        return (this.getLocal().equals(gA.getLocal()) && (this.getId().equals(gA.getId()) && (this.getTypeArea().getName().equals(gA.getTypeArea().getName()))));
    }

    @Override
    public int hashCode() {
        return 1;
    }
}
