import axios from 'axios'
import { ToastProgrammatic as Toast } from 'buefy'
import {
    DIRECTIONS_API_BASE
} from './../constants/mapBox/BaseRequests'
import {
    MapBoxKey
} from './../constants/keys'
import {
    CALCULATION_CONSTANTS, PERSON_CATEGORIES
} from './../constants/fareCalculations'

/**
 * 
 * @param {*} startObject 
 * @param {*} endObject 
 * @returns 
 */
export const getRoute = (startObject, endObject) => new Promise((resolve, reject) => {
    const routeObject = axios
        .get(
            DIRECTIONS_API_BASE +
            startObject.geometry.coordinates[0] +
            "," +
            startObject.geometry.coordinates[1] +
            ";" +
            endObject.geometry.coordinates[0] +
            "," +
            endObject.geometry.coordinates[1] +
            "?geometries=geojson&access_token=" +
            MapBoxKey
        )
        .catch(error => {
            reject(error)
            console.log(error)
        });

    return resolve(routeObject)
})

/**
 * 
 * @param {*} km 
 * @param {*} min 
 * @param {*} personCategory 
 * @returns 
 */
export const calculateTaxiFare = (km, min, personCategory) => {
  console.log(km)
  console.log(min)
    if (personCategory == PERSON_CATEGORIES[0].name) {
      const price = (
        CALCULATION_CONSTANTS.ONE_TO_FOUR_BASE +
        CALCULATION_CONSTANTS.PER_KM_ONE_TO_FOUR * km +
        CALCULATION_CONSTANTS.PER_MIN_ONE_TO_FOUR * min
    ).toFixed(2); 

        return price
    } else if(personCategory == PERSON_CATEGORIES[1].name) {
      const price = (
        CALCULATION_CONSTANTS.FOUR_TO_SEVEN_BASE +
        CALCULATION_CONSTANTS.PER_KM_FOUR_TO_SEVEN * km +
        CALCULATION_CONSTANTS.PER_MIN_FOUR_TO_SEVEN * min
    ).toFixed(2);
    return price
}
        
}

/**
 * 
 * @param {*} number 
 * @returns 
 */
export const timeConvertToString = (number) => {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;


    if (hours == 0) {
        return Math.round(minutes) + " min";
    } else {
        return hours + " uur en " + Math.round(minutes) + " min";
    }
}
/**
 * 
 * @param {*} startInput 
 * @param {*} endInput 
 * @param {*} categorySelect 
 * @param {*} buttonElementName 
 */
export const FareCalculateValidation = (startInput, endInput, categorySelect, buttonElementName) => {
    const startIsValid = validateAddress(startInput);
    const endIsValid = validateAddress(endInput);
    if (categorySelect.text != null && startIsValid && endIsValid) {
      if (startInput != endInput) {
        document.getElementById(buttonElementName).classList.remove("is-static");
      } else if (startInput == endInput) {
        Toast.open({
          message: "gegeven addressen zijn hetzelfde",
          type: "is-danger",
        });
      }
    } else {
      document.getElementById(buttonElementName).classList.add("is-static");
    }
  }
/**
 * 
 * @param {*} startInput 
 * @param {*} endInput 
 * @param {*} buttonElementName 
 */
export const FareCalculateValidationEdit = (startInput, endInput, buttonElementName) => {
    const startIsValid = validateAddress(startInput);
    const endIsValid = validateAddress(endInput);
    if (startIsValid && endIsValid) {
      if (startInput != endInput) {
        document.getElementById(buttonElementName).classList.remove("is-static");
      } else if (startInput == endInput) {
        Toast.open({
          message: "gegeven addressen zijn hetzelfde",
          type: "is-danger",
        });
      }
    } else {
      document.getElementById(buttonElementName).classList.add("is-static");
    }
  }
  /**
   * 
   * @param {*} address 
   * @returns 
   */
export const validateAddress = (address) => {
    let amountOfCommas = 0;

    for (let i = 0; i < address.length; i++) {
        if (String(address).charAt(i) == ",") {
            amountOfCommas++;
        }
    }
    if (amountOfCommas == 2 || amountOfCommas == 3 || amountOfCommas == 4) {
        return true;
    } else {
        return false;
    }
}

export default {
    getRoute,
    calculateTaxiFare,
    timeConvertToString
}