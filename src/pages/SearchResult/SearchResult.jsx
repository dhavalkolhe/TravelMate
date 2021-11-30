import React, { useEffect, useState, useContext } from 'react'
import './SearchResult.css'
import Loader from '../../components/Loader/Loader';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBox from '../../components/SearchBox/SearchBox';
import currentLocationIcon from '../../img/currentLocationIcon.svg'
import destinationLocationIcon from '../../img/destinationLocationIcon.svg'

import { ResponseContext } from '../../context/responseContext';

function SearchResult() {
    const [response] = useContext(ResponseContext);
    const [currentCity, setCurrentCity] = useState("");
    const [destinationCity, setDestinationCity] = useState("");
    const [gender, setGender] = useState("Any");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date().setMonth(new Date().getMonth() + 6));
    const [loading, setLoading] = useState(true);
    // const [filteredResponse, setFilteredResponse] = useState();

    useEffect(() => {
        if (response) {
            loadResponse();
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [response])

    const loadResponse = () => {
        // response.forEach(element => {

        //    console.log(element.props)
        // });
        // let x = response.filter(x => (x.props.currentCity === currentCity)
        //     || (x.props.destinationCity === destinationCity));
        // setFilteredResponse(x);
    }



    return (
        <div className="search__results">
            <h2 className="title">Search Results</h2>
            <div className="container">
                <div className="filter__results">
                    <p className="secondary__title">Filter Results</p>
                    <div className="eachFilter">
                        <p className="tertiary__title">Date</p>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="mr">From</td>
                                    <td>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            minDate={new Date()}
                                            dateFormat="dd-MMM-yyyy" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="mr">To</td>
                                    <td>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            minDate={new Date()}
                                            dateFormat="dd-MMM-yyyy" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="eachFilter">
                        <p className="tertiary__title">Location</p>
                        <table>
                            <tbody>

                                <tr>
                                    <td className="mr">From</td>
                                    <td>
                                        <SearchBox
                                            imgSrc={currentLocationIcon}
                                            inputName="currentLocation"
                                            selectedCity={currentCity}
                                            setSelectedCity={setCurrentCity} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="mr">To</td>
                                    <td>
                                        <SearchBox
                                            imgSrc={destinationLocationIcon}
                                            inputName="destinationCity"
                                            selectedCity={destinationCity}
                                            setSelectedCity={setDestinationCity} />
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <div className="eachFilter">
                        <p className="tertiary__title">Preferred Gender</p>
                        <table>
                            <tbody>

                                <tr>
                                    <td className="mr">   </td>
                                    <td>
                                        <select
                                            name="gender"
                                            required
                                            defaultValue={gender}
                                            onChange={(gender) => setGender(gender.target.value)}
                                        >
                                            <option value="Any">Any</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>


                </div>
                <div className="results">
                    {loading && <Loader />}
                    {response}

                </div>
            </div>
        </div>
    )
}

export default SearchResult
