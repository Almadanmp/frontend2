package pt.ipp.isep.dei.project.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class GeographicAreaList {
    private List<GeographicArea> mGeographicAreaList;
    private String mStringEnhancer = "---------------\n";

    /**
     * GeographicAreaList constructor that receives a Geographic Area as a parameter and
     * adds the GA to the attribute mGeographicAreaList
     *
     * @param geographicAreaToAdd geographic area to add to the attribute
     */
    public GeographicAreaList(GeographicArea geographicAreaToAdd) {
        mGeographicAreaList = new ArrayList<>();
        mGeographicAreaList.add(geographicAreaToAdd);
    }

    /**
     * GeographicAreaList constructor that receives without parameters
     */
    public GeographicAreaList() {
        mGeographicAreaList = new ArrayList<>();
    }

    /**
     * Method that receives a geographic area as a parameter and adds that
     * GA to the list in case it is not contained in that list already.
     *
     * @param geographicAreaToAdd geographic area to be added
     * @return returns true in case the geographic area is added and false if not
     **/
    public boolean addGeographicAreaToGeographicAreaList(GeographicArea geographicAreaToAdd) {
        if (!(mGeographicAreaList.contains(geographicAreaToAdd))) {
            mGeographicAreaList.add(geographicAreaToAdd);
            return true;
        }
        return false;
    }

    /**
     * Method that receives a string as a parameter, compares that string with every
     * Geographic Area name of every GA in the list.
     *
     * @param areaToMatch string that corresponds to a geographic area name
     */
    public GeographicArea matchGeoArea(String areaToMatch) {
        for (GeographicArea g : mGeographicAreaList) {
            if (g.getId().equals(areaToMatch)) {
                return g;
            }
        }
        return null;
    }

    /**
     * Method that goes through every geographic area from the attribute mGeographicAreaList
     * and returns a string with every GA name
     */
    public String printGeoAreaList() {
        StringBuilder finalString = new StringBuilder();
        String emptyList = "The list is empty.";
        if (mGeographicAreaList.isEmpty()) {
            return emptyList;
        }
        finalString.append("Geographic Area List:");
        for (GeographicArea tipo : mGeographicAreaList) {
            finalString.append(" \n" + "-").append(tipo.getId()).append(";");
        }
        return finalString.toString();
    }


    /**
     * Method to print a Whole Geographic Area List.
     * It will print the attributes needed to check if a GA is different from another GA
     * (name, type of GA and Localization)
     */
    public String printGaWholeList(GeographicAreaList newGeoListUi) {
        StringBuilder result = new StringBuilder(new StringBuilder(mStringEnhancer));

        if (newGeoListUi.getGeographicAreaList().isEmpty()) {
            return "Invalid List - List is Empty\n";
        }

        for (int i = 0; i < newGeoListUi.getGeographicAreaList().size(); i++) {
            GeographicArea aux = newGeoListUi.getGeographicAreaList().get(i);
            result.append(i).append(") Name: ").append(aux.getId()).append(" | ");
            result.append("Type: ").append(aux.getTypeArea().getTypeOfGeographicArea()).append(" | ");
            result.append("Latitude: ").append(aux.getLocal().getLatitude()).append(" | ");
            result.append("Longitude: ").append(aux.getLocal().getLongitude()).append("\n");
        }
        result.append(mStringEnhancer);
        return result.toString();
    }

    /**
     * Method to Match a GeographicArea By Name,
     * @return a list of GAs with the input name.
     */
    public List<Integer> matchGeographicAreaIndexByString(String input) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < mGeographicAreaList.size(); i++) {
            if (mGeographicAreaList.get(i).getId().equals(input)) {
                result.add(i);
            }
        }
        return result;
    }

    /**
     * Method to pring Geographic Area Elements by index
     */
    public String printGeoGraphicAreaElementsByIndex(List<Integer> indexes) {
        StringBuilder result = new StringBuilder(mStringEnhancer);
        for (Integer index : indexes) {
            int pos = index;
            result.append(index).append(") ").append(mGeographicAreaList.get(pos).printGeographicArea());
        }
        result.append(mStringEnhancer);
        return result.toString();
    }


    /**
     * Method that receives a string as a parameter, compares that string with every
     * Geographic Area name of every GA in the list and returns true in case of match.
     *
     * @param geographicAreaToAdd string that corresponds to a geographic area name
     * @return returns true in case of match and false otherwise
     */

    public boolean checkIfContainsGAByString(String geographicAreaToAdd) {
        for (GeographicArea ga : mGeographicAreaList) {
            if ((ga.getId().equals(geographicAreaToAdd))) {
                return true;
            }
        }return false;
    }

    /**
     * Checks if a the Geographic Area given as a parameter is inside the Geographic Area List
     *
     * @param geoArea geographic area to test
     * @return returns true in case the GA is contained in the list and false otherwise
     */
    boolean containsGA(GeographicArea geoArea) {
        return mGeographicAreaList.contains(geoArea);
    }

    /**
     * Getter of the attribute mGeographicAreaList from this class
     *
     * @return returns the geographic area list
     */
    public List<GeographicArea> getGeographicAreaList() {
        return mGeographicAreaList;
    }

    public GeographicAreaList matchGeographicAreaWithInputType(String typeAreaName) {
        GeographicAreaList finalList = new GeographicAreaList();
        TypeArea typeAreaToTest = new TypeArea(typeAreaName);
        for (GeographicArea ga : mGeographicAreaList) {
            if (ga.getTypeArea().equals(typeAreaToTest)) {
                finalList.addGeographicAreaToGeographicAreaList(ga);
            }
        }
        return finalList;
    }

    /**
     * This method checks if the list exists
     */
    public boolean checkIfListIsValid() {
        return !mGeographicAreaList.isEmpty();
    }

    @Override
    public boolean equals(Object testObject) {
        if (this == testObject) {
            return true;
        }
        if (!(testObject instanceof GeographicAreaList)) {
            return false;
        }
        GeographicAreaList list = (GeographicAreaList) testObject;
        return Arrays.equals(this.getGeographicAreaList().toArray(), list.getGeographicAreaList().toArray());
    }

    @Override
    public int hashCode() {
        return 1;
    }
}
